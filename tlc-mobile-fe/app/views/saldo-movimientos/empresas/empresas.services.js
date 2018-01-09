/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('companies.view.services', [])
		.factory('$companiesService', $companiesService);

    $companiesService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $companiesService(
		$coreConstants,
		$promiseServices
	){
		var services = {
			getCompanies: getCompanies
		};
		
		return services;
		
		////////////

		function getCompanies(bodyParam) {
			var promise = $promiseServices.post({
				url: $coreConstants.URL_GET_COMPANIES,
				bodyParam: bodyParam
			});
			
			return promise;
		} 		
	}

}(angular));