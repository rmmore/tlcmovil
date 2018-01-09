/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('keypad-mobile.service', [])
		.factory('$keypadMobileService', $keypadMobileService);
	
	$keypadMobileService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];
	
	function $keypadMobileService(
		$coreConstants,
		$promiseServices
	) {

		var service = {			
			getKeypad: getKeypad
		};

		return service;
		
		////////////	
		
		function getKeypad(queryParam) {
			var promise = $promiseServices.get({
				queryParam: queryParam,
				url: $coreConstants.URL_GET_KEYPAD
			});
			
			return promise;
		} 
	}

}(angular));
    

    