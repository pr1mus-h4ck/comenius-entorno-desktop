// Crear la constante 'inputFields' y la inicializamos con un array que contemga los nombres de los campos de entrada para asignar a la constante 'inputs'
const inputNombres = ['input2', 'input3', 'input4', 'input5', 'input6'];
const menuRol = {
    alumno: ['inicio', 'panel_materias', 'contactos', 'calendario', 'notificaciones'],
    instructor: ['inicio', 'panel_materias', 'contactos', 'calendario', 'notificaciones'],
    usuario_especial: ['inicio'],
    admin: ['inicio', 'reporte', 'bandeja_reporte', 'dashboard', 'calendario'],
};
module.exports = {
    inputNombres: inputNombres,
    menuRol: menuRol
}