/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';

	angular
		.module('currency.service', [])
		.factory('$currencyService', $currencyService);
		
	$currencyService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];
	
	function $currencyService(
		$coreConstants,
		$promiseServices
	) {
		
		var services = {
			getCurrencyValues: getCurrencyValues
		}
		
		return services;
		
		////////////
		
		function getCurrencyValues() {			
			var promise = $promiseServices.post({
				url: $coreConstants.URL_GET_COINS
			});
			
			return promise;
		}		
	}
	
}(angular));