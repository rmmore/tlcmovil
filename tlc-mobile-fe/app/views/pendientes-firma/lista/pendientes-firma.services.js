/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('operationsToSign.view.services', [])
		.factory('$operationsToSignService', $operationsToSignService);

    $operationsToSignService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $operationsToSignService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getOperations: getOperations,
			signOperations: signOperations,
			rejectOperations: rejectOperations
		};
		
		return services;
		
		////////////
		
		function getOperations(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_OPERATIONS_FOR_SIGNING
			});
			
			return promise;
		} 

		function signOperations(bodyParam) {

			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_SIGN_OPERATIONS
			});
			
			return promise;
		} 

		function rejectOperations(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_REJECT_OPERATION
			});
			
			return promise;
		} 	
	}

}(angular));