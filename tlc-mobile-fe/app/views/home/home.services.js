/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('home.view.services', [])
		.factory('$homeService', $homeService);

    $homeService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $homeService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getHomeInfo: getHomeInfo
		};
		
		return services;
		
		////////////
		
		function getHomeInfo() {
			
			var promise = $promiseServices.post({
				notLoader: true,
				url: $coreConstants.URL_GET_HOME_INFO
			})

			return promise;
		}
		
	}

}(angular));