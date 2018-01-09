/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 */

(function(angular) {	
	'use strict';

	angular
		.module('menu-mobile.directives', [])
		
		.directive('menuMobile', function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'components/menu/menu-mobile/menu-mobile.html',
				controller: 'MenuMobileController',
				controllerAs: 'menuMobileVM'
			}
		})
		
}(angular));
