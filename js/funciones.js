const { path } = require('./config');
const render = require('./redireccion');
function setCookies(paquete, cookies) {
    // Crear la cookie de la ID del usuario
    cookies.set('usuarioID', paquete.usuarioID, { path: '/' });
    // Crear la cookie de la ID  de la sesión
    cookies.set('sessionID', paquete.sessionID, { path: '/' });
    // Crear la cookie de si se requiere OTP o no
    cookies.set('verificacion', paquete.verificacion, { path: '/' });
    // Crear la cookie de correo encriptado
    cookies.set('correo', paquete.correo, { path: '/' });
    return paquete;
}
function getCookies(objeto, cookies) {
    // Guardar la cookie de usuarioID
    objeto.usuariosID = cookies.get('usuarioID');
    // Guardar la cookie de sessionID
    objeto.sessionsID = cookies.get('sessionID');
    // Guardar la cookie de nombre
    objeto.nombre = cookies.get('nombre');
    // Guardar la cookie de otp
    objeto.otp = cookies.get('otp')
    // Guardar la cookie de verificacion
    objeto.verificacionOTP = cookies.get('verificacion');
    // Guardar la cookie de correo
    objeto.correoOTP = cookies.get('correo');
    // Guardar la cookie de rol
    objeto.rol = cookies.get('rol');
    // Guardar la cookie de item
    objeto.item = cookies.get('item');
    // Guardar la cookie de comision
    objeto.comision = cookies.get('comision');
    // Guardar la cookie de comisionID
    objeto.comisionID = cookies.get('comisionID');
    // Guardar la cookie de enlace
    objeto.enlace = cookies.get('enlace');
    // Guardar la cookie de trabajo
    objeto.trabajo = cookies.get('trabajo')
    // Guardar la cookie de instructorID
    objeto.instructorID = cookies.get('instructorID');
    // Guardar la cookie de listaAlumno
    objeto.listaAlumno = cookies.get('listaAlumno');
    return objeto;
}
function eliminarCookies(cookies) {
    // Eliminar la cookie de la ID del usuario
    cookies.remove('usuarioID', { path: '/' });
    // Eliminar la cookie de la ID de la sesión
    cookies.remove('sessionID', { path: '/' });
    // Eliminar la cookie de nombre
    cookies.remove('nombre', { path: '/' });
    // Eliminar la cookie de otp
    cookies.remove('otp', { path: '/' });
    // Eliminar la cookie de si se requiere OTP o no
    cookies.remove('verificacion', { path: '/' });
    // Eliminar la cookie de correo encriptado
    cookies.remove('correo', { path: '/' });
    // Eliminar la cookie de rol del usuario
    cookies.remove('rol', { path: '/' });
    // Eliminar la cookie de item de menú del usuario
    cookies.remove('item', { path: '/' });
    // Eliminar la cookie de comision
    cookies.remove('comision', { path: '/' });
    // Eliminar la cookie de enlace, secciones de la comison
    cookies.remove('enlace', { path: '/' });
    // Eliminar la cookie de trabajo, seccion de la publicación hecha por el instructor
    cookies.remove('trabajo', { path: '/' });
    // Eliminar la cookie de instructorID, id de la Tabla Instructor en la BBDD del usuario
    cookies.remove('instructorID', { path: '/' });
    // Eliminar la cookie de 'listaAlumno'
    cookies.remove('listaAlumno', { path: '/' });
}
module.exports = {
    setCookies: setCookies,
    getCookies: getCookies,
    eliminarCookies: eliminarCookies,
    login: render.login,
    index: render.index,
    otp: render.otp
}