/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('signatureDetail.view.controller', [])
		.controller('SignatureDetailViewController', SignatureDetailViewController);

    SignatureDetailViewController.$inject = [
		'$navigator',
		'$authorizeSigns',
		'$headerMobile',
		'$coreConstants'
	];

    function SignatureDetailViewController(
		$navigator,
		$authorizeSigns,
		$headerMobile,
		$coreConstants
	){
		var vm = this,
			operation = null,
			viewSignedOperation = 'SignedOperationView';
		
		vm.back = back;
		vm.reject = reject;
		vm.sign = sign;
		
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
			operation = $navigator.getViewParams().OperationsToSigningView.operation;	
			
			vm.options = {
				idOperation: operation.idOperation,
				codeTypeOperation: operation.codeTypeOperation,
				typeDetail: $coreConstants.OPERATION_DETAIL.PENDING_SIGNATURE_BEFORE,
				typeModule: $coreConstants.MODULES.SIGN,
				onLoad: onLoadDetail,
				password: operation.password
			};
		}
		
		function onLoadDetail() {
			vm.showMain = true;
		}
		
		function reject() {
			$authorizeSigns.open([operation.idOperation], 'reject', function(data) {
				
				// angular.forEach(data.response.operationResponse, function(operationResp) {
					// if(operationResp.sqOperation === operation.idOperation) {						
						// if(operationResp.errorDesc) {
							// operation.errorDescription = operationResp.errorDesc;
						// } else {
							// operation.statusCode = operationResp.statusCode;
						// }	
					// }
				// });	
					
				if(data.response.data.response.operationResponse && data.response.data.response.operationResponse.errorDesc) {
					operation.errorDescription = data.response.data.response.operationResponse.errorDesc;
				} else {
					operation.statusCode = $coreConstants.OPERATION_STATUS.REJECT_SIGNATURE;
				}

				$navigator.path('/pendientes-de-firma/operacion-rechazada', [viewSignedOperation, {
					operation: operation,
					isReject: true, 
					reasonRejection: data.reasonRejection
				}]);
			});	
		}
		
		function sign() {
			$authorizeSigns.open([operation.idOperation], 'sign', function(response) {
				
				var hasPendingSent = false;
				
				angular.forEach(response.data.response.operationResponse, function(operationResp) {
					if(operationResp.sqOperation === operation.idOperation) {						
						if(operationResp.errorDesc) {
							operation.errorDescription = operationResp.errorDesc;
						} else {
							operation.statusCode = operationResp.statusCode;
						}							
				
						if(operationResp.statusCode == $coreConstants.OPERATION_STATUS.PENDIENTE_ENVIO) {
							hasPendingSent = true;
						}
					}
				});					
				
				$navigator.path('/pendientes-de-firma/operacion-firmada', [viewSignedOperation, {
					operation: operation,
					isSign: true, 
					hasPendingSent: hasPendingSent,
					flagSend: response.data.response.flagSend
				}]);
			});	
		}		
	}

}(angular));