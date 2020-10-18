La estructura de archivos es la siguiente:
- components: contiene archivos .js que definen los componentes del front-end que se usan. En la terminología de React un componente es básicamente una función que se encarga de renderizar algún elemento html (titulos, botones, etc) pero también pueden ser funciones que realizan alguna lógica necesaria para el frontend.

- services: esta carpeta tiene un solo archivo (people.js) que sirve como api para conectarse a la bd desde App.js

- server.js: aquí se lleva a cabo la conexión con la bd, utilizando una herramienta que se llama [pg](https://www.npmjs.com/package/pg)
- App.js: este archivo tendría el frontend de la aplicación, por eso ven que al inicio se importa React.
- server-test.js: aquí pueden probar la conexión con alguna bd que tengan en su local, en la consola escriben `node server-test.js <usuario de postgres> [nombre] [numero]`

Actualmente yo ya hice lo que sería la conexión con la bd, pero hace falta basicamente todo lo de frontend.
