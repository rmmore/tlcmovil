/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('contracts.view.factory', [])
		.factory('$contracts', $contracts);

    function $contracts(){
		
		var data = {}
		
		var services = {
			setPermissions: setPermissions,
			getPermissions: getPermissions
		}
		
		return services;
		
		////////////

		function setPermissions(permissions) {
			data.permissions = permissions
		}

		function getPermissions() {
			return data.permissions;
		} 
	}

}(angular));