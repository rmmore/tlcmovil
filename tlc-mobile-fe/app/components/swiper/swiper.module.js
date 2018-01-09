/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict'
	
	angular
		.module('component.swiper', [		
			'swiper.directive',
			'swiper.controller',
			
			'component.cards-swiper'
		])
	
}(angular));
