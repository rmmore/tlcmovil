/**
 * Capa de Interceptores
 *
 * Esta clase se interceptan los errores de acceso 
 * y de peticion. Interviene en todos los response.
 *
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('core.error.interceptor', [])	
		.factory('errorInterceptor', errorInterceptor);
	
	
	errorInterceptor.$inject = [
        '$q',
		'$coreConstants',
		'$injector'
	];
		
	function errorInterceptor(
        $q,
		$coreConstants,
		$injector
	) {
		
		var hasError = false;
		
		return {	
		
			responseError: function(response) {

				if(hasError) {
					return $q.reject(response);
				}
				
				$injector.get('$modalService').open({
					title: $coreConstants.ERROR,
					description: $coreConstants.ERROR_INTERNO_LATER,
					showCancel: false,
					accept: function() {
						hasError = false;
					}
				});
				
				hasError = true;

				return $q.reject(response);
			}

		}
		
	}

}(angular));