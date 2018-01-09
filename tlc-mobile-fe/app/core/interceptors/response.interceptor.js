
/**
 * Capa de Interceptores
 *
 * Esta clase se interceptan las espuestas de los servicios
 * con la finalidad de actualizar el token en el storage.
 *
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @author Rolando Paredes Alzamora  (rparedea@everis.com)
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
		'$coreConstants',
		'$storageService',
		'$loginService'
	];
		
	function responseInterceptor(
        $q,
		$injector,
		$coreConstants,
		$storageService,
		$loginService
	) {
		
		return {

			response: function(response) {
				
				if(!/(.html|.json)$/.test(response.config.url)) { // No ingresa cuando es un template

					var responseWrapper = (response.data) || {};
					var scheduleValidate = false;
					
					if(responseWrapper.errorCode) {
						
						var description;
						
						if($coreConstants.ERROR_CODE_SERVIDOR.indexOf(response.data.errorCode) !== -1) {
							description = response.data.errorDesc;
						}else if($coreConstants.ERROR_CODE_SCHEDULE.indexOf(response.data.errorCode) !== -1){
							description = response.data.errorDesc;
							scheduleValidate = true;
						} else {
							description = $coreConstants.ERROR_CODE[response.data.errorCode] || $coreConstants.ERROR_INTERNO_INTENTAR;
						}
						
						if(!scheduleValidate){
							$injector.get('$modalService').open({
							title: $coreConstants.ERROR,
							description: description,
							showCancel: false
							});	
						}else{
							$injector.get('$modalService').open({
								title: $coreConstants.ERROR,
								description: description,
								accept: $loginService.logoutCas,
								showCancel: false
							});
						}	

						return $q.reject(response);
					}
					
					// var casToken = response.headers()[$coreConstants.HEADER.CAS_TOKEN];
					var authToken = response.headers()[$coreConstants.HEADER.AUTH_TOKEN];
				
					// $storageService.setCasToken(casToken);
					$storageService.setAuthToken(authToken);
					
					var keypadToken = response.headers()[$coreConstants.HEADER.KEYPAD_TOKEN];
					if(keypadToken) {
						$storageService.setKeypad(keypadToken);
					}
				}
				
				return response || $q.when(response);
			}

		};
	}

}(angular));