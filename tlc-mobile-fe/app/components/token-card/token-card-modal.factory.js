/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('token-card-modal.factory', [])
		.factory('$tokenCard', $tokenCard);
		
	$tokenCard.$inject = ['$modalService'];
	
	function $tokenCard($modalService) {
		
		var service = {
			open: open
		};
		
		return service;
		
		////////////
		
		function open(options) {				
			
			$modalService.open({
				templateUrl: 'components/token-card/template/token-card-modal.html',
				controller: 'TokenCardModalController',
				controllerAs: 'tokenCardModalVM',
				size: 'sm',
				windowClass: 'modal-page',
				confirmAlert: options.confirmationAlert,
				accept: options.success
			});
		};		
	}
	
}(angular));