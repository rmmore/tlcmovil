/**
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('header.directives', [])
		
		.directive('uiHeader', function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'components/header/header.html',
				controller: 'HeaderController',
				controllerAs: 'headerVM'
			}
		})

}(angular));
