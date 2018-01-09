/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('menu-toggle.controller', [])
		.controller('MenuToggleController', MenuToggleController)

    MenuToggleController.$inject = [
		'$mdSidenav',
		'$menuMobileService',
		'$timeout'
	];
	
    function MenuToggleController(
		$mdSidenav,
		$menuMobileService,
		$timeout
	){
		
		var vm = this;
		
		vm.id = 'right';
		vm.toggleMenu = buildToggler(vm.id);
		
		$menuMobileService.closeMenu = closeMenu;
		$menuMobileService.openMenu = openMenu;
		
		var _close;
		
		////////////
		
		function buildToggler(navID) {
			return function() {
				$mdSidenav(navID).toggle().then(function() {
					if($mdSidenav(navID).isOpen()) {
						angular.element('.md-sidenav-backdrop').click(function() {							
							overflowBody(false);
						});
					}
				});
				
				if($mdSidenav(navID).isOpen()) {
					overflowBody(true);	
				} else {
					overflowBody(false);
				}
				
				if(!_close) { // Inrercepta el cerrar menu cuando se da clic al backdrop
					_close = $mdSidenav(navID).close;
					$mdSidenav(navID).close = function() {
						overflowBody(false);
						_close();
					}
				}			
			}
		}	
		
		function closeMenu() {
			if($mdSidenav(vm.id).isOpen()) {
				// Ejecutado desde el route-interceptor
				$mdSidenav(vm.id).close();
				overflowBody(false);
			}
		}

		function overflowBody(isOpen) {
			if(isOpen) {
				angular.element('body').addClass('overflow-hidden');
				($menuMobileService.onOpenMenu || angular.noop)();
			} else {
				angular.element('body').removeClass('overflow-hidden');
				$timeout(function() {
					angular.element('body').removeClass('overflow-hidden');
					$menuMobileService.closeMenuOptions();	
				}, 200)			
			}
		}
		
		function openMenu() {
			// Ejecutado desde el MainController-interceptor
			$mdSidenav(vm.id).open();
		}
						
		angular.element('.md-sidenav-right').on('keyup', function(e) {
			if(e.which === 27) {
				overflowBody(false);
			}
		});
		
	}

}(angular));