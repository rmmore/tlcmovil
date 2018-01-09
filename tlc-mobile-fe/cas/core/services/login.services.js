/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('core.login.services', [])
		.factory('$loginService', $loginService);
	
	$loginService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];
	
	function $loginService(
		$coreConstants,
		$promiseServices
	) {

		var service = {			
			login: login
		};

		return service;
		
		////////////	
		
		function login(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_LOGIN
			});
			
			return promise;
		} 
	}

}(angular));
    

    