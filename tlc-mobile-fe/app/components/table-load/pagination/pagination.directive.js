/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @ngdoc directive
 * @name pagination
 * @module component.pagination
 * @restrict E
 * @description
 * `pagination` ejecuta una funcion de paginación de grillas
 *
 * @param {object=} pagination-options Contiene los parametros de la directiva.
 *
 * 	**NOTA:** Este objeto tiene los siguientes campos:
 *		
 *			show:	(boolean) Muestra y/o oculta la directiva.
 *			request: 	(function) Funcion que se implementa en la vista, es ejecutada cuando 
 *						se ejecuta la paginación, recibe dos parametros:
 *							- param: (object) Objeto los atributos:
 *								- page: Página a buscar
 *							- callback: (function) Funcion que debe ejecutarse en la implementacion
 *									del request, se le debe pasar los parametros page (página actual) 
 *									y pages(total de páginas)
 *			init: (function) 	Funcion que se ejecuta en la vista, se debe ejecutar cuando se quiere
 *							resetear la paginación
 *
 */ 

(function(angular) {
	'use strict';
	
	angular
		.module('pagination.directive', [])		
		.directive('uiPagination', pagination);
		
	function pagination() {
		
		var directive = {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'components/table-load/pagination/pagination.html',
			controller: 'PaginationController',
			controllerAs: 'paginationVM',
			bindToController: {
				options: '=paginationOptions'
			}
		};
		
		return directive;		
	}
		
}(angular))
