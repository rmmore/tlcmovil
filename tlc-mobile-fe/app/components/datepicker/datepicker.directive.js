/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('datepicker.directives', [])
		.directive('uiDatepicker', uiDatepicker);
	
	uiDatepicker.$inject = ['$timeout'];
	
	function uiDatepicker($timeout) {
		return {
			restrict: 'E',
			templateUrl: 'components/datepicker/datepicker.html',
			controller: 'DatepickerController',
			controllerAs: 'datepickerVM',
			link: link
		}
		
		function link(scope, element) {
			
			// Corrige el color de los bordes cuando el dia actual está deshabilitado
			scope.todayMuted = function() {
				$timeout(function() {
					element.find('.btn-today .text-muted').parent().addClass('today-muted');
				}, 200);
			};
			
			// Corrige el color de los bordes cuando el dia seleccionado está deshabilitado
			scope.selectedMuted = function() {
				$timeout(function() {
					element.find('.btn-info .text-muted').parent().addClass('selected-muted');
				});
			};			
		}
	}
	
}(angular));
