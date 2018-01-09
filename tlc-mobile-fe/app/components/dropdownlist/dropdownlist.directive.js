/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('dropdownlist.directives', [])
		.directive('dropdownlist', dropdownlist)
	
	function dropdownlist() {
		var directive = {
			restrict: 'E',
			templateUrl: 'components/dropdownlist/dropdownlist.html',			
			name: 'ctrl',
			controller: '@',
			controllerAs: 'dropdownListVM',
			scope: true
		}
		
		return directive;
	}
	
}(angular));