/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('component.captcha', [
			'captcha.directive',
			'captcha.controller',
			'captcha.service'
		]);
	
}(angular));


