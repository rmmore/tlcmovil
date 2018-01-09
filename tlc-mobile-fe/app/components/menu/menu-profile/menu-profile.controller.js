/**
 * Esta clase controladora manejará todos los procesos 
 * que estan conectados hacia la directiva 'menu-profile' y 
 * las vistas html que se dispone.
 *
 * Capa de Componentes
 *
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 * 
 */
'use strict';

angular.module('menu-profile.controller', [])

	.controller('MenuProfileController', 
		['$rootScope', 
		'$scope',
		'$location',
		'$coreConstants',
		function ($rootScope, $scope, $location, $coreConstants) {
			$scope.url = $location.url();
		}
	]);