/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('habilitation.view.services', [])
		.factory('$habilitationService', $habilitationService);

    $habilitationService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $habilitationService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			enable: enable,
			disable: disable
		}
		
		return services;
		
		////////////

		function enable(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_ENABLE
			});
			
			return promise;
		} 

		function disable(bodyParam) {
			var promise = $promiseServices.post({
				bodyParam: bodyParam,
				url: $coreConstants.URL_POST_DISABLE
			});
			
			return promise;
		} 
	}

}(angular));