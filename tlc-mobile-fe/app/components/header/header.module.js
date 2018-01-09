/**
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('component.header', [
			'header.directives',
			'header.controller',
			
			'component.header-basic',
			'component.header-mobile'
		]);

}(angular));