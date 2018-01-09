/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('component.keypad', [
			'component.keypad-mobile',
			'component.keypad-desktop'
		]);
	
}(angular));


