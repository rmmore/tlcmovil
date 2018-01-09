/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('operationsToSend.view.controller', [])
		.controller('OperationsToSendViewController', OperationsToSendViewController);

    OperationsToSendViewController.$inject = [
		'$operationsToSendService',
		'$navigator',
		'$dropdownList',
		'$loader',
		'$coreConstants',
		'$authorizeSends',
		'$headerMobile',
		'$filtersAlert',
		'$timeout',
		'$clavePlanilla',
		'$rootScope'
	];

    function OperationsToSendViewController(
		$operationsToSendService,
		$navigator,
		$dropdownList,
		$loader,
		$coreConstants,
		$authorizeSends,
		$headerMobile,
		$filtersAlert,
		$timeout,
		$clavePlanilla,
		$rootScope
	){
		var vm = this,
			filters = {},
			view = 'OperationsToSendView',
			page = null,
			flagEnable = null;
			
		vm.filter = filter;
		vm.clickOperation = clickOperation;
		vm.selectCheckAll = selectCheckAll;
		vm.selectOperation = selectOperation;
		vm.send = send;
		
		$headerMobile.back = back;
			
		init();
		
		////////////
		
		function init() {
			
			retrieveFilters();
			
			$navigator.clear(view);
			
			if(!$navigator.getViewParams().ContractsView) {
				back();
				return;
			}
			
			initStates();
		}
		
		function back() {
			$navigator.path('/inicio');
		}	
		
		// Recupera el filtro y la pagina seleccionada
		function retrieveFilters() {			
			
			if($navigator.getViewParams().OperationsToSendView &&
				$navigator.getViewParams().OperationsToSendView.filterData &&
				$navigator.getViewParams().OperationsToSendView.filterData.id) {
					
				filters = {
					typeOperation: $navigator.getViewParams().OperationsToSendView.filterData
				};
				
				page = $navigator.getViewParams().OperationsToSendView.page;
		 
				$timeout(function() {
					$filtersAlert.showAlertPendingOperations({
						typeOperation: filters.typeOperation
					});
					
					$dropdownList.defaultTypeOperation(null, filters.typeOperation.id);
				}, 500);
			}
		}	
		
		function initStates() {
			
			filters.typeOperation = filters.typeOperation || {};
			
			vm.areAnySelected = false;
		
			vm.scroll = {
				request: getOperations,
				initPage: page
			};
			
			vm.alertMaxOperations = {
				type: $coreConstants.ALERT_INFO,
				message: $coreConstants.MSG_MAXIMUM_OPERATIONS_TO_SEND,
				closeable: true,
				show: false				
			};
		}
		
		function getOperations(paramsScroll, callbackScroll) {
			
			var params = {
				filterData:  filters.typeOperation.id
			};
			
			$loader.setMessage($coreConstants.MSG_LOAD_OPERATIONS_SEND);
			
			vm.operationsToSend = [];
				
			page = paramsScroll.page;
			
			$operationsToSendService.getOperations(angular.merge(params, paramsScroll))
			.then(function(response) {
				
				vm.operationsToSend = (vm.operationsToSend || []).concat(response.data.response.paginationOperation.list || []); 
				
				vm.flagEnable = response.data.response.flagEnable;
				$rootScope.flagEnableDetail = vm.flagEnable;				
							
				vm.noRecords = !vm.operationsToSend.length;
				
				if(vm.operationsToSend.length > $coreConstants.MAX_OPERATIONS_TO_SEND) {
					vm.alertMaxOperations.show = true;
					vm.hideSelectAll = true;
				} else {					
					vm.hideSelectAll = false;
				}
				
				if(callbackScroll) {
					callbackScroll(response.data.response.paginationOperation.count, response.data.response.paginationOperation.pages);
				}
				
				vm.checkAll = false; 
				vm.showMain = true;
			});		
		}
		
		function selectOperation() {
			
			vm.areAnySelected = false;
			vm.checkAll = true;
			
			angular.forEach(vm.operationsToSend, function(v) {
				if(v.checked) {
					vm.areAnySelected = true;
				} else {
					vm.checkAll = false;
				}
			});
		}
		
		function selectCheckAll() {	
			
			angular.forEach(vm.operationsToSend, function(v, k) {
				if(!vm.areAnySelected && vm.checkAll) {
					if(k < $coreConstants.MAX_OPERATIONS_TO_SEND) {
						v.checked = true;
					}
				} 
				else {
					v.checked = vm.checkAll;
				}
			});
			
			if(!vm.areAnySelected && vm.checkAll && vm.operationsToSend.length > $coreConstants.MAX_OPERATIONS_TO_SEND) {				
				vm.checkAll = false;
				vm.areAnySelected = true;
			} else {
				vm.areAnySelected = vm.checkAll;
			}
		}
		
		function send() {			
			
			var selectedOperations = [];
			var idsOperations = [];
			
			angular.forEach(vm.operationsToSend, function(v) {
				if(v.checked) {
					idsOperations.push(v.sqOperation);
					selectedOperations.push(v);
				}
			});	
			
			$authorizeSends.open(idsOperations, function(response) {
				
				var someHaveErrors = false,
					allHaveErrors = false,
					countErrors = 0;
				
				angular.forEach(response.data.response.listOperationSend, function(operationResp) {
					angular.forEach(selectedOperations, function(operation) {
						if(operation.sqOperation === operationResp.sqOperation) {
							if(operationResp.errorCodeSend) {
								operation.errorDescription = operationResp.errorCodeSend;
								countErrors++
								someHaveErrors = true;
							} else {
								operation.statusCode = operationResp.statusCode;
							}
						}
					});
				});
				
				allHaveErrors = countErrors === selectedOperations.length;
				
				$navigator.path('/pendientes-de-envio/operaciones-enviadas', [view, {
					allHaveErrors: allHaveErrors,
					someHaveErrors: someHaveErrors && !allHaveErrors,
					nroSuccess: selectedOperations.length - countErrors,
					operationsSent: selectedOperations
				}]);
			});	
		}
		
		function filter() {	
			
			_filter();	
			
			$filtersAlert.showAlertPendingOperations({
				typeOperation: filters.typeOperation
			});	
		}
		
		function _filter() {
			
			vm.areAnySelected = false;
			vm.checkAll = false;
			vm.operationsToSend = [];
			vm.noRecords = false;	
             
            filters.typeOperation = $dropdownList.getTypeOperation();		
			
			vm.scroll.init();	
		}
         
        function clickOperation(operation) {
			if(operation.hasPassword) {
				$clavePlanilla.open({
					sqOperation: operation.sqOperation,
					canResetPassword: operation.canResetPassword,
					success: function(password) {
						goOperationDetail(operation, password);
					}
				});
			} else {		
				goOperationDetail(operation);
			}
        }
         
        function goOperationDetail(operation, password) {	
			$navigator.path('/pendientes-de-envio/detalle-de-envio', [view, {
				operation: {
					idOperation: operation.sqOperation,
					codeTypeOperation: operation.codeTypeOperation,
					password: password,
					flagEnable:$rootScope.flagEnableDetail
				},
				filterData:  $dropdownList.getTypeOperation(),
				page: page
			}]);
        }
	}

}(angular));