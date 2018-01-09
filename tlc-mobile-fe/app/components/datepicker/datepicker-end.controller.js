/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';	

	angular
		.module('datepicker-end.controller', [])	
		.controller('DatepickerEndController', DatepickerEndController);
		
	DatepickerEndController.$inject = [
		'$scope',
		'$movementHistory', 
		'$timeout', 
		'$loader'
	];
		
	function DatepickerEndController(
		$scope,
		$movementHistory, 
		$timeout, 
		$loader
	) {				
	
		var vm = this;
		
		vm.onSelect = onSelect;
		
		$movementHistory.defaultDtEnd = defaultDtEnd;
		$movementHistory.onSelectDtFrom = onSelectDtFrom;
		
		var today = new Date().setHours(0,0,0,0);
		
		init();
		
		////////////		
		
		function init() {				
			initDate();
			initOptions();
		}
		
		function initDate() {				
			vm.dtEnd = null;
		}
		
		function initOptions() {			
			vm.options = {
				customClass: customClass,
				showWeeks: false,
				startingDay: 1,
				initDate: new Date()
			};
		}
		
		function customClass(date, mode) {
			
			if (mode === 'day') {	
			
				var dayToCheck = new Date(date).setHours(0,0,0,0);
				var dtEnd = vm.dtEnd ? new Date(vm.dtEnd).setHours(0,0,0,0) : null;
				
				if(dayToCheck === dtEnd) {
					$scope.selectedMuted();
				}
				
				if(dayToCheck ===  (today.getTime ? today.getTime() : today)) {
					$scope.todayMuted();
					return  'btn-today';
				}
			}
			return '';
		}
		
		function defaultDtEnd(dtFrom, autoLoad) {
			
			var dtEnd = angular.copy(dtFrom);
			dtEnd.setDate(dtEnd.getDate() + $movementHistory.getDateRange()['INTER_DATE'] - 1);
			
			today = new Date($movementHistory.getDateRange()['TODAY'] || new Date());
			today.setHours(0,0,0,0);
			
			if(autoLoad !== false) {
				$movementHistory.onSelectDtEnd(dtFrom, dtEnd);
			}
			
			$movementHistory.onSelectDtFrom(dtFrom);
		}
		
		function onSelect() { 
			$movementHistory.onSelectDtEnd(vm.dtFrom, vm.dtEnd);
		}
		
		function onSelectDtFrom(dtFrom) {		
				
			$timeout(function() {
				
				// vm.dtEnd = null;				
				vm.dtFrom = dtFrom;
				
				// El minimo dia es el seleccionado en el DESDE
				var minDate = new Date(dtFrom),
					maxDate = new Date(dtFrom);
					
				// Como maximo consulta hasta 'Y' dias despues
				maxDate.setDate(maxDate.getDate() + $movementHistory.getDateRange()['INTER_DATE'] - 1);
				
				if(maxDate >= getMaxDate()) {
					maxDate = getMaxDate();
				}

				vm.options.minDate = minDate;
				vm.options.maxDate = maxDate;
				vm.options.initDate = maxDate;
				
				vm.dtEnd = null;
				
				$loader.hideLoader();
			});
		}
		
		function getMaxDate() {
			var date = angular.copy(today);
			date.setDate(date.getDate() - 1);
			return date;
		}
		
	}

}(angular));
