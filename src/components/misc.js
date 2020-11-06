import React from 'react'

const Details = ({ person, removePerson }) => {
    return(
        <p>
            {person.name} {person.phone}
            <button onClick={removePerson} key={person.name}>Borrar</button>
        </p>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <> nombre: <input value={props.newName} onChange={props.handleNewName} /> </>
            <> número: <input value={props.newNumber} onChange={props.handleNewNumber} /></>
            <> <button id='añadir' type='submit'>añadir</button> </>
        </form>
    )
}

const Persons = ({ numbersToShow, removeNumber }) => {
    return (
        <div>
            {numbersToShow.map(person => <Details key={person.name} person={person}
                                            removePerson = {() => window.confirm(`¿Borrar ${person.name}?`) && removeNumber(person.id)} />

            )}
        </div>
    )
}

const Filter = ({ newFilter, handleNewFilter }) => {
    return (
        <div>
            Busqueda: <input value={newFilter} onChange={handleNewFilter} />
        </div>
    )
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const notificationStyle = {
        color: message.type === 'success' ? 'green' : 'red',
        background: 'lightgrey',
        fontStyle: 'italic',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notificationStyle}>
            {message.text}
        </div>
    )
}

export {PersonForm, Persons, Filter, Notification}
