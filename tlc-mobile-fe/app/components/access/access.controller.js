/**
 * @author everis
 */
'use strict';

angular.module('access.controller', [])

	.controller('AccessController', 
		['$rootScope', 
		'$scope',
		'$coreConstants',
		function ($rootScope, $scope, $coreConstants) {
			$scope.aplicaciones = $coreConstants.APLICACIONES;
		}
	]);