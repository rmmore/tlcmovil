/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('menu.services', [])
		.factory('$menuService', $menuService);

    $menuService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $menuService(
		$coreConstants,
		$promiseServices
	){
		
		var services = {
			getMenu: getMenu
		};
		
		return services;
		
		////////////
		
		function getMenu() {	
		
			var promise = $promiseServices.post({
				url: $coreConstants.URL_POST_MENU
			})

			return promise;
		}
		
	}

}(angular));