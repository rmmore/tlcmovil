/*
 * Capa Directivas
 * @author Ricardo Gonzales (jgonzabi@everis.com)
 * @author Cristina Huamancayo (mhuamanc@everis.com)
 */
'use strict';

angular.module('coachmark.directives', [])

	/*
	 * Componente Dropdownlist
	 */

	.directive('coachmarksslide', function () {
		return {
			restrict: 'E',
			templateUrl: 'components/coachmark/coachmark-view.html'
		}
	});