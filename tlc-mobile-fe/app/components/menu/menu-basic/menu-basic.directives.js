/**
 * Capa de Directivas.
 * 
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 */
'use strict';

angular.module('menu-basic.directives', [])

	/**
	 * Componente menuBasic.
     */
	.directive('menuBasic', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'components/menu/menu-basic/menu-basic.html'
		}
	})
