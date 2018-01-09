/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('keypad-mobile.factory', [])
		.factory('$keypadMobile', $keypadMobile);	
	
	function $keypadMobile() {

		var service = {
			clear: clear,
			onClose: onClose,
			onDone: onDone,
			open: open,
			setMaxLength: setMaxLength,
			setModelValue: setModelValue,
			setValue: setValue,
			keyPressed: keyPressed
		};

		return service;
		
		////////////		

		function clear() {
			// implementado en controlador KeypadMobileController
		}	
		
		function onClose() {
			// implementado en directiva keyboardNumericInput
		}
		
		function onDone() {
			// implementado en directiva keyboardNumericInput
		}
		
		function open() {
			// implementado en controlador KeypadMobileController
		}
		
		function setMaxLength() {
			// implementado en controlador KeypadMobileController
		}
		
		function setModelValue() {
			// implementado en directiva keyboardNumericInput
		}
		
		function setValue() {
			// implementado en directiva KeypadMobileController
		}
		
		function keyPressed() {
			// implementado en controlador KeypadMobileController
		}	
	}

}(angular));
    

    