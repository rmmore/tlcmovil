/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */

(function(angular) {
    'use strict';
	
	angular
		.module('core.user.services', [])
		.factory('$userService', $userService);

    $userService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $userService(
		$coreConstants,
		$promiseServices
	){

		var service = {
			getLoggedUser: getLoggedUser
		};
		
		return service; 
		
		////////////
		
		function getLoggedUser() {
			var promise = $promiseServices.post({
				url: $coreConstants.URL_GET_LOGGED_USER
			});
			
			return promise;
		} 		
	}

}(angular));