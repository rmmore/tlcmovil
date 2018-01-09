/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 		   Rolando Paredes Alzamora  (rparedea@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('habilitation.view.controller', [])
		.controller('HabilitationViewController', HabilitationViewController);

    HabilitationViewController.$inject = [
		'$navigator',
		'$habilitationService',
		'$loader',
		'$coreConstants',
		'$tokenCard',
		'$loginService',
		'$stateParams',
		'$headerMobile',
		'$modalService'
	];

    function HabilitationViewController(
		$navigator,
		$habilitationService,
		$loader,
		$coreConstants,
		$tokenCard,
		$loginService,
		$stateParams,
		$headerMobile,
		$modalService
	){
		
		var vm = this;		
		
		vm.enable = enable;
		vm.disable = disable;
		vm.enablePost = enablePost;         
        $headerMobile.back = back; 
        vm.cancel = cancel;
		
		init();
		
		////////////
		
		function init() {

			if(!$navigator.getViewParams().ContractsView || 
				!$navigator.getViewParams().ContractsView.contract) {
				back();
				return;
			}
			
			if($stateParams.isEnable && $navigator.getViewParams().ContractsView.contract.enable === true) {
				$navigator.path('/inicio');
				return;
			}
			
			if($stateParams.isDisable && !$navigator.getViewParams().ContractsView.contract.security) {
				$navigator.path('/inicio');
				return;
			}

			initStates();
		}
		
		function back(type) {		
			if(vm.isDisable) {
				$navigator.path('/inicio');
			} else {
				$navigator.path('/');
			}
		}
		
		function initStates() {
			vm.contract = $navigator.getViewParams().ContractsView.contract;
			
			vm.isEnable = $stateParams.isEnable;
			vm.isDisable = $stateParams.isDisable;
			vm.isSecurity = vm.contract.security;
		}
		
		function enable() {
			$navigator.path('/habilitacion-post');
		}

		function enablePost(){
			$tokenCard.open({
				confirmationAlert: function(callback) {			
					$modalService.open({
						title: $coreConstants.CONFIRMATION,
						description:$coreConstants.MSG_CONFIRM_ENABLE,
						classBody: 'text-center',
						accept: callback
					});
				},
				success: enableSuccess
			});
		}
		
		function enableSuccess(data) {
			var parameters = {
				cdContract: vm.contract.cdContract,
				tokenValue: data.key,
				tokenNumber: data.token
			};
			
			$loader.setMessage($coreConstants.MSG_ENABLE_CONTRACT);  
			
			$habilitationService.enable(parameters).then(function() {
				
				$navigator.getViewParams().ContractsView.contract.enable  = false;
				
				$modalService.open({
					title: $coreConstants.COMPLETED_PROCESS,
					description:$coreConstants.MSG_SUCCESS_ENABLE,
					showCancel: false,
					accept: function() {

						if(!$navigator.getViewParams().ContractsView.contract.affiliate) {		
							$navigator.path('/afiliacion')
						} else {						
							$navigator.path('/inicio', null, {
								reloadMenu: true
							})
						}
					}
				});				
			});
		}
		
		function disable() {
			$tokenCard.open({
				confirmationAlert: function(callback) {			
					$modalService.open({
						title: $coreConstants.CONFIRMATION,
						description:$coreConstants.MSG_CONFIRM_DISABLE,
						classBody: 'text-center',
						accept: callback
					});
				},
				success: disableSuccess
			});
		}
		
		function disableSuccess(data) {
			var parameters = {
				cdContract: vm.contract.cdContract,
				tokenValue: data.key,
				tokenNumber: data.token
			};
			
			$loader.setMessage($coreConstants.MSG_DISABLE_CONTRACT);  
			
			$habilitationService.disable(parameters).then(function() {
				
				$modalService.open({
					title: $coreConstants.COMPLETED_PROCESS,
					description:$coreConstants.MSG_SUCCESS_DISABLE,
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