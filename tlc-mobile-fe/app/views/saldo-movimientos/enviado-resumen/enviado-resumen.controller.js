/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('sent-summary.view.controller', [])
		.controller('SentSummaryViewController', SentSummaryViewController);

    SentSummaryViewController.$inject = [
		'$navigator',
		'$headerMobile'
	];

    function SentSummaryViewController(
		$navigator,
		$headerMobile
	){
		
		var vm = this,
			nav = 'MovementsView';
		
		vm.back = back;
		
		$headerMobile.back = back;
		
		init();
		
		////////////		
		
		function init() {
			
			if(!$navigator.getViewParams().MovementsView) {
				back();
				return;
			}
			
			initStates();
		}
		
		function initStates() {
			
			vm.summary = $navigator.getViewParams().MovementsView;
			
			$navigator.clear(nav);	
			
		}
		
		function back() {
			$navigator.path('/saldo-y-movimientos/movimientos');
		}
	}

}(angular));