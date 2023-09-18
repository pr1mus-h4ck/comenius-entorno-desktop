//investigar el tiempo de inactividad del usuario y mandarlo al login o cerrar sesion 
//de forma automatica
//diferenciar inactividad del menu con la de la videollamada

// FUNCIÓN que establece la cookie
function setCookie(nombre, valor, diasExpiracion) {
    const fechaExpiracion = new Date();
    fechaExpiracion.setDate(fechaExpiracion.getDate() + diasExpiracion);
    const valorCodificado = encodeURIComponent(valor);
    document.cookie = `${nombre}=${valorCodificado}; expires=${fechaExpiracion.toUTCString()}; path=/`;
}

// FUNCIÓN para obtener el valor de una COOKIE 
function getCookie(nombre) {
    const nombreCodificado = encodeURIComponent(nombre);
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieNombre, cookieValor] = cookie.trim().split('=');
        if (cookieNombre === nombreCodificado) {
            return decodeURIComponent(cookieValor);
        }
    }
    return null;
}

//VERIFICA que ya existe una cookie de sesión válida al cargar 
window.onload = function () {
    const usuarioGuardado = getCookie('usuario');

    if (usuarioGuardado) {
        alert(`Bienvendido de nuevo, ${usuarioGuardado}`);
    }
};

//EJEMPLO función
function inicioSesion() {
    const email = document.getElementById('email').value;
    setCookie('usuario', email, 30); //COOKIE expira en 30 días
    alert('Inicio de sesión exitoso. Se ha guardado la sesión');
}