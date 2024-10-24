const { path } = require('./config');
const render = require('./redireccion');
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
    // Guardar la cookie de nombre
    objeto.nombre =  cookies.get('nombre');
    // Guardar la cookie de verificacion
    objeto.verificacionOTP = cookies.get('verificacion');
    // Guardar la cookie de correo
    objeto.correoOTP =  cookies.get('correo');
    // Guardar la cookie de rol
    objeto.rol =  cookies.get('rol');
    // Guardar la cookie de item
    objeto.item =  cookies.get('item');
    // Guardar la cookie de item
    objeto.id =  cookies.get('id');
    // Guardar la cookie de item
    objeto.password =  cookies.get('password');
    // Guardar la cookie de item
    objeto.zoomFirma =  cookies.get('zoomFirma');
    // Guardar la cookie de item
    objeto.clientId =  cookies.get('clientId');
    // Guardar la cookie de item
    objeto.publicacion =  cookies.get('publicacion');
    // Guardar la cookie de item
    objeto.publicacion =  cookies.get('comentario');
    return objeto;
}
function eliminarCookies(cookies) {
    // Eliminar la cookie de la ID del usuario
    cookies.remove('usuarioID', { path: '/' });
    // Eliminar la cookie de la ID de la sesión
    cookies.remove('sessionID', { path: '/' });
    cookies.remove('nombre', { path: '/' });
    // Eliminar la cookie de si se requiere OTP o no
    cookies.remove('verificacion', { path: '/' });
    // Eliminar la cookie de correo encriptado
    cookies.remove('correo', { path: '/' });
    // Eliminar la cookie de rol del usuario
    cookies.remove('rol', { path: '/' });
    // Eliminar la cookie de item de menú del usuario
    cookies.remove('item', {path: '/' });
    // Eliminar la cookie de item de menú del usuario
    cookies.remove('id', {path: '/' });
    // Eliminar la cookie de item de menú del usuario
    cookies.remove('password', {path: '/' })
    // Eliminar la cookie de item de menú del usuario
    cookies.remove('zoomFirma', {path: '/' });
    // Eliminar la cookie de item de menú del usuario
    cookies.remove('clientId', {path: '/' });
    // Eliminar la cookie de item de menú del usuario
    cookies.remove('publicacion', {path: '/' });
    // Eliminar la cookie de item de menú del usuario
    cookies.remove('comentario', {path: '/' });
}
module.exports = {
    setCookies: setCookies,
    getCookies: getCookies,
    eliminarCookies: eliminarCookies,
    login: render.login,
    index: render.index,
    otp: render.otp
}