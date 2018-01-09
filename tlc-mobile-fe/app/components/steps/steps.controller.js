/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('steps.controller', [])
		.controller('StepsController', StepsController);
	
	StepsController.$inject = [
		'$scope'
	];
	
	function StepsController (
		$scope
	) {
		
		var vm = this;
		
		generateSteps();
		
		////////////
		
		function generateSteps() {
			
			vm.steps = [];
			
			for(var i = 1; i <= $scope.options.count; i++) {
				vm.steps.push(i);
			}			
		}
		
    }

}(angular));
    

    