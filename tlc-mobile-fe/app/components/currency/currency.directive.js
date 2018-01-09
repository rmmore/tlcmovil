/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';
	
	angular
		.module('currency.directive', [])		
		.directive('currency', currencyDirective);		
	
	function currencyDirective() {
		return {
			restrict: 'A',
			templateUrl: 'components/currency/currency.html',
			scope: {
				currency: '='
			}
		}	
	}
	
}(angular));


