/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('shippingDetail.view.controller', [])
		.controller('ShippingDetailViewController', ShippingDetailViewController);

    ShippingDetailViewController.$inject = [
		'$navigator',
		'$authorizeSends',
		'$headerMobile',
		'$coreConstants'
	];

    function ShippingDetailViewController(
		$navigator,
		$authorizeSends,
		$headerMobile,
		$coreConstants
	){
		var vm = this,
			operation = null,
			viewOperationSent = 'OperationSentView';
		
		vm.back = back;
		vm.send = send;
		
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
		
		function initStates() {			
			operation = angular.copy($navigator.getViewParams().OperationsToSendView.operation);
			
			vm.options = {
				idOperation: operation.idOperation,
				codeTypeOperation: operation.codeTypeOperation,
				typeDetail: $coreConstants.OPERATION_DETAIL.PENDING_SHIPMENT_BEFORE,
				typeModule: $coreConstants.MODULES.SEND,
				onLoad: onLoadDetail,
				flagEnable: operation.flagEnable,
				password: operation.password
			};
		}
		
		function onLoadDetail() {
			vm.showMain = true;
		}
		
		function back() {
			$navigator.path('/pendientes-de-envio');
		}
		
		function send() {			
			$authorizeSends.open([operation.idOperation], function(response) {					

				angular.forEach(response.data.response.listOperationSend, function(operationResp) {					
					if(operationResp.sqOperation === operation.idOperation) {
						if(operationResp.errorCodeSend) {
							operation.errorDescription = operationResp.errorCodeSend;
						} else {
							operation.statusCode = operationResp.statusCode;
						}
					}
				});		

				$navigator.path('/pendientes-de-envio/operacion-enviada', [viewOperationSent, {
					operation: operation
				}]);				
				
			});			
		}	
	}

}(angular));