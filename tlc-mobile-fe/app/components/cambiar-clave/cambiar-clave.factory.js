/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('change-password.factory', [])
		.factory('$changePassword', $changePassword);		

	$changePassword.$inject = [
		'$modalService'
	];
	
	function $changePassword(
		$modalService
	) {
		
		var services = {
			open: open
		};	
		
		return services;
		
		////////////
		
		function open(options) {			
			
			$modalService.open({
				templateUrl: 'components/cambiar-clave/cambiar-clave.html',
				controller: 'ChangePasswordController',
				controllerAs: 'changePasswordVM',
				size: 'sm',
				windowClass: 'modal-page',
				sqOperation: options.sqOperation
			});
		};
	}
	
}(angular));