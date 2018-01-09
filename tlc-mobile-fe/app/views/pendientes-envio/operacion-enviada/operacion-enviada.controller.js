/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('operation-sent.view.controller', [])
		.controller('OperationSentViewController', OperationSentViewController);

    OperationSentViewController.$inject = [
		'$navigator',
		'$headerMobile',
		'$coreConstants'
	];

    function OperationSentViewController(
		$navigator,
		$headerMobile,
		$coreConstants
	){
		
		var vm = this,
			viewSend = 'OperationsToSendView';
			
		vm.back = back;
		vm.onLoadDetail = onLoadDetail;
		
		$headerMobile.back = back;

		init();
		
		////////////

		function init() {
			
			$navigator.clear(viewSend);
			
			if(!$navigator.getViewParams().OperationSentView) {
				back();
				return;
			}
			
			initStates();
		}
		
		function back() {
			$navigator.path('/pendientes-de-envio');
		}
		
		function initStates() {
			vm.operation = $navigator.getViewParams().OperationSentView.operation;
			
			vm.options = {
				idOperation: vm.operation.idOperation,
				codeTypeOperation: vm.operation.codeTypeOperation,
				typeDetail: $coreConstants.OPERATION_DETAIL.PENDING_SHIPMENT_AFTER,
				onLoad: onLoadDetail,
				password: vm.operation.password
			};
		}
		
		function onLoadDetail() {
			vm.showMain = true;
		}
	}

}(angular));