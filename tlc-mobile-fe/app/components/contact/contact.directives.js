/**
 * @author everis
 */
'use strict';

angular.module('contact.directives', [])

	/**
	 * 
     */
	.directive('contactComponent', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/contact/contact.html'
		}
	})
