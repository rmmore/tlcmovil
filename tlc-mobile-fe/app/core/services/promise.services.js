/**
 * Capa de Servicios
 *
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('core.promise.services', [])
		.factory('$promiseServices', $promiseServices);

    $promiseServices.$inject = [
		'$http',
		'$q'
	];

    function $promiseServices(
		$http,
		$q
	){
		// Retorno o registro de los métodos.
		var service = {
			get: 	function(data) { return promise('GET', data); },
			post: 	function(data) { return promise('POST', data); },
			put:	function(data) { return promise('PUT', data); },
			delete: function(data) { return promise('DELETE', data); }
		};
		
		return service;
		
		////////////
		
		// Obtiene la url despues de reemplazar los path params, 
		// y a los query y body params les quita los path params
		function getParams(data) {
			
			var reg, url = data.url, queryParam = {}, bodyParam = {},
				params = angular.merge(angular.copy(data.queryParam) || {}, angular.copy(data.bodyParam) || {});

			if(angular.isArray(data.bodyParam)) {
				bodyParam = data.bodyParam
			}
				
			angular.forEach(params , function(val, key) {
				if(!angular.isObject(val) && url.indexOf(key) !== -1) {
					reg = new RegExp(':' + key, 'g');
					url = url.replace(reg, val || '');
				} else {
					queryParam[key] = (data.queryParam || {})[key];
					
					if(!angular.isArray(data.bodyParam))
						bodyParam[key] = (data.bodyParam || {})[key];
				}
			});

			return {
				url : url,
				queryParam: queryParam,
				bodyParam: bodyParam				
			}
		};
		
		// Devuelve la promesa de la peticion
		function promise(method, data) {
			
			// Variables para promesas del servicio.
			var deferred = $q.defer(),
				promise = deferred.promise;
				
			var params = getParams(data);


			/**
			 * Http Request hacia el servicio de captcha.
			 *
			 * @param {String} method - Método de envio.
			 * @param {String} url - Enlace hacia el rest.
			 */

			var config = {
				method: method,
				notLoader: data.notLoader,
				params: params.queryParam,
				data: {
					request: params.bodyParam
				},
				url: params.url
			};

			angular.extend(config, data.config);

			$http(config).success(function (data, status, headers, config) {

				var objectResult = {
					data: data.responseWrapper || data,
					status: status,
					headers: headers,
					config: config 
				}				

				/**
				 * Este metodo se usa para indicar que se
				 * ha obtenido la información
				 *
				 * @param {object} objectResult - Objeto
				 */
				deferred.resolve(objectResult);
			
			})
			.error(function (data, status, headers, config) {

				var objectResult = {
					data: data,
					status: status,
					headers: headers,
					config: config 
				}
	        		
				/**
				 * Este método se usa para indicar que se
				 * ha obtenido la información
				 *
				 * @param {object} objectResult - Objeto
				 */
				deferred.reject(objectResult);
			});

			return promise // Retorno de promesa.;
		}
		
	}

}(angular));