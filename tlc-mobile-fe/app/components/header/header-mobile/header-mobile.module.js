/**
 * @author Ricardo Rosales Maldonado (rparedea@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('component.header-mobile', [
			'header-mobile.controller',
			'header-mobile.directives',
			'header-mobile.factory'
		]);

}(angular));