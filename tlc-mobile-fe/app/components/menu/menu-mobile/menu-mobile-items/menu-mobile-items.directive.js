/**
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 */

(function(angular) {	
	'use strict';

	angular
		.module('menu-mobile-items.directive', [])		
		.directive('menuMobileItems', menuMobileItems);
		
	function menuMobileItems() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'components/menu/menu-mobile/menu-mobile-items/menu-mobile-items.html',
			controller: 'MenuMobileItemsController',
			controllerAs: 'menuMobileItemsVM',
			bindToController: {
				menu: '='
			}
		}
	}
		
}(angular));
