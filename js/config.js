// Invoco la librería 'express' en la constante llamada igualmente 'express'
const express = require('express');
// Guardo la función express() en la constante app para utilizar todos los métodos de la librería 'express'
const app = express();
// Guardo la constante 'port' el número 4000 para iniciarlizarlo como el puerto del servidor
const puerto = 4000;
// Invoco la librería 'path' en la constante llamada igualmente 'path'
const path = require('path');
// Invoco la librería 'universal-cookie' para trabajar con cookies en el cliente
const Cookies = require('universal-cookie');
//  Creo una instancia de las cookies, que se pasa a todas las funciones que requieren acceso a ellas.
const cookies = new Cookies();
// Invoco la librería 'cors' en la constante llamada igualmente 'cors'
const cors = require('cors');

let cookieSession = {
    // Crear variable 'usuariosID' para guardar como cookie la ID del usuario en la DDBB
    usuariosID: cookies.get('usuarioID'),
    // Crear variable 'sessionsID' para guardar como cookie la ID de la sesión creada en el BACK-END
    sessionsID: cookies.get('sessionID'),
    
    nombre: cookies.get('nombre'),
    // Crear variable de 'verificacionOTP' para guardar como cookie el acceso a OTP o index
    verificacionOTP: cookies.get('verificacion'),
    // Craar variable de 'correoOTP' para guardar como cookie el correo del usuario encriptado
    correoOTP: cookies.get('correo'),
    // Craar variable de 'rol' para guardar como cookie el rol del usuario para la visualización del menú
    rol: cookies.get('rol'),
    // Craar variable de 'item' para guardar como cookie el item seleccionado del menu para renderizar dicha página en el index.ejs
    item: cookies.get('item'),

    id: cookies.get('id'),

    password: cookies.get('password'),
    
    zoomFirma: cookies.get('zoomFirma'),

    clientId: cookies.get('clientId'),

    publicacion: cookies.get('publicacion'),

    comentario: cookies.get('comentario'),
}
// Hago uso de cors en este archivo 'index.js'. Se agrega antes de cualquier controlador de ruta.
app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use('/recursos', express.static('public'));
module.exports = {
    app,
    puerto,
    path,
    cookies,
    cookieSession,
    // Crear variable de envioOTP inicializasa en false indicando que aún no se envío el código OTP al usuario en su casilla de e-mail
    envioOTP: false,
}