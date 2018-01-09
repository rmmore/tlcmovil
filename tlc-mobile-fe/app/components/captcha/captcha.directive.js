/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('captcha.directive', [])
		.directive('captcha', captcha);	
		
	function captcha() {
		return{
			restrict: 'E',
			templateUrl: 'components/captcha/captcha.html',
			controller: 'CaptchaController',
			controllerAs: 'captchaVM',
			bindToController: {
				options: '=?captchaOptions'
			}
		};
	}
	
}(angular));