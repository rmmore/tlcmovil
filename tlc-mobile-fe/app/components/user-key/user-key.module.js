/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';

	angular
		.module('component.user-key', [
			'user-key.directive',
			'user-key.controller',
			'user-key-modal.controller',
			'user-key-modal.factory'
		]);
	
}(angular));