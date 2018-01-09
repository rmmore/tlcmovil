/**
 * Esta clase controladora manejará todos los procesos 
 * que estan conectados hacia la directiva 'keypad' y 
 * las vistas html que se dispone.
 *
 * Capa de Componentes
 *
 * @author Rolando Paredes Alzamora (rparedea@everis.com).
 */
'use strict';

angular.module('keypad.controller', [])

	/**
	 * Keypad Controller.
	 *
	 * @class
	 * @classdesc Controlador que describe los métodos, procesos y variables
	 * con los que esta clase trabaja.
	 */
	.controller('KeypadController', 
		['$window', 
		'$rootScope', 
		'$scope',
		'$keypadService',
		'$location',
		'$http',
		'$coreConstants',
		function ($window, $rootScope, $scope, $keypadService, $location, $http, $coreConstants) {

			$rootScope.PASSWORD_MAX_LENGTH = 6;

			var temp = "";
			var temp2 = "";
			var temp3 = "";
			var keypressCounter = 0;
			var keypressCounter2 = 0;
			var keypressCounter3 = 0;
			
			/**
			 * Método para obtener el objeto que contiene
			 * la data para construir el componente keypad.
			 */
			$keypadService.all().then(function (result) {
				if (result.status == 200 || result.status == 201) {
					$scope.numbers = result.data.seed;
					$rootScope.clearPassword();
				}
			});
			
			/** 
			 * Método para colocar número 
			 * de posiciones en el input password.
			 *
			 * @method set
			 * @todo Cambiar nombre del método por uno mas descriptivo.
			 */
			$scope.set = function(i) {

				keypressCounter ++; // Contador de digitos para la contraseña actual

				// Validar el máximo valor que puede ser ingresado.
				if (keypressCounter <= $scope.PASSWORD_MAX_LENGTH) {
					temp += i; // Atrapa la tecla presionada y la concatena.
					$rootScope.password = temp; // Agrega la cadena a la caja de texto.
				}
				if(keypressCounter > $scope.PASSWORD_MAX_LENGTH){
					if(keypressCounter2 < $scope.PASSWORD_MAX_LENGTH){
						keypressCounter2 ++;//contador de digitos para contrasena nueva
						temp2 += i;
						$rootScope.password2 = temp2;
						key.pass2.checked = true;
					}
					if(keypressCounter >= (($scope.PASSWORD_MAX_LENGTH * 2) + 1) && keypressCounter3 < $scope.PASSWORD_MAX_LENGTH){
						key.pass3.checked = true;
						keypressCounter3++;
						temp3 += i;
						$rootScope.password3 = temp3;
					}
				}
			};

			/**
			 * Método que limpia el input password
			 * despues de haber sido usado.
			 *
			 * @method clearPassword
			 * @returns {boolean} 
			 */
			$rootScope.clearPassword = function() {
				temp = '',temp2='',temp3=''; // Reinicia los valores de la cadena de contraseña.
				keypressCounter = 0,keypressCounter2 = 0,keypressCounter3 = 0; // Reinicia los contadores de teclas presionadas a cero.
			    $rootScope.password = null,$rootScope.password2 = null,$rootScope.password3 = null; // Anula los valores de las cajas de textos.
			    if ($rootScope.password && $rootScope.password2 && $rootScope.password3) {
			    	return false;
			    }
			    if(key.pass1 != undefined){
			    	key.pass1.checked = true;	
			    }
			    return true;
			};
		}
	]);