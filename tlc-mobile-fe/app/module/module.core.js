/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('module.core', [
			'core.constants',
			
			'core.response.interceptor',
			'core.request.interceptor',
			'core.error.interceptor',
			'core.route.interceptor',			
			
			'core.login.services',
			'core.authentication.services',
			'core.cas.services',
			'core.user.services',
			'core.storage.services',
			'core.unload.services',
			'core.promise.services',
			'core.navigator.services',
			'core.download.services',
			'core.device.services',
			'core.util.services',
			'core.filters'
		]);

}(angular));
