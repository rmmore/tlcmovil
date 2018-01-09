/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
	'use strict';
	
	angular
		.module('menu.directives', [])
		
		.directive('uiMenu', function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'components/menu/menu.html',
				controller: 'MenuController',
				controllerAs: 'menuVM'
			}
		})
		
}(angular))
