/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict'
	
	angular
		.module('component.cards-swiper', [
			'cards-swiper.controller',
			'cards-swiper.directives',
			'cards-swiper.services'
		]);
	
}(angular));