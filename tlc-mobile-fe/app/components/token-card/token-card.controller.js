/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('token-card.controller', [])
		.controller('TokenCardController', TokenCardController);
	
	function TokenCardController () {
		
		var vm = this;
		
		init();
		
		////////////
		
		function init() {
			initStates();
		}
		
		function initStates() {		
		
			vm.token = '';	
			vm.key = '';	
			
			vm.optionsValue = {
				maxLength: 2,
				autoScroll: '.auth-keys',
				container: '.modal-body',
				random: true
			};			
			
			vm.optionsKey = {
				maxLength: 6,
				autoScroll: '.auth-keys',
				container: '.modal-body',
				secureKeypad: true
			};		
		} 
		
	}

}(angular));
    

    