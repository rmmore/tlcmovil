/**
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('header-mobile.factory', [])
		.factory('$headerMobile', $headerMobile);
		
	$headerMobile.$inject = [
	];

    function $headerMobile(
	){
		
		var service = {
			back: back
		};
		
		return service;
		
		////////////
		
		function back() {
			// Ejecutado desde el HeaderMobileController
			// Implementado en los controladores de las vistas
		}
	}

}(angular));
