/**
 * @author everis
 * 
 * Capa de servicios de abandono
 *
 */

(function(angular) {
    'use strict';

	angular
		.module('core.unload.services', [])
		.factory('$unloadService', $unloadService);
		
		$unloadService.$inject = [
			'$casService',
			'$coreConstants',
			'$storageService',
			'$timeout',
			'$injector',
			'$interval'
		];
		
        function $unloadService (
			$casService, 
			$coreConstants,
			$storageService,
			$timeout,
			$injector,
			$interval
		) {
			
			var service = {	
				// Elimina el evento beforeUnload cuando se realiza el logout con el fin de no llamar al otro logout del beforeUnload
				detachBeforeUnload: detachBeforeUnload,
				
				// Registra el evento beforeUnload
				registerBeforeUnload: registerBeforeUnload
			};
			
			return service;
			
			////////////
			
            function detachBeforeUnload () {

				window.onbeforeunload = null;
				
				// Para cerrar sesion al actualizar el navegador en iphone y ipad
				if($.browser.platform === 'iphone' || $.browser.platform === 'ipad') {
					validaSiExisteMetodo($injector.get('$loginService'), function() {			
						$injector.get('$loginService').logoutFull();
						throw 'No autenticado';
					});
				}
			}
		
			function validaSiExisteMetodo(method, callback) {
				var intervalo = $interval(function() {
					if(method) {
						$interval.cancel(intervalo);
						callback();
					}
				}, 200);
			}
			
            function registerBeforeUnload() {

				if(!$coreConstants.UNLOAD_LOGOUT) {
					return;
				}

				window.onbeforeunload = function(e) {
					e = e || window.event;
					e.preventDefault = true;
					
					$casService.logoutFull();
					
					$timeout(function() {
						$storageService.clearAll();
					});
					
					return undefined;
				};
			}
			
        }

}(angular));