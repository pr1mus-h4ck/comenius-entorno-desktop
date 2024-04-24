/* TODO: Guardar en la cookie del navegador los datos de la sesión desde el back-end
1) Desinstalar la librería express-session
2) Instalar la librería express-session en el back-end
3) Crear sesión en el back-end
4) Guardar la cookie de la session en el navegador desde el back-end
5) Leer la cookie de la session en el navegador desde el back-end
6) Eliminar la cookie de la session en el navegador al mismo tiempo que se elimina la sesión en el back-end
*/
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
                    // Muestro un alert indicando que inicio correctamente llevandolo al archivo 'otp'
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Autenticación exitosa',
                        alertMessage: '¡Haz iniciado sesión correctamente!',
                        alertIcon: 'success',
                        showConfirButton: false,
                        timer: 1500,
                        ruta: '/'
                    })
                // Si la validación es incorrecta o se alcanzó el límite de intentos, muestro un alert indicando el error y/o los intentos de validación restantes
                } else if (recibido.aviso || recibido.limiteAlcanzado){
                    // Muestro un alert indicando el error y los intentos disponibles llevandolo nuevamente al 'login'
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: recibido.aviso || recibido.limiteAlcanzado,
                        alertIcon: 'error',
                        showConfirButton: true,
                        timer: false,
                        ruta: '/'
                    })
                // En cualquier caso distinto a los anteriores muestro redireccionar siempre a raíz
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
    if (envioOTP){
        res.redirect('/');
    } else{
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
            // Imprimo en consola el objeto recibido
            console.log(recibido);
            envioOTP = true;
            res.redirect('/');
        });
    }
});
app.listen(puerto, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});