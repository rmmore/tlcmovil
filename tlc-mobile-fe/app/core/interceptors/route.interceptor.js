/**
 * Capa de Interceptores
 *
 * Esta clase intercepta los cambios de pagina
 *
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */

(function(angular) {
    'use strict';
	
    angular
		.module('core.route.interceptor',[])
		.factory('$routeInterceptor', $routeInterceptor);

    $routeInterceptor.$inject = [
		'$rootScope',
		'$mainService',
		'$menuMobileService',
		'$window',
		'$navigator',
		'$timeout'
	];

    function $routeInterceptor(
		$rootScope, 
		$mainService,
		$menuMobileService,
		$window,
		$navigator,
		$timeout
	){
	
    	return {
    		checkRoute: function() {
				
    			$rootScope.$on('$locationChangeSuccess', function(event, current, previus){
						
					// Definido en el MainController
					// $mainService.locationChangeSuccess();
					
					if(current !== previus) {
						
						// Cierra los modales abiertos
						if($rootScope.noCloseModals !== true)
							$rootScope.$emit('$closeModal', {});
						
						// Cierra el keypad mobile
						$rootScope.$emit('$closeKeypadMobile', {});
			
						// Cierra el menu mobile
						$menuMobileService.closeMenu();
						
						// Elimina los eventos del sticky de la pantalla anterior
						angular.element($window)
							.unbind('scroll.sticky') 
							.unbind('load')
							.unbind('resize'); 
							
						validateNavigation(current, previus);
						deleteViewData(current, previus);
						
						$rootScope.navigator = false;
					}
		    	});		
				
    			$rootScope.$on('$stateChangeSuccess', function(){
						
					// Definido en el MainController
					$mainService.locationChangeSuccess();
					
					// Cancela el no cerrar los modales al cambiar de vista
					$timeout(function() {
						$rootScope.noCloseModals = false;
					}, 500);
		    	});		
    		}
    	};
		
		function validateNavigation(current, previus) {

			if(!$rootScope.navigator) {

				if(/(saldo-y-movimientos\/detalle-de-movimiento)$/.test(current) &&
					/(saldo-y-movimientos\/movimientos)$/.test(previus)) {
					
					$navigator.path('/saldo-y-movimientos/cuentas');
				}
			}

			if(!$rootScope.navigator) {

				if(/(pendientes-de-firma\/detalle-de-firma)$/.test(current) &&
					/(pendientes-de-firma)$/.test(previus)) {
					
					$navigator.path('/inicio');
				}

				if(/(pendientes-de-envio\/detalle-de-envio)$/.test(current) &&
					/(pendientes-de-envio)$/.test(previus)) {
					
					$navigator.path('/inicio');
				}
			}
		}
		
		function deleteViewData(current, previus) {

			// Pendientes de firma
			if(	previus.indexOf('pendientes-de-firma') !== -1 && 
				current.indexOf('pendientes-de-firma') === -1) {
					
				$navigator.clear('OperationsToSigningView');
			}

			// Pendientes de envio
			if(	previus.indexOf('pendientes-de-envio') !== -1 && 
				current.indexOf('pendientes-de-envio') === -1) {
					
				$navigator.clear('OperationsToSendView');
			}
		}

	}

}(angular));