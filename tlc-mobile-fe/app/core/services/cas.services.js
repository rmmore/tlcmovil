/**
 * @author everis
 * 
 * Capa de servicios de CAS
 *
 */

(function(angular) {
    'use strict';

	angular
		.module('core.cas.services', [])
		.factory('$casService', $casService);
		
	$casService.$inject = [
		'$injector',
		'$coreConstants',
		'$storageService'
	];
	
	function $casService (
		$injector, 
		$coreConstants,
		$storageService
	) {
		
		var service = {				
			// Llamada al servicio de logout del cas
			logoutCas: logoutCas,		
			
			// Llamada al servicio de logout full
			logoutFull: logoutFull,
			
			// Valida el Service Ticket con una petición síncrona
			validate: validate
		}; 
		
		return service;
		
		////////////
			
		function logoutCas() {
			var promise = $injector.get('$promiseServices').post({
				url: $coreConstants.URL_CAS_LOGOUT_CAS
			})

			return promise;
		}
			
		function logoutFull() {
			var promise = $injector.get('$promiseServices').post({
				url: $coreConstants.URL_CAS_LOGOUT_FULL
			})

			return promise;
		}
		
		function validate(token) {
			if($coreConstants.CAS_DUMMY) {
				return true;
			}

			var result = $.ajax({
				url: $coreConstants.URL_CAS_SERVICE_VALIDATE + '&ticket=' + token,
				//data: { ticket: token },
				type: 'POST',
				async: false
			});

			if(result.status != 200) {
				return false;
			}
			
			if(result.responseJSON && result.responseJSON.resultCode == '1'){
				$storageService.setCasToken(result.responseJSON.response.casToken);
				$storageService.setAuthToken(result.responseJSON.response.authToken);
				return true;
			}

			return false;
		}

	}

}(angular));