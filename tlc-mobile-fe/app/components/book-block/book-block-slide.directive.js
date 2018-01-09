/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('book-block-slide.diretive',[])
		.directive('bbSlide', bbSlide);
	
    function bbSlide(){

		var directive = {
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div class="bb-item" data-ng-transclude></div>',
		};	
		
        return directive;
    }

}(angular));