/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular	
		.module('tab-panel.directives', [])	
		.directive('tabPanel', tabPanel);
		
	tabPanel.$inject = ['$window', '$timeout'];
	
	function tabPanel($window, $timeout) {
		return {
			restrict: 'AE',
			controller: 'TabPanelController',
			controllerAs: 'tabs',
			link: link,
			templateUrl: function(element, attrs) {
				switch(attrs.template) {
					case 'accounts':
						return 'components/tab-panel/template/tab_panel_accounts.html';
					case 'beneficiaries':
						return 'components/tab-panel/template/tab_panel_beneficiaries.html';
					case 'movements':
						return 'components/tab-panel/template/tab_panel_movements.html';
					case 'providers':
						return 'components/tab-panel/template/tab_panel_providers.html';
					case 'sending':
						return 'components/tab-panel/template/tab_panel_sending.html';
					case 'singing':
						return 'components/tab-panel/template/tab_panel_singing.html';
				}
			}
		}
		
		function link(scope, element) {	

			scope.evalueScroll = evalueScroll;			
					
			var $ele = element.find('.tab-content');
			var $win = angular.element($window);
			
			/**
			*  Verifica si el tab sobrepasa la pantalla y le asigna un scroll
			*/							
			function evalueScroll() {		
				$timeout(function() {					
					if($ele.is(':visible')) {
						$ele.css('max-height', ($win.height() - ($ele.offset().top - $win.scrollTop())) + 'px');
					}
				});
			}
			
			/**
			*  Actualiza el tamaño del panel cuando se hace scroll o resize
			*/
			$win.bind('resize.tabPanel', evalueScroll);
			$win.bind('scroll.tabPanel', evalueScroll);	
			
			/**
			*  Elimina los events creados
			*/			
			scope.$on('$destroy', function() {
				$win.unbind('resize.tabPanel');
				$win.unbind('scroll.tabPanel');
			});
		}
	}
	
}(angular));
