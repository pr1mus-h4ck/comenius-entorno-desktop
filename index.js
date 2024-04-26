const express = require('express');
const app = express();
const puerto = 4000;
// Invoco la librería 'universal-cookie' para trabajar con cookies en el cliente
const Cookies = require('universal-cookie');
//  Creo una instancia de las cookies, que se pasa a todas las funciones que requieren acceso a ellas.
const cookies = new Cookies();
const cors = require('cors');
// Crear variable 'usuariosID' para guardar como cookie la ID del usuario en la DDBB
let usuariosID;
// Crear variable 'sessionsID' para guardar como cookie la ID de la sesión creada en el BACK-END
let sessionsID;
// Crear variable de 'verificacionOTP' para guardar como cookie el acceso a OTP o index
let verificacionOTP;
// Craar variable de 'correoOTP' para guardar como cookie el correo del usuario encriptado
let correoOTP;
// Crear variable de envioOTP inicializasa en false indicando que aún no se envío el código OTP al usuario en su casilla de e-mail
let envioOTP = false;
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
app.set('view engine', 'ejs');
// Renderizar la página de index
app.get('/', (req,res) => {
    // Crear un objeto de sesión
    let sesiones = {
        id: usuariosID,
        sesion: sessionsID,
    }
    // Crear un objeto para el proceso de OTP donde se verifica si se envío el correo al usuario con el código pertinente
    let procesoOTP = {
        envio: envioOTP
    }
    // Verificar si hay una sesión activa
    if (sessionsID) {
        // Si OTP fue virificado mostrar el index
        if (verificacionOTP) {
            // Mostrar Index
            res.render('index', {sesiones});
        } else {
            // Mostrar OTP
            res.render('otp', {sesiones, procesoOTP, correoOTP});
        }
    } else {
        // Mostrar Login
        res.render('login');
    }
});
app.get('/login', (req, res) => {
    res.redirect('/');
})
app.post('/login', (req, res) => {
    // Si existe sesión, redireccionar a la página principal
    if (sessionsID) {
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
                    usuariosID = cookies.get('usuarioID');
                    // Guardar la cookie de sessionID
                    sessionsID = cookies.get('sessionID');
                    // Guardar la cookie de verificacion
                    verificacionOTP = cookies.get('verificacion');
                    // Guardar la cookie de correo
                    correoOTP =  cookies.get("correo");
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
app.get('/enviar-otp', (req, res) => {
    res.redirect('/');
})
app.post('/enviar-otp', (req, res) => {
    // Si la variable 'envioOTP' es true, redirecciono a la raíz
    if (envioOTP){
        res.redirect('/');
    // Si no es true, generar petición del envío de OTP a la casilla de correo electrónico del usuario
    } else{
        // Creo un objeto con los valores de las Cookies de la sesión
        let sesiones = {
            id: usuariosID,
            session: sessionsID
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
            envioOTP = recibido;
            // Imprimo en consola el objeto recibido
            console.log(envioOTP);
            res.redirect('/');
        });
    }
});
app.listen(puerto, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});