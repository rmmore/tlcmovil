/**
 * @author everis
 */
'use strict';

angular.module('access.directives', [])

	/**
	 * 
     */
	.directive('accessComponent', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/access/access.html'
		}
	})
