/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('component.book-block', [
			'book-block-slide.diretive',
			'book-block.controller',
			'book-block.diretive'
		]);

}(angular));