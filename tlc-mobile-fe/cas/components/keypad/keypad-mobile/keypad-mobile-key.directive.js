/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @see https://github.com/trochette/ng-keypad/blob/58fdd35983d1c1890860fb5c0742648862c466c2/src/ngKeypad/ngKey.js
 * 
 * @description Con esta directiva se resuelve el lag del ng-click en iphone
 */
 
(function(angular) {
	'use strict';

	angular
		.module('keypad-mobile-key.directive', [])
		.directive('keypadMobileKey', keypadMobileKey);		
	
	function keypadMobileKey() {
		return {
			restrict: 'A',
			link: link,
			controller: controller
		};
	}
	
	function link(scope, element, attrs) {
				
		var body = angular.element('body');

		init();
		
		////////////
		
		/**
         * Inicializa la configuracion por defecto (sustituye al ng-click)
         */
		function init() {
			if ("ontouchstart" in document.documentElement) {
				element.bind('touchstart.ngKey', keyPressed);
				body.bind('touchend.ngKey', keyDepressed);
			} else {
				element.bind('mousedown.ngKey', keyPressed);
				body.bind('mouseup.ngKey', keyDepressed);
			}

			scope.$on('$destroy', destroy);
		};

		/**
		 * Se ejecuta cuando se presiona sobre este elemento
		 *
		 * @param event
		 */
		function keyPressed(event) {
			element.addClass('pressed');
			event.preventDefault();
			event.stopImmediatePropagation();
			scope.keyPressed(attrs.keypadMobileKey);
		}

		/**
		 * Se ejecuta cuando se termina de presionar sobre este elemento
		 *
		 * @param event
		 */
		function keyDepressed(event) {
			element.removeClass('pressed');
		}

		/**
		 * Limpia todos los eventos antes de destruir esta directiva.
		 */
		function destroy() {
			element.bind('touchstart.ngKey', keyPressed);
			body.bind('touchend.ngKey', keyDepressed);
			element.bind('mousedown.ngKey', keyPressed);
			body.bind('mouseup.ngKey', keyDepressed);
		}
		
	}
	
	controller.$inject = ['$scope', '$keypadMobile'];
	
	function controller($scope, $keypadMobile) {
		
		$scope.keyPressed = function(key) {
			$keypadMobile.keyPressed(key);
		}
		
	}
	
}(angular));