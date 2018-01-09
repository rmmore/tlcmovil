/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('details-movement.view.controller', [])
		.controller('DetailMovementViewController', DetailMovementViewController);

    DetailMovementViewController.$inject = [
		'$navigator',
		'$loader',
		'$headerMobile',
		'$rootScope'
	];

    function DetailMovementViewController(
		$navigator,
		$loader,
		$headerMobile,
		$rootScope
	){
		var vm = this;
		
		vm.back = back;
		
		$headerMobile.back = back;

		init();
		
		////////////

		function init() {
			
			if(!$navigator.getViewParams().MovementsView) {
				
				if($rootScope.navigator)
					back();
				
				return;
			}
			
			initStates();
		}
		
		function back() {
			$navigator.path('/saldo-y-movimientos/movimientos');
		}	
		
		function initStates() {
			
			vm.account = $navigator.getViewParams().AccountsView.account;
			vm.company = $navigator.getViewParams().CompaniesView.company;
			vm.movement = $navigator.getViewParams().MovementsView.movement;
			
		}
	}

}(angular));