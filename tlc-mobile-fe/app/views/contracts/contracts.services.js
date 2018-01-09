/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('contracts.view.services', [])
		.factory('$contractsService', $contractsService);

    $contractsService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $contractsService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getContracts: getContracts,
			selectContract: selectContract
		}
		
		return services;
		
		////////////

		function getContracts(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_CONTRACTS
			});
			
			return promise;
		}

		function selectContract(bodyParam) {
			
			var url = $coreConstants.URL_POST_SELECT_CONTRACT;
			
			if($coreConstants.APP_MOCK) {
				url = url.split('.json')[0];
				url = url + '_' + bodyParam.cdContract + '.json' 
			}
			
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: url
			});
			
			return promise;
		} 
	}

}(angular));