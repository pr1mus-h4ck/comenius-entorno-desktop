const formularioLogin = document.getElementById('formLogin');

formularioLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    let loginCorreo = document.getElementById('correo').value;
    let loginContrasena = document.getElementById('contrasena').value;

    let iniciar = {
        loginCorreo : loginCorreo,
        loginContrasena: loginContrasena
    }
    let iniciarJson = JSON.stringify(iniciar);
    fetch('http://localhost:3000/login', {
        method: 'Post',
        body: iniciarJson
    })
})
