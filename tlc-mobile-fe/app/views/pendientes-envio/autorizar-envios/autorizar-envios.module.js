/**
 * @author Ricardo Rosales Maldonado
 */
 
(function(angular) {
	'use strict';

	angular
		.module('view.pendientes-envio.autorizar-envio', [
			'authorize-sends.view.controller',
			'authorize-sends.view.factory',
			'authorize-sends.view.services'
		]);

}(angular));
