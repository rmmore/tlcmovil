/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('beneficiary-detail.view.controller', [])
		.controller('BeneficiaryDetailViewController', BeneficiaryDetailViewController);

    BeneficiaryDetailViewController.$inject = [
		'$navigator',
		'$loader',
		'$headerMobile'
	];

    function BeneficiaryDetailViewController(
		$navigator,
		$loader,
		$headerMobile
	){
		
		var vm = this;
		
		vm.back = back;
		
		$headerMobile.back = back;
		
		init();
		
		////////////

		function init() {

			if(!$navigator.getViewParams().BeneficiaryDetailView) {
				back();
				return;
			}
			
			initStates();			
		}
		
		function back() {
			$navigator.path($navigator.getModule() + '/beneficiarios');
		}
		
		function initStates() {		
		
			vm.beneficiary = $navigator.getViewParams().BeneficiaryDetailView.beneficiary;		
			vm.showMain = true;
		}
	}

}(angular));