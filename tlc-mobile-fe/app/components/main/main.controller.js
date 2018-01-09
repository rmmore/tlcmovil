/**
 * Esta clase controladora sera la primera en ejecutarse al
 * cargar el DOM
 *
 * Capa de Componentes
 * 
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('main.controller', [])
		.controller('MainController', MainController);

    MainController.$inject = [
		'$location',
		'$userService',
		'$unloadService',
		'$loginService',
		'$mainService',
		'$menuMobileService',
		'$headerMobile',
		'$utilService',
		'$navigator',
		'$stateParams'
	];

    function MainController(
		$location,
		$userService,
		$unloadService,
		$loginService,
		$mainService,
		$menuMobileService,
		$headerMobile,
		$utilService,
		$navigator,
		$stateParams
	){

		var vm = this,
			global =  {};
		
		vm.login = $loginService.login;
		vm.logout = $loginService.logoutFull;
		vm.logoutConfirm = $loginService.logoutConfirm;	
		vm.goHome = goHome;
		vm.goPath = goPath;
		vm.openMenuMobile = openMenuMobile;
		vm.closeMenuMobile = closeMenuMobile;
		
		$mainService.locationChangeSuccess = locationChangeSuccess;
		$mainService.goPath = goPath;
		$mainService.getLoggedUser = getLoggedUser;
		$mainService.getInstance = getInstance;
		
		init();
		
		////////////
		
		function getLoggedUser() {
			
			// Llama al servicio para obtener la información del usuario logueado			
			return $userService.getLoggedUser().then(function(response) {
				vm.user = response.data.response;
			});
		}
		
		function goHome() {
			
			// Redirige al home
			$location.path('/');
		}
		
		function goPath(path) {
			
			// Redirige a la ruta indicada
			if($location.path() === path) {
				closeMenuMobile();
				return;
			}
			
			if(path) {
				$navigator.path(path);
			}
		}
		
		function validatePath() {			
			
			//pruebita
			if($location.search().app) {				
				vm.isApp = true;	
			}
			//pruebita 
			if($location.search().security) {
				vm.security = true;
			}
			//pruebita 
			if($location.search().nosecurity) {
				vm.nosecurity = true;
			}
			
			if(vm.noContract) {
				$location.path('/inicio');				
				return;
			}	
			
			// Redirige al '/' si quiere navegar colocando url de paginas
			if ($location.path() != '' && $location.path() != '/') {
				$unloadService.detachBeforeUnload();
				$location.path('/');
			}
		}
		
		function locationChangeSuccess() {

			// Muestra las opciones de la cabecera
			vm.showBack = true;
			vm.showMenu = true;
					
			switch($location.path()) {
				case '/inicio':
					vm.showBack = false;
					break;
				case '/':
					vm.showBack = false;
					break;;
				case '/afiliacion': case '/habilitacion':
					vm.showBack = false;
					vm.showMenu = false;
					break;
			}
			
			if(vm.onlyAContract && $location.path() == '/inicio') {
				vm.showBack = false;
			}
			
			$utilService.removeFixedMenu();
			
			$utilService.scrollTop(document.getElementsByClassName('content-view')[0]);
			
			$headerMobile.back = back;
			
			/*if($navigator.getViewParams().ContractsView) {
				if(!$navigator.getViewParams().ContractsView.contract.enable) {
					$navigator.path('/habilitacion');
					return;
				}
			
				if(!$navigator.getViewParams().ContractsView.contract.affiliate) {
					$navigator.path('/afiliacion');
					return;
				}

				if($stateParams.isEnable && $navigator.getViewParams().ContractsView.contract.enable) {
					$navigator.path('/inicio');
					return;
				}
				
				if($stateParams.isDisable && !$navigator.getViewParams().ContractsView.contract.security) {
					$navigator.path('/inicio');
					return;
				}

				if($stateParams.isAffiliation && $navigator.getViewParams().ContractsView.contract.affiliate) {
					$navigator.path('/inicio');
					return;
				}
			
				if($stateParams.isDisaffiliation && !$navigator.getViewParams().ContractsView.contract.affiliate) {
					$navigator.path('/afiliacion');
					return;
				}

			}*/
			
			if(vm.noContract) {
				switch($location.path()) {				
					case '/perfil': 
					case '/cambiar-clave':
						break;				
					default :
						vm.showBack = false;
						$location.path('/inicio');
						break;
				};
			}
			
		}
		
		function back() {
			window.history.back();
		}

		function openMenuMobile() {
			if($location.path() !== '/' && $utilService.canOpenMenu()) {
				$menuMobileService.openMenu();
			}			
		}

		function closeMenuMobile() {
			$menuMobileService.closeMenu();
		}
		
		function getInstance() {
			return vm;
		}
		
		function init() {
			
        	vm.loading = false;
			
			validatePath();
			
		}
	}

}(angular));