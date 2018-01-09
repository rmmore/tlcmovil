/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('keypad.service', [])
		.factory('$keypadService', $keypadService);
	
	$keypadService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];
	
	function $keypadService(
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
    

    