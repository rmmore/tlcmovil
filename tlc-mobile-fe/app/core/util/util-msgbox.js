/*
 * Functions de validacion usando libreria Jquery Msgbox
 *
 * Capa de Componentes
 * 
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 */
'use strict';


/*
 * Function que muestra modal de alerta
 * @parm titulo     : Titulo que mostrara el modal
 *       contenido  : Mensaje de validacion
 *       tipo       : Tipo de mensaje (alert)
 *       accion     : Funciona para controlar las acciones
 */
function showAlertMessage(titulo, contenido, tipo, accion) {
    $.msgBox({
        title: titulo,
        content: contenido,
        type: tipo,
        success: accion
    });
}

/*
 * Function que muestra modal de alerta
 * @parm titulo     : Titulo que mostrara el modal
 *       contenido  : Mensaje de validacion
 *       tipo       : Tipo de mensaje (alert)
 *       botones    : Lista con los botones
 *       accion     : Funciona para controlar las acciones
 */
function showConfirmMessage(titulo, contenido, tipo, botones, accion) {
    $.msgBox({
        title: titulo,
        content: contenido,
        type: tipo,
        buttons: botones,
        success: accion
    });
}