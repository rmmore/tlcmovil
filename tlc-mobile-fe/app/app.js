/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular		
		.module('app.tlc', [	
		
			'module.external',
			
			'module.core',
			'module.component',
			'module.view',			
			'ocLazyLoad.component',		
			'ocLazyLoad.view',
			
			'routes',				
		])
		.config(appConfig)
		.run(appRun)
		
		
	appConfig.$inject = [
		'$httpProvider', 
		'$locationProvider',
		'$compileProvider'
	];		
	
	function appConfig ($httpProvider, $locationProvider, $compileProvider) {

		// Setea los interceptores
		$httpProvider.interceptors.push('responseInterceptor');
		$httpProvider.interceptors.push('requestInterceptor');
		$httpProvider.interceptors.push('errorInterceptor');

		// Setear cabeceras   
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		// $httpProvider.defaults.withCredentials = true;
		
		//Elimina '#' de url, no aplica para IE
		// $locationProvider.html5Mode(true);
		
		// Deshabilita el modo debug para mejorar el performance
		$compileProvider.debugInfoEnabled(false);
	}

	appRun.$inject = [
		'$authenticationService', 
		'$routeInterceptor',
		'$deviceService'
	];
		
	function appRun($authenticationService, $routeInterceptor, $deviceService) {
		
		$authenticationService.validate();
		
		$deviceService.verify();

		$routeInterceptor.checkRoute();
		
		FastClick.attach(document.body);
		
	}

}(angular));