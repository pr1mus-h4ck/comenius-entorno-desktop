// Array de 6 input para la validación del Código OTP enviado al usuario
const inputNombres = ['input2', 'input3', 'input4', 'input5', 'input6'];
// Array del menú de la interfaz de la app con sus respectivos roles
const menuRol = {
    alumno: ['inicio', 'panel_materias', 'contactos', 'calendario', 'notificaciones'],
    instructor: ['inicio', 'panel_materias', 'contactos', 'calendario', 'notificaciones'],
    usuario_especial: ['inicio'],
    admin: ['inicio', 'reporte', 'bandeja_reporte', 'dashboard', 'calendario'],
};
// Exporto como módulos estos arrays
module.exports = {
    inputNombres: inputNombres,
    menuRol: menuRol
}