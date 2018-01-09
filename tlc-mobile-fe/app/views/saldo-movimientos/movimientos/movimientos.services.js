/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('movements.view.services', [])
		.factory('$movementsService', $movementsService);

    $movementsService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $movementsService(
		$coreConstants,
		$promiseServices
	){		
		var service = {
			getAccountInfo: getAccountInfo,
			getHistoricMovements: getHistoricMovements,
			getLast20Movements: getLast20Movements,
			sendMovements: sendMovements,
			exportMovements: exportMovements
		};	
		
		return service;
		
		////////////
		
		function getAccountInfo(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_ACCOUNT_INFO
			});
			
			return promise;
		} 
		
		function getHistoricMovements(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_HISTORIC_MOVEMENTS
			});
			
			return promise;
		} 
		
		function getLast20Movements(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_LAST20_MOVEMENTS
			});
			
			return promise;
		} 

		function sendMovements(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_SEND_MOVEMENTS
			});
			
			return promise;
		} 

		function exportMovements(bodyParam, filename) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_EXPORT_MOVEMENTS + filename,
				config: {responseType: 'arraybuffer'}
			});
			
			return promise;
		} 	
	}

}(angular));