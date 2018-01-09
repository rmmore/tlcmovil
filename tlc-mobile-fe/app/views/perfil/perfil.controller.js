/**
 * @author everis
 */
'use strict';

angular.module('perfil.view.controller', [])

	.controller('PerfilViewController', 
		['$rootScope', 
		'$scope',
		'$coreConstants',
		function ($rootScope, $scope, $coreConstants) {

			$rootScope.showBigLoader = true;
			
		}
	]);