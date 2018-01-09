/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('core.util.services', [])
		.factory('$utilService', $utilService);

    $utilService.$inject = [
		'$window',
		'$location',
		'$timeout',
		'$coreConstants'
	];

    function $utilService(
		$window,
		$location,
		$timeout,
		$coreConstants
	) {

		var service = {
			canOpenMenu: canOpenMenu,
			debounce: debounce,
			removeFixedMenu: removeFixedMenu,
			scrollTop: scrollTop,
			scroll: scroll,
			isFocused: isFocused,
			getCaretPosition: getCaretPosition,
			setCaretPosition: setCaretPosition,
			clearCardNumber: clearCardNumber
		};
		
		return service; 
		
		////////////		
		
		/**
		 * Verifica si hay un modal abierto y
		 * devuelve `true` si lo hay.
		 * @return {boolean}
		 */
		function canOpenMenu() {
			return !angular.element('.modal').length;					
		}
		
		/**
		 * Limita la cantidad de ejecuciones de
		 * de la funcion a un tiempo ocioso dado
		 *
		 * @param {Function} fn
		 * @param {Numbre} delay
		 * @param {Object} scope
		 * @return {Function}
		 */
		function debounce(fn, delay, scope) {
			// Esta variable existe dentro del
			// clousure
			var lastExecution;

			return function() {
				var args = arguments;

				// Eliminamos la ultima ejecución pendiente
				$timeout.cancel(lastExecution);

				// Definimos una nueva ejecución luego del
				// tiempo ocioso definido
				lastExecution = $timeout(function() {
					fn.apply(scope, args);
				}, delay);
			}
		}	
		
		/**
		 * Remueve el menu fijo para versión desktop
		 */
		function removeFixedMenu() {
			angular.element('#menu-container').removeClass('fixed-menu');
		}		
		
		/**
		 * Situa el scroll al inicio de la ventana
		 */
		function scrollTop() {			
			$timeout(function() {					
				$window.scroll(0,0);
			}, 200);
		} 	
		
		/**
		 * Situa el scroll en la posición del ´element´ dentro del ´container´ indicado
		 * Si ´element´ es null el scroll se posiciona en el top del ´container´
		 * Si ´container´ es null el scroll se posiciona en el top del window
		 * Se colocó el timeout para esperar  que el DOM termine de renderizar
		 * @param {container} selector del contenedor dentro del DOM
		 * @param {element} selector del elemento dentro del DOM
		 * @param {fixed} arreglo de selectores de elementos con position fixed cuya altura
		 *					será restada del cálculo del scrollTop
		 * @param {delay} tiempo de espera para ejecutar el scroll
		 */
		function scroll(container, element, fixed, delay) {
			
			$timeout(function() {
				
				var $cont = angular.element(container || 'body, html'),			
					$elem = angular.element(element);
				
				if($elem.length) {	
				
					$elem.focus();			
					
					var top = $cont.eq(0).offset().top,
						scrollTop = $cont.scrollTop(),
						subtract = 0,
						diff;
						
					angular.forEach(fixed, function(v) {
						subtract += angular.element(v).height();
					});
						
					if(top){
						diff = $elem.eq(0).offset().top - top + scrollTop - subtract - 2;
					} else {
						diff = $elem.eq(0).offset().top - top - subtract - 2;
					}
					
					$cont.animate({scrollTop: diff});
				} else {
					$cont.animate({scrollTop: 0});
				}				
			}, delay || 200);
		} 			
		
		/**
		 * Permite saber si un elemento tiene el foco
		 * @param {elem} selector del elemento dentro del DOM
		 * @return {boolean} devuelve ´true´ si el elemento tiene el foco
		 */
		function isFocused(elem) {
			var elem = angular.element(elem)[0],
				doc = $window.document;
				
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		}	
		
		/**
		 * Permite obtener la posición del cursor del elemento
		 * @param {elem} selector del elemento dentro del DOM
		 * @return {int} devuelve la posición del cursor
		 */
		function getCaretPosition(elem) {
			
			var elem = angular.element(elem)[0],
				doc = $window.document;
			
			if (!elem) {
				return 0;
			}
			if (elem.selectionStart !== undefined) {
				return elem.selectionStart;
			} else if (doc.selection) {
				if (isFocused(elem)) {
					// Curse you IE
					elem.focus();
					var selection = doc.selection.createRange();
					selection.moveStart('character', elem.value ? -elem.value.length : 0);
					return selection.text.length;
				}
			}
			return 0;
		}
		
		/**
		 * Permite poner el cursor en la posición indicada dentro de un elemento
		 * @param {elem} selector del elemento dentro del DOM
		 * @param {pos} ´int´ posición dentro del elemento
		 */
		function setCaretPosition(elem, pos) {
			
			var elem = angular.element(elem)[0];
				
			if (!elem) {
				return 0;
			}
			if (elem.offsetWidth === 0 || elem.offsetHeight === 0) {
				return; // Input's hidden
			}
			if (elem.setSelectionRange) {
				if (isFocused(elem)) {
					elem.focus();
					elem.setSelectionRange(pos, pos);
				}
			}
			else if (elem.createTextRange) {
				// Curse you IE
				var range = elem.createTextRange();
				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		}
		
		/**
		 * Eliminar el separador ('-') del número de tarjeta
		 * @param {cardNumber} Número de tarjeta con separador
		 * @return {string} Número de tarjeta sin separador
		 */
		function clearCardNumber(cardNumber) {			
			var regex = new RegExp($coreConstants.CARDNUMBER_SEPARATOR, 'g');
			return (cardNumber || '').replace(regex, '');
		}
	}

}(angular));