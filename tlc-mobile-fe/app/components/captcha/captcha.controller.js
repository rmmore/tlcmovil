/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('captcha.controller', [])
		.controller('CaptchaController', CaptchaController);	
		
	CaptchaController.$inject = [
		'$captchaService', 
		'$coreConstants', 
		'$loader'
	];
		
	function CaptchaController(
		$captchaService, 
		$coreConstants, 
		$loader
	) {
		
		var vm = this;
		
		vm.reload = reload;
		
		vm.options = vm.options || {};
		
		vm.options.reload = reload;
			
		vm.regex = {captcha: $coreConstants.REGEX.CAPTCHA};
		
		getCaptcha();
		
		////////////
		
		function getCaptcha() {	
		
			vm.options.value = null;
			
			$captchaService.getCaptcha().then(function(response) {
				vm.options.code = response.data.response.code;
				vm.base64 = response.data.response.base64;
			});
		}
		
		function reload(showMessage) {
			if(showMessage !== false) {
				$loader.setMessage($coreConstants.MSG_LOAD_CAPTCHA);
			}
			getCaptcha();
		}
	}
	
}(angular));