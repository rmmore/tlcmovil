/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';	

	angular
		.module('datepicker.controller', [])	
		.controller('DatepickerController', DatepickerController);
		
	DatepickerController.$inject = [
		'$timeout',
		'$movementHistory',
		'$datepickerService',
		'$coreConstants'
	];
	
	function DatepickerController(
		$timeout, 
		$movementHistory,
		$datepickerService,
		$coreConstants
	) {		
		
		var vm = this;
		
		vm.showDtFrom = $movementHistory.showDtFrom = showDtFrom;
		vm.showDtEnd = $movementHistory.showDtEnd = showDtEnd;
		
		showDtFrom();
		
		init();
		
		////////////
		
		function init() {			
			showDtFrom();
			getDateRange();
		}
		
		function showDtFrom(){
			vm.show = {from: true, end: false};
		}
		
		function showDtEnd(time){
			$timeout(function() {
				vm.show = {from: false, end: true};
			}, (time || 0) * 1000);
		}
		
		function getDateRange() {
			
			var parameters = {
				sParamValue: $coreConstants.DATEPICKER_PARAMS
			};
			
			$datepickerService.getDateRange(parameters).then(function(response) {
				
				response.data.response.sMapParamValue.INTER_DATE = Number(response.data.response.sMapParamValue.INTER_DATE);
				response.data.response.sMapParamValue.RANGE_DATE = Number(response.data.response.sMapParamValue.RANGE_DATE);
				
				$movementHistory.setDateRange(response.data.response.sMapParamValue);
				$movementHistory.readyConfig();
			});
		}
	}

}(angular));
