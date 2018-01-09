/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict'

	angular
		.module('authorize-sends.view.controller', [])
		.controller('AuthorizeSendsModalController', AuthorizeSendsModalController);
		
	AuthorizeSendsModalController.$inject = [
		'$rootScope',
		'$uibModalInstance',
		'$modalService',
		'$coreConstants',
		'$authorizeSendsService',
		'$loader',
		'options'
	];
		
	function AuthorizeSendsModalController(
		$rootScope,
		$uibModalInstance,
		$modalService,
		$coreConstants,
		$authorizeSendsService,
		$loader,
		options
	) {
		
		var vm = this;
		
		vm.accept = accept;
		vm.cancel = cancel;
		
		initStates();
		
		////////////		
		
		function initStates() {			
			vm.tokenValue = '';	
			vm.tokenKey = '';			
			
			vm.optionsValue = {
				maxLength: 2,
				autoScroll: '.auth-keys',
				container: '.modal-body',
				random: true
			};			
			
			vm.optionsKey = {
				maxLength: 6,
				autoScroll: '.auth-keys',
				container: '.modal-body',
				secureKeypad: true
			};			
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
			
			if(!vm.key || vm.key.length !== 6) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_NO_KEY,
					showCancel: false
				});
				
				return;
			}
			
			$modalService.open({
				title: $coreConstants.CONFIRMATION,
				description: options.idsOperations.length > 1 ? 
								$coreConstants.MSG_CONFIRM_SENDING_OPERATIONS :
								$coreConstants.MSG_CONFIRM_SENDING_OPERATION,
				classBody: 'text-center',
				accept: send
			});
		}	
		
		function send() {
			var bodyParam = {
				listSqOperation: options.idsOperations,
				tokenNumber: vm.token,
				tokenValue: vm.key
			};
			
			options.idsOperations.length > 1 ?
				$loader.setMessage($coreConstants.MSG_SENDING_OPERATIONS) :
				$loader.setMessage($coreConstants.MSG_SENDING_OPERATION);
						
			$authorizeSendsService.sendOperations(bodyParam)
			.then(function(response) {			
				close(response);
			});
		} 	
		
		function close(data) {
			$uibModalInstance.close(data);
			$rootScope.$$listeners['$closeModal'] = null;
		}
		
		function cancel(flag) {
			$uibModalInstance.dismiss(flag);
			$rootScope.$$listeners['$closeModal'] = null;
		}
		
		$rootScope.$on('$closeModal',function(){
			cancel();
		});
	}
	
}(angular));