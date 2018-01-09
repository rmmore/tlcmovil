/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 * 
 */

(function(angular) {
	'use strict';
	
	angular
		.module('module.view', [
			
			// Lazy load
			
			'view.contracts',
			'view.affiliation',
                        //'view.home',
			//'view.perfil',
			//'view.cambiar-clave',
			'view.habilitation'//,
			//'view.pendientes-envio.autorizar-envio'
			
			//'view.saldo-movimientos.empresas',
			//'view.saldo-movimientos.cuentas',
			//'view.saldo-movimientos.detalle-cuenta',
			//'view.saldo-movimientos.enviado-resumen',
			//'view.saldo-movimientos.detalle-movimiento',
			
			//'view.pendientes-envio.lista',
			//'view.pendientes-envio.detalle-envio',
			//'view.pendientes-envio.autorizar-envio',
			//'view.pendientes-envio.operaciones-enviadas',
			//'view.pendientes-envio.operacion-enviada',
			
			//'view.beneficiaries.beneficiaries',
			//'view.beneficiaries.detail-beneficiary',
			
			//'view.providers',
			
			//'view.pendientes-firma.lista',
			//'view.pendientes-firma.autorizar-firmas',
			//'view.pendientes-firma.operaciones-firmadas',
			//'view.pendientes-firma.detalle-firma',
			//'view.pendientes-firma.operacion-firmada'
		]);

}(angular));