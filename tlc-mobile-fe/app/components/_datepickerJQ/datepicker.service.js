/**
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('datepicker.service', [])
		.factory('$datepickerService', $datepickerService);

    $datepickerService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $datepickerService(
		$coreConstants,
		$promiseServices
	){
		
		var services  = {			
			getDateRange: getDateRange
		};	
		
		return services;
		
		////////////
		
		function getDateRange(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_GET_DATE_RANGE
			});
			
			return promise;
		}
	}

}(angular));