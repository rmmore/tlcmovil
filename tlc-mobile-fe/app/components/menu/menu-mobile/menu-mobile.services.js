/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('menu-mobile.services', [])
		.factory('$menuMobileService', $menuMobileService);

    $menuMobileService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $menuMobileService(
		$coreConstants,
		$promiseServices
	){
		
		var service = {			
			// Inicializa el menu mobile
			// Implementado en MenuMobileController
			init: null,
			
			// Asigna las operaciones pendientes y/o movimientos al menu mobile
			// Implementado en MenuMobileController
			showNroOperations: null,
			
			// Cierra las opciones del menu
			// Implementado en MenuMobileController
			closeMenuOptions: null,
			
			// Cierra los items del menu
			// Implementado en MenuMobileItemsController
			closeMenuItems: null,
			
			// Cierra el menu mobile cuando se cambia de pagina
			// Implementado en MenuToggleController
			closeMenu: blankFunction,
			
			// Abre el menu mobile cuando se desliza a la izquierda
			// Implementado en MenuToggleController
			openMenu: null,
			
			// Se ejecuta cuando se ha abierto el menu
			// Implementado en HomeController
			// Ejecutado desde MenuToggleController
			onOpenMenu: null
		};
		
		return service;	
		
		////////////
		
		function blankFunction() {}
	}

}(angular));