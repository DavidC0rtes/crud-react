require('dotenv').config()
const express = require('express') // Servidor HTTP
const morgan = require('morgan') // Logs
const cors = require('cors') // Cross-Origin resource sharing
const {Pool} = require('pg') // PostgreSQL 

morgan.token('post', function (tokens, req, res) {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(cors())

app.use(morgan(function (tokens, req, res) {
    return [
         tokens.method(req, res),
         tokens.url(req, res),
         tokens.status(req, res),
         tokens.res(req, res, 'content-length'), '-',
         tokens['response-time'](req, res), 'ms',
         tokens.method(req, res) === 'POST' ? tokens.post(req, res) : '',
     ].join(' ')
}))

app.use(express.static('build'))

pool = new Pool()

app.get('/api/persons', (request, response) => { 
    pool
        .query('SELECT name, phone FROM contacts')
        .then(result => response.json(result.rows))
        .catch(err => console.log(err.stack))
})


const PORT = process.env.SERVERPORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
