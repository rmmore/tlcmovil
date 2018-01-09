/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */

(function(angular) {
    'use strict';
	
	angular
		.module('core.device.services', [])
		.factory('$deviceService', $deviceService);

    $deviceService.$inject = [
		'$location',
		'$window'
	];

    function $deviceService(
		$location,
		$window
	){
		
		var service = {
			verify: verify
		};
		
		return service;
		
		////////////

		function verify() {
			angular.element('body').addClass($location.search().device);
			//$location.search('device', null);
			
			if(!$window.browserCompatible) {
				throw 'Navegador no compatible';
			}
		} 		
	}

}(angular));