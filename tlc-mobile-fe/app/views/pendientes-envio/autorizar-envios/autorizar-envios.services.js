/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('authorize-sends.view.services', [])
		.factory('$authorizeSendsService', $authorizeSendsService);

    $authorizeSendsService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $authorizeSendsService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			sendOperations: sendOperations
		}
		
		return services;
		
		////////////

		function sendOperations(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_SEND_OPERATIONS
			});
			
			return promise;
		} 		
	}

}(angular));