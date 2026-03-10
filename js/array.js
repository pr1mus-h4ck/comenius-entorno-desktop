// Array de 6 input para la validación del Código OTP enviado al usuario
const inputNombres = ['input2', 'input3', 'input4', 'input5', 'input6'];
// Array del menú de la interfaz de la app con sus respectivos roles
const menuRol = {
    alumno: [
        { image: './recursos/img/icon-navbar2.svg', label: 'Inicio' },
    ],
    instructor: [
        { image: './recursos/img/icon-navbar2.svg', label: 'Inicio' },
    ],
}
// Array del menú de la interfaz de la app con sus respectivos roles en la sección de las comisiones
const menuMateria = {
    alumno: ['portada', 'panel_de_clase', 'trabajos'],
    instructor: ['portada', 'panel_de_clase', 'trabajos'],
};
// Exporto como módulos estos arrays
module.exports = {
    inputNombres: inputNombres,
    menuRol: menuRol,
    menuMateria: menuMateria,
}