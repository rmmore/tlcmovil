/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('authorize-signs.view.controller', [])
		.controller('AuthorizeSignsModalController', AuthorizeSignsModalController);

    AuthorizeSignsModalController.$inject = [
		'$rootScope',
		'$uibModalInstance',
		'$modalService',
		'$coreConstants',
		'$operationsToSignService',
		'$loader',
		'options'
	];

    function AuthorizeSignsModalController(
		$rootScope,
		$uibModalInstance,
		$modalService,
		$coreConstants,
		$operationsToSignService,
		$loader,
		options
	){
		
		var vm = this;
		
		vm.accept = accept;
		vm.cancel = cancel;
		
		initStates();
		
		////////////		
		
		function initStates() {	
			
			vm.isSign = options.type === 'sign';
			vm.isReject = options.type === 'reject';
			
			vm.key = '';
			vm.reasonRejection = null;	
			vm.regex = {reasonRejection: $coreConstants.REGEX.REASON_REJECTION};
			
			vm.options = {
				maxLength: 6,			
				secureKeypad: true,
				autoScroll: true,
				container: '.modal-body'
			}			
		}
		
		function accept() {
			
			if(vm.isReject && !vm.reasonRejection) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_INCOMPLETE_REASON_REJECTION,
					showCancel: false
				});
				return;
			} 
			
			if(vm.isSign && (!vm.key || vm.key.length !== 6)) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_NO_KEY,
					showCancel: false
				});
				return;
			} 
			
			var msg;
			
			if(vm.isReject) {
				msg = $coreConstants.MSG_CONFIRM_REJECT_OPERATION;
			}			
			if(vm.isSign) {
				msg = 	options.idsOperations.length > 1 ?
						$coreConstants.MSG_CONFIRM_SIGNING_OPERATIONS :
						$coreConstants.MSG_CONFIRM_SIGNING_OPERATION;												
			}
			
			$modalService.open({
				title: $coreConstants.CONFIRMATION,
				description: msg,
				showButtonsBody: true,
				classBody: 'text-center',
				accept: vm.isSign ? sign : reject
			});		
		}
	
		function sign() {
			
			var bodyParam = {
				sqOperation: options.idsOperations,
				password: vm.key
			};		
			
			options.idsOperations.length > 1 ?
				$loader.setMessage($coreConstants.MSG_SIGNING_OPERATIONS) :
				$loader.setMessage($coreConstants.MSG_SIGNING_OPERATION); 

			$operationsToSignService.signOperations(bodyParam)
			.then(function(response) {
				close(response);					
			});		
		}
	
		function reject() {
			
			var bodyParam = {
				sqOperation: options.idsOperations[0],
				reasonRejection: vm.reasonRejection
			};		
			
			$loader.setMessage($coreConstants.MSG_REJECTING_OPERATION); 
		
			$operationsToSignService.rejectOperations(bodyParam)
			.then(function(response) {
				close({reasonRejection: vm.reasonRejection, response: response});					
			});		
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