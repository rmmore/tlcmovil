/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('change-password.service', [])
		.factory('changePasswordService', changePasswordService);		

	changePasswordService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];
	
	function changePasswordService(
		$coreConstants,
		$promiseServices
	) {
		
		var services = {
			changePassword: changePassword
		};	
		
		return services;
		
		////////////
		
		function changePassword(bodyParam) {
			
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_CHANGE_PASSWORD
			});
			
			return promise;
		}	
	}
	
}(angular));