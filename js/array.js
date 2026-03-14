// Array de 6 input para la validación del Código OTP enviado al usuario
const inputNombres = ['input2', 'input3', 'input4', 'input5', 'input6'];
// Array del menú de la interfaz de la app con sus respectivos roles
const menuRol = {
    alumno: [
        { image: './recursos/img/icon-inicio-black.svg', label: 'Inicio' },
    ],
    instructor: [
        { image: './recursos/img/icon-inicio-black.svg', label: 'Inicio' },
    ],
}
// Array del menú de la interfaz de la app con sus respectivos roles en la sección de las comisiones
const menuMateria = {
    alumno: [
        { image: './recursos/img/icon-portada-black.svg', label: 'Portada' },
        { image: './recursos/img/icon-panel-clase-black.svg', label: 'Panel de Clase' },
        { image: './recursos/img/icon-trabajos-black.svg', label: 'Trabajos' },
    ],
    instructor: [
        { image: './recursos/img/icon-portada-black.svg', label: 'Portada' },
        { image: './recursos/img/icon-panel-clase-black.svg', label: 'Panel de Clase' },
        { image: './recursos/img/icon-trabajos-black.svg', label: 'Trabajos' },
    ],
}
// Exporto como módulos estos arrays
module.exports = {
    inputNombres: inputNombres,
    menuRol: menuRol,
    menuMateria: menuMateria,
}