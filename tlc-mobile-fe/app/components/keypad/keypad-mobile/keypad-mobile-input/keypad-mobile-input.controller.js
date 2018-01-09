/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('keypad-mobile-input.controller', [])
		.controller('KeypadMobileInputController', KeypadMobileInputController);
		
	KeypadMobileInputController.$inject = [
		'$scope',
		'$keypadMobile',
		'$keypadMobileService',
		'$loader',
		'$coreConstants',
		'$utilService'
	];
	
	function KeypadMobileInputController(
		$scope,
		$keypadMobile,
		$keypadMobileService,
		$loader,
		$coreConstants,
		$utilService
	){
		var vm = this,
			ngModelCtrl,
			partials = [];
		
		vm.options = vm.options || {};
				
		vm.init = init;
		vm.openKeyPad = openKeyPad;
		vm.addPartial = addPartial;

		////////////
		
		function init(ngModelCtrl_) {
			ngModelCtrl = ngModelCtrl_;
		}

		function openKeyPad() {
			if(vm.options.onClick) {
				vm.options.onClick();
			}

			if(vm.options.secureKeypad) {
				getKeypad();
			} else {
				open();
			}			
		}
				
		function getKeypad() {		
			$loader.setMessage($coreConstants.MSG_LOAD_KEYPAD);
			
			$keypadMobileService.getKeypad().then(function(response) {
				vm.options.code = response.data.response.code;
				open(response.data.response.keyboard.seed);
			});
		}

		function open(keys) {
			if(vm.options.onOpen) {
				vm.options.onOpen();
			}					
			
			$keypadMobile.open(keys, vm.options.random);	
			
			vm.isOpen = true;
			
			$keypadMobile.setModelValue = setModelValue;
			
			$keypadMobile.onClose = onClose;
			
			$keypadMobile.onDone = onDone;
			
			$keypadMobile.setMaxLength(vm.options.maxLength || null);

			if(vm.options.autoClear !== false) {
				$keypadMobile.clear();
			} else {
				$keypadMobile.setValue(ngModelCtrl.$viewValue);
			}

			onOpen();
		}
				
		function setModelValue(value, isDelete) {
			
			ngModelCtrl.$setViewValue(value);
				
			$scope.$evalAsync(function() {				
				onChange(value, isDelete);
				
				if(vm.options.onChange) {
					vm.options.onChange(isDelete);
				}	
			});			
		}
				
		function onClose() {
			
			if(vm.options.onClose) {
				vm.options.onClose();
			}
			
			vm.isOpen = false;
			
			onClose_();
		}
				
		function onDone() {
			
			if(vm.options.onDone) {
				vm.options.onDone();
			}
			
			vm.isOpen = false;
			
			onClose_();
		}				
				
		function addPartial(partial) {
			partials.push(partial);
		}
				
		function onChange(value, isDelete) {
			
			var index = 0;
			var focus = false;

			angular.forEach(partials, function(partial, k) {
				
				var val = value.substring(index, index + Number(partial.size));
				
				index += Number(partial.size);
				
				partial.scope.active = false;
				partial.complete = (val.length == partial.size);

				if((!partial.complete || (partials[k-1] && partials[k-1].complete && !partial.complete)) && !focus) {
					focus = true;
					setFocus(partial);
				}
				
				partial.ngModelCtrl.$setViewValue(val);
				partial.ngModelCtrl.$render();
			});
		}
		
		function onOpen() {
			angular.forEach(partials, function(partial, k) {
				if(k == 0) {
					setFocus(partial);
				}
			});
			
			addPaddign();
		}
		
		function addPaddign(isAdd) {
			if(angular.isString(vm.options.autoScroll)) {
				var ele = angular.element(vm.options.autoScroll);
				
				if(isAdd === false) {
					ele.removeClass('keypad-mobile-margin-bottom');
				} else {
					ele.addClass('keypad-mobile-margin-bottom');
				}
			}
		}
		
		function setFocus(partial) {
			partial.scope.active = true;
			
			if(vm.options.autoScroll) {
				$utilService.scroll(vm.options.container, partial.element, vm.options.fixed);
			}
		}
		
		function onClose_() {			
			angular.forEach(partials, function(partial, k) {
				partial.scope.active = false;
			});
			
			addPaddign(false);
		}
	}

}(angular));