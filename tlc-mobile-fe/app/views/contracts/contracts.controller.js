/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 *         Rolando Paredes Alzamora  (rparedea@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('contracts.view.controller', [])
		.controller('ContractsViewController', ContractsViewController);

    ContractsViewController.$inject = [
		'$contractsService',
		'$navigator',
		'$loader',
		'$coreConstants',
		'$injector',
		'$contracts',
		'$currency',
		'$interval',
		'$tokenCard',
		'$mainService',
		'$modalService'
	];

    function ContractsViewController(
		$contractsService,
		$navigator,
		$loader,
		$coreConstants,
		$injector,
		$contracts,
		$currency,
		$interval,
		$tokenCard,
		$mainService,
		$modalService
	){
		
		var vm = this,
			nav = 'ContractsView';
		
		vm.selectContract = selectContract;
		
		init();
		
		////////////	
		
		function init() {
			
			// $navigator.clear(nav);
			
			if($navigator.getViewParams().ContractsView) {
				// $mainService.getInstance().logout();
				$navigator.path('/inicio');
			} else {
				getContracts();
			}
		}		
		
		function getContracts() {
				
			validaSiExisteMetodo($loader.setMessage, function() {
				$loader.setMessage($coreConstants.MSG_LOAD_CONTRACTS);
			});
			
			vm.noRecords = false;
			 
			$contractsService.getContracts().then(function(response) {
				
				vm.contracts = (vm.contracts || []).concat(response.data.response.listaContratos || []); 
				
				//vm.showMain = true;
				
				verifyContracts();
				
			});
		}
		
		function verifyContracts() {
			
			if(!vm.contracts.length) {
				
				validaSiExisteMetodo($injector.get('$mainService'), function() {
					validaSiExisteMetodo($injector.get('$mainService').getInstance, function() {
						$injector.get('$mainService').getInstance().noContract = true;
						$navigator.path('/inicio');
					});
				});				
				
				return;
			}
			
			if(vm.contracts.length === 1) {
				vm.showMain = false;
				validaSiExisteMetodo($injector.get('$mainService'), function() {
					validaSiExisteMetodo($injector.get('$mainService').getInstance, function() {
						$injector.get('$mainService').getInstance().onlyAContract = true;
					});
				});
				
				selectContract(vm.contracts[0]);
				return;
			}
			
			vm.showMain = true;
			vm.noRecords = !vm.contracts.length;
		}
		
		function selectContract(contract) {
			
			if(validateContract(contract)) {
				
				var params = {
					cdContract: contract.cdContract,
					dsContract: contract.dsCompany
				};
				
				$contractsService.selectContract(params).then(function(response) {
						
					$injector.get('$mainService').getLoggedUser().then(function() {
				
						$currency.getCurrencyValues();
						
						$contracts.setPermissions(response.data.response);
						
						contract.enable = response.data.response.enable;
						contract.security = response.data.response.security;
						contract.affiliate = response.data.response.affiliate;
					
						$mainService.getInstance().showSetting = true;
					
						if(contract.security) {
							$mainService.getInstance().security = true;
						}
						
						var params = [nav, {
							contract: contract
						}];			
						
						if(!contract.enable) {
							$navigator.path('/habilitacion', params);
						} else if(!contract.affiliate) {
							$navigator.path('/afiliacion', params);
						} else {
							$navigator.path('/inicio', params, {
								reloadMenu: true
							});
						}
					});
				});
			}
		}	
		
		function validateContract(contract) {
			
			var valid = true;
			
			if(contract.cdStatus == $coreConstants.CONTRACT_STATUS.SUSPENDED) {
				valid = false;
				
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_SUSPENDED_CONTRACT,
					showCancel: false
				});
			}
			
			return valid;
		}
		
		function validaSiExisteMetodo(method, callback) {
			var intervalo = $interval(function() {
				if(method) {
					$interval.cancel(intervalo);
					callback();
				}
			}, 200);
		} 
	}

}(angular));