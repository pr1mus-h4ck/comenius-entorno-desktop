const { app, cookies, cookieSession } = require('./config');
const config = require('./config');
const funciones = require('./funciones');
const {menuRol} = require('./array');
// Renderizar la página de index
app.get('/', (req, res) => {
    // Crear un objeto de sesión
    let sesiones = {
        id: cookieSession.usuariosID,
        sesion: cookieSession.sessionsID,
    }
    // Crear un objeto para el proceso de OTP donde se verifica si se envío el correo al usuario con el código pertinente
    let procesoOTP = {
        envio: config.envioOTP,
        correo: cookieSession.correoOTP
    }
    let datosRecibidos = {
        intentos: null,
    }
    let rol = 'estudiante';
    // Verificar si hay una sesión activa
    if (cookieSession.sessionsID) {
        // Si OTP fue virificado mostrar el index
        if (cookieSession.verificacionOTP) {
            // Verificar si el rol existe en menuRol antes de pasarlo
            if (menuRol[rol]) {
                funciones.index(req, res, sesiones, rol, menuRol[rol]);
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
})
module.exports = { routerGet: app }