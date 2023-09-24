const formularioLogin = document.getElementById('formLogin');
formularioLogin.addEventListener('submit', (event) => {
    // Evitar el comportamiento de envío de formulario predeterminado
    event.preventDefault();
    // Guardo los valores del formulario en variables
    let loginCorreo = document.getElementById('correo');
    // TODO: Agregar validación del formato 'email'
    let loginContrasena = document.getElementById('contrasena');
    // Si ambos campos tienen valores
    if (loginCorreo.value && loginContrasena.value){
        // Creo un objeto con los valores del formulario
        let iniciar = {
            loginCorreo : loginCorreo.value,
            loginContrasena: loginContrasena.value
        }
        // Convierto el objeto en un JSON
        let iniciarJson = JSON.stringify(iniciar);
        // Envío en método POST al servidor con los datos del JSON
        fetch('http://localhost:3000/login', {
            method: 'Post',
            body: iniciarJson
        })
        .then(recibir => recibir.json()).then(alert);
        // Imprime en consola los valores ingresados en cada campo
        console.log(iniciarJson);
    // sino
    } else {
        // Muestra un alert con un mensaje
        alert('Todos los campos son obligatorios');
    }
});