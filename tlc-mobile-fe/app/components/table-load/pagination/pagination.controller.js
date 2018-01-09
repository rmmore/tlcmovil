/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('pagination.controller', [])
		.controller('PaginationController', PaginationController)

    PaginationController.$inject = [	
		'$timeout'
	];	

    function PaginationController(
		$timeout
	){	
	
		var vm = this;
			
		vm.options = vm.options || {};
		
		vm.prev = prev;				
		vm.next = next;						
		
		vm.options.init = initialize;
		
		init(vm.options.initPage);
		
		////////////	

		// Se ejecuta despues en el callback de la peticion
		function afterRequest(total, pages) {
			
			vm.options.total = total;
			vm.options.pages = pages;
				
			$timeout(function() {
				vm.options.disabled = false;
			}, 200);
		}
		
		// Inicializa el scroll, se llama desde la vista
		function init(initPage) {				
			vm.options.page = initPage || 1;
			request();
		}
		
		function initialize() {
			vm.options.show = true;    
			vm.options.disabled = false; 
			init();
		}
		
		function request() {
			if(validRequest() && vm.options.request) {
				
				vm.options.disabled = true;
				
				var parameters = {
					page: vm.options.page
				};
				
				vm.options.request(parameters, afterRequest);
			}
		}
		
		function validRequest() {			
			return vm.options.show !== false && !vm.options.disabled;
		}
		
		function prev() {
			vm.options.page--;
			request();
		}
		
		function next() {
			vm.options.page++;
			request();
		}
		
	}

}(angular));