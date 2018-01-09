/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('view.pendientes-firma.lista', [
			'operationsToSign.view.controller',
			'operationsToSign.view.services'
		]);

}(angular));