/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @description Esta directiva permite mostrar la descripción del estado de la 
 * operación segun el código del estado.
 * @example <operation-status data-status-code="statusCode"></operation-status>
 * @param {string} `statusCode` es el código del estado de la operación
 */
 
(function(angular) {
	'use strict';

	angular
		.module('operation-status.directive', [])
		.directive('operationStatus', operationStatus);		

	function operationStatus() {
		
		var directive = {
			restrict: 'E',
			replace: true,
			controller: 'OperationStatusController',
			controllerAs: 'operationStatusVM',
			templateUrl: 'components/operation-status/operation-status.html',
			bindToController: {
				statusCode: '=',
			}
		};
		
		return directive;	
	}
	
}(angular));