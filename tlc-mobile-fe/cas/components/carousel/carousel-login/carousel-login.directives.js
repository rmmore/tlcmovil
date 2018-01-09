/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @description Esta directiva permite obtener los datos del formulario de logeo
 * @param loginCarouselOptions {object} Es un objeto que tiene los siguientes parametros:
 * 		- ´login´ {function} Función que se ejecuta cuando da clic en el boton logear.
 *			Se le envía un objeto con los parametros:
 *				- ´cardNumber´ {string} Número de la tarjeta
 *				- ´password´ {string} Clave de internet
 *				- ´captcha´ {string} Texto del captcha
 */
 
(function(angular) {	
	'use strict'
	
	angular
		.module('login-carousel.directives', [])
		.directive('loginCarousel', loginCarousel);
		
	function loginCarousel() {
		return {
			restrict: 'E',			
			replace: true,	
			templateUrl: 'components/carousel/carousel-login/carousel-login.html',
			controller: 'LoginCarouselController',
			controllerAs: 'loginCarouselVM',
			bindToController: {
				options: '=loginCarouselOptions'
			}
		}
	}
	
}(angular));
