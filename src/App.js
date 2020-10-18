import React, { useState, useEffect } from 'react';
import apiService from './services/person'

const App = () => {
    const [people, setPeople] = useState([])
    

    // Hook que se realiza apenas carga la paǵina.
    useEffect(() => {
        apiService
            .getAll()
            .then(initialNums => {
                setPeople(initialNums)
            })
    }, [])
    
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
