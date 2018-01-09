/**
 * Capa de Directivas.
 * 
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 */
'use strict';

angular.module('menu-profile.directives', [])

	/**
	 * Componente Left-Bar.
     */
	.directive('menuProfile', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/menu/menu-profile/menu-profile.html'
		}
	})
