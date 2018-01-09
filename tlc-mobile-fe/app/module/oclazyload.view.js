/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	var app = angular		
		.module('ocLazyLoad.view', [])
		.config(config)
		
	config.$inject = ['$ocLazyLoadProvider'];		
	
	function config($ocLazyLoadProvider) {
		
		$ocLazyLoadProvider.config({
			// debug: true,
			serie: true,
			modules: [
				{name: 'view.affiliation', files: [
					'views/afiliacion/afiliacion.controller.js',
					'views/afiliacion/afiliacion.services.js',
					'views/afiliacion/afiliacion.module.js'
				], serie: true},
				
				{name: 'view.beneficiaries.beneficiaries', files: [
					'views/beneficiarios/beneficiarios/beneficiarios.controller.js',
					'views/beneficiarios/beneficiarios/beneficiarios.services.js',
					'views/beneficiarios/beneficiarios/beneficiarios.module.js'
				], serie: true},
				
				{name: 'view.beneficiaries.detail-beneficiary', files: [
					'views/beneficiarios/detalle-beneficiario/detalle-beneficiario.controller.js',
					'views/beneficiarios/detalle-beneficiario/detalle-beneficiario.module.js'
				], serie: true},
				
				{name: 'view.cambiar-clave', files: [
					'views/cambiar-clave/cambiar-clave.controller.js',
					'views/cambiar-clave/cambiar-clave.services.js',
					'views/cambiar-clave/cambiar-clave.module.js'
				], serie: true},
				
				{name: 'view.contracts', files: [
					'views/contracts/contracts.controller.js',
					'views/contracts/contracts.factory.js',
					'views/contracts/contracts.services.js',
					'views/contracts/contracts.module.js'
				], serie: true},
				
				{name: 'view.habilitation', files: [
					'views/habilitacion/habilitacion.controller.js',
					'views/habilitacion/habilitacion.services.js',
					'views/habilitacion/habilitacion.module.js'
				], serie: true},
				
				{name: 'view.home', files: [
					'views/home/home.controller.js',
					'views/home/home.services.js',
					'views/home/home.module.js'
				], serie: true},
				
				{name: 'view.pendientes-envio.autorizar-envio', files: [
					'views/pendientes-envio/autorizar-envios/autorizar-envios.controller.js',
					'views/pendientes-envio/autorizar-envios/autorizar-envios.factory.js',
					'views/pendientes-envio/autorizar-envios/autorizar-envios.services.js',
					'views/pendientes-envio/autorizar-envios/autorizar-envios.module.js'
				], serie: true},
				
				{name: 'view.pendientes-envio.detalle-envio', files: [
					'views/pendientes-envio/detalle-envio/detalle-envio.controller.js',
					'views/pendientes-envio/detalle-envio/detalle-envio.module.js'
				], serie: true},
				
				{name: 'view.pendientes-envio.lista', files: [
					'views/pendientes-envio/lista/pendientes-envio.controller.js',
					'views/pendientes-envio/lista/pendientes-envio.services.js',
					'views/pendientes-envio/lista/pendientes-envio.module.js'
				], serie: true},
				
				{name: 'view.pendientes-envio.operacion-enviada', files: [
					'views/pendientes-envio/operacion-enviada/operacion-enviada.controller.js',
					'views/pendientes-envio/operacion-enviada/operacion-enviada.module.js'
				], serie: true},
				
				{name: 'view.pendientes-envio.operaciones-enviadas', files: [
					'views/pendientes-envio/operaciones-enviadas/operaciones-enviadas.controller.js',
					'views/pendientes-envio/operaciones-enviadas/operaciones-enviadas.services.js',
					'views/pendientes-envio/operaciones-enviadas/operaciones-enviadas.module.js'
				], serie: true},
				
				{name: 'view.pendientes-firma.autorizar-firmas', files: [
					'views/pendientes-firma/autorizar-firmas/autorizar-firmas.controller.js',
					'views/pendientes-firma/autorizar-firmas/autorizar-firmas.factory.js',
					'views/pendientes-firma/autorizar-firmas/autorizar-firmas.module.js'
				], serie: true},
				
				{name: 'view.pendientes-firma.detalle-firma', files: [
					'views/pendientes-firma/detalle-firma/detalle-firma.controller.js',
					'views/pendientes-firma/detalle-firma/detalle-firma.module.js'
				], serie: true},
				
				{name: 'view.pendientes-firma.lista', files: [
					'views/pendientes-firma/lista/pendientes-firma.controller.js',
					'views/pendientes-firma/lista/pendientes-firma.services.js',
					'views/pendientes-firma/lista/pendientes-firma.module.js'
				], serie: true},
				
				{name: 'view.pendientes-firma.operacion-firmada', files: [
					'views/pendientes-firma/operacion-firmada/operacion-firmada.controller.js',
					'views/pendientes-firma/operacion-firmada/operacion-firmada.module.js'
				], serie: true},
				
				{name: 'view.pendientes-firma.operaciones-firmadas', files: [
					'views/pendientes-firma/operaciones-firmadas/operaciones-firmadas.controller.js',
					'views/pendientes-firma/operaciones-firmadas/operaciones-firmadas.module.js'
				], serie: true},
				
				{name: 'view.perfil', files: [
					'views/perfil/perfil.controller.js',
					'views/perfil/perfil.module.js'
				], serie: true},
				
				{name: 'view.providers', files: [
					'views/proveedores/proveedores.controller.js',
					'views/proveedores/proveedores.services.js',
					'views/proveedores/proveedores.module.js'
				], serie: true},
				
				{name: 'view.saldo-movimientos.cuentas', files: [
					'views/saldo-movimientos/cuentas/cuentas.controller.js',
					'views/saldo-movimientos/cuentas/cuentas.services.js',
					'views/saldo-movimientos/cuentas/cuentas.module.js'
				], serie: true},
				
				{name: 'view.saldo-movimientos.detalle-movimiento', files: [
					'views/saldo-movimientos/detalle-movimiento/detalle-movimiento.controller.js',
					'views/saldo-movimientos/detalle-movimiento/detalle-movimiento.module.js'
				], serie: true},
				
				{name: 'view.saldo-movimientos.empresas', files: [
					'views/saldo-movimientos/empresas/empresas.controller.js',
					'views/saldo-movimientos/empresas/empresas.services.js',
					'views/saldo-movimientos/empresas/empresas.module.js'
				], serie: true},
				
				{name: 'view.saldo-movimientos.enviado-resumen', files: [
					'views/saldo-movimientos/enviado-resumen/enviado-resumen.controller.js',
					'views/saldo-movimientos/enviado-resumen/enviado-resumen.module.js'
				], serie: true},
				
				{name: 'view.saldo-movimientos.detalle-cuenta', files: [
					'views/saldo-movimientos/movimientos/movimientos.controller.js',
					'views/saldo-movimientos/movimientos/movimientos.services.js',
					'views/saldo-movimientos/movimientos/movimientos.module.js'
				], serie: true}
				
			]
		});
	}

}(angular));