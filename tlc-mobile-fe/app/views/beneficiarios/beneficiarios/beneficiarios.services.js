/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('beneficiaries.view.services', [])
		.factory('$beneficiariesService', $beneficiariesService);

    $beneficiariesService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $beneficiariesService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getBeneficiaries: getBeneficiaries
		};
		
		return services;
		
		////////////
		
		function getBeneficiaries(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_BENEFICIARIES
			});
			
			return promise;
		} 		
	}

}(angular));