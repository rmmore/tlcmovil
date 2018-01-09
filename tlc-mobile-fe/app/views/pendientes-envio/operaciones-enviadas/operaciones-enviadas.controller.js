/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('operationsSent.view.controller', [])
		.controller('OperationsSentViewController', OperationsSentViewController);

    OperationsSentViewController.$inject = [
		'$navigator',
		'$headerMobile'
	];

    function OperationsSentViewController(
		$navigator,
		$headerMobile
	){
		
		var vm = this;
		
		vm.back = back;
		
		$headerMobile.back = back;
		
		init();
		
		////////////		
		
		function init() {
			
			if(!$navigator.getViewParams().OperationsToSendView) {
				back();
				return;
			}

			initStates();
		}
		
		function back() {
			$navigator.path('/pendientes-de-envio');
		}
		
		function initStates() {			
			vm.operationsSent = $navigator.getViewParams().OperationsToSendView.operationsSent;					
			vm.someHaveErrors = $navigator.getViewParams().OperationsToSendView.someHaveErrors;				
			vm.allHaveErrors = $navigator.getViewParams().OperationsToSendView.allHaveErrors;
			vm.nroSuccess = $navigator.getViewParams().OperationsToSendView.nroSuccess;				
		}		
	}

}(angular));