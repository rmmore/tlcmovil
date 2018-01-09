/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('keypad-mobile-input.directive', [])
		.directive('keypadMobileInput', keypadMobileInput);
	
	function keypadMobileInput(){
		var directive = {
			restrict: 'A',
			require: ['^keypadMobileInput','^ngModel'],
			transclude: true,
			replace: true,
			templateUrl: 'components/keypad/keypad-mobile/keypad-mobile-input/keypad-mobile-input.html',
			controller: 'KeypadMobileInputController',
			controllerAs: 'keypadMobileInputVM',
			bindToController: {
				options: '=?keypadOptions'
			},
			scope: true,
			link: link
		};
		
		return directive;
		
		function link(scope, element, attrs, ctrls) {

			var keypadMobileInputCtrl = ctrls[0],
				ngModelCtrl = ctrls[1];
				
			keypadMobileInputCtrl.init(ngModelCtrl);
			
		}
	}

}(angular));
    

    