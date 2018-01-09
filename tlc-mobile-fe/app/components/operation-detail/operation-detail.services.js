/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('operation-detail.services', [])
		.factory('$operationDetailService', $operationDetailService);

    $operationDetailService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $operationDetailService(
		$coreConstants,
		$promiseServices
	){		
		var services =  {
			getOperationDetail: getOperationDetail
		};	
		
		return services;
		
		////////////
		
		function getOperationDetail(bodyParam, code) {
			
			var url = $coreConstants.URL_GET_DETAIL_OPERATION;
			
			if($coreConstants.APP_MOCK) {
				url = $coreConstants.URL_GET_DETAIL_OPERATION.split('.json')[0];
				url = url + '/operationDetail-' + code + '.json' 
			}
			
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: url
			});
			
			return promise;
		}		
	}

}(angular));