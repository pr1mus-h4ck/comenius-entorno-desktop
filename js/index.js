const formularioLogin = document.getElementById('formLogin');
formularioLogin.addEventListener('submit', (event) => {
    // Evitar el comportamiento de envío de formulario predeterminado
    event.preventDefault();
    // Guardo los valores del formulario en variables
    let loginCorreo = document.getElementById('correo');
    let loginContrasena = document.getElementById('contrasena');
    // Si ambos campos están vacíos
    if (!loginCorreo.value && !loginContrasena.value) {
        // Muestra un alert con un mensaje
        alert('Todos los campos son obligatorios');
    // Si ambos campos tienen valores
    } else if (loginCorreo.value && loginContrasena.value) {
        // Creo un objeto con los valores del formulario
        let iniciar = {
            loginCorreo : loginCorreo.value,
            loginContrasena: loginContrasena.value
        }
        // Convierto el objeto en un JSON
        let iniciarJson = JSON.stringify(iniciar);
        // Envío en método POST al servidor con los datos del JSON
        console.log(iniciarJson);
        fetch('http://localhost:3000/login', {
            method: 'Post',
            body: iniciarJson
        })
    }
})
