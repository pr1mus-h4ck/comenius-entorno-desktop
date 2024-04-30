const { app, puerto } = require('./js/config');
app.set('view engine', 'ejs');
const routerGet = require('./js/routerGet');
const routerPost = require('./js/routerPost');
app.listen(puerto, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});