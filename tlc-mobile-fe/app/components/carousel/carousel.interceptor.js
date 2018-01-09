/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict'
	
	angular
		.module('carousel.interceptor', [])
		.directive('carouselInterceptor', carouselInterceptor);
		
	carouselInterceptor.$inject = ['$parse'];
	
	function carouselInterceptor($parse) {
		return {
			require: '^uibCarousel',
			link: function (scope, element, attrs, carouselCtrl) {

				// Para saber cuándo se ha cambiado de slide
				var fn = $parse(attrs.carouselInterceptor);
				var origSelect = carouselCtrl.select;

				carouselCtrl.select = function (nextSlide, direction) {
					if (nextSlide !== this.currentSlide || direction === undefined) {
						fn(scope, {
							nextSlide: nextSlide,
							direction: direction,
						});
					}
					return origSelect.apply(this, arguments);
				};

				// Requiere que next y prev estén asignados en el template
				scope.$watch(attrs.next, function(value) {
					if(value) {
						carouselCtrl.next();
						$parse(attrs.next).assign(scope, false); 
					}
				});
				scope.$watch(attrs.prev, function(value) {
					if(value) {
						carouselCtrl.prev();
						$parse(attrs.prev).assign(scope, false);
					}
				});	
			}
		}
	}
	
}(angular));
