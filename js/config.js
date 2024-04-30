const express = require('express');
const app = express();
const puerto = 4000;
// Invoco la librería 'universal-cookie' para trabajar con cookies en el cliente
const Cookies = require('universal-cookie');
//  Creo una instancia de las cookies, que se pasa a todas las funciones que requieren acceso a ellas.
const cookies = new Cookies();
const cors = require('cors');
let cookieSession = {
    // Crear variable 'usuariosID' para guardar como cookie la ID del usuario en la DDBB
    usuariosID: cookies.get('usuarioID'),
    // Crear variable 'sessionsID' para guardar como cookie la ID de la sesión creada en el BACK-END
    sessionsID: cookies.get('sessionID'),
    // Crear variable de 'verificacionOTP' para guardar como cookie el acceso a OTP o index
    verificacionOTP: cookies.get('verificacion'),
    // Craar variable de 'correoOTP' para guardar como cookie el correo del usuario encriptado
    correoOTP: cookies.get("correo")
}
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    type: '*/*'
}));
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});
module.exports = {
    app,
    puerto,
    cookies,
    cookieSession,
    // Crear variable de envioOTP inicializasa en false indicando que aún no se envío el código OTP al usuario en su casilla de e-mail
    envioOTP: false
}