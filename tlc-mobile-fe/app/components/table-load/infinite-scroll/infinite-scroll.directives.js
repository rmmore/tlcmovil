/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @ngdoc directive
 * @name uiInfiniteScroll
 * @module component.infinite-scroll
 * @restrict E
 * @description
 * `ui-infinite-scroll` ejecuta una funcion cuando se llega a la parte inferior de la pantalla.
 *
 * @param {object=} infinite-scroll-options Contiene los parametros del scroll infinito.
 *
 * 	**NOTA:** Este objeto tiene los siguientes campos:
 *		
 *			disabled:	(boolean) Habilita o deshabilita el scroll infinito
 *			request: 	(function) Funcion que se implementa en la vista, es ejecutada cuando 
 *						se ejecuta el scroll infinito, recibe dos parametros:
 *							- paramScroll: (object) Objeto con dos atributos => size y offset
 *								- size: Cantidad de registros a obtener por cada peticion
 *								- offset: Posicion del ultimo registro obtenido
 *							- callback: (function) Funcion que debe ejecutarse en la implementacion
 *									del onScroll, se le debe pasar el total de registros 
 *			init: (function) Funcion que se ejecuta en la vista, se debe ejecutar cuando se quiere
 *							resetear el scroll infinito
 *
 */ 

(function(angular) {
	'use strict';
	
	angular
		.module('infinite-scroll.directives', [])
		
		.directive('tableInfiniteScroll', function() {
			return {
				restrict: 'E',
				replace: true,
				transclude: true,
				scope: {
					options: '=infiniteScrollOptions'
				},
				templateUrl: 'components/table-load/infinite-scroll/infinite-scroll.html',
				controller: 'TableLoadController',
				controllerAs: 'infiniteScrollVM'
			}
		})
		
}(angular))
