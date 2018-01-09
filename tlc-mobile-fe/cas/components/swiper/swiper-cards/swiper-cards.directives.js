/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @description Esta directiva permite mostrar una lista de tarjetas seleccionables
 * a través de los controles de dirección o con el deplazamiento táctil.
 * @param ´cardModel´ {object/output} Es un objeto al cual el componente le seteará 3
 * atributos:
 * 		- ´cardNumber´ {string} Número de la tarjeta, su formato es '9999-9999-9999-9999'
 *		- ´cardName´ {string} Nombre de la tarjeta, si es != null quiere decir que está 
 *			agregando una nueva tarjeta frecuente
 *		- ´cssClass´ {string} Clase CSS que representa el tipo de tarjeta
 */
 
(function(angular) {	
	'use strict'
	
	angular
		.module('cards-swiper.directives', [])
		.directive('cardsSwiper', cardsSwiper);
		
	function cardsSwiper() {
		return {
			restrict: 'E',		
			replace: true,
			templateUrl: 'components/swiper/swiper-cards/swiper-cards.html',
			controller: 'CardsSwiperController',
			controllerAs: 'cardsSwiperVM',
			bindToController: {
				card: '=?cardModel',
			}
		}
	}
	
}(angular));
