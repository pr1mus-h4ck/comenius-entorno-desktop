const express = require('express');
const app = express();
const puerto = 4000;
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    type: '*/*'
}));
app.post('/login', (req, res) => {
    // Compruebo si el primer elemento no está vacío
    if (req.body[0] !== '') {
        // Compruebo si el primer elemento está 'Desactivado'
        if (req.body[0] === 'Desactivado') {
            // Registro acceso directo al app/index.html
            console.log('Inicia al Index directo');
        } else {
            // Redireccionamiento a OTP
            console.log('Ir a OTP');
        }
    } else if (req.body[1] !== '') {
        // Registro el segundo elemento
        console.log(req.body[1]);
    } else if (req.body[2] !== '') {
        // Registro el tercer elemento
        console.log(req.body[2]);
    }
});
app.listen(puerto, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});