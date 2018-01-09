/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('menu-mobile-items.controller', [])
		.controller('MenuMobileItemsController', MenuMobileItemsController);

    MenuMobileItemsController.$inject = [];

    function MenuMobileItemsController(){
		var vm = this;
		
		vm.toggleMenuItems = toggleMenuItems;
		
		////////////
		
		function closeMenuItems() {
			angular.forEach(vm.menu, function(v, k) {
				v.toggle = false;
			});
		}
		
		function toggleMenuItems(item) {
			item = item || {};
			var bool = item.toggle;
			
			closeMenuItems();
			item.toggle = !bool;
		}
		
	}

}(angular));