/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';

	angular
		.module('component.currency', [
			'currency.constants',
			'currency.service',
			'currency.directive',
			'currency.factory',
			'currency.filters'
		]);
	
}(angular));