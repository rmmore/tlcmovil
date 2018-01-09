/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('alert.controller', [])
		.controller('UieAlertController', UieAlertController);
	
	UieAlertController.$inject = [
		'$scope',
		'$timeout',
		'$sce'
	];
	
	function UieAlertController (
		$scope,
		$timeout,
		$sce
	) {
		var vm = this,		
			timeout = null;
			
		vm.close = close;
		vm.trustHtml = trustHtml;
		
		////////////
		
		function close() {
			vm.options.show = false;
			
			$timeout.cancel(timeout); 
			
			if(vm.options.onClose) {
				vm.options.onClose();
			}
		}
		
		function onTimeout() {				
			$timeout.cancel(timeout); 
			
			timeout = $timeout(function() {
				close();
			}, parseInt(vm.options.timeout));
		}
		
		function trustHtml(){
			return $sce.trustAsHtml(vm.options.message);
		}
		
		if(vm.options.timeout) {
			$scope.$watchCollection('alertVM.options.show', function(newValue){
				if(newValue === true) {
					onTimeout();
				}
			});
		}
    }

}(angular));
    

    