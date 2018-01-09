/**
 * @author everis
 */
'use strict';

angular.module('banners.directives', [])

	/**
	 * 
     */
	.directive('bannersComponent', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/banners/banners.html'
		}
	})
