/**
 * @author everis
 */
'use strict';

angular.module('cambiar-clave.view.services', [])

	/**
	 * Método para obtener datos necesarios para la 
	 * construcción del teclado virtual.
	 */
	.factory('$cambiarClaveService',
		['$http',
		'$q',
		'$coreConstants',
		function ($http, $q, $coreConstants) {

			/**
			 * Método para el proceso de retrieve de datos.
			 */
			function all(input) {

				// Variables para promesas del servicio.
				var deferred = $q.defer(),
				    promise = deferred.promise;

				/**
				 * Http Request hacia el servicio de perfil.
				 *
				 * @param {String} method - Método de envio.
				 * @param {String} url - Enlace hacia el rest.
				 */
				$http({
					method: 'POST',
					data: input,
					url: $coreConstants.URL_UPDATE_PASSWORD
				}).success(function (data, status, headers, config) {

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

            		// Agregación resultados a objeto para promesa.
					var objectResult = {
						"data": data,
						"status": status,
						"headers": headers,
						"config": config 
					}
	        		
	        		/**
					 * Este método se usa para indicar que se
            		 * ha obtenido la información
            		 *
            		 * @param {object} objectResult - Objeto
            		 */
					deferred.reject(objectResult);
				});

				return promise; // Retorno de promesa.
			}

			// Retorno o registro de los métodos.
			return {
				all: all
			};

		}
	]);