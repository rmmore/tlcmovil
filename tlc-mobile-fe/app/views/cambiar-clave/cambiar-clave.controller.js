/**
 * @author everis
 */
'use strict';

angular.module('cambiar-clave.view.controller', [])

	.controller('CambiarClaveViewController', 
		['$rootScope', 
		'$scope',
		'$location',
		'$cambiarClaveService',
		'$coreConstants',
		function ($rootScope, $scope, $location, $cambiarClaveService, $coreConstants) {

			$rootScope.showBigLoader = true;
			
			/**
			 * Método que valida la longitud del keypad al presionar el boton continuar
			 *
			 * @method validateForm
			 * @returns {boolean} 
			 */
		    $scope.validate = function() {
				if($rootScope.password == undefined){
					showAlertMessage($coreConstants.ERROR, $coreConstants.PASSWORD_EMPTY, $coreConstants.ALERTA, $coreConstants.RUTA_IMG_MSGBOX);
					$rootScope.clearPassword();
					return;
				}
				if($rootScope.password.length < $rootScope.PASSWORD_MAX_LENGTH){
					showAlertMessage($coreConstants.ERROR, $coreConstants.PASSWORD_EMPTY, $coreConstants.ALERTA,$coreConstants.RUTA_IMG_MSGBOX);
					$rootScope.clearPassword();
					return;
				}
				if($rootScope.password2 == undefined){
					showAlertMessage($coreConstants.ERROR, $coreConstants.PASSWORD_EMPTY, $coreConstants.ALERTA,$coreConstants.RUTA_IMG_MSGBOX);
					$rootScope.clearPassword();
					return;
				}

				if($rootScope.password == $rootScope.password2){
					showAlertMessage($coreConstants.ERROR, $coreConstants.PASSWORD_ONE_TWO_SAME, $coreConstants.ALERTA,$coreConstants.RUTA_IMG_MSGBOX);
					$rootScope.clearPassword();
					return;
				}

				if($rootScope.password2.length < $rootScope.PASSWORD_MAX_LENGTH){
					showAlertMessage($coreConstants.ERROR, $coreConstants.PASSWORD_EMPTY, $coreConstants.ALERTA,$coreConstants.RUTA_IMG_MSGBOX);
					$rootScope.clearPassword();
					return;
				}
				if($rootScope.password3 == undefined){
					showAlertMessage($coreConstants.ERROR, $coreConstants.PASSWORD_EMPTY, $coreConstants.ALERTA,$coreConstants.RUTA_IMG_MSGBOX);
					$rootScope.clearPassword();
					return;
				}
				if($rootScope.password3.length < $rootScope.PASSWORD_MAX_LENGTH){
					showAlertMessage($coreConstants.ERROR, $coreConstants.PASSWORD_EMPTY, $coreConstants.ALERTA,$coreConstants.RUTA_IMG_MSGBOX);
					$rootScope.clearPassword();
					return;
				}
				if($rootScope.password2 != $rootScope.password3){
					showAlertMessage($coreConstants.ERROR, $coreConstants.PASSWORD_SAME_NUMBER, $coreConstants.ALERTA,$coreConstants.RUTA_IMG_MSGBOX);
					$rootScope.clearPassword();
					return;
				}

				$scope.send();
			};

			/**
			 * Metodo que se comunica con servicio para cambio de clave
			 */
			$scope.send = function() {
				
				
				var input = new RequestWrapper({ 
					'numberCard' : $rootScope.user.cardNumber,
					'passwordOldCard' : $rootScope.password, 
					'passwordNewCard' : $rootScope.password2,
					'passwordNewConfirmCard' : $rootScope.password3
				}, null); 

				$cambiarClaveService.all(input).then(function(result) {
					if (result.status == 200 || result.status == 201) {
						$rootScope.clearPassword();

						if(result.data.errorCode === undefined) {
							$location.path("cambiar-clave/exito");
						} else {
							var message = getErrorMessages(result.data.errorCode);
							message = message != null ? message : $coreConstants.ERROR_INTERNO;
							showAlertMessage($coreConstants.ERROR, message, $coreConstants.ALERTA, $coreConstants.RUTA_IMG_MSGBOX);
						}
					}
				});
			};

			$scope.options = {
				maxLength: 18,
				secureKeypad: true,
				autoScroll: true,
				fixed: ['header', '.mod_infoAccount']
			}
		}
	]);