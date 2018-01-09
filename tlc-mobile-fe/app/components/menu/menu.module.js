/**
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 */

(function(angular) {	
	'use strict';

	angular.module('component.menu', [
		'menu.controller',
		'menu.services',
		'menu.factory',
		'menu.directives',
		
		'component.menu-mobile',
		'component.menu-basic',
		'component.menu-profile'
	]);
		
}(angular));