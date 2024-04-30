const { app, cookies, cookieSession } = require('./config');
const config = require('./config');
// Renderizar la página de index
app.get('/', (req,res) => {
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
    // Verificar si hay una sesión activa
    if (cookieSession.sessionsID) {
        // Si OTP fue virificado mostrar el index
        if (cookieSession.verificacionOTP) {
            // Mostrar Index
            res.render('index', {sesiones});
        } else {
            // Mostrar OTP
            res.render('otp', {sesiones, procesoOTP});
        }
    } else {
        // Mostrar Login
        res.render('login');
    }
});
app.get('/login', (req, res) => {
    res.redirect('/');
})
app.get('/enviar-otp', (req, res) => {
    res.redirect('/');
})
module.exports = { routerGet: app }