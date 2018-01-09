/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('companies.view.controller', [])
		.controller('CompaniesViewController', CompaniesViewController);

    CompaniesViewController.$inject = [
		'$companiesService',
		'$navigator',
		'$loader',
		'$coreConstants',
		'$headerMobile',
		'$rootScope'
	];

    function CompaniesViewController(
		$companiesService,
		$navigator,
		$loader,
		$coreConstants,
		$headerMobile,
		$rootScope
	){
		
		var vm = this,
			nav = 'CompaniesView',
			global = {};
		
		vm.goAccounts = goAccounts;
		
		$headerMobile.back = back;
		
		init();
		
		////////////		
		
		function init() {
			
			$navigator.clear(nav);
			
			if(!$navigator.getViewParams().ContractsView) {
				back();
				return;
			}
			
			global = $navigator.getViewParams().ContractsView;
			getCompanies();
		}
		
		function back() {
			$navigator.path('/inicio');
		}
		
		function getCompanies() {	

			var bodyParam = {
				cdContract: global.contract.cdContract
			};
			
			$loader.setMessage($coreConstants.MSG_LOAD_COMPANIES);
			
			vm.noRecords = false;
			
			$companiesService.getCompanies(bodyParam).then(function(response) {

				vm.companies = response.data.response.companyList || [];
				vm.showMain = true;
				
				vm.noRecords = !vm.companies.length;
			}, function() {
				if(!vm.showMain) {
					$rootScope.noCloseModals = true;
					back();
				}
			});
		}
		
		function goAccounts(company) {
			$navigator.path('/saldo-y-movimientos/cuentas', [nav, {
				company: company
			}]);
		}
	}

}(angular));