/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('authorize-signs.view.factory', [])
		.factory('$authorizeSigns', $authorizeSigns);
		
	$authorizeSigns.$inject = [
		'$modalService',
		'$coreConstants'
	];
	
	function $authorizeSigns(
		$modalService,
		$coreConstants
	) {
		
		var service = {
			open: open
		};
		
		return service;
		
		////////////
		
		function open(idsOperations, type, success) {
			
			if(idsOperations.length > $coreConstants.MAX_OPERATIONS_TO_SIGN) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_MAXIMUM_OPERATIONS_TO_SIGN,
					showCancel: false
				});
				return;
			}				
			
			$modalService.open({
				templateUrl: 'views/pendientes-firma/autorizar-firmas/autorizar-firmas.html',
				controller: 'AuthorizeSignsModalController',
				controllerAs: 'authorizeSignsVM',
				size: 'sm',
				windowClass: 'modal-page',
				idsOperations: idsOperations,
				type: type,
				accept: success
			});
		};
		
	}
	
}(angular));