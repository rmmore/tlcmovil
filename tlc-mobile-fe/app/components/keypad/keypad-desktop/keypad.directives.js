/**
 * Capa de Directivas.
 * 
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 */
'use strict';

angular.module('keypad.directives', [])

	/**
	 * Componente Keypad o teclado virtual.
     */
	.directive('keypad', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/keypad/keypad-desktop/keypad.html'
		}
	})