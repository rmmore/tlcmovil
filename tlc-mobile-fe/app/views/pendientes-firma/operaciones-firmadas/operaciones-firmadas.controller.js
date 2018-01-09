/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('operationsSigneds.view.controller', [])
		.controller('OperationsSignedsViewController', OperationsSignedsViewController);

    OperationsSignedsViewController.$inject = [
		'$navigator',
		'$headerMobile'
	];

    function OperationsSignedsViewController(
		$navigator,
		$headerMobile
	){
		
		var vm = this,
			viewSend = 'OperationsToSendView';
		
		vm.back = back;
		vm.goSend = goSend;
		
		$headerMobile.back = back;
		
		init();
		
		////////////
		
		function init() {
			
			if(!$navigator.getViewParams().OperationsToSigningView) {
				back();
				return;
			}

			initStates();
		}
		
		function back() {
			$navigator.path('/pendientes-de-firma');
		}
		
		function initStates() {			
			vm.operations = $navigator.getViewParams().OperationsToSigningView.operations;						
			vm.someHaveErrors = $navigator.getViewParams().OperationsToSigningView.someHaveErrors;				
			vm.allHaveErrors = $navigator.getViewParams().OperationsToSigningView.allHaveErrors;	
			vm.isReject = $navigator.getViewParams().OperationsToSigningView.isReject;
			vm.isSign = $navigator.getViewParams().OperationsToSigningView.isSign;			
			vm.reasonRejection = $navigator.getViewParams().OperationsToSigningView.reasonRejection;	
			vm.nroSuccess = $navigator.getViewParams().OperationsToSigningView.nroSuccess;
			vm.hasPendingSent = $navigator.getViewParams().OperationsToSigningView.hasPendingSent;
			vm.flagSend = $navigator.getViewParams().OperationsToSigningView.flagSend;
		}	
		
		function goSend() {
			if(vm.operations.length > 1) {
				$navigator.path('/pendientes-de-envio');
			} else {
				$navigator.path('/pendientes-de-envio/detalle-de-envio', [viewSend, {
					operation: {
						idOperation: vm.operations[0].sqOperation,
						codeTypeOperation: vm.operations[0].codeTypeOperation,
						flagEnable: vm.flagSend
					}
				}]);
			}
		}
	}

}(angular));