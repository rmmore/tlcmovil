/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('clave-planilla.service', [])
		.factory('clavePlanillaService', clavePlanillaService);		

	clavePlanillaService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];
	
	function clavePlanillaService(
		$coreConstants,
		$promiseServices
	) {
		
		var services = {
			validateOperationDetail: validateOperationDetail
		};	
		
		return services;
		
		////////////
		
		function validateOperationDetail(bodyParam) {
			
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_VALIDATE_OPERATION_DETAIL
			});
			
			return promise;
		}	
	}
	
}(angular));