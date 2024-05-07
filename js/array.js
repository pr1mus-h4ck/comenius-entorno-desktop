// Crear la constante 'inputFields' y la inicializamos con un array que contemga los nombres de los campos de entrada para asignar a la constante 'inputs'
const inputNombres = ['input2', 'input3', 'input4', 'input5', 'input6'];
const menuRol = {
    estudiante: ['materias', 'notificaciones', 'asistencia', 'clase_grabada'],
    instructor: ['materias', 'notificaciones', 'calificaciones'],
    usuario_especial: ['alumnos', 'catedra']
};
module.exports = {
    inputNombres: inputNombres,
    menuRol: menuRol
}