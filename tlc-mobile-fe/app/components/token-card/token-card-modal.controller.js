/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('token-card-modal.controller', [])
		.controller('TokenCardModalController', TokenCardModalController);

    TokenCardModalController.$inject = [
		'$rootScope',
		'$uibModalInstance',
		'$modalService',
		'$coreConstants',
		'options'
	];

    function TokenCardModalController(
		$rootScope,
		$uibModalInstance,
		$modalService,
		$coreConstants,
		options
	){
		
		var vm = this;
		
		vm.accept = accept;
		vm.cancel = cancel;
		
		initStates();
		
		////////////		
		
		function initStates() {	
			
			vm.token = '';	
			vm.key = '';				
		}
		
		function accept() {
			
			if(!vm.token || vm.token.length !== 2) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_NO_TOKEN,
					showCancel: false
				});
				
				return;
			}
			
			if(!vm.key) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_NO_KEY,
					showCancel: false
				});				
				return;
			}
			if(!vm.key || vm.key.length < 6) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_NO_KEY_INCOMPLETE,
					showCancel: false
				});				
				return;
			} 
			
			if(options.confirmAlert) {
				options.confirmAlert(function() {
					close({token: vm.token, key: vm.key});
				})
			} else {
				close({token: vm.token, key: vm.key});
			}		
			
		}
		
		function close(data) {
			$uibModalInstance.close(data);
			$rootScope.$$listeners['$closeModal'] = null;
		}

		function cancel() {
			$uibModalInstance.dismiss();
			$rootScope.$$listeners['$closeModal'] = null;
		};		
		
		$rootScope.$on('$closeModal',function(){
			cancel();
		});
	}

}(angular));