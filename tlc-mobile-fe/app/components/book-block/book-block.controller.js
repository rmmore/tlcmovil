/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('book-block.controller',[])
		.controller('BookBlockController', BookBlockController);

	BookBlockController.$inject = [];	
		
	function BookBlockController() {
			
		var vm = this,
			config;
		
		vm.init = init;
		vm.next = next;
		vm.prev = prev;
		vm.first = first;

		////////////
		
		function init(_config) {
			config = _config;
		}
		
		function next() {
			config.$bookBlock.bookblock('next');
		}
		
		function prev() {
			config.$bookBlock.bookblock('prev');
		}
		
		function first() {
			config.$bookBlock.bookblock('first');
		}
		
	}

}(angular));