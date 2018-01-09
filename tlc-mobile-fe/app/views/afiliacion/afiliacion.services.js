/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('affiliation.view.services', [])
		.factory('$affiliationService', $affiliationService);

    $affiliationService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $affiliationService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			affiliate: affiliate,
			disaffiliation: disaffiliation
		}
		
		return services;
		
		////////////

		function affiliate(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_AFFILIATE
			});
			
			return promise;
		} 

		function disaffiliation(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_DISAFFILIATION
			});
			
			return promise;
		} 
	}

}(angular));