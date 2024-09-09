const { app, cookies, cookieSession } = require('./config');
const config = require('./config');
const {inputNombres, menuRol} = require('./array');
const funciones = require('./funciones');
let datosRecibidos = '';
app.post('/login', (req, res) => {
    // Si existe sesión, redireccionar a la página principal
    if (cookieSession.sessionsID) {
        res.redirect('/');
        // Si no existe sesión, hacer validación del formulario
    } else {
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
                    // Creo las Cookies con los valores recibidos desde el Back-End
                    funciones.setCookies(recibido, cookies);
                    // Guardo las Cookies creadas
                    funciones.getCookies(cookieSession, cookies);
                }
                // Guardo el mensaje completo enviado desde el Back-End
                datosRecibidos = recibido;
                // Si 'recibido.tipo' es verdadero. Es decir, si 'recibido.tipo' tiene un valor guardado.
                if (recibido.tipo) {
                    // Renderizar a Login
                    funciones.login(req, res, datosRecibidos);
                }
            })
        } else {
            // Muestro un alert indicando que debe completar los campos obligatorios del formulario llevandolo nuevamente al 'login'
            datosRecibidos = {
                tipo: 'obligatorio',
            }
            funciones.login(req, res, datosRecibidos);
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
        const sesiones = {
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
            config.envioOTP = recibido.correoEnviado;
            const procesoOTP = {
                envio: config.envioOTP,
                correo: cookieSession.correoOTP
            }
            datosRecibidos = recibido;
            funciones.otp(req, res, sesiones, procesoOTP, datosRecibidos);
        });
    }
});
app.post('/confirmar-otp', (req, res) => {
    if (cookieSession.verificacionOTP || !cookieSession.sessionsID){
        res.redirect('/');
    } else {
        // Utilizar el método map() en 'inputNombres' para crear un nuevo array inputs. El método map() itera sobre cada elemento de 'inputNombres' y ejecuta una función para cada elemento.
        const inputs = inputNombres.map(nombre => req.body[nombre]);
        // Verificando si todos los campos de entrada tienen un valor distinto a una cadena vacía ('').
        if ([req.body.input1, ...inputs].every(input => input !== '')) {
            // Cerar la variable 'otp' que contenga la concatenación de todos los valores de los campos de entrada
            let otp = [req.body.input1, ...inputs].join('');
            // Crear un objeto con los valores de las Cookies de la sesión y le asigno el OTP ingresado por el usuario
            let sesiones = {
                id: cookieSession.usuariosID,
                session: cookieSession.sessionsID,
                otp: otp,
            }
            // Convierto el objeto en un JSON
            let otpJson = JSON.stringify(sesiones);
            // Envío en método POST al servidor con los datos del JSON
            fetch(`http://localhost:3000/confirmar-otp`, {
                method: 'Post',
                body: otpJson
            })
            .then(recibir => recibir.json())
            .then(recibido => {
                // Crear la cookie de si se requiere OTP o no
                cookies.set('verificacion', recibido.verificacion, {path: '/' });
                cookies.set('rol', recibido.rol, {path: '/' });
                // Guardar la cookie de verificacion
                cookieSession.verificacionOTP = cookies.get('verificacion');
                cookieSession.rol = cookies.get('rol');
                const procesoOTP = {
                    envio: config.envioOTP,
                    correo: cookieSession.correoOTP
                }
                datosRecibidos = recibido;
                funciones.otp(req, res, sesiones, procesoOTP, datosRecibidos);
            })
        } else {
            // Muestro un alert indicando que debe completar los campos obligatorios del formulario llevandolo nuevamente al 'login'
            let sesiones = {
                id: cookieSession.usuariosID,
                session: cookieSession.sessionsID,
            }
            const procesoOTP = {
                envio: config.envioOTP,
                correo: cookieSession.correoOTP
            }
            datosRecibidos = {
                tipo: 'obligatorio',
            }
            funciones.otp(req, res, sesiones, procesoOTP, datosRecibidos);
        }
    }
});
app.post('/proxy', (req, res) => {
    try {
        const { url } = req.body;
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                res.status(response.statusCode).json(JSON.parse(data));
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error making GET request' });
    }
});
app.post('/cerrar-sesion', (req, res) => {
    let sesiones = {
        id: cookieSession.usuariosID,
        session: cookieSession.sessionsID
    }
    // Convierto el objeto en un JSON
    let sesionesJson = JSON.stringify(sesiones);
    // Envío en método POST al servidor con los datos del JSON
    fetch(`http://localhost:3000/cerrar-sesion`, {
        method: 'Post',
        body: sesionesJson
    })
    .then(recibir => recibir.json())
    .then(recibido => {
        // Si la Sesión del Back-End fue cerrada
        if(recibido.cerrarSesion) {
            // Elimino todas las Cookies de la app
            funciones.eliminarCookies(cookies);
            // Guardo las Cookies con el valor vacio
            funciones.getCookies(cookieSession, cookies);
            // Establezco 'config.envioOTP' son su valor de origen
            config.envioOTP =  false;
            // Todo el mensaje recibido desde el Back-End lo guardo en 'datosRecibidos' para poder renderizar al Login
            datosRecibidos = recibido;
            // Renderizo el Login
            funciones.login(req, res, datosRecibidos);
        }
    })
});
app.post('/cancelar-autenticacion', (req, res) => {
    let sesiones = {
        id: cookieSession.usuariosID,
        session: cookieSession.sessionsID
    }
    // Convierto el objeto en un JSON
    let sesionesJson = JSON.stringify(sesiones);
    // Envío en método POST al servidor con los datos del JSON
    fetch(`http://localhost:3000/cerrar-sesion`, {
        method: 'Post',
        body: sesionesJson
    })
    .then(recibir => recibir.json())
    .then(recibido => {
        // Si la Sesión del Back-End fue cerrada
        if(recibido.cerrarSesion) {
            // Elimino todas las Cookies de la app
            funciones.eliminarCookies(cookies);
            // Guardo las Cookies con el valor vacio
            funciones.getCookies(cookieSession, cookies);
            // Establezco 'config.envioOTP' son su valor de origen
            config.envioOTP =  false;
            // Todo el mensaje recibido desde el Back-End lo guardo en 'datosRecibidos' para poder renderizar al Login
            datosRecibidos = recibido;
            // Renderizo el Login
            funciones.login(req, res, datosRecibidos);
        }
    })
});
app.post('/cargarPagina', (req, res) => {
    //console.log('Hicieron un POST en /cargarPagina');
    // Creo la Cookie 'item' con el valor enviado desde 'index.ejs'
    cookies.set('item', req.body.menu, {path: '/' });
    // Guardo la Cookie 'item' creada
    cookieSession.item = cookies.get('item');
    // Envio la respuesta de éxito a 'index.ejs'
    res.sendStatus(200);
});
module.exports = { routerPost: app }