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
    // Crear variabe 'nombre' para guardar como cookie el nombre del usuario
    nombre: cookies.get('nombre'),
    // Crear variabe 'nombre' para guardar como cookie el nombre del usuario
    otp: cookies.get('otp'),
    // Crear variable de 'verificacionOTP' para guardar como cookie el acceso a OTP o index
    verificacionOTP: cookies.get('verificacion'),
    // Craar variable de 'correoOTP' para guardar como cookie el correo del usuario encriptado
    correoOTP: cookies.get('correo'),
    // Craar variable de 'rol' para guardar como cookie el rol del usuario para la visualización del menú
    rol: cookies.get('rol'),
    // Craar variable de 'item' para guardar como cookie el item seleccionado del menu para renderizar dicha página en el index.ejs
    item: cookies.get('item'),
    // Crear variable de 'id' para guardar como cookie el ID de zoom para iniciar la videollamda
    id: cookies.get('id'),
    // Crear variable de 'password' para guardar como cookie la contraseña para iniciar con el ID de zoom
    password: cookies.get('password'),
    // Crear variable de 'zoomfirma' para autenticar al usuario que ingresa a la llamada de zoom
    zoomFirma: cookies.get('zoomFirma'),
    // Crear variable de 'clienteId' para autenticar el cliente de zoom
    clientId: cookies.get('clientId'),
    // Crear variable de 'comision' para ingrear a las distintas comisiones inscriptas
    comision: cookies.get('comision'),
    // Crear variable 'comisionID' para guardar como cookie la ID del usuario con el rol Instructor de la DDBB
    comisionID: cookies.get('comisionID'),
    // Crear variable de 'enlace' para ingresar a las distintas secciones de la comision
    enlace: cookies.get('enlace'),
    // Crear variable de 'trabajo' para ingresar a los distintas trabajos publicados por el instructor
    trabajo: cookies.get('trabajo'),
    // Crear variable 'instructorID' para guardar como cookie la ID del usuario con el rol Instructor de la DDBB
    instructorID: cookies.get('instructorID'),
    // Crear variable de 'listaAlumno' para ingresar al trabajo asignado de dicho alumno
    listaAlumno: cookies.get('listaAlumno'),
}
// Hago uso de cors en este archivo 'index.js'. Se agrega antes de cualquier controlador de ruta.
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
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