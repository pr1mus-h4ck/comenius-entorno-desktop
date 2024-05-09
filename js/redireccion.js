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
function redireccionarOTP(req, res, sesiones, procesoOTP){
    // cancelar y siguiente
    res.render('otp', {sesiones, procesoOTP});
}
module.exports = {
    login: redireccionarLogin,
    index: redireccionarIndex,
    otp: redireccionarOTP
}