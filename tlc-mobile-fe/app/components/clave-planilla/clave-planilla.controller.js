/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('clave-planilla.controller', [])
		.controller('ClavePlanillaController', ClavePlanillaController);		

	ClavePlanillaController.$inject = [
		'$rootScope',
		'$uibModalInstance',
		'$modalService',
		'$coreConstants',
		'$changePassword',
		'options'
	];
	
	function ClavePlanillaController(
		$rootScope,
		$uibModalInstance,
		$modalService,
		$coreConstants,
		$changePassword,
		options
	) {
		
		var vm = this;	
		
		vm.accept = accept;
		vm.cancel = cancel;
		vm.changePassword = changePassword;
		
		initStates();
		
		////////////
		
		function initStates() {	
			
			vm.password = null;	
			vm.canResetPassword = options.canResetPassword; 
			vm.sqOperation = options.sqOperation;
		}
		
		function accept() {
			
			if(!vm.password) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_NO_WORKSHEET_PASSWORD,
					showCancel: false
				});
				return;
			} 
			
			// if(vm.password.length !== 8) {
				// $modalService.open({
					// title: $coreConstants.ERROR,
					// description: $coreConstants.MSG_INCOMPLETE_WORKSHEET_PASSWORD,
					// showCancel: false
				// });
				// return;
			// } 

			close(vm.password);	
		}

		function changePassword(){
			var vm = this;
			console.log("test changePassword ");
			vm.password = null;
			$changePassword.open({sqOperation: options.sqOperation});
		}
		
		function close(data) {
			localStorage.setItem('modal',null);
			$uibModalInstance.close(data);
			$rootScope.$$listeners['$closeModal'] = null;
		}

		function cancel() {
			localStorage.setItem('modal',null);
			$uibModalInstance.dismiss();
			$rootScope.$$listeners['$closeModal'] = null;
		};		
		
		$rootScope.$on('$closeModal',function(){
			cancel();
		});	

	}
	
}(angular));