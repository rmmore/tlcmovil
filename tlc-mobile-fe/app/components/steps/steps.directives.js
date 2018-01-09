/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict';
	
	angular
		.module('steps.directive', [])
		
		.directive('steps', function() {
			return {
				restrict: 'E',
				replace: true,
				controller: 'StepsController',
				controllerAs: 'stepsVM',
				templateUrl: 'components/steps/template/steps-basic.html',
				scope: {
					options: '=stepsOptions'
				}
			}
		})
	
}(angular));


