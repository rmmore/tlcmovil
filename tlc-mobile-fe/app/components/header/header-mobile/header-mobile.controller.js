/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('header-mobile.controller', [])
		.controller('HeaderMobileController', HeaderMobileController);
		
		HeaderMobileController.$inject = [
			'$window',
			'$headerMobile'
		];
		
		function HeaderMobileController (
			$window,
			$headerMobile
		) {
			
			var vm = this;
			
			vm.back = back;
			
			////////////			
			
			function back() {
				$headerMobile.back();
			}
		}

}(angular));