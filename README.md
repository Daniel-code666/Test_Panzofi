# Prueba para Panzofi
Proyecto de frontend realizado con React siguiendo las actividades indicadas en la prueba para vacante de desarrollador.

# Resumen

La aplicación es un breve "mockup" similar a Reddit donde la funcionalidad principal es la creación de comentarios y respuesta
a estos mismos con el sistema de calificación para los comentarios y la publicación, también incluye un sistema muy básico para
la traducción de la página. Hace uso de un sistema de rutas básico pero necesario para la aplicación y sigue una distribución
de carpetas y archivos estándar.

# Aspectos claves

La aplicación hace uso de hooks para simular peticiones HTTP, de esta manera es posible tener cierto grado de dinamismo incluso
trabajando con datos estáticos, también facilita el paso a un escenario real dado que solo es cuestión de mapear los objetos que
devuelve el backend.

En el apartado visual se usa Semantic-UI para usar componentes preconstruios e íconos a la medida con el fin de lograr un 
sitio agradable y elegante.

La aplicación cumple con cierto grado de interactividad dado que hay posibilidad de puntuar un post y todos los comentarios, también
es posible responder a los comentarios de manera indefinida y agregar los comentarios necesarios al post manteniendo el puntaje de cada
uno (post, comentario, respuesta a comentario). Los datos son mapeados simulando la respuesta a una petición al backend.
La puntuación también está muy similar al sitio Reddit, es decir que el usuario solo puede dar un voto a cada elemento, por ejemplo al 
post solo puede dar un voto, positivo o negativo, evitando que se den votos de manera indefinida.

El sistema de traducción es muy sencillo, usando i18n se puede traducir el contenido a través del uso de un diccionario con los términos
indicados. Dentro de las funcionalidades u opciones que hay para cubrir este punto esta es la más barata dado que otras opciones 
que realizan la traducción directa como Google Translate API son costosas o requieren datos los cuáles son imposibles de subir a un
repositorio como el APIKEY.

# Ejecutar el proyecto
Una vez clonado el proyecto  ejecutar 

### npm i

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
