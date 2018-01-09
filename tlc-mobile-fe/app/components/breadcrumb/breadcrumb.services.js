/**
 * @author Ricardo Gonzales (jgonzabi@everis.com)
 * 
*/
'use strict';

angular.module('breadcrumb.services', [])

	/**
     * Método para obtener datos necesarios para
	 * la construcción del TableBasic.
	 */
	.factory('$breadcrumbService', 
		['$http', 
		'$q',
		'constantsValues',
        function ($http, $q, constantsValues) {

			/**
			 * Método para el proceso de retrieve de datos.
			 */
			function all() { 
				
				var deferred = $q.defer();
				var promise = deferred.promise;
				
				/**
				 * Http Request hacia el servicio de TableBasic.
				 *
				 * @param {String} method - Método de envio.
				 * @param {String} url - Enlace hacia el rest. 
				 */
				$http({
					method: 'GET',
                    url: constantsValues.URL_BREADCRUMB
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

			// Retorno o registro de los métodos.
			return {
				all: all
			};

		}]);