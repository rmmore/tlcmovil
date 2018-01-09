/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular.module('pendientes-envio.operaciones-enviadas.view.services', [])
    .factory('$operationsSentService', $operationsSentService);

    $operationsSentService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $operationsSentService(
		$coreConstants,
		$promiseServices
	){

		function exportOperationsSent(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_EXPORT_OPERATIONS_SENT
			});
			
			return promise;
		} 
		
		return {
			exportOperationsSent: exportOperationsSent
		};		
	}

}(angular));