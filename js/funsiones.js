function setCookies (paquete, cookies ) {
    // Crear la cookie de la ID del usuario
    cookies.set('usuarioID', paquete.usuarioID, {path: '/' });
    // Crear la cookie de la ID  de la sesión
    cookies.set('sessionID', paquete.sessionID, {path: '/' });
    // Crear la cookie de si se requiere OTP o no
    cookies.set('verificacion', paquete.verificacion, {path: '/' });
    // Crear la cookie de correo encriptado
    cookies.set('correo', paquete.correo, {path: '/'});
    return paquete;
}
function getCookies (objeto, cookies) {
    // Guardar la cookie de usuarioID
    objeto.usuariosID = cookies.get('usuarioID');
    // Guardar la cookie de sessionID
    objeto.sessionsID = cookies.get('sessionID');
    // Guardar la cookie de verificacion
    objeto.verificacionOTP = cookies.get('verificacion');
    // Guardar la cookie de correo
    objeto.correoOTP =  cookies.get("correo");
    return objeto;
}
module.exports = {
    setCookies: setCookies,
    getCookies: getCookies   
}