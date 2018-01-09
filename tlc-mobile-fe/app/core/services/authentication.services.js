/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */

(function(angular) {
    'use strict';
	
	angular
		.module('core.authentication.services', [])
		.factory('$authenticationService', $authenticationService);

    $authenticationService.$inject = [
		'$storageService',
		'$location',
		'$casService',
		'$http',
		'$unloadService',
		'$loginService',
		'$coreConstants'
	];

    function $authenticationService(
		$storageService,
		$location,
		$casService,
		$http,
		$unloadService,
		$loginService,
		$coreConstants
	){
		
		var service = {
			validate: validate
		};
		
		return service;
		
		////////////

		function validate() {
						
			var casServiceTicket = $storageService.getServiceTicket();		
				
			// Verifica si existe un ST para validar
			if(casServiceTicket) {
				
				// Borra el atributo ?ticket= de la url
				$location.search('ticket', null);
				
				var validation = $casService.validate(casServiceTicket);

				if(validation) {
					// En este punto se considera que el usuario esta autenticado
					// Se almacena en el sessionStorage la marca de autenticación
					$storageService.setAuthenticated(true);	
				}
			}

			var casToken = $storageService.getCasToken(),
				authToken = $storageService.getAuthToken(),
				isAuthenticated = $storageService.isAuthenticated();
			
			// Si no esta autenticado redirecciona al login
			if(	!$coreConstants.APP_MOCK && 
				(!isAuthenticated || !casToken || !authToken)) {
				
				$loginService.login();
				
				// Excepción para detener la ejecución de la aplicación
				throw 'No autenticado';
			}

			/**
			 * Importante: La implementación del token CSRF-TOKEN se encuentra en
			 * core/util/util-pojo
			 * Se ha puesto ahí para tener un CSRF generado en la inicialización
			 * total de la aplicación y no en un .run, ya que este bloque se ejecuta
			 * despues de un .config y en ocasiones hay servicios que son requeridos
			 * desde un .config como por ejemplo el "angular Translate"
			 */

			$http.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
			$http.defaults.xsrfCookieName = 'CSRF-TOKEN';

			// Llama a funcion de eliminacion de beforeUnload
			$unloadService.registerBeforeUnload();
		} 		
	}

}(angular));