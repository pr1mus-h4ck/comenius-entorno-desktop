const express = require('express');
const app = express();
const puerto = 4000;
const session = require('express-session');
const cors = require('cors');
let mail = '';
let rol = '';
let verificacion = '';
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    type: '*/*'
}));
app.set('view engine', 'ejs');
// Renderizar la página de index
app.get('/', (req,res)=>{
    // Comprobar si existe sesión
    req.session.correo = mail;
    req.session.rol = rol;
    // Crear objeto con datos de sesión
    let sesiones = {
        correo: req.session.correo,
        rol: req.session.rol
    }
    // Comprobar si los datos de la sesión están vacíos
    if (sesiones.correo === '' && verificacion === '') {
        // Renderizar la página de inicio de sesión
        res.render('login');
    } else if (verificacion === false) {
        // Renderizar la página de index con datos de sesión
        res.render('index', {sesiones});
    } else if (verificacion === true) {
        // Renderizar la página de otp
        res.render('otp', {sesiones});
    }
});

app.get ('/contrasenia', (req, res) => {
    verificacion = true;
    res.redirect('/');
}) 
app.post('/login', (req, res) => {
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
            // Compruebo si el primer elemento no está vacío
            if (recibido[0] !== '') {
                // Compruebo si el primer elemento es false
                if (recibido[0] === false) {
                    // Muestro un alert indicando que inicio correctamente llevandolo al index de la aplicación
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Autenticación exitosa',
                        alertMessage: '¡Haz iniciado sesión correctamente!',
                        alertIcon: 'success',
                        showConfirButton: false,
                        timer: 1500,
                        ruta: '/'
                    })
                    mail = recibido[3];
                    rol = recibido[4];
                    verificacion = false;
                // Compruebo si el primer elemento es true
                } else if (recibido[0] === true) {
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
                    mail = recibido[3];
                    rol = recibido[4];
                    verificacion = true;
                }
            // Compruebo si el segundo elemento no está vacío
            } else if (recibido[1] !== '') {
                // Muestro un alert indicando el error y los intentos disponibles llevandolo nuevamente al 'login'
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Correo y/o Contraseña son incorrecto. '+recibido[1],
                    alertIcon: 'error',
                    showConfirButton: true,
                    timer: 0,
                    ruta: '/'
                })
            // Compruebo si el tercer elemento no está vacío
            } else if (recibido[2] !== '') {
                // Muestro un alert indicando que alcanzó el límite de intentos llevandolo nuevamente al 'login'
                res.render('login', {
                    alert: true,
                    alertTitle: '¡Límite alcanzado!',
                    alertMessage: recibido[2],
                    alertIcon: 'warning',
                    showConfirButton: true,
                    timer: false,
                    ruta: '/'
                })
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
});

app.post ( '/reseteo', (req, res) => {
    const correo = req.body.email; 
    if (req.body.email !== '') {
        let email = {
            correo: correo
        }
        let emailJSON = JSON.stringify(email);
        fetch(`http://localhost:3000/reseteo`, {
            method: 'Post',
            body: emailJSON
        })
        .then(recibir => recibir.json())
        .then(console.log)
    }
});
app.listen(puerto, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});