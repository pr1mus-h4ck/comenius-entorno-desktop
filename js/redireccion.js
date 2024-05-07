function redireccionarLogin(req, res){
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
        alertMessage: 'Correo y/o Contraseña son incorrecto. Te quedan '+res+' intentos.',
        type: 'aviso',
    }
    let limiteAlcanzado = {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Alcanzaste el límite',
        type: 'error',
    }
    // si hizo el post tal cosa
    if (iniciarSesion) {
        // funsion exito
    } if (avisoIntentos) {
        // funsion warning
    } else {
        // funcion error
    }
    // si no hizo el post nada
    res.render('login');
}
function redireccionarIndex(req, res, sesiones, rol, menuRol){
    // cancelar o cerrar sesion
    res.render('index', {sesiones,rol, menu: menuRol});
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