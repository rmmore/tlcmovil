/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';

	angular
		.module('component.token-card', [
			'token-card.directive',
			'token-card.controller',
			'token-card-modal.controller',
			'token-card-modal.factory'
		]);
	
}(angular));