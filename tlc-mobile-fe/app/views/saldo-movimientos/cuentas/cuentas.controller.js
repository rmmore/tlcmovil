/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
  
(function(angular) {
    'use strict';
     
    angular
        .module('accounts.view.controller', [])
        .controller('AccountsViewController', AccountsViewController);
     
    AccountsViewController.$inject = [
        '$accountsService',
        '$navigator',
        '$dropdownList',
        '$loader',
        '$coreConstants',
        '$headerMobile',
        '$filtersAlert',
		'$contracts',
		'$rootScope'
    ];
     
    function AccountsViewController(
        $accountsService,
        $navigator,
        $dropdownList,
        $loader,
        $coreConstants,
        $headerMobile,
        $filtersAlert,
		$contracts,
		$rootScope
    ) {
         
        var vm = this,
            filters = {},
            nav = 'AccountsView';
         
        vm.filter = filter;
        vm.goMovements = goMovements;
         
        $headerMobile.back = back; 
         
        init();
         
        ////////////
         
        function init() {
             
            $navigator.clear(nav);
             
            if(!$navigator.getViewParams().CompaniesView) {
                back();
                return;
            }
            initStates();
        }
         
        function back() {
            $navigator.path('/saldo-y-movimientos/empresas');
        }
         
        function initStates() {         
            filters.typeAccount = {};
            filters.typeCoin = {};
             
            vm.company = $navigator.getViewParams().CompaniesView.company;
			
			vm.hasBalancesPermission = $contracts.getPermissions().hasBalancesPermission;
			vm.hasMovementsPermission = $contracts.getPermissions().hasMovementsPermission;
         
            vm.scroll = {
                request: getAccounts
            };
        }
         
        function getAccounts(paramsScroll, callbackScroll) {
             
            var parameters = {
				account: {
					cdCompany: vm.company.cdCompany,
					accountType: {
						code: filters.typeAccount.id
					},
					currency: filters.typeCoin.id
				}
            };
             
            $loader.setMessage($coreConstants.MSG_LOAD_ACCOUNTS);
             
            vm.noRecords = false;
            
			vm.accounts = [];
			
            $accountsService.getAccounts(angular.merge(parameters, paramsScroll)).then(
            function(response) {
                     
                vm.accounts = (vm.accounts || []).concat(response.data.response.paginationAccount.list || []); 

                vm.noRecords = !vm.accounts.length;
                 
                if(callbackScroll) {
                	 callbackScroll(response.data.response.paginationAccount.count, response.data.response.paginationAccount.pages);
                }
 
                vm.showMain = true;
				
            }, function() {
				if(!vm.showMain) {
					$rootScope.noCloseModals = true;
					back();
				}
			});
         
        }
         
        function filter() {     
             
            _filter();
             
            $filtersAlert.showAlertAccounts({
                typeAccount: filters.typeAccount,
                typeCoin: filters.typeCoin
            }); 
        }
         
        function _filter() {        
         
            vm.accounts = [];
            vm.noRecords = false;   
         
            filters.typeAccount = $dropdownList.getTypeAccount();
            filters.typeCoin = $dropdownList.getTypeCoin();
             
            vm.scroll.init();
        }
         
        function goMovements(account) {
			if(vm.hasMovementsPermission) {
				$navigator.path('/saldo-y-movimientos/movimientos', [nav, {
					account: account
				}]);
			}
        }
    }
     
}(angular));