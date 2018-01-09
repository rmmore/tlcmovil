/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('filters-alert.factory', [])
		.factory('$filtersAlert', $filtersAlert);

    $filtersAlert.$inject = [];

    function $filtersAlert(){
		
		var services  = {
			
			// Implementado en FilterAlertXXXController
			// Se ejecuta desde el controlador de la vista para mostrar la alerta de los filtros
			showAlertMovements: null,
			showAlertAccounts: null,
			showAlertPendingOperations: null,
			showAlertBeneficiaries: null,
			showAlertProviders: null
		};	
		
		return services;	
	}

}(angular));