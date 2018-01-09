/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @ngdoc directive
 * @name loadMore
 * @module component.load-more
 * @restrict E
 * @description
 * `load-more` ejecuta una funcion para cargar mas datos.
 *
 * @param {object=} load-more-options Contiene los parametros de la directiva.
 *
 * 	**NOTA:** Este objeto tiene los siguientes campos:
 *		
 *			disabled:	(boolean) Habilita o deshabilita.
 *			request: 	(function) Funcion que se implementa en la vista, es ejecutada cuando 
 *						se ejecuta el scroll infinito, recibe dos parametros:
 *							- param: (object) Objeto con dos atributos => size y offset
 *								- size: Cantidad de registros a obtener por cada peticion
 *								- offset: Posicion del ultimo registro obtenido
 *							- callback: (function) Funcion que debe ejecutarse en la implementacion
 *									del onScroll, se le debe pasar el total de registros 
 *			init: (function) 	Funcion que se ejecuta en la vista, se debe ejecutar cuando se quiere
 *							resetear el load more
 *
 */ 

(function(angular) {
	'use strict';
	
	angular
		.module('load-more.directives', [])
		
		.directive('tableLoadMore', function() {
			return {
				restrict: 'E',
				replace: true,
				transclude: true,
				scope: {
					options: '=loadMoreOptions'
				},
				templateUrl: 'components/table-load/load-more/load-more.html',
				controller: 'TableLoadController',
				controllerAs: 'loadMoreVM'
			}
		})
		
}(angular))
