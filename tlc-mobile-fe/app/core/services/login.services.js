/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */

(function(angular) {
    'use strict';
	
	angular
		.module('core.login.services', [])
		.factory('$loginService', $loginService);

    $loginService.$inject = [
		'$window',
		'$coreConstants',
		'$storageService',
		'$unloadService',
		'$casService',
		'$loader',
		'$injector'
	];

    function $loginService(
		$window,
		$coreConstants,
		$storageService,
		$unloadService,
		$casService,
		$loader,
		$injector
	){
		
		var service = {
			// Redirecciona a la página de login del CAS
			login: login,
			
			//Redirecciona a la página de logout del CAS
			logoutFull: logoutFull,	
			logoutCas: logoutCas,	
			
			// Muestra mensaje de confirmacion para el logout
			logoutConfirm: logoutConfirm
		};
		
		return service;
		
		////////////
		
		function login() {
			$window.location.href = $coreConstants.URL_CAS_LOGIN;
		}
		
		function logoutFull() {
			
			$unloadService.detachBeforeUnload();
			
			$loader.setMessage($coreConstants.MSG_CLOSING_SESSION);
			$loader.noAutoHide();
						
			$casService.logoutFull().then(function() {
				afterLogout();
			}, logoutError);
		}
		
		function logoutCas() {
			
			$unloadService.detachBeforeUnload();
			
			$loader.setMessage($coreConstants.MSG_CLOSING_SESSION);
			$loader.noAutoHide();
						
			$casService.logoutCas().then(function() {
				afterLogout();
			}, logoutError);
		}
		
		function logoutError() {
			
			$loader.hideLoader();
			
			$injector.get('$modalService').open({
				title: $coreConstants.ERROR,
				description: $coreConstants.ERROR_INTERNO_LATER,
				showCancel: false,
				accept: afterLogout
			});	
		}
		
		function afterLogout() {
			//$loader.hideLoader();
			$storageService.clearAll();
			login();
		}

		function logoutConfirm() {
			logout();
			// showConfirmMessage(
				// $coreConstants.CONFIRMATION,
				// $coreConstants.CLOSE_SESSION_QUESTION,
				// $coreConstants.CONFIRMA,
				// [
					// {value: $coreConstants.SI_VALUE}, 
					// {value: $coreConstants.NO_VALUE}
				// ],
				// function(result) {
					// if (result == $coreConstants.SI_VALUE) {
						// $unloadService.detachBeforeUnload();
						// logout();
					// }
				// });
		}	
	}

}(angular));