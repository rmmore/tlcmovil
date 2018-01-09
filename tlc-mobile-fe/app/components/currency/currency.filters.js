/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';
	
	angular
		.module('currency.filters', [])		
		.filter('currencySymbol', currencySymbolFilter)
		.filter('currencyDesc', currencyDescFilter)		
		.filter('monetaryUnitMask', monetaryUnitMask);		
		
	currencySymbolFilter.$inject = 
	currencyDescFilter.$inject = ['$currency'];
	monetaryUnitMask.$inject = ['$currencyConstants'];
	
	function currencySymbolFilter($currency) {
		return function (input) {
			return !input 
				? input
				: $currency.getCurrency()
					.filter(function(v){return v.cdCurrency === input})[0].dsSymbol;
		}
	}
	
	function currencyDescFilter($currency) {
		return function (input) {
			return !input  
				? input
				: $currency.getCurrency()
					.filter(function(v){return v.cdCurrency === input})[0].dsCurrency;
		}
	}
		
	function monetaryUnitMask($currencyConstants) {			
		return function (input) {
			return !input 
				? input
				: $currencyConstants.MONETARY_UNIT[input];
        }
	}
	
}(angular));


