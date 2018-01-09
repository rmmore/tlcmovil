/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';
	
	angular
		.module('token-card.directive', [])
		
		.directive('tokenCard', function() {
			return {
				restrict: 'E',
				replace: true,
				controller: 'TokenCardController',
				controllerAs: 'tokenCardVM',
				templateUrl: function(element, attrs) {
					return 	attrs.templateUrl || 
							'components/token-card/template/token-card-' + (attrs.template || 'basic') + '.html';
				},
				bindToController: {
					token: '=',
					key: '='
				}
			}
		})
	
}(angular));


