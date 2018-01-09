/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('menu.factory', [])
		.factory('$menu', $menu);

    function $menu(){
		
		var services = {
			reloadMenu: reloadMenu
		};
		
		return services;
		
		////////////
		
		function reloadMenu() {
			// Implementado en MenuController
			// Se ejecuta para recargar los información del menu
		}
		
	}

}(angular));