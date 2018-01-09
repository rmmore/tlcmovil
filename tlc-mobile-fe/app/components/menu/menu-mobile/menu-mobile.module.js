/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 */

(function(angular) {	
	'use strict';

	angular.module('component.menu-mobile', [
		'menu-mobile.controller',
		'menu-toggle.controller',
		'menu-mobile.services',
		'menu-mobile.directives',
		'component.menu-mobile-items'
	]);
		
}(angular));