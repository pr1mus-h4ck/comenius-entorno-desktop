function redireccionarLogin(req, res, datosRecibidos) {
    // Toda la lógica de las ventanas emergentes
    // Mensaje de Alerta cuando el Incio de Sesión es correcta
    let iniciarSesion = {
        alert: true,
        alertTitle: 'Autenticación exitosa',
        alertMessage: '¡Haz iniciado sesión correctamente!',
        type: 'exito',
    }
    // Mensaje de Alerta cuando unos de los input, cuyo valor es incorrecta
    let avisoIntentos = {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Correo y/o Contraseña son incorrecto. Te quedan '+datosRecibidos.intentos+' intentos.',
        type: 'aviso',
    }
    // Mensaje de Alerta cuando se llegó al límite de intentos de Inicio de Sesión
    let limiteAlcanzado = {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Alcanzaste el límite',
        type: 'error',
    }
    // Mensaje de Alerta cuando se intenta Iniciar la Sesión sin ingresar algún valor a los input
    let obligatorioLogin = {
        alert: true,
        alertTitle: 'Campos Obligatorios',
        alertMessage: 'Todos los campos del formulario son obligatorios',
        type: 'obligatorio',
    }
    // Mensaje de Alerta cuando la Sesión del Usuario fue Finalizada
    let cerrarSesion = {
        alert: true,
        alertTitle: 'Sesión Finalizada',
        alertMessage: '¡Se ha Finalizado la Sesión con Éxito!',
        type: 'exito',
    }
    // Fin de Toda la lógica de las ventanas emergentes
    // Lógica de Renderización
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
    } else if (datosRecibidos.tipo === 'cerrarSesion') {
        res.locals.alert = cerrarSesion;
        res.render('login');
    } else {
        // Si no hay 'datosRecibidos.tipo', renderizar siempre a Login
        res.render('login');
    }
    // Fin de Lógica de Renderización
}
function redireccionarIndex(req, res, sesiones, menuRol) {
    // Renderizar a Index
    res.render('index', {sesiones, menu: menuRol});
}
function redireccionarOTP(req, res, sesiones, procesoOTP, datosRecibidos) {
    // Toda la lógica de las ventanas emergentes
    // Mensaje de Alerta cuando el Envio del Código OTP fue un éxito
    let envioOtp = {
        alert: true,
        alertTitle: 'Se ha Enviado con Éxito',
        alertMessage: '¡Se ha Enviado el Correo a tu Casilla de E-Mail con Éxito!',
        type: 'exito',
    }
    // Mensaje de Alerta cuando hubo algún problema con el Envio del Código OTP al usuario
    let problemaEnvio = {
        alert: true,
        alertTitle: 'No se ha Enviado el Código',
        alertMessage: 'No se ha podido Enviar el Correo a tu Casilla de E-Mail. Por favor, intente de nuevo más tarde.',
        type: 'error',
    }
    // Mensaje de Alerta cuando la Confirmación del Código OTP enviado al usario fue un éxito
    let confirmarOtp = {
        alert: true,
        alertTitle: 'Se ha Confirmado con Éxito',
        alertMessage: '¡Se ha Confirmado el Código que se te proporcionó a tu Casilla de E-Mail con Éxito!',
        type: 'exito',
    }
    // Mensaje de Alerta cuando unos de los input, cuyo valor es incorrecta
    let avisoIntentosOtp = {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'El Código ingresado es incorrecto. Te quedan '+datosRecibidos.intentos+' intentos.',
        type: 'aviso',
    }
    // Mensaje de Alerta cuando se llegó al límite de intentos para Confirmar el Código OTP enviado al usuario
    let sinConfirmarOtp = {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Alcanzaste el límite',
        type: 'error',
    }
    // Mensaje de Alerta cuando se intenta Confirmar Código OTP sin ingresar algún valor a los input
    let obligatorioOtp = {
        alert: true,
        alertTitle: 'Campos Obligatorios',
        alertMessage: 'Todos los campos son obligatorios',
        type: 'obligatorio',
    }
    // Fin de Toda la lógica de las ventanas emergentes
    // Lógica de Renderización
    if  (datosRecibidos.tipo === 'exitoEnvio') {
        res.locals.alert = envioOtp;
        res.render('otp', {sesiones, procesoOTP});
    } else if (datosRecibidos.tipo === 'errorEnvio') {
        res.locals.alert = problemaEnvio;
        res.render('otp', {sesiones, procesoOTP});
    } else if (datosRecibidos.tipo === 'exitoConfirmar') {
        res.locals.alert = confirmarOtp;
        res.render('otp', {sesiones, procesoOTP});
    } else if (datosRecibidos.tipo === 'aviso') {
        res.locals.alert = avisoIntentosOtp;
        res.render('otp', {sesiones, procesoOTP});
    } else if (datosRecibidos.tipo === 'errorConfirmar') {
        res.locals.alert = sinConfirmarOtp;
        res.render('otp', {sesiones, procesoOTP});
    } else if (datosRecibidos.tipo === 'obligatorio') {
        res.locals.alert = obligatorioOtp;
        res.render('otp', {sesiones, procesoOTP});
    } else {
        // Si no hay 'datosRecibidos.tipo', renderizar siempre a OTP
        res.render('otp', {sesiones, procesoOTP});
    }
    // Fin de Lógica de Renderización
}
// Exporto como módulos estas tres funciones de renderización
module.exports = {
    login: redireccionarLogin,
    index: redireccionarIndex,
    otp: redireccionarOTP
}