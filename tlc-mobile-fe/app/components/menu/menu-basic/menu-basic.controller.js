/**
 * Esta clase controladora manejará todos los procesos 
 * que estan conectados hacia la directiva 'menu-basic' y 
 * las vistas html que se dispone.
 *
 * Capa de Componentes
 *
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 * 
 */
'use strict';

angular.module('menu-basic.controller', [])

	.controller('MenuBasicController', 
		['$rootScope', 
		'$scope',
		'$http',
        '$location',
        '$menuBasicService',
        '$coreConstants',
		function ($rootScope, $scope, $http, $location, $menuBasicService, $coreConstants) {

			$menuBasicService.init = function(menu) {
				$scope.links = menu;
			};

			$scope.go = function(i, path) {
				if(path) {
					$('#menu-container ul#menu>li a').removeClass("active");
					$('#menu-container ul#menu>li a#item-' + i).addClass("active");
				}
			}
		}
	]);