/**
 * @author everis
 */
'use strict';

angular.module('contact.controller', [])

	.controller('ContactController', 
		['$scope',
		'$coreConstants',
		function ($scope, $coreConstants) {
			$scope.visible = false;
		}
	]);