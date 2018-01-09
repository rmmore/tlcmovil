/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('user-key.controller', [])
		.controller('UserKeyController', UserKeyController);
	
	function UserKeyController () {
		
		var vm = this;
		
		init();
		
		////////////
		
		function init() {
			initStates();
		}
		
		function initStates() {		
		
			vm.key = '';	
			
			vm.optionsValue = {
				maxLength: 6,			
				secureKeypad: true,
				autoScroll: true,
				container: '.modal-body'
			};		
		} 
		
	}

}(angular));
    

    