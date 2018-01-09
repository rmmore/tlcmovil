/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('datepicker.directives', [])
		.directive('uiDatepicker', uiDatepicker)
		.directive('uieDatepicker', uieDatepicker);
	
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
	
	uieDatepicker.$inject = ['$timeout'];
	
	function uieDatepicker($timeout) {
		
		var directive = {
			restrict: 'E',
			replace: true,
			link: link,
			template: '<div></div>',
			scope: {
				options: '='
			}
		};
		
		return directive;
		
		function link(scope, element) {
			
			scope.options = scope.options || {};
			
			scope.options.reload = reload;
			scope.options.setDate = setDate;
			
			var _options = {
				dayNamesMin: [ "dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb." ],
				monthNames: [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE" ],
				firstDay: 1
			}
			
			////////////
			
			function reload(options) {
				
				element.datepicker('destroy');
				element.datepicker(angular.merge(_options, options || {}));	
				element.datepicker('refresh');
			}
			
			function setDate(date) {
				element.datepicker('setDate', date);
				
				if(!date) {
					clearDate();
				}
			}
			
			function clearDate() {
				element
						.find('.ui-datepicker-current-day')
						.removeClass('ui-datepicker-current-day');
			}
			
			scope.$on('$destroy', function() {
				element.datepicker('destroy');
			});
		}
		
	}
	
}(angular));
