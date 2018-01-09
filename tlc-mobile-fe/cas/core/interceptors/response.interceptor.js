
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
		.module('core.response.interceptor', [])	
		.factory('responseInterceptor', responseInterceptor);
	
	
	responseInterceptor.$inject = [
        '$q',
		'$injector',
		'$coreConstants'
	];
		
	function responseInterceptor(
        $q,
		$injector,
		$coreConstants
	) {
		
		return {

			response: function(response) {

				if(response.data && response.data.errorCode) {
					$injector.get('$modalService').open({
						title: $coreConstants.ERROR,
						description: $coreConstants.ERROR_CODE[response.data.errorCode] || $coreConstants.ERROR_INTERNO_INTENTAR,
						showCancel: false
					});		

					return $q.reject(response);
				}
				
				return response || $q.when(response);
			}

		};
	}

}(angular));