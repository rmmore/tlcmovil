/**
 * 
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 */
'use strict';

/**
 * Clase RequestWrapper
 * @constructor
 *
 * @param classT
 * @param deviceRequestRSA
 */
function RequestWrapper(classT, deviceRequestRSA) {
    this.request = classT;
    this.rsaData = deviceRequestRSA;
}

/**
 * Clase TraceLog
 * @constructor
 *
 * @param {String} numberCard - Numero de tarjeta.
 * @param {String} passwordOldCard - Password Actual.
 * @param {String} passwordNewCard - Nuevo Password.
 * @param {String} passwordNewConfirmCard - Confirmacion Password.
 *
 */
function TraceLog(numberCard,passwordOldCard,passwordNewCard,passwordNewConfirmCard) {
	this.numberCard = numberCard;
    this.passwordOldCard = passwordOldCard;
    this.passwordNewCard = passwordNewCard;
    this.passwordNewConfirmCard = passwordNewConfirmCard;
}