/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('filters-alert.controller', [])	
		.controller('FiltersAlertMovementsController', FiltersAlertMovementsController)
		.controller('FiltersAlertAccountsController', FiltersAlertAccountsController)
		.controller('FiltersAlertPendingOperationsController', FiltersAlertPendingOperationsController)
		.controller('FiltersAlertBeneficiariesController', FiltersAlertBeneficiariesController)
		.controller('FiltersAlertProvidersController', FiltersAlertProvidersController);
		
	FiltersAlertAccountsController.$inject = 
	FiltersAlertMovementsController.$inject = 
	FiltersAlertPendingOperationsController.$inject =
	FiltersAlertProvidersController.$inject = 
	FiltersAlertBeneficiariesController.$inject = [
		'$filtersAlert', 
		'$coreConstants',
		'$utilService',
		'$timeout'
	];
	
	function FiltersAlertMovementsController(
		$filtersAlert, 
		$coreConstants,
		$utilService,
		$timeout
	) {
		
		var vm = this;	
		
		$filtersAlert.showAlertMovements = showAlert;
		
		vm.alertOptions = {
			type: 'filter',
			show: true,
			closeable: true
		};
		
		var months = $coreConstants.MONTHS;

		function complete(val) {
			return ('00' + (val || '')).slice (-2);
		}		
		
		showAlert({isLast20: true});
		
		function showAlert(options) {
			
			vm.alertOptions.show = false;
				
			$timeout(function() {
				var msg = [];
				
				if(options.dtFrom && options.dtEnd) {
					
					options.dtFrom = $utilService.dateFormat(options.dtFrom, 'string'),
					options.dtEnd = $utilService.dateFormat(options.dtEnd, 'string'),
						
					msg.push($coreConstants.MSG_FILTER_HISTORIC
											.replace('{{from}}', options.dtFrom)
											.replace('{{end}}', options.dtEnd));
				}
				
				
				if(options.isLast20) {
					msg.push($coreConstants.MSG_FILTER_LAST20_MOVEMENTS);
				}
				
				if(options.typeOperation && options.typeOperation.name) {
					msg.push($coreConstants.MSG_FILTER_TYPE_OPERATION + options.typeOperation.name);
				}			
				
				vm.alertOptions.message = msg.join('<br/>');
				
				if(vm.alertOptions.message) {
					vm.alertOptions.show = true
				}
			})
		}		
	}
	
	function FiltersAlertAccountsController(
		$filtersAlert, 
		$coreConstants
	) {
		
		var vm = this;	
		
		$filtersAlert.showAlertAccounts = showAlert;
		
		vm.alertOptions = {
			type: 'filter',
			show: false,
			closeable: true
		};
		
		function showAlert(options) {
			
			vm.alertOptions.show = false;
				
			var msg = [];
			
			if(options.typeAccount) {
				msg.push($coreConstants.MSG_FILTER_TYPE_ACCOUNT + options.typeAccount.name);				
			} 
			
			if(options.typeCoin) {
				msg.push($coreConstants.MSG_FILTER_TYPE_COIN + options.typeCoin.name);				
			} 		
			
			vm.alertOptions.message = msg.join('<br/>');
			
			if(vm.alertOptions.message) {
				vm.alertOptions.show = true
			}
		}		
	}
	
	function FiltersAlertPendingOperationsController(
		$filtersAlert, 
		$coreConstants
	) {
		
		var vm = this;	
		
		$filtersAlert.showAlertPendingOperations = showAlert;
		
		vm.alertOptions = {
			type: 'filter',
			show: false,
			closeable: true
		};
		
		function showAlert(options) {
			
			vm.alertOptions.show = false;
				
			var msg = [];
			
			if(options.typeOperation) {
				msg.push($coreConstants.MSG_FILTER_TYPE_OPERATION + options.typeOperation.name);				
			} 		
			
			vm.alertOptions.message = msg.join('<br/>');
			
			if(vm.alertOptions.message) {
				vm.alertOptions.show = true
			}
		}		
	}	
	
	function FiltersAlertBeneficiariesController(
		$filtersAlert, 
		$coreConstants
	) {
		
		var vm = this;	
		
		$filtersAlert.showAlertBeneficiaries = showAlert;
		
		vm.alertOptions = {
			type: 'filter',
			show: false,
			closeable: true
		};
		
		function showAlert(options) {
			
			vm.alertOptions.show = false;
				
			var msg = [];
			
			if(options.search) {
				msg.push($coreConstants.MSG_FILTER_SEARCH + options.search);				
			} 
			
			if(options.orderBy) {
				msg.push($coreConstants.MSG_FILTER_ORDER_BY + options.orderBy.name);				
			} 		
			
			vm.alertOptions.message = msg.join('<br/>');
			
			if(vm.alertOptions.message) {
				vm.alertOptions.show = true
			}
		}		
	}	
	
	function FiltersAlertProvidersController(
		$filtersAlert, 
		$coreConstants
	) {
		
		var vm = this;	
		
		$filtersAlert.showAlertProviders = showAlert;
		
		vm.alertOptions = {
			type: 'filter',
			show: false,
			closeable: true
		};
		
		function showAlert(options) {
			
			vm.alertOptions.show = false;
				
			var msg = [];
			
			if(options.search) {
				msg.push($coreConstants.MSG_FILTER_SEARCH + options.search);				
			} 
			
			if(options.orderBy) {
				msg.push($coreConstants.MSG_FILTER_ORDER_BY + options.orderBy.name);				
			} 		
			
			vm.alertOptions.message = msg.join('<br/>');
			
			if(vm.alertOptions.message) {
				vm.alertOptions.show = true
			}
		}		
	}	

}(angular));


