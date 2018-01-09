/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('keypad-mobile.controller', [])
		.controller('KeypadMobileController', KeypadMobileController);	
		
	KeypadMobileController.$inject = ['$scope', '$keypadMobile'];
		
	function KeypadMobileController($scope, $keypadMobile) {
		
		var vm = this,
			global = {};
			
		vm.close = close;
		vm.done = done;
		
		$keypadMobile.clear = clear;
		$keypadMobile.keyPressed = keyPressed;
		$keypadMobile.open = open;
		$keypadMobile.setMaxLength = setMaxLength;
		$keypadMobile.setValue = setValue;		
		
		initStates();
		
		////////////
		
		function initStates() {			
			global.model = null;
			global.maxLength = null;
			global.keyClear = '-1';
			global.keyDelete = '-2';
			
			vm.isOpen = false;
			vm.customKeys = [];
			
			global.defaultKeys = [1,2,3,4,5,6,7,8,9,0];
		}
		
		function done() {
			$keypadMobile.onDone();
			vm.isOpen = false;
		};
		
		function close() {
			$keypadMobile.onClose();
			vm.isOpen = false;
		}
		
		function clear() {					
			global.model = '';
			$keypadMobile.setModelValue(global.model);
		}
		
		function deleteKey() {					
			global.model = global.model.substr(0, global.model.length - 1)
			$keypadMobile.setModelValue(global.model, true);
		}
		
		function selectKey(key) {
			global.model += '' + key;
			
			if(global.maxLength){		
				if(global.model.length <= global.maxLength) {
					$keypadMobile.setModelValue(global.model)
				}				
				
				if(global.model.length >= global.maxLength) {
					done();
				}
			} else {				
				$keypadMobile.setModelValue(global.model);
			}
		}
		
		function open(keys, isRandom) {
			
			vm.isCustom = !!keys;
			
			if(vm.isCustom) {			
				
				vm.customKeysLg = generateKeypadLg(keys);
				vm.customKeysSm = generateKeypadSm(keys);
				
			} else {
				
				var defaultKeys = angular.copy(global.defaultKeys);
				
				if(isRandom) {
					// defaultKeys.shuffle();
				}
				
				vm.defaultKeysLg = generateKeypadLg(defaultKeys);
				vm.defaultKeysSm = generateKeypadSm(defaultKeys);
			}
			
			vm.isOpen = true;
		}
		
		function setMaxLength(max){
			global.maxLength = max;
		}
		
		function setValue(model){
			global.model = (model == '0' || model) ? model : '';
		}
		
		function keyPressed(key) {
			$scope.$evalAsync(function() {
				switch(key) {
					case global.keyClear: 
						clear();
						break;
					case global.keyDelete: 
						deleteKey();
						break;
					default: 
						selectKey(key);
						break;
				}
			});
		}	

		function generateKeypadLg(keys) {
			return [
				[keys[0], keys[1], keys[2]], 
				[keys[3], keys[4], keys[5]], 
				[keys[6], keys[7], keys[8]], 
				[global.keyClear, keys[9], global.keyDelete]
			];
		}
		
		function generateKeypadSm(keys) {
			return [
				[keys[0], keys[1], keys[2], keys[3], keys[4], keys[5]], 
				[keys[6], keys[7], keys[8], keys[9], global.keyClear,global.keyDelete]
			];	
		}
		
		// Array.prototype.shuffle = function() {
			// let m = this.length, i;
			// while (m) {
				// i = (Math.random() * m--) >>> 0;
				// [this[m], this[i]] = [this[i], this[m]]
			// }
			// return this;
		// }
	}
	
}(angular));