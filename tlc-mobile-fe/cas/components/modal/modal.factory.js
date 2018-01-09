/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
(function(angular) {
    'use strict';
	
	angular
		.module('modal.factory', [])
		.factory('$modalService', $modalService);
		
	$modalService.$inject = [
		'$uibModal'
	];
	
	function $modalService(
		$uibModal
	) {
		
		var service = {
			open: open
		};
		
		return service;
		
		////////////
		
		function open(options) {
			var modalInstance = $uibModal.open({
				templateUrl: options.templateUrl || 
							(options.template 
								? 'components/modal/template/modal-' + options.template + '.html'
								: 'components/modal/template/modal-basic.html'
							),
				controller: options.controller || 'ModalController',
				controllerAs: options.controllerAs || 'modalVM',
				backdrop: options.backdrop || 'static', 
				keyboard: options.keyboard || false,
				// animation: options.animation || false,
				windowClass: options.windowClass || 'modal-basic',
				size: options.size || 'sm',
				resolve: {
					options: function() {
						return options || {};
					}
				}
			});
			
			modalInstance.result.then(function(data) {
				if(options.accept) {
					options.accept(data || true);
				}
			}, function(flag) {
				if(options.cancel) {
					options.cancel(flag);
				}
			});
			
			modalInstance.opened.then(function() {
				if(options.opened) {
					options.opened();
				}
			});
			
			modalInstance.rendered.then(function() {
				if(options.rendered) {
					options.rendered();
				}
			});
		};
		
	}
	
}(angular));