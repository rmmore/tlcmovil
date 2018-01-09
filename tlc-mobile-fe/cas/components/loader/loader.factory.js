/**
 * Esta clase permite comunicar controladores
 *
 * @author Ricardo Rosales (rrosalem@everis.com)
 *
 */

(function(angular) {
    'use strict';
	
	angular.module('component.loader.factory', [])
    .factory('$loader', $loader);

    $loader.$inject = [];

    function $loader(){
		
		// Metodos implementados en loader directive
		var services  = {
			
			// Executado desde los controladores de las vistas para poner un mensaje en el spinner
			setMessage: null,
			
			// Executado desde los controladores de las vistas para mostrar el spinner
			showLoader: null,
			
			// Executado desde los controladores de las vistas para ocultar el spinner
			hideLoader: null,
			
			// Executado desde los controladores de las vistas para indicar que el loder no se oculte automaticamente
			noAutoHide: null
		};	
		
		return services; 
	}

}(angular));