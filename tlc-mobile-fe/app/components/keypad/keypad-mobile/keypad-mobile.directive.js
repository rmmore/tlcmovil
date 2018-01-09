/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('keypad-mobile.directive', [])
		.directive('keypadMobile', keypadMobile);	
		
	function keypadMobile() {
		return{
			restrict: 'E',
			templateUrl: 'components/keypad/keypad-mobile/keypad-mobile.html',
			controller: 'KeypadMobileController',
			controllerAs: 'keypadMobileVM'
		};
	}
	
}(angular));