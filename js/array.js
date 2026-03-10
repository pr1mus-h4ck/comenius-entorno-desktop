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
const imagenTipo = {
    'aep': './recursos/img/type/text_line_aep.svg',
    'ai': './recursos/img/type/text_line_ai.svg',
    'avi': './recursos/img/type/text_line_avi.svg',
    'blend': './recursos/img/type/text_line_blend.svg',
    'c4d': './recursos/img/type/text_line_c4d.svg',
    'cdr': './recursos/img/type/text_line_cdr.svg',
    'css': './recursos/img/type/text_line_css.svg',
    'csv': './recursos/img/type/text_line_csv.svg',
    'dmg': './recursos/img/type/text_line_dmg.svg',
    'doc': './recursos/img/type/text_line_doc.svg',
    'exe': './recursos/img/type/text_line_exe.svg',
    'fig': './recursos/img/type/text_line_fig.svg',
    'gif': './recursos/img/type/text_line_gif.svg',
    'html': './recursos/img/type/text_line_html.svg',
    'ico': './recursos/img/type/text_line_ico.svg',
    'java': './recursos/img/type/text_line_java.svg',
    'jpeg': './recursos/img/type/text_line_jpeg.svg',
    'jpg': './recursos/img/type/text_line_jpg.svg',
    'js': './recursos/img/type/text_line_js.svg',
    'json': './recursos/img/type/text_line_json.svg',
    'mov': './recursos/img/type/text_line_mov.svg',
    'mp3': './recursos/img/type/text_line_mp3.svg',
    'mp4': './recursos/img/type/text_line_mp4.svg',
    'mpg': './recursos/img/type/text_line_mpg.svg',
    'pdf': './recursos/img/type/text_line_pdf.svg',
    'png': './recursos/img/type/text_line_png.svg',
    'ppt': './recursos/img/type/text_line_ppt.svg',
    'psd': './recursos/img/type/text_line_psd.svg',
    'rar': './recursos/img/type/text_line_rar.svg',
    'skt': './recursos/img/type/text_line_skt.svg',
    'svg': './recursos/img/type/text_line_svg.svg',
    'tiff': './recursos/img/type/text_line_tiff.svg',
    'txt': './recursos/img/type/text_line_txt.svg',
    'wav': './recursos/img/type/text_line_wav.svg',
    'webp': './recursos/img/type/text_line_webp.svg',
    'xls': './recursos/img/type/text_line_xls.svg',
    'zip': './recursos/img/type/text_line_zip.svg',
    'default': './recursos/img/type/text_line_txt.svg',
};
// Exporto como módulos estos arrays
module.exports = {
    inputNombres: inputNombres,
    menuRol: menuRol,
    menuMateria: menuMateria,
    imagenTipo: imagenTipo,
}