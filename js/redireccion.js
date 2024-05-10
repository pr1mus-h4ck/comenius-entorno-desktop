function redireccionarLogin(req, res, datosRecibidos){
    // toda la logica de las ventanas emergentes
    let iniciarSesion = {
        alert: true,
        alertTitle: 'Autenticación exitosa',
        alertMessage: '¡Haz iniciado sesión correctamente!',
        type: 'exito',
        timer: 1500,
    }
    let avisoIntentos = {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Correo y/o Contraseña son incorrecto. Te quedan '+datosRecibidos.intentos+' intentos.',
        type: 'aviso',
    }
    let limiteAlcanzado = {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Alcanzaste el límite',
        type: 'error',
    }
    let obligatorioLogin = {
        alert: true,
        alertTitle: 'Campos Obligatorios',
        alertMessage: 'Todos los campos del formulario son obligatorios',
        type: 'obligatorio',
    }
    // si hizo el post tal cosa
    if (datosRecibidos.tipo === 'exito') {
        res.locals.alert = iniciarSesion;
        res.render('login');
    } else if (datosRecibidos.tipo === 'aviso') {
        res.locals.alert = avisoIntentos;
        res.render('login');
    } else if (datosRecibidos.tipo === 'error') {
        res.locals.alert = limiteAlcanzado;
        res.render('login');
    } else if (datosRecibidos.tipo === 'obligatorio') {
        res.locals.alert = obligatorioLogin;
        res.render('login');
    } else {
        // si no hizo el post
        res.render('login');
    }
}
function redireccionarIndex(req, res, sesiones, rol, menuRol){
    // cancelar o cerrar sesion
    res.render('index', {sesiones, rol, menu: menuRol});
}
function redireccionarOTP(req, res, sesiones, procesoOTP, datosRecibidos){
    // toda la logica de las ventanas emergentes
    let envioOtp = {
        alert: true,
        alertTitle: 'Se ha Enviado con Éxito',
        alertMessage: '¡Se ha Enviado el Correo a tu Casilla de E-Mail con Éxito!',
        type: 'exito',
        timer: 1500,
    }
    let problemaEnvio = {
        alert: true,
        alertTitle: 'No se ha Enviado el Código',
        alertMessage: 'No se ha podido Enviar el Correo a tu Casilla de E-Mail.\nPor favor, intente de nuevo más tarde.',
        type: 'error',
    }
    // si hizo el post tal cosa
    if (datosRecibidos.tipo === 'exito') {
        res.locals.alert = envioOtp;
        res.render('otp', {sesiones, procesoOTP});
    } else if (datosRecibidos.tipo === 'error') {
        res.locals.alert = problemaEnvio;
        res.render('otp', {sesiones, procesoOTP});
    } else {
        // si no hizo el post
        res.render('otp', {sesiones, procesoOTP});
    }
}
module.exports = {
    login: redireccionarLogin,
    index: redireccionarIndex,
    otp: redireccionarOTP
}