/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('footer.directives', [])
		.directive('uiFooter', function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'components/footer/footer.html'
			}
		})

}(angular));
