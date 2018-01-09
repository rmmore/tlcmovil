/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular.module('component.datepicker', [
		'datepicker.service',
		'datepicker.factory',
		'datepicker.controller',
		'datepicker-from.controller',
		'datepicker-end.controller',
		'datepicker.directives',
		'datepicker.interceptor'
	]);
	
}(angular));