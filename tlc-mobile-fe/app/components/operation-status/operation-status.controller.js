/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('operation-status.controller', [])
		.controller('OperationStatusController', OperationStatusController);
	
	OperationStatusController.$inject = [
		'$coreConstants'
	];
	
	function OperationStatusController (
		$coreConstants
	) {
		
		var vm = this;
		
		getDescription();
		
		////////////
		
		function getDescription() {
			vm.statusDescription = $coreConstants.OPERATION_STATUS['STATUS-'+vm.statusCode];
		}
    }

}(angular));
    

    