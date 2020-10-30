import React, { useState, useEffect } from 'react';
import { PersonForm, Persons, Filter, Notification} from './components/misc'
import apiService from './services/person'


const App = () => {
    /**
     * Esto son variables de estado, un tema bien grande de react. Basicamente
     * son variables que son claves para la aplicación y por consiguiente se
     * necesita tener bastante control sobre ellas.
     *
     * La parte izquierda quiere decir que se crea la variable people, la cual
     * solo va a poder modificarse con el metodo setPeople.
     *
     * La parte derecha indica que el valor inicial de people va a ser un arreglo vacío.
     * people va a ser un arreglo de objetos y cada objeto va a contener una tupla de
     * la tabla de la bd.
     */
    const [people, setPeople] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState(null)
    

    // React Hook que se realiza apenas carga la página.
    // un hook es una acción que queremos que se ejecute
    // apenas sucede un cambio en alguna de las variables de estado definidas.
    //
    // Este hook se ejecuta apenas carga la página y lo que hace es hablar con la api
    // para que le devuelva todos los números en el directorio.
    useEffect(() => {
        apiService
            .getAll()
            .then(initialNums => {
                setPeople(initialNums)
            })
    }, []) // Aquí se define de que variables depende el hook. No depende de ninguna = se hace cada que carga la página.
    
    // Hace el llamado a la api para añadir un nuevo nombre.
    const addName = (event) => {
        event.preventDefault()
        const match = people.filter(person => person.name === newName)

        if (match.length) {
            const result = window.confirm(`${newName} ya existe en el directorio, ¿reemplazar y actualizar su número?`)
            result && updateNumberOf(match[0])
        } else {

            const nameObj = {
                name: newName,
                number: newNumber,
            }

            apiService
                .create(nameObj)
                .then(returnedName => {
                    setPeople(people.concat(returnedName))
                })
            
            setMessage({ text: `Se añadió a ${newName}`, type: 'success'})
            setTimeout(() => {
                setMessage(null)
            }, 4000)
        }
        setNewName('')
        setNewNumber('')
    }

    const updateNumberOf = (personObject) => {
        const changedNumber = {...personObject, newPhone: newNumber}
        const id = personObject.id

        apiService
            .update(id, changedNumber)
            .then(returnedPerson => {
                console.log(returnedPerson)
                setPeople(people.map(person => person.id !== id ? person : returnedPerson))

                setMessage({
                    text: `Número de ${personObject.name} ha sido actualizado`,
                    type: 'success'
                })

                setTimeout(() => {
                    setMessage(null)
                }, 4000)
            })
            .catch(err => {
               setMessage({
                   text: `La información de ${personObject.name} ya se había eliminado del servidor.`,
                   type: 'error'
               })
                setPeople(people.filter(person => person.id !== id))
                setTimeout(() => {
                    setMessage(null)
                }, 4000)
            })
    }

    const removeNumber = (id) => {
        apiService
            .remove(id)
            .then(() => {
                setPeople(people.filter(person => person.id !== id))
            })
    }


    const handleNewFilter = (event) => setNewFilter(event.target.value)
    const handleNewName = (event) => setNewName(event.target.value)
    const handleNewNumber = (event) => setNewNumber(event.target.value)

    const numbersToShow = newFilter
        ? people.filter(person => person.name.match(new RegExp(newFilter, "i")))
        : people

    return (
        <div>
            <h2>Directorio telefónico</h2>
            <Notification message={message} />
            <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
            <h2>Añadir nuevo contacto</h2>
            <PersonForm
                addName={addName} newName={newName}
                newNumber={newNumber} handleNewName={handleNewName}
                handleNewNumber={handleNewNumber} />
            
            <h2>Lista de contactos</h2>
            <Persons
                numbersToShow={numbersToShow}
                removeNumber={removeNumber}
            />
        </div>
    )
}
export default App;
