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
        .then(recibir => recibir.json())
        .then(recibido => {
            if (recibido[0] !== '') {
                // alert(recibido[0]);
                if (recibido[0] === 'Desactivado'){
                    Swal.fire({
                        title: 'Sesión Autenticado',
                        text: '¡Haz iniciado sesión exitosamente!',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(redireccionar => {
                        window.location = 'app/index.html'
                    })
                } else {
                    Swal.fire({
                        title: 'Sesión Autenticado',
                        text: '¡Haz iniciado sesión exitosamente!',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(redireccionar => {
                        window.location = 'otp.html'
                    })
                }
            } else if (recibido[1] !== '') {
                // alert(recibido[1]);
                Swal.fire({
                    title: 'Advertencia',
                    icon: 'warning',
                    text: recibido[1]
                })
            } else if (recibido[2] !== '') {
                // alert(recibido[2]);
                Swal.fire({
                    title: 'Atención',
                    icon: 'error',
                    showConfirmButton: false,
                    text: recibido[2]
                })
            }
        })
    // sino
    } else {
        // Muestra un sweetalert2 con un mensaje de atención
        Swal.fire({
            title: 'Atención',
            icon: 'error',
            // timer: 1500,
            text: 'Todos los campos son obligatorios'
        })
    }
});