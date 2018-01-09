/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('affiliation.view.controller', [])
		.controller('AffiliationViewController', AffiliationViewController);

    AffiliationViewController.$inject = [
		'$navigator',
		'$affiliationService',
		'$loader',
		'$coreConstants',
		'$userKey',
		'$loginService',
		'$stateParams',
		'$headerMobile',
		'$modalService'
	];

    function AffiliationViewController(
		$navigator,
		$affiliationService,
		$loader,
		$coreConstants,
		$userKey,
		$loginService,
		$stateParams,
		$headerMobile,
		$modalService
	){
		
		var vm = this;		
		
		vm.affiliate = affiliate;
		vm.disaffiliation = disaffiliation;
		vm.cancel = cancel;
         
        $headerMobile.back = back; 
		
		init();
		
		////////////
		
		function init() {

			if(!$navigator.getViewParams().ContractsView || 
				!$navigator.getViewParams().ContractsView.contract) {
				back();
				return;
			}	
			
			if($stateParams.isAffiliation && $navigator.getViewParams().ContractsView.contract.affiliate === true) {
				$navigator.path('/inicio');
				return;
			}
			
			if($stateParams.isDisaffiliation && !$navigator.getViewParams().ContractsView.contract.affiliate) {
				$navigator.path('/afiliacion');
				return;
			}

			initStates();
		}
		
		function back() {			
			if(vm.isDisaffiliation) {
				$navigator.path('/inicio');
			} else {
				$navigator.path('/');
			}
		}
		
		function initStates() {
			vm.contract = $navigator.getViewParams().ContractsView.contract;
			
			vm.isAffiliation = $stateParams.isAffiliation;
			vm.isDisaffiliation = $stateParams.isDisaffiliation;
		}
		
		function affiliate() {
			$userKey.open({
				confirmationAlert: function(callback) {			
					$modalService.open({
						title: $coreConstants.CONFIRMATION,
						description:$coreConstants.MSG_CONFIRM_AFFILIATION,
						classBody: 'text-center',
						accept: callback
					});
				},
				success: affiliateSuccess
			});
		}
		
		function affiliateSuccess(key) {
			var parameters = {
				cdContract: vm.contract.cdContract,
				password: key
			};
			
			$loader.setMessage($coreConstants.MSG_AFFILIATING_CONTRACT);  
			
			$affiliationService.affiliate(parameters).then(function() {
				
				$navigator.getViewParams().ContractsView.contract.affiliate  = true;//false
				
				$modalService.open({
					title: $coreConstants.COMPLETED_PROCESS,
					description:$coreConstants.MSG_SUCCESS_AFFILIATION,
					showCancel: false,
					accept: function() {
						$navigator.path('/inicio', null, {
							reloadMenu: true
						})
					}
				});
			});
		}
		
		function disaffiliation() {
			$userKey.open({
				confirmationAlert: function(callback) {			
					$modalService.open({
						title: $coreConstants.CONFIRMATION,
						description:$coreConstants.MSG_CONFIRM_DISAFFILIATION,
						classBody: 'text-center',
						accept: callback
					});
				},
				success: disaffiliationSuccess
			});
		}
		
		function disaffiliationSuccess(key) {
			var parameters = {
				cdContract: vm.contract.cdContract,
				password: key
			};
			
			$loader.setMessage($coreConstants.MSG_DISAFFILIATION_CONTRACT);  
			
			$affiliationService.disaffiliation(parameters).then(function() {
				
				$modalService.open({
					title: $coreConstants.COMPLETED_PROCESS,
					description:$coreConstants.MSG_SUCCESS_DISAFFILIATION,
					showCancel: false,
					accept: $loginService.logoutFull
				});
			});
		}
		
		function cancel() {
			$loginService.logoutFull();
		}
	}

}(angular));