/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('menu-mobile.controller', [])
		.controller('MenuMobileController', MenuMobileController);

    MenuMobileController.$inject = [	
        '$menuMobileService'
	];

    function MenuMobileController(
        $menuMobileService
	){
		var vm = this;
		
		$menuMobileService.closeMenuOptions = closeMenuOptions;
		$menuMobileService.init = init;
		$menuMobileService.showNroOperations = showNroOperations;
		
		initStates();
		
		////////////			
		
		function initStates() {
			vm.showLogout = false;
			vm.showConfiguration = false;
		}
		
		function closeMenuOptions() {
			closeMenuItems();
			vm.showLogout = false;
			vm.showConfiguration = false;
		}
		
		function closeMenuItems() {
			angular.forEach(vm.menu, function(menuItem) {
				menuItem.toggle = false;
			});
		}
		
		function init(menu) {	

			vm.menu = menu;			
			vm.menuHome = angular.copy(menu);
		}
		
		function showNroOperations(response) {	
			
			angular.forEach(vm.menu, function(menu, i) {				
				angular.forEach(menu.menuItems, function(menuItem, j) {
					
					menuItem.nroOperations = response[menuItem.cssId];
					vm.menuHome[i].menuItems[j].nroOperations = response[menuItem.cssId];
					
					// angular.forEach(response, function(operation) {
						// if(menuItem.cssId === operation.cssId) {
							// menuItem.nroOperations = operation.nroOperations;
							// vm.menuHome[i].menuItems[j].nroOperations = operation.nroOperations;
						// }
					// });
				});					
			});
			
		}
		
	}

}(angular));