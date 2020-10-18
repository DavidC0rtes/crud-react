import axios from 'axios' // Hace lo mismo que postman. Envía peticiones a servidores http.
const baseUrl = 'http://localhost:3001/api/persons'

// API para comunicarse con el servidor corriendo en baseUrl con express.

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// Hay que exportar las funciones para que se puedan usar en App.js
export default {getAll, create, remove, update}
