/**
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 * 
*/
'use strict';

angular.module('menu-basic.services', [])

	/**
     * Método para obtener datos necesarios para
	 * la construcción del menuBasic.
	 */
	.factory('$menuBasicService', 
		['$http', 
		'$q',
		'$coreConstants',
        function ($http, $q, $coreConstants) {

			/**
			 * Método para el proceso de retrieve de datos.
			 */
			function all() { 
				
				var deferred = $q.defer();
				var promise = deferred.promise;

				/**
				 * Http Request hacia el servicio de menuBasic.
				 *
				 * @param {String} method - Método de envio.
				 * @param {String} url - Enlace hacia el rest. 
				 */
				$http({
					method: 'POST',
                    url: $coreConstants.URL_POST_MENU
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
					 * Este metodo se usa para indicar que se
            		 * ha obtenido la información
            		 *
            		 * @param {object} objectResult - Objeto
            		 */
					deferred.reject(objectResult);
               	});

				return promise;
			}
			
			function init() {
				// Inicializa las opciones del menu
			}

			// Retorno o registro de los métodos.
			return {
				all: all,
				init: init
			};

		}
	]);