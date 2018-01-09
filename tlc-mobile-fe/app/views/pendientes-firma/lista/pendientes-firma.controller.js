/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function() {
    'use strict';
     
    angular
        .module('operationsToSign.view.controller', [])
        .controller('OperationsToSignViewController', OperationsToSignViewController)
 
    OperationsToSignViewController.$inject = [
        '$operationsToSignService',
        '$navigator',
        '$dropdownList',
        '$loader',
        '$coreConstants',
        '$authorizeSigns',
        '$headerMobile',
        '$filtersAlert',
		'$timeout',
		'$modalService',
		'$clavePlanilla',
        '$storageService',
        '$rootScope'
    ];
 
    function OperationsToSignViewController(
        $operationsToSignService,
        $navigator,
        $dropdownList,
        $loader,
        $coreConstants,
        $authorizeSigns,
        $headerMobile,
        $filtersAlert,
		$timeout,
		$modalService,
		$clavePlanilla,
        $storageService,
        $rootScope
    ){
        var vm = this,
            filters = {},
            view = 'OperationsToSigningView',
            viewSignedOperation = 'SignedOperationView',
			page = null;
             
        vm.filter = filter;
        vm.clickOperation = clickOperation;
        vm.selectCheckAll = selectCheckAll;
        vm.selectOperation = selectOperation;
        vm.sign = sign;         
         
        $headerMobile.back = back;
         
        init();
         
        ////////////
         
        function init() {
			
			retrieveFilters();
				
            $navigator.clear(view);
            $navigator.clear(viewSignedOperation);
             
            if(!$navigator.getViewParams().ContractsView) {
                back();
                return;
            }
             
            initStates();           
        }
		
		// Recupera el filtro y la pagina seleccionada
		function retrieveFilters() {			
			
			if($navigator.getViewParams().OperationsToSigningView &&
				$navigator.getViewParams().OperationsToSigningView.filterData &&
				$navigator.getViewParams().OperationsToSigningView.filterData.id) {
					
				filters = {
					typeOperation: $navigator.getViewParams().OperationsToSigningView.filterData
				};
				
				page = $navigator.getViewParams().OperationsToSigningView.page;
		 
				$timeout(function() {
					$filtersAlert.showAlertPendingOperations({
						typeOperation: filters.typeOperation
					});
					
					$dropdownList.defaultTypeOperation(null, filters.typeOperation.id);
				}, 500);
			}
		} 
         
        function back() {
            $navigator.path('/inicio');
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
                message: $coreConstants.MSG_MAXIMUM_OPERATIONS_TO_SIGN,
				closeable: true,
                show: false            
            };
        }
         
        function getOperations(paramsScroll, callbackScroll) {
             
            var params = {
                filterData:  filters.typeOperation.id
            };
             
            $loader.setMessage($coreConstants.MSG_LOAD_OPERATIONS_SIGNING);
             
			vm.operationsToSign = [];
				
			page = paramsScroll.page;
			
            $operationsToSignService.getOperations(angular.merge(params, paramsScroll))
            .then(function(response) {
				
                vm.operationsToSign = (vm.operationsToSign || []).concat(response.data.response.paginationOperation.list || []); 
                 
                vm.noRecords = !vm.operationsToSign.length;
                 
                if(vm.operationsToSign.length > $coreConstants.MAX_OPERATIONS_TO_SIGN) {
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
             
            angular.forEach(vm.operationsToSign, function(v) {
                if(v.checked) {
                    vm.areAnySelected = true;
                } else {
                    vm.checkAll = false;
                }
            });
        }
         
        function selectCheckAll() { 
             
            angular.forEach(vm.operationsToSign, function(v, k) {
                if(!vm.areAnySelected && vm.checkAll) {
                    if(k < $coreConstants.MAX_OPERATIONS_TO_SIGN) {
                        v.checked = true;
                    }
                } 
                else {
                    v.checked = vm.checkAll;
                }
            });         
             
            if(!vm.areAnySelected && vm.checkAll && vm.operationsToSign.length > $coreConstants.MAX_OPERATIONS_TO_SIGN) {                
                vm.checkAll = false;
                vm.areAnySelected = true;
            } else {
                vm.areAnySelected = vm.checkAll;
            }
        }
         
        function sign() {
             
            var selectedOperations = [];
            var idsOperations = [];
             
            angular.forEach(vm.operationsToSign, function(v) {
                if(v.checked) {
                    idsOperations.push(v.sqOperation);
                    selectedOperations.push(v);
                }
            }); 
             
            $authorizeSigns.open(idsOperations, 'sign', function(response) {
                 
                var someHaveErrors = false,
                    allHaveErrors = false,
                    hasPendingSent = false,
                    countErrors = 0;
                 
                angular.forEach(response.data.response.operationResponse, function(operationResp) {
                    angular.forEach(selectedOperations, function(operation) {
                        if(operation.sqOperation === operationResp.sqOperation) {
                            if(operationResp.errorDesc) {
                                operation.errorDescription = operationResp.errorDesc;
                                countErrors++
                                someHaveErrors = true;
                            } else {
                                operation.statusCode = operationResp.statusCode;
                            }
                     
                            if(operationResp.statusCode == $coreConstants.OPERATION_STATUS.PENDIENTE_ENVIO) {
                                hasPendingSent = true;
                            }
                        }
                    });
                });
                     
                allHaveErrors = countErrors === selectedOperations.length;
                 
                $navigator.path('/pendientes-de-firma/operaciones-firmadas', [view, {
                    operations: selectedOperations,
                    allHaveErrors: allHaveErrors,
                    someHaveErrors: someHaveErrors && !allHaveErrors,
                    nroSuccess: selectedOperations.length - countErrors,
                    hasPendingSent: hasPendingSent,
                    isSign: true,
                    flagSend: response.data.response.flagSend
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
            vm.operationsToSign = [];
            vm.noRecords = false;           
             
            filters.typeOperation = $dropdownList.getTypeOperation();
             
            vm.scroll.init();   
        }
         
        function clickOperation(operation) {
			if(operation.hasPassword) {
           

           var modalStorage = localStorage.getItem('modal');

                if(modalStorage === undefined || modalStorage === "" || modalStorage === null || modalStorage === "NaN" || modalStorage === "null"){
                    localStorage.setItem('modal',1);
                }else{
                    localStorage.setItem('modal',parseInt(modalStorage) + 1);
                }
                

                modalStorage = localStorage.getItem('modal');

                if(modalStorage <= 1){

    				$clavePlanilla.open({
    					sqOperation: operation.sqOperation,
                        canResetPassword: operation.canResetPassword,

    					success: function(password) {
    						goOperationDetail(operation, password);
                            localStorage.setItem('modal',null);
    					}
    				});
                 }
			} else {		
				goOperationDetail(operation);
			}
        }
         
        function goOperationDetail(operation, password) {	
            localStorage.setItem('modal',null);			
			$navigator.path('/pendientes-de-firma/detalle-de-firma', [view, {
				operation: {
					idOperation: operation.sqOperation,
					codeTypeOperation: operation.codeTypeOperation,
					password: password
				},
				filterData:  $dropdownList.getTypeOperation(),
				page: page
			}]);
        }
         
    }   
 
}(angular));