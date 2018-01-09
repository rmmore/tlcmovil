/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('home.view.controller', [])
		.controller('HomeViewController', HomeViewController);

    HomeViewController.$inject = [
		'$navigator',
		'$menu',
		'$mainService',
		'$window',
		'$q',
		'$homeService',
		'$menuMobileService'
	];

    function HomeViewController(
		$navigator,
		$menu,
		$mainService,
		$window,
		$q,
		$homeService,
		$menuMobileService
	){
		
		$menuMobileService.onOpenMenu = getHomeInfo;
		
		init();
		
		////////////
		
		function init() {
			
			if($mainService.getInstance().noContract) {
				cancelHistoryBack();
				return;
			}
			
			if(!$navigator.getViewParams().ContractsView) {
				back();
				return;
			}
			
			if($navigator.getTemporalParams().reloadMenu) {
				$q
					.when([$menu.reloadMenu($navigator.getViewParams().ContractsView.contract.cdContract)])
					.then(getHomeInfo);
			} else {
				getHomeInfo();
			}
			
			cancelHistoryBack();
		}
		
		function back() {
			$navigator.path('/');
		}
		
		function getHomeInfo() {
			$homeService.getHomeInfo().then(function(response) {
				$menuMobileService.showNroOperations(response.data.response)
			});
		}
		
		function cancelHistoryBack() {		

			if($window.history.pushState) {
				$window.history.pushState(null, null, "#/inicio");
				
				$window.onpopstate = function() {
					if($navigator.path() == '/inicio') {
						$window.history.pushState(null, null, "#/inicio");
					}
				};
			}
		}
		
	}

}(angular));