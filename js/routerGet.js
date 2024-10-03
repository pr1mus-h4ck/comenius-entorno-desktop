const { app, cookies, cookieSession, cookieZoom } = require('./config');
const config = require('./config');
const funciones = require('./funciones');
const {menuRol} = require('./array');
// Renderizar la página de index
app.get('/', (req, res) => {
    // Crear un objeto de sesión
    let sesiones = {
        id: cookieSession.usuariosID,
        sesion: cookieSession.sessionsID,
        rol: cookieSession.rol,
        item: cookieSession.item,
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

    let zoom = {
        url: cookieZoom.join_url,
        topic: cookieZoom.topic,
        start_time: cookieZoom.start_time,
        duration: cookieZoom.duration,
        password: cookieZoom.password
    }

    let zoomSettings = {
        host_video: cookieZoom.host_video,
        participant_video: cookieZoom.participant_video,
        audio: cookieZoom.audio,
        mute_upon_entry: cookieZoom.mute_upon_entry,
        waiting_room: cookieZoom.waiting_room
}
    // Verificar si hay una sesión activa
    if (cookieSession.sessionsID) {
        // Si OTP fue virificado mostrar el Index
        if (cookieSession.verificacionOTP) {
            // Verificar si el rol existe en menuRol antes de pasarlo
            if (menuRol[sesiones.rol]) {
                // Mostrar Index
                //res.render('cloudinary');
                res.render('zoom', {zoom, zoomSettings});
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
})
module.exports = { routerGet: app }