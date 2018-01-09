/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('document-events.directives', [])
		.directive('documentEvents', documentEvents);
		
	documentEvents.$inject = ['$window'];
	
	function documentEvents($window) {
		return {
			restrict: 'E',
			link: link
		}
	
		function link() {
			
			// Restinge seleccion de textos			
			disableSelectText();
			
			// Restringe click derecho
			// disableClickRight();				

			// Deshabilita la navegacion con la rueda del mouse
			disableWheel();
			
			// Detecta el teclado
			detectKeydown();	
			
		}	

		function disableSelectText() {
			$window.document.onselectstart = function() {return false;}
		}		
			
		function disableClickRight() {
			$window.document.oncontextmenu = function(){return false;}
		}
			
		function disableWheel() {
			angular.element($window.document).bind('wheel', function(ev) {
				if(ev.shiftKey === true) {
					ev.preventDefault();
				}
			});
		}
			
		function detectKeydown() {
				
			angular.element(document).bind('keyup, mouseup, keydown', function(e) {
							
				var ev = (e) ? e : $window.event;
				var code = (ev.which) ? ev.which : $window.event.keyCode;

				// Deshabilita teclas
				disableKeys(ev, code);
				
			});	
		}
			
		function disableKeys(ev, code) {
			// 123: F12 => consola
			// 122: F11 => pantalla completa
			if(code === 123 /*|| code === 122*/) {
				ev.preventDefault();
			}
			
			// Deshabilita tecla de retroceso (backspace)
			var tagName = angular.element($window.document.activeElement)[0].tagName;
			if (code === 8 && ['INPUT', 'TEXTAREA'].indexOf(tagName) === -1) {
				ev.preventDefault();
			}
		}
		
	}

}(angular));