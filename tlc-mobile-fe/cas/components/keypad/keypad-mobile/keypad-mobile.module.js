/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('component.keypad-mobile', [
			'keypad-mobile.directive',
			'keypad-mobile.controller',
			'keypad-mobile-input.directive',
			'keypad-mobile-input.controller',
			'keypad-mobile-partial.directive',
			'keypad-mobile-key.directive',
			'keypad-mobile.factory',
			'keypad-mobile.service'
		]);
	
}(angular));


