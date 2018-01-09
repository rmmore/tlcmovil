/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */

(function(angular) {
    'use strict';
	
	angular
		.module('table-load.controller', [])
		.controller('TableLoadController', TableLoadController)

    TableLoadController.$inject = [	
		'$scope',
		'$coreConstants',
		'$timeout'
	];	

    function TableLoadController(
		$scope,
		$coreConstants,
		$timeout
	){	
	
		var vm = this;
			
		$scope.options = $scope.options || {};
		
		vm.request = request;				
		vm.disabled = $scope.options.disabled;
		
		$scope.options.init = initialize;
		
		init();
		
		////////////	

		// Se ejecuta despues en el callback de la peticion
		function afterRequest(total) {
			
			$scope.options.offset += $scope.options.size;
			$scope.options.total = total;
			
			if($scope.options.offset >= $scope.options.total) {
				$scope.options.show = false;
			}
				
			$timeout(function() {
				vm.disabled = false;
			}, 200);
		}
		
		// Inicializa el scroll, se llama desde la vista
		function init() {		
		
			$scope.options.size 	= $coreConstants.SCROLL.SIZE;
			$scope.options.offset 	= $coreConstants.SCROLL.OFFSET;
			$scope.options.total 	= null;
			
			vm.disabled = true;
			
			request();
		}
		
		function initialize() {			
			$scope.options.show = true;     
            $scope.options.disabled = false;
			
			init();
		}
		
		// Se ejecuta cuando se debe obtener mas resultados (mediante scroll inifinio o cargar mas)
		function request() {
			if(validRequest() && $scope.options.request) {
				
				vm.disabled = true;
				
				var parameters = {
					size: $scope.options.size,
					offset: $scope.options.offset
				};
				
				$scope.options.request(parameters, afterRequest);
			}
		}
		
		// Verifica si se debe ejecutar el options.request()
		function validRequest() {			
			return ($scope.options.offset == $coreConstants.SCROLL.OFFSET || $scope.options.offset < $scope.options.total) 
					&& !$scope.options.disabled;
		}
		
	}

}(angular));