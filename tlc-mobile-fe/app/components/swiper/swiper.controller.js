/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict'
	
	angular
		.module('swiper.controller', [])
		.controller('SwiperController', SwiperController)
		
	SwiperController.$inject = ['$element', '$timeout']; 
		
	function SwiperController($element, $timeout) {
		
		var vm = this,
			swiper = null;
		
		vm.addSlide = addSlide;
		vm.removeSlide = removeSlide;
		
		// Sirven cuando no soporte el 3D
		vm.prev = prev;
		vm.next = next;
		vm.hideSlideNo3D = hideSlideNo3D;
		
		vm.options = vm.options || {};
		vm.slides = [];
		
		verifySupport3D();
		
		////////////
		
		function addSlide(slide) {
			vm.slides.push(slide);
			reloadSwiper();
			if(vm.slides.length === 1) {
				onChange(0);
			}
		}
		
		function removeSlide(slide) {
			var index = vm.slides.indexOf(slide);
			vm.slides.splice(index, 1);
			reloadSwiper();
			if(index === 0) {
				onChange(0);
			}
		}
		
		function reloadSwiper() {
			if(!swiper) {
				createSwiper();
			} else {
				$timeout(function() {
					swiper.update(true);
					swiper.slideTo(0);
				});
			}
		}
		
		function createSwiper() {
			if(vm.support3D) {
					
				swiper = new Swiper($element[0], angular.merge({
					pagination: '.swiper-pagination',
					paginationClickable: true,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					spaceBetween: 30
				}, vm.options.config || {}));
				
				swiper.on('slideChangeStart', function(swiper) {
					$timeout(function() {
						onChange(swiper.activeIndex);
					});
				});
			}
		}	
		
		function onChange(activeIndex) {
			if(vm.options.onChange) {
				vm.options.onChange(vm.slides[activeIndex] || activeIndex, vm.activeIndex);
				vm.activeIndex = activeIndex;
			}
		}
		
		function verifySupport3D() {
			
			// Los test están en la librería bookblock.js
			vm.support3D = !Modernizr || 
				(Modernizr.csstransitions && Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d)
		}
		
		// Metodos que sirven cuando no soporta el efecto 3D
		
		function prev() {
			if(!vm.support3D && vm.activeIndex > 0) {
				vm.activeIndex--;
				onChange(vm.activeIndex);
			}
		}
		
		function next() {
			if(!vm.support3D && vm.activeIndex < vm.slides.length - 1) {
				vm.activeIndex++;
				onChange(vm.activeIndex);
			}
		}
		
		function hideSlideNo3D(index) {
			if(!vm.support3D) {
				return index !== vm.activeIndex;
			}
		}
		
	}
	
}(angular));
