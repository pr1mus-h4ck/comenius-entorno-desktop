const { app, cookies, cookieSession, cookieZoom } = require('./config');
const config = require('./config');
const funciones = require('./funciones');
const {menuRol} = require('./array');
const { json } = require('./zoom');
const { text } = require('express');
// Renderizar la página de index
app.get('/', (req, res) => {
    // Crear un objeto de sesión
    let sesiones = {
        id: cookieSession.usuariosID,
        sesion: cookieSession.sessionsID,
        rol: cookieSession.rol,
        item: cookieSession.item,
        nombre: cookieSession.nombre,
    }
    // Crear un objeto para el proceso de OTP donde se verifica si se envío el correo al usuario con el código pertinente
    let procesoOTP = {
        envio: config.envioOTP,
        correo: cookieSession.correoOTP
    }
    let datosRecibidos = {
        tipo: null,
        intentos: null,
    }
    let almacenamiento = {
        id: cookieSession.id,
        password: cookieSession.password,
        zoomFirma: cookieSession.zoomFirma,
        clientId: cookieSession.clientId,
    }
    // Verificar si hay una sesión activa
    if (sesiones.sesion) {
        // Si OTP fue virificado mostrar el Index
        if (cookieSession.verificacionOTP) {
            // Verificar si el rol existe en menuRol antes de pasarlo
            if (menuRol[sesiones.rol]) {
                // res.render('zoom', {sesiones, almacenamiento});
                res.render('panel_de_clase', {sesiones}); 
                // TODO: subir en el res.render la logica del menu.rol
                // res.render('trabajo');
                // funciones.index(req, res, sesiones, menuRol[sesiones.rol], datosRecibidos);
            }
        } else {
            // Mostrar OTP
            funciones.otp(req, res, sesiones, procesoOTP, datosRecibidos);
        }
    } else {
        // Mostrar Login
        funciones.login(req, res, datosRecibidos);
    }
});
app.get('*', (req, res) => {
    res.redirect('/');
});
module.exports = { routerGet: app }