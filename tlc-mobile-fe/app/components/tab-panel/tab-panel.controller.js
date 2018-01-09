/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';
	
	angular
		.module('tab-panel.controller', [])
		.controller('TabPanelController', TabPanelController);
		
	TabPanelController.$inject = [
		'$scope',
		'$tabPanel',
	];
	
	/**
	 * Tabs Controller
	 *
	 * @class
	 * @classdesc Se encarga de inicializar los valores para los estados
	 * en los tabs o secciones.
	 */
	
	function TabPanelController(
		$scope,
		$tabPanel
	) {
		
		var vm = this;
		
		vm.selectTab = selectTab;
		vm.closeTabs = closeTabs;
		
		$tabPanel.closeTabs = closeTabs;
		
		vm.tab = 0; // Inicialmente los paneles cerrados
		
		////////////

		/**
		 * Función para la pestaña seleccionada.
		 */
		function selectTab(tab) {
			if(vm.tab === tab) {
				vm.closeTabs();
			} else {
				vm.tab = tab;					
		
				$scope.evalueScroll();
				
				$tabPanel.selectTabs(true, vm.tab);
			}
		}
		
		/**
		*  Función para cerrar las Tabs
		*/
		function closeTabs(){			
			$tabPanel.selectTabs(false);
			vm.tab = 0;
		}
			
	}
	
}(angular));