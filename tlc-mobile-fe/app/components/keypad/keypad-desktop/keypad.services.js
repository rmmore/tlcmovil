/**
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 * 
*/
'use strict';

angular.module('keypad.service', [])

	/**
     * Método para obtener datos necesarios para
	 * la construcción del teclado virtual.
	 */
	.factory('$keypadService', 
		['$http', 
		'$q',
		'$storageService',
		'$coreConstants',
        function ($http, $q, $storageService, $coreConstants) {

			/**
			 * Método para el proceso de retrieve de datos.
			 */
			function all() { 
				
				var deferred = $q.defer();
				var promise = deferred.promise;
				
				// Remover token por motivos de seguridad.
				sessionStorage.removeItem('X_TOKEN_KEYBOARD_ENCRIPTED');

				/**
				 * Http Request hacia el servicio de keypad.
				 *
				 * @param {String} method - Método de envio.
				 * @param {String} url - Enlace hacia el rest. 
				 */
				$http({
					method: 'POST',
					url : $coreConstants.URL_GET_KEYBOARD			       
								
               	}).success(function (data, status, headers, config) {
                	
                	// Valida si el token es devuelto por la transacción.
					if(headers('X_TOKEN_KEYBOARD_ENCRIPTED')) {
						// Guarda token de keypad en session storage.
						$storageService.setKeypad(headers('X_TOKEN_KEYBOARD_ENCRIPTED'));
					}

                	// Agregación resultados a objecto para promesa.
					var objectResult = {
						"data": data,
						"status": status,
						"headers": headers,
						"config": config 
					}

					/**
					 * Este metodo se usa para indicar que se
            		 * ha obtenido la información
            		 *
            		 * @param {object} objectResult - Objeto
            		 */
					deferred.resolve(objectResult);

               	}).error(function (data, status, headers, config) {

               		// Agregación resultados a objecto para promesa.
					var objectResult = {
						"data": data,
						"status": status,
						"headers": headers,
						"config": config 
					}

					/**
					 * Este metodo se usa para indicar que se
            		 * ha obtenido la información
            		 *
            		 * @param {object} objectResult - Objeto
            		 */
					deferred.reject(objectResult);

               	});
				return promise;
			}			

			// Retorno o registro de los métodos.
			return {
				all: all
			};

		}]);