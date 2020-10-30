require('dotenv').config() // Para poder utilizar las variables de ambiente.
const { Pool } = require('pg') // Conexión con postgres

const args = process.argv.length
console.log(args)
if (args < 2) {
	console.log('Please provide the  as an argument: node server-test.js <password>')
	process.exit(1)
}

const pool = new Pool() // No es necesario pasarle parametros de conexión, ya están en .env


if (args >= 4) {
    const name = process.argv[3]
    const number = process.argv[4]
    
    /**
     * Hay varias formas de hacer querys con pg, esta fue la unica que no me dió gallo.
     * Se crea un objeto que va a contener el texto como tal de la consulta SQL y los valores
     * que se van a utilizar en la consulta.
     */

    const query = {
        text: 'INSERT INTO contacts(name, phone) VALUES($1, $2) RETURNING *',
        values: [name, number] // los valores siempre se dan en forma de arreglo.
    }

    pool.query(query)
        .then(res => console.log(res.rows)) // Si el insert es exitoso imprime en la consola la tupla que se insertó.
        .catch(err => console.log(err.stack)) // Si el insert no es exitoso se imprime el mensaje de error en la consola.

    pool.end() // Cierra la conexión.

} else {
    pool.query('SELECT * FROM contacts')
        .then(res => console.log(res.rows))
        .catch(err => console.log(err.stack))

    pool.end()
}
