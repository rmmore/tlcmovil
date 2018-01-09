/*
 * Capa Directivas
 *
 * @author Ricardo Gonzales (jgonzabi@everis.com)
 */
'use strict';

angular.module('breadcrumb.directives', [])

	/**
	 * Componente breadcrumb
	 */

	.directive('breadcrumb', function () {
		return {
			restrict: 'E',
			templateUrl: 'components/breadcrumb/breadcrumb.html'
		}
	})