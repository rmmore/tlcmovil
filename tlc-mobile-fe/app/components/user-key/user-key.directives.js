/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';
	
	angular
		.module('user-key.directive', [])
		
		.directive('userKey', function() {
			return {
				restrict: 'E',
				replace: true,
				controller: 'UserKeyController',
				controllerAs: 'userKeyVM',
				templateUrl: function(element, attrs) {
					return 	attrs.templateUrl || 
							'components/user-key/template/user-key-' + (attrs.template || 'basic') + '.html';
				},
				bindToController: {
					key: '='
				}
			}
		})
	
}(angular));


