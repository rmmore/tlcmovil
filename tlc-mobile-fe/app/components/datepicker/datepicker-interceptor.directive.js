/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict'
	
	angular
		.module('datepicker.interceptor', [])
		.directive('datepickerInterceptor', datepickerInterceptor);
		
	datepickerInterceptor.$inject = [];
	
	function datepickerInterceptor() {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope) {			
			
				// Elimina el evento auto focus al seleccionar un dia del calendario
				scope.$$childHead.$$listeners['uib:datepicker.focus'] = null;
				
			}
		}
	}
	
}(angular));
