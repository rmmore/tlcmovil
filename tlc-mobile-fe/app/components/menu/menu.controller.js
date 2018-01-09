/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('menu.controller', [])
		.controller('MenuController', MenuController)

    MenuController.$inject = [		
        '$menuService',
		'$menuMobileService',
		'$menuBasicService',
		'$menu',
		'$loader',
		'$coreConstants',
		'$mainService'
	];

    function MenuController(
        $menuService,
		$menuMobileService,
		$menuBasicService,
		$menu,
		$loader,
		$coreConstants,
		$mainService
	){	
		
		$menu.reloadMenu = getMenu;
		
		////////////
		
		function getMenu(cdContract) {
			
			var queryParam = {
				cdContract: cdContract
			};
			
			$loader.setMessage($coreConstants.MSG_LOAD_MENU);
			
			return $menuService.getMenu().then(function(response) {					
				
				$menuBasicService.init(response.data.response);				
				$menuMobileService.init(response.data.response);
			});
		}
	}

}(angular));