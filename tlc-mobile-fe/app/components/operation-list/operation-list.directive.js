/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @description Esta directiva permite mostrar la lista de operaciones.
 * @example <operation-list data-list="lista"></operation-list>
 * @param {array} `list` es la lista de operaciones
 * @param {function} `onSelect` evento que se ejecuta al dar checked a la operacion
 * @param {function} `onClick` evento que se ejecuta al dar clic en la operacion
 */
 
(function(angular) {
	'use strict';

	angular
		.module('operation-list.directive', [])
		.directive('operationList', operationList);		

	function operationList() {
		
		var directive = {
			restrict: 'E',
			replace: true,
			controllerAs: 'operationListVM',
			controller: function() {},
			templateUrl: 'components/operation-list/operation-list.html',
			bindToController: {
				options: '='
			}
		};
		
		return directive;	
	}
	
}(angular));