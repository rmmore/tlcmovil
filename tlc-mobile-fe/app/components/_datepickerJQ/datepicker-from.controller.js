/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';	

	angular
		.module('datepicker-from.controller', [])	
		.controller('DatepickerFromController', DatepickerFromController);
		
	DatepickerFromController.$inject = [
		'$movementHistory', 
		'$utilService',
		'$loader'
	];
		
	function DatepickerFromController(
		$movementHistory, 
		$utilService,
		$loader
	) {
		
		var vm = this;
		
		vm.onSelect = onSelect;
		
		$movementHistory.defaultDtFrom = defaultDtFrom;
		$movementHistory.readyConfig = init;
		
		var today = new Date().setHours(0,0,0,0);
		
		vm.optionsJQ = {};
		
		////////////		
				
		function init() {	
			
			vm.show = true;
			
			initOptions();
			
			// false para que en la vista no se carge la data inicial
			$movementHistory.defaultDtFrom(false);
		}
		
		function initDate() {

			// Asigna el dia inicial por defecto
			var dtFrom = new Date();
			dtFrom.setDate(dtFrom.getDate() - $movementHistory.getDateRange()['INTER_DATE']/* + 1*/);
			
			vm.optionsJQ.setDate(dtFrom);
		}
		
		function initOptions() {
		
			var minDate = getMaxDate(),
				maxDate = getMaxDate();
				
			// Puede consultar hasta '6' meses anteriores
			minDate.setDate(minDate.getDate() - $movementHistory.getDateRange()['RANGE_DATE'] + 1);

			var options = {
				minDate: minDate,
				maxDate: maxDate,
				onSelect: onSelect
			};
			
			vm.optionsJQ.reload(options);
		}
		
		function defaultDtFrom(autoLoad) {
			
			var dtFrom = new Date();
			dtFrom.setDate(dtFrom.getDate() - $movementHistory.getDateRange()['INTER_DATE']/* + 1*/);

			$movementHistory.defaultDtEnd(dtFrom, autoLoad);
			
			initDate();
		}
		
		function onSelect(date) {
			
			$loader.showLoader();				
			$movementHistory.onSelectDtFrom(new Date(date));		
			$utilService.scroll('.tab-content', '.mtp-calendar');					
			$movementHistory.showDtEnd();	
		}	
		
		function getMaxDate() {
			var date = new Date();
			date.setDate(date.getDate() - 1);
			return date;
		}	
	}

}(angular));