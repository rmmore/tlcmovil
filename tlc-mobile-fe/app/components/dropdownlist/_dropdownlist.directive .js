/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular.module('dropdownlist.directives', [])

	.directive('dropdownlistx', function () {
		return {
			restrict: 'E',
			replace: true,
			controller: 'DropdownListController',
			controllerAs: 'dropdownListVM',
			templateUrl: function(element, attrs) {
				return attrs.templateUrl || 'components/dropdownlist/dropdownlist.html';
			},
			scope: {
				options: '='
			}
		}
	});	
	
}(angular));