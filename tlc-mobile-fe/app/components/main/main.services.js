/**
 * 
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 *
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('main.service', [])
		.factory('$mainService', mainService);

    mainService.$inject = [
	];

    function mainService(
	){
		
		var service = {
			
			// Detecta cuando se cambia de pagina
			// Implementado en MainController
			locationChangeSuccess: null,
			
			// Redirige al path indicado
			// Implementado en MainController
			goPath: null,
			
			// Se ejecuta cuando para cargar el usuario logueado
			// Implementado en MainController
			// Ejecutado desde ContractController
			getLoggedUser: null,
			
			// Devuelve la instancia del MainController
			getInstance: null
			
		};
		
		return service;
	}

}(angular));