/**
 * Capa de Interceptores
 *
 * Esta clase maneja los tokens provenientes de ambos
 * lados, backend o frontend. Interviene en todos los 
 * request hacia el backend seteando valores, objetos
 * y tokens que sean requeridos por el backend.
 *
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('core.request.interceptor', [])
		.factory('requestInterceptor', requestInterceptor);
		
	requestInterceptor.$inject = [
		'$q',
		'$coreConstants',
		'$storageService'
	];
		
	function requestInterceptor(
		$q,
		$coreConstants,
		$storageService
	) {
		
		return {

			request: function(config) {

				if(!/(.html|.json)$/.test(config.url)) { // No ingresa cuando es un template
					
					var casToken 	= $storageService.getCasToken(),
						authToken 	= $storageService.getAuthToken(),
						keypadToken = $storageService.getKeypad();
					
					config.headers[$coreConstants.HEADER.CAS_TOKEN] = casToken;
					config.headers[$coreConstants.HEADER.AUTH_TOKEN] = authToken;

					// Validar token del keypad
					if (keypadToken) {
						config.headers[$coreConstants.HEADER.KEYPAD_TOKEN] = keypadToken;
					}
					
					/**
					 * Settear el CSRF-TOKEN creado en el core/util/util-pojo
					 * Esto se hace para que en el request siguiente que se haga
					 * de la aplicación angular, se envie exactamente el CSRF-TOKEN
					 * que se ha creado en el run del app.js, y de alguna manera se
					 * evite el CORS.
					 */
				
					config.headers[$coreConstants.HEADER.X_CSRF_TOKEN] = $storageService.getCSRFToken();
				}
				
				return config || $q.when(config);
			}

		};
	}

}(angular));
