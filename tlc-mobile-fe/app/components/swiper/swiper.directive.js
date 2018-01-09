/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict'
	
	angular
		.module('swiper.directive', [])
		.directive('swiper', swiper)
		.directive('swiperSlide', swiperSlide);
		
	function swiper() {
		
		var directive = {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'components/swiper/swiper.html',
			controller: 'SwiperController',
			controllerAs: 'swiperVM',
			bindToController: {
				options: '=?swiperOptions'
			}
		};
		
		return directive;
	}
		
	function swiperSlide() {
		
		var directive = {
			restrict: 'E',
			require: '^swiper',
			replace: true,
			transclude: true,
			template: [
				'<div class="swiper-slide"',
					'data-ng-hide="hideSlideNo3D()"', 
					'data-ng-swipe-left="next()"',
					'data-ng-swipe-right="prev()"',
					'data-ng-transclude',
				'></div>'
			].join(' '),
			link: link,
			scope: {
				slide: '=',
				index: '='
			}
		};
		
		return directive;
		
		function link(scope, element, attrs, swiperCtrl) {
			
			swiperCtrl.addSlide(scope.slide);
			
			scope.next = swiperCtrl.next;
			scope.prev = swiperCtrl.prev;
			scope.hideSlideNo3D = function() {
				return swiperCtrl.hideSlideNo3D(scope.index);
			}
			
			scope.$on('$destroy', function() {
				swiperCtrl.removeSlide(scope.slide);
			});
		}
	}
	
}(angular));
