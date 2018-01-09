/**
 * @author everis
 */
'use strict';

angular.module('banners.controller', [])

	.controller('BannersController', 
		['$scope',
		'$coreConstants',
		function ($scope, $coreConstants) {
			$scope.interval = 5000;
			$scope.slides = $coreConstants.CARRUSEL;
			$scope.active = 0;
		}
	]);