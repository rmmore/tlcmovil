/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('captcha.service', [])
		.factory('$captchaService', $captchaService);
	
	$captchaService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];
	
	function $captchaService(
		$coreConstants,
		$promiseServices
	) {

		var service = {			
			getCaptcha: getCaptcha
		};

		return service;
		
		////////////	
		
		function getCaptcha() {
			var promise = $promiseServices.get({
				url: $coreConstants.URL_GET_CAPTCHA
			});
			
			return promise;
		} 
	}

}(angular));
    

    