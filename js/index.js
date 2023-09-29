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
    // console.log('Hicieron un POST');
    // console.log(req.body);
    if (req.body[0] !== '') {
        if (req.body[0] === 'Desactivado') {
            console.log('Inicia al Index directo');
        } else {
            console.log('Ir a OTP');
        }
    } else if (req.body[1] !== '') {
        console.log(req.body[1]);
    } else if (req.body[2] !== '') {
        console.log(req.body[2]);
    }
});
app.listen(puerto, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});