/**
 * Esta clase permite comunicar controladores
 *
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 *
 */

(function(angular) {
    'use strict';
	
	angular
		.module('tab-panel.services', [])
		.factory('$tabPanel', $tabPanel);

    $tabPanel.$inject = [];

    function $tabPanel(){

		function selectTabs() {
			// Implementado en los controladores de las view
			// Se ejecuta cuando se abre/cierra un tab 
		} 		

		function closeTabs() {
			// Implementado en TabPanelController
			// Se ejecuta cuando se quiere cerrar los tabs desde el controlador de la vista
		} 	 
		
		return {
			selectTabs: selectTabs,
			closeTabs: closeTabs
		};		
	}

}(angular));