/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';	

	angular
		.module('datepicker-from.controller', [])	
		.controller('DatepickerFromController', DatepickerFromController);
		
	DatepickerFromController.$inject = [
		'$scope',
		'$movementHistory', 
		'$timeout', 
		'$utilService',
		'$loader'
	];
		
	function DatepickerFromController(
		$scope,
		$movementHistory, 
		$timeout, 
		$utilService,
		$loader
	) {
		
		var vm = this;
		
		vm.onSelect = onSelect;
		
		$movementHistory.defaultDtFrom = defaultDtFrom;
		$movementHistory.readyConfig = init;
		
		var today = new Date().setHours(0,0,0,0);
		
		// init();
		
		////////////		
				
		function init() {	
			// initDate();
			
			today = new Date($movementHistory.getDateRange()['TODAY'] || new Date());
			today.setHours(0,0,0,0);
			
			vm.show = true;
			
			initOptions();
			
			// Espera a que se carge el DatepickerEndcontroller
			$timeout(function() {
				var autoLoad = false; // False para que en la vista no se carge la data inicial
				$movementHistory.defaultDtFrom(autoLoad);
			}, 200);
		}
		
		function initDate() {

			// Asigna el dia inicial por defecto
			var dtFrom = angular.copy(today);
			dtFrom.setDate(dtFrom.getDate() - $movementHistory.getDateRange()['INTER_DATE']/* + 1*/);
			vm.dtFrom = dtFrom;
		}
		
		function initOptions() {
		
			var minDate = getMaxDate(),
				maxDate = getMaxDate();
				
			// Puede consultar hasta '6' meses anteriores
			minDate.setDate(minDate.getDate() - $movementHistory.getDateRange()['RANGE_DATE'] + 1);

			vm.options = {
				minDate: minDate,
				maxDate: maxDate,
				showWeeks: false,
				customClass: customClass,
				startingDay: 1
			};
		}
		
		function customClass(date, mode) {

			if (mode === 'day') {			
			
				var dayToCheck = new Date(date).setHours(0,0,0,0);
				var dtForm = vm.dtFrom ? new Date(vm.dtFrom).setHours(0,0,0,0) : null;
				
				if(vm.dtFrom && dayToCheck === dtForm) {
					$scope.selectedMuted();
				}

				if(dayToCheck === today.getTime()) {
					$scope.todayMuted();
					return  'btn-today';
				}
			}
			return '';
		}
		
		function defaultDtFrom(autoLoad) {
			
			var dtFrom = angular.copy(today);
			dtFrom.setDate(dtFrom.getDate() - $movementHistory.getDateRange()['INTER_DATE']/* + 1*/);

			$movementHistory.defaultDtEnd(dtFrom, autoLoad);
			
			$timeout(function() {				
				initDate();
			});
		}
		
		function onSelect() {
			
			$loader.showLoader();
				
			$timeout(function() {
				$movementHistory.onSelectDtFrom(vm.dtFrom);		
				$utilService.scroll('.tab-content', '.mtp-calendar');					
				$movementHistory.showDtEnd();	
			}, 200);	
		}	
		
		function getMaxDate() {
			var date = angular.copy(today);
			date.setDate(date.getDate() - 1);
			return date;
		}	
	}

}(angular));
