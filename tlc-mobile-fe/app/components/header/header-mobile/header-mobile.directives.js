/**
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('header-mobile.directives', [])
		
		.directive('headerMobile', function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'components/header/header-mobile/header-mobile.html',
				controller: 'HeaderMobileController',
				controllerAs: 'headerMobileVM'
			}
		})

}(angular));
