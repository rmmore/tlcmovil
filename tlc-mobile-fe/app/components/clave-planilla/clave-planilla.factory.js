/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('clave-planilla.factory', [])
		.factory('$clavePlanilla', $clavePlanilla);		

	$clavePlanilla.$inject = [
		'$modalService',
		'clavePlanillaService'
	];
	
	function $clavePlanilla(
		$modalService,
		clavePlanillaService
	) {
		
		var services = {
			open: open
		};	
		
		return services;
		
		////////////
		
		function open(options) {		
			
			$modalService.open({
				templateUrl: 'components/clave-planilla/clave-planilla.html',
				controller: 'ClavePlanillaController',
				controllerAs: 'clavePlanillaVM',
				size: 'sm',
				windowClass: 'modal-page',
				accept: function(password) {validate(options, password)},
				canResetPassword : options.canResetPassword,
				sqOperation: options.sqOperation

			});
		};
		
		function validate(options, password) {
			var params = {
				sqOperation: options.sqOperation,
				password: password
			};
			
			clavePlanillaService.validateOperationDetail(params).then(function() {
				options.success(password);
			});
		}
	}
	
}(angular));