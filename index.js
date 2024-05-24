// Llamo las constantes necesarias desde el archivo 'config.js'
const { app, puerto, path } = require('./js/config');
// Configuro la ruta del directorio 'views'
app.set('views', path.join(__dirname, 'views'));
// Configuro el motor de plantillas EJS
app.set('view engine', 'ejs');
// Creo la constante 'routerGet' para importar los métodos GET del archivo 'routerGet.js'
const routerGet = require('./js/routerGet');
// Creo la constante 'routerPost' para importar los métodos POST del archivo 'routerPost.js'
const routerPost = require('./js/routerPost');
// Configuro el puerto del servidor del Front-End
app.listen(puerto, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});