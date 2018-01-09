/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('signed-operation.view.controller', [])
		.controller('SignedOperationViewController', SignedOperationViewController);

    SignedOperationViewController.$inject = [
		'$navigator',
		'$headerMobile',
		'$coreConstants',
		'$authorizeSends'
	];

    function SignedOperationViewController(
		$navigator,
		$headerMobile,
		$coreConstants,
		$authorizeSends
	){
		
		var vm = this,
			viewSing = 'OperationsToSigningView',
			viewSend = 'OperationsToSendView',
			viewOperationSent = 'OperationSentView';
			
		vm.back = back;
		vm.goSend = goSend;
		vm.send = send;
		
		$headerMobile.back = back;

		init();
		
		////////////
	
		function init() {
			
			$navigator.clear(viewSing);
			
			if(!$navigator.getViewParams().SignedOperationView) {
				back();
				return;
			}
			
			initStates();
		}
		
		function back() {
			$navigator.path('/pendientes-de-firma');
		}
	
		function initStates() {
			vm.operation = $navigator.getViewParams().SignedOperationView.operation;	
			vm.isReject = $navigator.getViewParams().SignedOperationView.isReject;
			vm.isSign = $navigator.getViewParams().SignedOperationView.isSign;
			vm.reasonRejection = $navigator.getViewParams().SignedOperationView.reasonRejection;
			vm.hasPendingSent = $navigator.getViewParams().SignedOperationView.hasPendingSent;
			vm.flagSend = $navigator.getViewParams().SignedOperationView.flagSend;
			
			vm.options = {
				idOperation: vm.operation.idOperation,
				codeTypeOperation: vm.operation.codeTypeOperation,
				typeDetail: $coreConstants.OPERATION_DETAIL.PENDING_SIGNATURE_AFTER,
				onLoad: onLoadDetail,
				password: vm.operation.password
			};
		}
		
		function onLoadDetail() {
			vm.showMain = true;
		}
		
		function goSend() {
			$navigator.path('/pendientes-de-envio/detalle-de-envio', [viewSend, {
				operation: vm.operation
			}]);			
		}
		
		function send() {			
			$authorizeSends.open([vm.operation.idOperation], function(response) {					

				angular.forEach(response.data.response.listOperationSend, function(operationResp) {					
					if(operationResp.sqOperation === vm.operation.idOperation) {
						if(operationResp.errorCodeSend) {
							vm.operation.errorDescription = operationResp.errorCodeSend;
						} else {
							vm.operation.statusCode = operationResp.statusCode;
						}
					}
				});		

				$navigator.path('/pendientes-de-envio/operacion-enviada', [viewOperationSent, {
					operation: vm.operation
				}]);				
				
			});			
		}
	}

}(angular));