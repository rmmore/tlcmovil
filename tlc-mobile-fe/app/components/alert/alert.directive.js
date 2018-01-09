/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @description Esta directiva permite mostrar alertas
 * @attr ´options´ {object} Objeto que tiene las siguientes propiedades:
 * 			- ´show´ {function} Se ejecuta cuando para mostrar u ocultar la alerta
 * 			- ´type´ {string} Tipo de alerta
 * 			- ´message´ {string} Texto a mostrar en la alerta
 * 			- ´closeable´ {boolean} Para mostrar el icono para cerrar la alerta
 * 			- ´timeout´ {integer} Para que la alerta se cierre en el tiempo establecido
 * 			- ´onClose´ {function} Se ejecuta cuando la alerta se ha cerrado
 */
 
(function(angular) {	
	'use strict';
	
	angular
		.module('alert.directive', [])
		
		.directive('uieAlert', function() {
			return {
				restrict: 'E',
				replace: true,
				controller: 'UieAlertController',
				controllerAs: 'alertVM',
				templateUrl: 'components/alert/alert.html',
				scope: {},
				bindToController: {
					options: '='
				}
			}
		})
		
		.directive('alertNoRecords', function() {
			return {
				restrict: 'E',
				templateUrl: 'components/alert/alert_no_records.html'
			}
		})
	
}(angular));


