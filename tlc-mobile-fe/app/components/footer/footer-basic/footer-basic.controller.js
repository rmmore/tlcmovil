/**
 * Esta clase controladora manejará todos los procesos 
 * que estan conectados hacia la directiva 'footer-basic' y 
 * las vistas html que se dispone.
 *
 * Capa de Componentes
 *
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';

	angular
		.module('footer-basic.controller', [])
		.controller('FooterBasicController', FooterBasicController);
		
	FooterBasicController.$inject = [
		'$coreConstants'
	];
		
	function FooterBasicController(
		$coreConstants
	) {
		
		var vm = this;
		
		vm.redesSociales = $coreConstants.REDES_SOCIALES;
		vm.seguridadUrl = $coreConstants.URL_FOOTER_SEGURIDAD;
		
	}

}(angular));