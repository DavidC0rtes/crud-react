require('dotenv').config()
const { Pool } = require('pg')

const args = process.argv.length

if (args < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]
//const url =
//	`mongodb+srv://fullstack:${password}@cluster0.zofv8.mongodb.net/phonebook?retryWrites=true&w=majority`

const pool = new Pool() // No es necesario pasarle parametros de conexión, ya están en .env

if (args >= 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const query = {
        text: 'INSERT INTO contacts(name, phone) VALUES($1, $2) RETURNING *',
        values: [name, number]
    }

    pool.query(query)
        .then(res => console.log(res.rows))
        .catch(err => console.log(err.stack))

    pool.end()

} else {
    pool.query('SELECT * FROM contacts')
        .then(res => console.log(res.rows))
        .catch(err => console.log(err.stack))

    pool.end()
}
