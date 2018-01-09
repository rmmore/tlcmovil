/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('chips.directive', [])
		.directive('chips', chipsDirective);
	
	chipsDirective.$inject = [];
	
	function chipsDirective() {
		return {
			restrict: 'E',
			replace: true,
			require: ['chips', '^ngModel'],
			templateUrl: 'components/chips/chips.html',
			controller: 'ChipsController',
			controllerAs: 'chipsVM',
			link: link,
			bindToController: {
				options: '=chipsOptions'
			}
		}
		
		function link(scope, element, attrs, ctrls) {
			var chipsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

			chipsCtrl.init(ngModelCtrl);
		}
	}
	
}(angular));
