/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 */

(function(angular) {
	'use strict';
	
	angular
		.module('module.external', [
		
			//modulos de Angular
			// 'ngRoute',
			'ui.router',
			'ngAnimate',
			'ngCookies',
			'ngStorage',
			'ngTouch',
			
			//modulos de terceros
			'material.components.sidenav',
			'material.components.swipe',
			'ui.bootstrap',	
			'ui.indeterminate',
			'oc.lazyLoad'
		]);

}(angular));