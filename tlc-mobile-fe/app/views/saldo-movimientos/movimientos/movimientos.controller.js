/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
    'use strict';
     
    angular
        .module('movements.view.controller', [])
        .controller('MovementsViewController', MovementsViewController);
 
    MovementsViewController.$inject = [
        '$movementsService',
        '$navigator',
        '$movementHistory',
        '$dropdownList',
        '$downloadServices',
        '$loader',
        '$coreConstants',
        '$headerMobile',
        '$modalService',
        '$tabPanel',
        '$filtersAlert',
		'$contracts',
		'$rootScope'
    ];
 
    function MovementsViewController(
        $movementsService,
        $navigator,
        $movementHistory,
        $dropdownList,
        $downloadServices,
        $loader,
        $coreConstants,
        $headerMobile,
        $modalService,
        $tabPanel,
        $filtersAlert,
		$contracts,
		$rootScope
    ){
        var vm = this,
            filters = {},
			isLastMovements = true,
            nav = 'MovementsView';
             
        vm.filter = filter;
        vm.goDetailMovement = goDetailMovement;
        vm.sendMovements = sendMovements; 
        vm.clearHistoric = clearHistoric; 
             
        $dropdownList.onSelectTypeFile = onSelectTypeFile;  
        $dropdownList.onSelectSeparator = onSelectSeparator;  
         
        $headerMobile.back = back;  
         
        $movementHistory.onSelectDtEnd = onSelectDtEnd; 
         
        $tabPanel.selectTabs = selectTabs;
         
        init();
         
        ////////////
         
        function init() {
             
            $navigator.clear(nav);  
             
            if(!$navigator.getViewParams().AccountsView) {
                back();
                return;
            }
             
            initStates();
			
			vm.hasBalancesPermission = $contracts.getPermissions().hasBalancesPermission;
			
			getAccountInfo();
        }
         
        function back() {
            $navigator.path('/saldo-y-movimientos/cuentas');
        }
         
        function initStates() { 
             
            filters.typeOperation = {};     
             
            vm.account = $navigator.getViewParams().AccountsView.account;
            vm.company = $navigator.getViewParams().CompaniesView.company;      
             
            vm.scroll = {
                request: function(params, callback) {
					isLastMovements 
						? getLast20Movements(params, callback)
						: getHistoricMovements(params, callback)
				}
            };  
        }
         
        function getAccountInfo() {
            
			if(vm.hasBalancesPermission) {
				var params = {
					number: vm.account.number,
					cdCompany: vm.company.cdCompany
				};
				 
				$movementsService.getAccountInfo(params)
				.then(function(response) {              
					 
					angular.extend(vm.account, response.data.response);
					vm.showAccountInfo = true;
					 
				});
			} else {
				vm.showAccountInfo = true;
			}
        }
         
        function getHistoricMovements(paramsScroll, callback) {
             
            var params = {
                accountNumber: vm.account.number,
                cdOperationType: filters.typeOperation.id,
                dtRangeInitial: filters.dtFrom,
                dtRangeFinal: filters.dtEnd
            };
			
			getMovements($movementsService.getHistoricMovements, angular.merge(params, paramsScroll), callback);
        }
         
        function getLast20Movements(paramsScroll, callback) {
             
        	var params = {
        		account:{
        			number: vm.account.number,
        			cdCompany: vm.company.cdCompany
        		}
            };
             
			getMovements($movementsService.getLast20Movements, angular.merge(params, paramsScroll), callback);
        }
		
		function getMovements(service, params, callback) {
			
			$loader.setMessage($coreConstants.MSG_LOAD_MOVEMENTS);  
			
            vm.noRecords = false;
			
			vm.movements = [];
			
			service(params).then(function(response) {
                 
                vm.movements = (vm.movements || []).concat(response.data.response.paginationMovementsDto.list || []); 

                vm.noRecords = !vm.movements.length;
                 
                if(callback) {
                    callback(response.data.response.paginationMovementsDto.count, response.data.response.paginationMovementsDto.pages);
                }
 
                vm.showMain = true;     
				
            }, function() {
				if(!vm.showMain) {
					$rootScope.noCloseModals = true;
					back();
				}
			}); 
		}
         
        function sendMovements(mails) {
             
            var bodyParam = {
                idAccount: vm.account.number,
                // idsMovements: [],               
                idFileType: $dropdownList.getTypeFile().id,
                idSeparator: $dropdownList.getTypeSeparator().id,
				separator: vm.inputSeparator,
                mails: mails
            };
             
            // angular.forEach(vm.movements, function(v) {
                // bodyParam.idsMovements.push(v.id);
            // });
 
            $loader.setMessage($coreConstants.MSG_SENDING_MOVEMENTS);
             
            $movementsService.sendMovements(bodyParam)
            .then(function(response) {
                 
                $navigator.path('/saldo-y-movimientos/enviado-resumen', [nav, {
                    typeFile: $dropdownList.getTypeFile(),              
                    typeSeparator: $dropdownList.getTypeSeparator(),                
                    mails: mails     
                }]);
                     
            }); 
         
        }
         
        function filter(defaultDatepicker) { 
		
			if(defaultDatepicker) {			
				filters.typeOperation = $dropdownList.getTypeOperationMovements();		
			}
			
			if(defaultDatepicker && isLastMovements) {				
				$movementHistory.defaultDtFrom();		
			} else {				
				vm.movements = [];
				$movementHistory.showDtFrom();	
				
				filterHistoric();
			} 
        }
		
		function filterLast20() {
			
			isLastMovements = true;
			
			vm.scroll.init(); 		   
		 
			$filtersAlert.showAlertMovements({
				isLast20: true
			}); 
		}
		
		function filterHistoric() {
			
			isLastMovements = false;
			
			vm.scroll.init();       
 
			$filtersAlert.showAlertMovements({
				dtFrom: filters.dtFrom, 
				dtEnd:  filters.dtEnd, 
				typeOperation: filters.typeOperation
			});
		}
         
        function clearHistoric() { 
             
            $movementHistory.defaultDtFrom(false);
            $dropdownList.defaultTypeOperationMovements();
			filters.typeOperation = $dropdownList.getTypeOperationMovements();		
			
			vm.movements = [];
			$movementHistory.showDtFrom();	
			
			filterLast20();
        }
         
        function onSelectDtEnd(dtFrom, dtEnd) {
            filters.dtFrom = dtFrom;
            filters.dtEnd = dtEnd;
			
            $tabPanel.closeTabs();               
			
			vm.movements = [];
			$movementHistory.showDtFrom(); 
			
            filterHistoric();
        }
         
        function selectTabs() {
            $movementHistory.showDtFrom();
        }
         
        function onSelectTypeFile(item) {
            $dropdownList.defaultTypeSeparator(item.id === 3);
        }
         
        function onSelectSeparator(item) {
			
			vm.inputSeparator = null; 
			
			if(item.id === 6) {
				vm.showInputSeparator = true;
			} else {
				vm.showInputSeparator = false;
			}
        }
         
        function goDetailMovement(movement) {
            $navigator.path('/saldo-y-movimientos/detalle-de-movimiento', [nav, {
                movement: movement,             
            }]);
        }
    }
 
}(angular));