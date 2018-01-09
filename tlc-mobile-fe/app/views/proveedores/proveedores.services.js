/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('providers.view.services', [])
		.factory('$providersService', $providersService);

    $providersService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $providersService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getProviders: getProviders
		};
		
		return services;
		
		////////////
		
		function getProviders(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_PROVIDERS
			});
			
			return promise;
		} 		
	}

}(angular));