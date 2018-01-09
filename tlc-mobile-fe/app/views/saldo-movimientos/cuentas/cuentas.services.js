/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('accounts.view.services', [])
		.factory('$accountsService', $accountsService);

    $accountsService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $accountsService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getAccounts: getAccounts
		};
		
		return services;
		
		////////////

		function getAccounts(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_ACCOUNTS
			});
			
			return promise;
		} 	
	}

}(angular));