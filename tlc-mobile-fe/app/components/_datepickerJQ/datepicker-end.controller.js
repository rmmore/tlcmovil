/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';	

	angular
		.module('datepicker-end.controller', [])	
		.controller('DatepickerEndController', DatepickerEndController);
		
	DatepickerEndController.$inject = [
		'$movementHistory', 
		'$loader'
	];
		
	function DatepickerEndController(
		$movementHistory, 
		$loader
	) {				
	
		var vm = this,
			global = {};
		
		vm.onSelect = onSelect;
		
		$movementHistory.defaultDtEnd = defaultDtEnd;
		$movementHistory.onSelectDtFrom = onSelectDtFrom;
		
		var today = new Date().setHours(0,0,0,0);
		
		vm.optionsJQ = {};
		
		////////////
		
		function defaultDtEnd(dtFrom, autoLoad) {
			
			var dtEnd = angular.copy(dtFrom);
			dtEnd.setDate(dtEnd.getDate() + $movementHistory.getDateRange()['INTER_DATE'] - 1);
			
			if(autoLoad !== false) {
				$movementHistory.onSelectDtEnd(dtFrom, dtEnd);
			}
			
			$movementHistory.onSelectDtFrom(dtFrom);
		}
		
		function onSelect(date) { 
			
			$movementHistory.onSelectDtEnd(global.dtFrom, new Date(date));
		}
		
		function onSelectDtFrom(dtFrom) {					
				
			global.dtFrom = dtFrom;
			
			// El minimo dia es el seleccionado en el DESDE
			var minDate = new Date(dtFrom),
				maxDate = new Date(dtFrom);
				
			// Como maximo consulta hasta 'Y' dias despues
			maxDate.setDate(maxDate.getDate() + $movementHistory.getDateRange()['INTER_DATE'] - 1);
			
			if(maxDate >= getMaxDate()) {
				maxDate = getMaxDate();
			}

			var options = {
				minDate: minDate,
				maxDate: maxDate,
				onSelect: onSelect
			};				
			
			$loader.hideLoader();
			
			vm.optionsJQ.reload(options);
			vm.optionsJQ.setDate(null);
		}
		
		function getMaxDate() {
			var date = new Date();
			date.setDate(date.getDate() - 1);
			return date;
		}
		
	}

}(angular));