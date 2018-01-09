/**
 * @author Ricardo Gonzales (jgonzabi@everis.com)
 * @author Ricardo Rosales (rrosalem@everis.com)
 *
 */

(function(angular) {
    'use strict';
	
	angular
		.module('dropdownlist.services', [])
		.factory('$dropdownlistService', $dropdownlistService);

    $dropdownlistService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $dropdownlistService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getFileTypes: getFileTypes,
			getSeparators: getSeparators,
			getTypesAccounts: getTypesAccounts,
			getCoins: getCoins,
			getTypesOperationSiging: getTypesOperationSiging,
			getTypesOperationSending: getTypesOperationSending,
			getTypesOperationMovements: getTypesOperationMovements,
			getTypesOrderingBeneficiaries: getTypesOrderingBeneficiaries,
			getTypesOrderingProviders: getTypesOrderingProviders
		};	
		
		return services;
		
		////////////

		function getFileTypes() {
			var promise = $promiseServices.get({
				url: $coreConstants.URL_GET_FILE_TYPES
			});
			
			return promise;
		} 

		function getSeparators() {
			var promise = $promiseServices.get({
				url: $coreConstants.URL_GET_SEPARATORS
			});
			
			return promise;
		}

		function getTypesAccounts() {
			var promise = $promiseServices.post({
				url: $coreConstants.URL_GET_TYPES_ACCOUNTS
			});
			
			return promise;
		} 

		function getCoins() {
			var promise = $promiseServices.post({
				url: $coreConstants.URL_GET_COINS
			});
			
			return promise;
		} 

		function getTypesOperationSiging() {
			var promise = $promiseServices.post({
				bodyParam: {nOpeTypeFlag: $coreConstants.MODULES.SIGN},
				url: $coreConstants.URL_GET_TYPES_OPERATION
			});
			
			return promise;
		}

		function getTypesOperationSending() {
			var promise = $promiseServices.post({
				bodyParam: {nOpeTypeFlag: $coreConstants.MODULES.SEND},
				url: $coreConstants.URL_GET_TYPES_OPERATION
			});
			
			return promise;
		}

		function getTypesOperationMovements() {
			var promise = $promiseServices.post({
				url: $coreConstants.URL_GET_TYPES_OPERATION_MOVEMENTS
			});
			
			return promise;
		}

		function getTypesOrdering() {
			var promise = $promiseServices.get({
				url: $coreConstants.URL_GET_TYPES_ORDERING
			});
			
			return promise;
		} 

		function getTypesOrderingBeneficiaries() {
			var promise = $promiseServices.get({
				url: $coreConstants.URL_GET_TYPES_ORDERING_BENEFICIARIES
			});
			
			return promise;
		} 

		function getTypesOrderingProviders() {
			var promise = $promiseServices.get({
				url: $coreConstants.URL_GET_TYPES_ORDERING_PROVIDERS
			});
			
			return promise;
		} 	
	}

}(angular));