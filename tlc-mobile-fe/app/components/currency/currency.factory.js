/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';

	angular
		.module('currency.factory', [])
		.factory('$currency', $currency);
	
	$currency.$inject = ['$currencyService'];
	
	function $currency($currencyService) {
		
		var data = {};
		
		var services = {
			// Ejecuta el servicio para obtener los tipos de monedas
			getCurrencyValues: getCurrencyValues,
			
			// Retorna los tipos de monedas a quien lo solicite
			getCurrency: getCurrency
		}
		
		return services;
		
		////////////
		
		function getCurrencyValues() {
			$currencyService.getCurrencyValues().then(function(response) {
				data.currencies = response.data.response.listCurrency || [];
			});
		}
		
		function getCurrency() {
			return data.currencies;
		}
	}
	
}(angular));