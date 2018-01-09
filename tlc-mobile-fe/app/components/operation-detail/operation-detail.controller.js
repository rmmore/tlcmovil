/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('operation-detail.controller', [])
		.controller('OperationDetailController', OperationDetailController);
	
	OperationDetailController.$inject = [
		'$operationDetailService',
		'$navigator',
		'$loader',
		'$coreConstants',
		'$currencyConstants',
		'$rootScope'
	];
	
	function OperationDetailController (
		$operationDetailService,
		$navigator,
		$loader,
		$coreConstants,
		$currencyConstants,
		$rootScope
	) {
		
		var vm = this,
			viewBenef = 'BeneficiariesView',
			viewProv = 'ProvidersView';
		
		vm.goBeneficiaries 	= goBeneficiaries;
		vm.goProviders 		= goProviders;
		
		vm.options = vm.options || {};

		init();
		
		////////////
		
		function init() {
			
			if(vm.options && vm.options.idOperation) {
				getOperationDetail();
			}
			
			$navigator.clear(viewBenef);
			
			vm.SOL_CODE = $currencyConstants.SOL_CODE;
		}
		
		function getOperationDetail() {
			
			var queryParam = {
				sqOperation: vm.options.idOperation,
				typeModule: vm.options.typeModule,
				password: vm.options.password
			};
			
			$loader.setMessage($coreConstants.MSG_LOAD_OPERATION_DETAIL);
			
			$operationDetailService.getOperationDetail(queryParam, vm.options.codeTypeOperation)
			.then(function(response) {		
				
				vm.operation = response.data.response;
				
				if(vm.options.onLoad) {
					vm.options.onLoad(response.data.response);
				}
			}, function() {
				$rootScope.noCloseModals = true;
				$navigator.goModule();
			});		
		}
		
		function goBeneficiaries() {
			var module = $navigator.getModule();
			$navigator.path(module + '/beneficiarios', [viewBenef, {
				idOperation: vm.options.idOperation,
				viewParent: $navigator.path(),
				typeModule: vm.options.typeModule
			}]);
		}
		
		function goProviders() {
			var module = $navigator.getModule();
			$navigator.path(module + '/proveedores', [viewProv, {
				idOperation: vm.options.idOperation,
				viewParent: $navigator.path(),
				typeModule: vm.options.typeModule
			}]);
		}
    }

}(angular));