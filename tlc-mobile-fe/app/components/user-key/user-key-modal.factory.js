/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('user-key-modal.factory', [])
		.factory('$userKey', $userKey);
		
	$userKey.$inject = ['$modalService'];
	
	function $userKey($modalService) {
		
		var service = {
			open: open
		};
		
		return service;
		
		////////////
		
		function open(options) {				
			
			$modalService.open({
				templateUrl: 'components/user-key/template/user-key-modal.html',
				controller: 'UserKeyModalController',
				controllerAs: 'userKeyModalVM',
				size: 'sm',
				windowClass: 'modal-page',
				confirmAlert: options.confirmationAlert,
				accept: options.success
			});
		};		
	}
	
}(angular));