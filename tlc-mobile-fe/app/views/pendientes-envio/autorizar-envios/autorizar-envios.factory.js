/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('authorize-sends.view.factory', [])
		.factory('$authorizeSends', $authorizeSends);
		
	$authorizeSends.$inject = [
		'$modalService',
		'$coreConstants'
	];
	
	function $authorizeSends(
		$modalService,
		$coreConstants
	) {
		
		var service = {
			open: open
		};
		
		return service;
		
		////////////
		
		function open(idsOperations, success) {
			
			if(idsOperations.length > $coreConstants.MAX_OPERATIONS_TO_SEND) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_MAXIMUM_OPERATIONS_TO_SEND,
					showCancel: false
				});
				return;
			}				
			
			$modalService.open({
				templateUrl: 'views/pendientes-envio/autorizar-envios/autorizar-envios.html',
				controller: 'AuthorizeSendsModalController',
				controllerAs: 'authorizeSendsVM',
				size: 'sm',
				windowClass: 'modal-page',
				idsOperations: idsOperations,
				accept: success
			});
		};
		
	}
	
}(angular));