/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';
	
	angular
		.module('currency.constants', [])		
		.constant('$currencyConstants', currencyConstants());		
		
	function currencyConstants() {
		return {
			'SOL_CODE': '0001',
			// 'SOL_SYMBOL': 'S/.',
			// 'SOL_DESC': 'Soles',
			
			// 'DOLLAR_CODE': '1001',
			// 'DOLLAR_SYMBOL': 'US$',
			// 'DOLLAR_DESC': 'Dólares',
			
			'MONETARY_UNIT': {
				'B': 'Billetes',
				'M': 'Monedas'
			}
		}
	}
	
}(angular));


