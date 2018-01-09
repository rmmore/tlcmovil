/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('chips.controller', [])
		.controller('ChipsController', ChipsController);

    function ChipsController(){

		var vm = this,
			ngModelCtrl;
		
		vm.options = vm.options || {};
		
		vm.inputKeydown = inputKeydown;
		vm.removeChip = removeChip;
		vm.selectChip = selectChip;
		vm.more = more;
		vm.init = init;
		vm.onBlur = onBlur;
		
		initStates();
		
		////////////
		
		function init(ngModelCtrl_) {
			ngModelCtrl = ngModelCtrl_;
			
			ngModelCtrl.$render = function() {
				render();
			}			
		}
		
		function render() {
			if (ngModelCtrl.$viewValue) {
				vm.items = ngModelCtrl.$viewValue;
			}
		}
		
		function initStates() {
			vm.items = [];
			vm.selectedChip = null;
		}
		
		function inputKeydown(e) {
			var charCode = e.keyCode || e.which;
			
			e.stopPropagation();
			
			if(charCode === 13) {
				validateAdd();
			}
			
			onBlur();
		}
		
		function validateAdd() {
			if(vm.chipBuffer && validateUniqueChip() ) {
				if(vm.options.onAdd) {
					if(vm.options.onAdd(vm.chipBuffer)) {
						addChip();
					}
				} else {
					addChip();
				}
			}
		}
		
		function validateUniqueChip() {
			
			var length = vm.items.length,
				isUnique = true;
				
			for(var i = 0; i < length; i++) {
				if(vm.items[i] === vm.chipBuffer) {
					isUnique = false;
					vm.chipBuffer = null;
				}
			}
			
			return isUnique;
		}
		
		function addChip() {
			vm.items.push(vm.chipBuffer);
			vm.chipBuffer = null;
			updateModel();
		}
		
		function removeChip(index) {
			vm.items.splice(index, 1);
			
			if(vm.focusChipBuffer && vm.focusChipBuffer.focus) {
				vm.focusChipBuffer.focus();
			}
			
			updateModel();
		}
		
		function more(e) {
			// e.preventDefault();
			// vm.focusChipBuffer.focus();
			// if(vm.options.onMore) {
				// vm.options.onMore();
			// }
			
			validateAdd();
		}
		
		function selectChip(index) {
			vm.selectedChip = index;
		}
		
		function updateModel() {
			if(vm.options.onChange) {
				vm.options.onChange();
			}
			ngModelCtrl.$setViewValue(vm.items);
			ngModelCtrl.$render();
		}
		
		function onBlur(){
			vm.options.chipBuffer = vm.chipBuffer;
		}
	}

}(angular));


