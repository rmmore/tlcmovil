/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('keypad-mobile-input.directive', [])
		.directive('keypadMobileInput', keypadMobileInput);
		
	keypadMobileInput.$inject = [
		'$keypadMobile',
		'$keypadMobileService',
		'$loader',
		'$coreConstants'
	];
	
	function keypadMobileInput(
		$keypadMobile,
		$keypadMobileService,
		$loader,
		$coreConstants
	){
		return{
			restrict: 'A',
			require: '^ngModel',
			transclude: true,
			template: '<div data-ng-class="{\'keypad-mobile-margin-bottom\' : options.marginBottom && isOpen}"><div data-ng-transclude></div></div>',
			scope:{
				ngModel: '=',
				options: '=?keypadOptions'
			},
			link: function(scope, element, attrs, ctrl) {

				scope.options = scope.options || {};
				
				element.bind('click', function(event) {
					scope.$evalAsync(function() {
						if(scope.options.onClick) {
							scope.options.onClick();
						}

						if(scope.options.secureKeypad) {
							getKeypad();
						} else {
							open();
						}
					});					
				});
				
				function getKeypad() {		
					$loader.setMessage($coreConstants.MSG_LOAD_KEYPAD);
					
					$keypadMobileService.getKeypad().then(function(response) {
						open(response.data.seed);
					});
				}

				function open(keys) {
					if(scope.options.onOpen) {
						scope.options.onOpen();
					}					
					
					$keypadMobile.open(keys);					
					
					scope.isOpen = true;
					
					$keypadMobile.setMaxLength(scope.options.maxLength || null);

					if(scope.options.autoClear !== false) {
						$keypadMobile.clear();
					} else {
						$keypadMobile.setValue(scope.ngModel);
					}
					
					$keypadMobile.setModelValue = setModelValue;
					
					$keypadMobile.onClose = onClose;
					
					$keypadMobile.onDone = onDone;
				}
				
				function setModelValue(value) {
						ctrl.$setViewValue(value);
						
						if(scope.options.onChange) {
							scope.options.onChange();
						}
				}
				
				function onClose() {
					
					if(scope.options.onClose) {
						scope.options.onClose();
					}
					
					element.prev().click();
					scope.isOpen = false;
				}
				
				function onDone() {
					
					if(scope.options.onDone) {
						scope.options.onDone();
					}
					element.prev().click();
					scope.isOpen = false;
				}
				
			}
		};
	};

}(angular));
    

    