/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('operationsToSend.view.services', [])
		.factory('$operationsToSendService', $operationsToSendService);

    $operationsToSendService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $operationsToSendService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getOperations: getOperations
		}
		
		return services;
		
		////////////
		
		function getOperations(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_OPERATIONS_TO_SEND
			});
			
			return promise;
		} 		
	}

}(angular));