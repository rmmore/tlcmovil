/*
 * Function que retornara los mensajes de error 
 * definidos por el servicio rest.
 *
 * Capa de Componentes
 * 
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 */
'use strict';

/**
 * Obtiene el mensaje de error según un código
 */
function getErrorMessages(error) {
	var values = [
		{ errorcode: 'ESC001', errormessage: 'Error interno, intentelo de nuevo.' },
		{ errorcode: 'ESC002', errormessage: 'En estos momentos la información solicitada no está disponible.' },
		{ errorcode: 'ESC003', errormessage: 'Error interno, intentelo de nuevo.' },
		{ errorcode: 'ES0001', errormessage: 'Error en la validaciones previas para ejecutar el cambio de clave.' }, 
		{ errorcode: 'ESKB01', errormessage: 'Error interno, intentelo de nuevo.' },
		{ errorcode: 'NS0000', errormessage: 'Operación Satisfactoria.' },
		{ errorcode: 'NS000A', errormessage: 'Número de Tarjeta no existe.' },
		{ errorcode: 'NS000C', errormessage: 'Número de Tarjeta no existe.' },
		{ errorcode: 'NS000D', errormessage: 'Su tarjeta se encuentra vencida.' },
		{ errorcode: 'NS000E', errormessage: 'Tu tarjeta se encuentra bloqueada. Por favor, acércate a nuestras agencias para solicitar una nueva.' },
		{ errorcode: 'NS000F', errormessage: 'Te has equivocado 3 veces al ingresar tu clave. Para tu seguridad, el acceso a Banca por Internet quedará bloqueado por el resto del día. Intenta nuevamente mañana.' },
		{ errorcode: 'NS000G', errormessage: 'Tarjeta sin asignar.' },
		{ errorcode: 'NS000H', errormessage: 'Su tarjeta se encuentra en tramite.' },
		{ errorcode: 'NS000H', errormessage: 'Clave de 6 ya se encuentra activada.' },
		{ errorcode: 'NS000J', errormessage: 'Clave de 6 dígitos no ha sido generada.' },
		{ errorcode: 'NS000K', errormessage: 'La clave que has ingresado es incorrecta. Por favor, vuelve a intentarlo.' },
		{ errorcode: 'NS000N', errormessage: 'La clave que has ingresado es incorrecta. Por favor, vuelve a intentarlo.' },
		{ errorcode: 'NS000L', errormessage: 'Tu tarjeta se encuentra bloqueada. Por favor, acércate a nuestras agencias para solicitar una nueva.' },
		{ errorcode: 'NS0899', errormessage: 'Error interno, intentelo de nuevo.' } 
    ];

    for(var i = 0; i < values.length; i++) {
        if(values[i].errorcode == error) {
            return values[i].errormessage;
        }
    }

    return null;
}