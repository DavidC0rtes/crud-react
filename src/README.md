La estructura de archivos es la siguiente:
- components: contiene archivos .js que definen los componentes del front-end que se usan. En la terminología de React un componente es básicamente una función que se encarga de renderizar algún elemento html (titulos, botones, etc) pero también pueden ser funciones que realizan alguna lógica necesaria para el frontend.

- services: esta carpeta tiene un solo archivo (person.js) que sirve como api para conectarse a la bd desde App.js

- server.js: aquí se lleva a cabo la conexión con la bd, utilizando una herramienta que se llama [pg](https://www.npmjs.com/package/pg)
- App.js: este archivo tendría el frontend de la aplicación, por eso ven que al inicio se importa React.
- server-test.js: aquí pueden probar la conexión con alguna bd que tengan en su local, en la consola escriben `node server-test.js <usuario de postgres> [nombre] [numero]`

Una vez creen su bd en postgres y le meten una tabla que además de id, tenga un campo número y nombre proceden a hacer lo siguiente para poder probar la aplicación:
1. Crean un archivo llamado `.env` en la raíz del repositorio, allí es donde van a estar las llamadas variables de ambiente. [Aquí están las variables de ambiente que se necesitan para conectarse a la bd](https://node-postgres.com/features/connecting), también deben añadir una llamada SERVERPORT donde se específica el puerto en dónde va a correr la conexión con el servidor, en el mío puse `SERVERPORT=3001`. Pueden probar la conexión con el archivo `server-test.js`

2. Inicializar el servidor: `npm run server`.
3. Inicializar la aplicación: `npm start`. Se les abre una pestaña del navegador y les debe mostrar las filas de la tabla que crearon, sino tiene nada pues no muestra nada solo el título "Directorio telefonico".
```
[frontend] App.js ----> [API] services/person.js ------>HTTP----> server.js -----> [PostgreSQL]

```


- Documentación de React: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- Documentación de JavaScript: [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
