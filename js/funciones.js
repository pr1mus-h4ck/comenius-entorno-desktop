const {menuRol} = require('./array');
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
    // Crear la cookie de rol del usuario
    cookies.remove('rol', { path: '/' });
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
    // Guardar la cookie de rol
    objeto.rol = cookies.get("rol");
    return objeto;
}
function eliminarCookies(cookies) {
    // Eliminar la cookie de la ID del usuario
    cookies.remove('usuarioID', { path: '/' });
    // Eliminar la cookie de la ID de la sesión
    cookies.remove('sessionID', { path: '/' });
    // Eliminar la cookie de si se requiere OTP o no
    cookies.remove('verificacion', { path: '/' });
    // Eliminar la cookie de correo encriptado
    cookies.remove('correo', { path: '/' });
    // Eliminar la cookie de rol del usuario
    cookies.remove('rol', { path: '/' });
}
function generarMenu(rol, seccionSeleccionada) {
    let menu = '<ul>';
    const secciones = menuRol.find(item => item[0] === rol);
    if (secciones) {
        secciones[1].forEach(seccion => {
            menu += `<li><a href="/${seccion.toLowerCase()}">${input.find(item => item.toLowerCase() === seccion.toLowerCase())}</a></li>`;
        });
    }
    menu += '</ul>';
    let contenido = '';
    if (seccionSeleccionada && secciones[1].includes(seccionSeleccionada)) {
        contenido += `<% include ${seccionSeleccionada}.html %>`;
    }
    return { menu, contenido };
}
module.exports = {
    setCookies: setCookies,
    getCookies: getCookies,
    eliminarCookies: eliminarCookies,
    generarMenu: generarMenu,
    login: render.login,
    index: render.index,
    otp: render.otp
}