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
		'$loginService',
		'$injector'
	];
		
	function errorInterceptor(
        $q,
		$coreConstants,
		$loginService,
		$injector
	) {
		
		var hasError = false;
		
		return {	
		
			responseError: function(response) {

				if(hasError) {
					return $q.reject(response);
				}
				
				if(	response.status == 401 || 
					response.status == 403
				) {
					$injector.get('$modalService').open({
						title: $coreConstants.ERROR,
						description: $coreConstants.SESSION_EXPIRED,
						accept: $loginService.logoutCas,
						showCancel: false
					});
				}
				else {
					$injector.get('$modalService').open({
						title: $coreConstants.ERROR,
						description: $coreConstants.ERROR_INTERNO_LATER,
						accept: $loginService.logoutFull,
						showCancel: false
					});
				}
				
				hasError = true;

				return $q.reject(response);
			}

		}
		
	}

}(angular));