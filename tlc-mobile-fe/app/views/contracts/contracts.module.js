/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('view.contracts', [
			'contracts.view.factory',
			'contracts.view.services',
			'contracts.view.controller'
		]);
	
}(angular));
