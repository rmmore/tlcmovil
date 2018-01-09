/**
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('header-basic.directive', [])
		.directive('headerBasic', function() {
			return {
				restrict: 'E',
				templateUrl: 'components/header/header-basic/header-basic.html',
				controller: 'HeaderBasicController',
				controllerAs: 'headerBasicVM'
			}
		})

}(angular));
