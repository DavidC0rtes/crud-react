import React, { useState, useEffect } from 'react';
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
    
    console.log(people)
    return (
        <div>
            <h2>Directorio telefónico</h2>
            <div>
                { 
                    people.map(person => <p>{person.name} {person.phone}</p> )
                }
            </div>
        </div>
    )
}
export default App;
