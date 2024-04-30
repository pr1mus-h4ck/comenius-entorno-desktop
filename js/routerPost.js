const { app, cookies, cookieSession } = require('./config');
const config = require('./config');
app.post('/login', (req, res) => {
    // Si existe sesión, redireccionar a la página principal
    if (cookieSession.sessionsID) {
        res.redirect('/');
    // Si no existe sesión, hacer validación del formulario
    }else{
        // Guardo los valores del formulario en constantes
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        // Si ambos campos tienen valores
        if (req.body.correo !== '' && req.body.contrasena !== '') {
            // Creo un objeto con los valores del formulario
            let iniciar = {
                correo : correo,
                contrasena : contrasena
            }
            // Convierto el objeto en un JSON
            let iniciarJson = JSON.stringify(iniciar);
            // Envío en método POST al servidor con los datos del JSON
            fetch(`http://localhost:3000/login`, {
                method: 'Post',
                body: iniciarJson
            })
            .then(recibir => recibir.json())
            .then(recibido => {
                // Si la validación es correcta guardo la ID de la sesión y verificación de OTP
                if (recibido.usuarioID && recibido.sessionID) {
                    // Crear la cookie de la ID del usuario
                    cookies.set('usuarioID', recibido.usuarioID, {path: '/' });
                    // Crear la cookie de la ID  de la sesión
                    cookies.set('sessionID', recibido.sessionID, {path: '/' });
                    // Crear la cookie de si se requiere OTP o no
                    cookies.set('verificacion', recibido.verificacion, {path: '/' });
                    // Crear la cookie de correo encriptado
                    cookies.set('correo', recibido.correo, {path: '/'});
                    // Guardar la cookie de usuarioID
                    cookieSession.usuariosID = cookies.get('usuarioID');
                    // Guardar la cookie de sessionID
                    cookieSession.sessionsID = cookies.get('sessionID');
                    // Guardar la cookie de verificacion
                    cookieSession.verificacionOTP = cookies.get('verificacion');
                    // Guardar la cookie de correo
                    cookieSession.correoOTP =  cookies.get("correo");
                } 
                if (recibido.usuarioID && recibido.sessionID || recibido.aviso || recibido.limiteAlcanzado){
                    // Muestro un alert indicando la respuesta recibida del BACK-END
                    res.render('login', {
                        alert: true,
                        alertTitle: recibido.alertTitle,
                        alertMessage: recibido.alertMessage || recibido.aviso || recibido.limiteAlcanzado,
                        alertIcon: recibido.alertIcon,
                        showConfirButton: recibido.showConfirButton,
                        timer: recibido.timer,
                        ruta: '/'
                    })
                // En cualquier caso redireccionar siempre a raíz
                } else {
                    res.redirect('/');
                }
            })
        } else {
            // Muestro un alert indicando que debe completar los campos obligatorios del formulario llevandolo nuevamente al 'login'
            res.render('login', {
                alert: true,
                alertTitle: 'Campos Obligatorios',
                alertMessage: '¡Todos los campos del formulario son obligatorios!',
                alertIcon: 'error',
                showConfirButton: true,
                timer: false,
                ruta: '/'
            })
        }
    }
});
app.post('/enviar-otp', (req, res) => {
    // Si la variable 'envioOTP' es true, redirecciono a la raíz
    if (config.envioOTP){
        res.redirect('/');
    // Si no es true, generar petición del envío de OTP a la casilla de correo electrónico del usuario
    } else{
        // Creo un objeto con los valores de las Cookies de la sesión
        let sesiones = {
            id: cookieSession.usuariosID,
            session: cookieSession.sessionsID
        }
        // Convierto el objeto en un JSON
        let sesionesJson = JSON.stringify(sesiones);
        // Envío en método POST al servidor con los datos del JSON
        fetch(`http://localhost:3000/enviar-otp`, {
            method: 'Post',
            body: sesionesJson
        })
        .then(recibir => recibir.json())
        .then(recibido => {
            // Guardar el objeto recibido
            config.envioOTP = recibido;
            // Imprimo en consola el objeto recibido
            console.log(config.envioOTP);
            res.redirect('/');
        });
    }
});
module.exports = { routerGet: app }