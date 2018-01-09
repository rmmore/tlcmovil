/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('keypad-mobile-partial.directive', [])
		.directive('keypadMobilePartial', keypadMobilePartial);
		
	function keypadMobilePartial() {
		var directive = {
			restrict: 'A',
			replace: true,
			templateUrl: 'components/keypad/keypad-mobile/keypad-mobile-partial/keypad-mobile-partial.html',
			require: ['^keypadMobileInput', '^ngModel'],
			scope: true,
			link: link			
		};
		
		return directive;
		
		function link (scope, element, attrs, ctrls) {
			
			scope.id = 'input-' + scope.$id + new Date().getTime();
			
			var keypadMobileInputCtrl = ctrls[0], 
				partial = {
					ngModelCtrl: ctrls[1],
					size: attrs.keypadMobilePartial,
					scope: scope,
					element: element,
					id: angular.copy(scope.id)
				};

			keypadMobileInputCtrl.addPartial(partial);
		}
	}

}(angular));
    

    