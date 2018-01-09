/**
 * @author everis
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('footer-basic.directives', [])
		.directive('footerBasic', function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'components/footer/footer-basic/footer-basic.html',
				controller: 'FooterBasicController',
				controllerAs: 'footerBasicVM'
			}
		})

}(angular));
