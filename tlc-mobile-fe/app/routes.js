/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';	

	angular	
		.module('routes', [])
		.config(config);
		
	config.$inject = ['$stateProvider','$urlRouterProvider'];
	
	function resolveLasyLoad(components, otherComponents) {
		// return null;
		return {
			loadMyCtrl: ['$ocLazyLoad', '$loader', function($ocLazyLoad, $loader) {
				
				var modules = [].concat(components,otherComponents || []);
				
				($loader.noAutoHide || angular.noop)();
				($loader.showLoader || angular.noop)();

				return $ocLazyLoad.load(modules).then(function() {$loader.hideLoader(true);});
			}]
		};
	}
	
	var packComponent = ['component.pagination', 'component.dropdownlist', 'component.alert', 'component.filters-alert', 'component.tab-panel'/*, 'component.sticky'/*, 'component.currency'*/];

	function config($stateProvider,	$urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
		
			.state('/', {
				url: '/',
				templateUrl: 'views/contracts/contracts.html',
				controller: 'ContractsViewController',
				controllerAs: 'contractsVM'//,
				//resolve: resolveLasyLoad(['view.contracts', 'component.page-title', 'component.token-card'])
			})
		
			.state('/afiliacion', {
				url: '/afiliacion',
				templateUrl: 'views/afiliacion/afiliacion.html',
				controller: 'AffiliationViewController',
				controllerAs: 'affiliationVM',
				//resolve:  resolveLasyLoad(['view.affiliation', 'component.user-key']),
				params: {
					isAffiliation: true
				}
			})
		
			.state('/desafiliacion', {
				url: '/desafiliacion',
				templateUrl: 'views/afiliacion/afiliacion.html',
				controller: 'AffiliationViewController',
				controllerAs: 'affiliationVM',
				//resolve:  resolveLasyLoad(['view.affiliation', 'component.user-key']),
				params: {
					isDisaffiliation: true
				}
			})
		
			.state('/habilitacion', {
				url: '/habilitacion',
				templateUrl: 'views/habilitacion/habilitacion.html',
				controller: 'HabilitationViewController',
				controllerAs: 'habilitationVM',
				//resolve:  resolveLasyLoad(['view.habilitation', 'component.token-card']),
				params: {
					isEnable: true
				}
			})
			
			.state('/habilitacion-post', {
				url: '/habilitacion',
				templateUrl: 'views/habilitacion/habilitacion-post.html',
				controller: 'HabilitationViewController',
				controllerAs: 'habilitationVM',
				//resolve:  resolveLasyLoad(['view.habilitation', 'component.token-card']),
				params: {
					isEnable: true
				}
			})
			
			.state('/deshabilitacion', {
				url: '/deshabilitacion',
				templateUrl: 'views/habilitacion/habilitacion.html',
				controller: 'HabilitationViewController',
				controllerAs: 'habilitationVM',
				//resolve:  resolveLasyLoad(['view.habilitation', 'component.token-card']),
				params: {
					isDisable: true
				}
			})
			
			.state('/inicio', {
				url: '/inicio',
				templateUrl: 'views/home/home.html',
				controller: 'HomeViewController',
				controllerAs: 'homeVM',
				resolve:  resolveLasyLoad(['view.home', 'component.access', 'component.contact', 'component.banners'])
			})
			
			.state('/saldo-y-movimientos/empresas', {
				url: '/saldo-y-movimientos/empresas',
				templateUrl: 'views/saldo-movimientos/empresas/empresas.html',
				controller: 'CompaniesViewController',
				controllerAs: 'companiesVM',
				resolve: resolveLasyLoad('view.saldo-movimientos.empresas')
			})
			
			.state('/saldo-y-movimientos/cuentas', {
				url: '/saldo-y-movimientos/cuentas',
				templateUrl: 'views/saldo-movimientos/cuentas/cuentas.html',
				controller: 'AccountsViewController',
				controllerAs: 'accountsVM',
				resolve:  resolveLasyLoad('view.saldo-movimientos.cuentas', packComponent)
			})
			
			.state('/saldo-y-movimientos/movimientos', {
				url: '/saldo-y-movimientos/movimientos',
				templateUrl: 'views/saldo-movimientos/movimientos/movimientos.html',
				controller: 'MovementsViewController',
				controllerAs: 'movementsVM',
				resolve:  resolveLasyLoad(['view.saldo-movimientos.detalle-cuenta', 'component.datepicker', 'component.progressBar', 'component.input-mail', 'component.chips', 'component.focus'], packComponent)
			})
			
			.state('/saldo-y-movimientos/detalle-de-movimiento', {
				url: '/saldo-y-movimientos/detalle-de-movimiento',
				templateUrl: 'views/saldo-movimientos/detalle-movimiento/detalle-movimiento.html',
				controller: 'DetailMovementViewController',
				controllerAs: 'detailMovementVM',
				resolve:  resolveLasyLoad('view.saldo-movimientos.detalle-movimiento')
			})
			
			.state('/saldo-y-movimientos/enviado-resumen', {
				url: '/saldo-y-movimientos/enviado-resumen',
				templateUrl: 'views/saldo-movimientos/enviado-resumen/enviado-resumen.html',
				controller: 'SentSummaryViewController',
				controllerAs: 'sentSummaryVM',
				resolve:  resolveLasyLoad('view.saldo-movimientos.enviado-resumen')
			})				
			
			.state('/pendientes-de-envio', {
				url: '/pendientes-de-envio',
				templateUrl: 'views/pendientes-envio/lista/pendientes-envio.html',
				controller: 'OperationsToSendViewController',
				controllerAs: 'operationsToSendVM',
				resolve:  resolveLasyLoad(['view.pendientes-envio.lista', 'view.pendientes-envio.autorizar-envio', 'component.steps', 'component.operation-list', 'component.clave-planilla', 'component.change-password'], packComponent)
			})
			
			.state('/pendientes-de-envio/detalle-de-envio', {
				url: '/pendientes-de-envio/detalle-de-envio',
				templateUrl: 'views/pendientes-envio/detalle-envio/detalle-envio.html',
				controller: 'ShippingDetailViewController',
				controllerAs: 'shippingDetailVM',
				resolve:  resolveLasyLoad(['view.pendientes-envio.detalle-envio', 'view.pendientes-envio.autorizar-envio', 'component.operation-detail', 'component.carousel'])					
			})
							
			.state('/pendientes-de-envio/operacion-enviada', {
				url: '/pendientes-de-envio/operacion-enviada',
				templateUrl: 'views/pendientes-envio/operacion-enviada/operacion-enviada.html',
				controller: 'OperationSentViewController',
				controllerAs: 'operationSentVM',
				resolve:  resolveLasyLoad(['view.pendientes-envio.operacion-enviada', 'component.operation-status'])
			})	
							
			.state('/pendientes-de-envio/operaciones-enviadas', {
				url: '/pendientes-de-envio/operaciones-enviadas',
				templateUrl: 'views/pendientes-envio/operaciones-enviadas/operaciones-enviadas.html',
				controller: 'OperationsSentViewController',
				controllerAs: 'operationsSentVM',
				resolve:  resolveLasyLoad(['view.pendientes-envio.operaciones-enviadas', 'component.operation-status', 'component.operation-list'])		
			})				
			
			.state('/pendientes-de-envio/beneficiarios', {
				url: '/pendientes-de-envio/beneficiarios',
				templateUrl: 'views/beneficiarios/beneficiarios/beneficiarios.html',
				controller: 'BeneficiariesViewController',
				controllerAs: 'beneficiariesVM',
				resolve:  resolveLasyLoad('view.beneficiaries.beneficiaries')	
			})
			
			.state('/pendientes-de-envio/detalle-beneficiario', {
				url: '/pendientes-de-envio/detalle-beneficiario',
				templateUrl: 'views/beneficiarios/detalle-beneficiario/detalle-beneficiario.html',
				controller: 'BeneficiaryDetailViewController',
				controllerAs: 'beneficiaryDetailVM',
				resolve:  resolveLasyLoad('view.beneficiaries.detail-beneficiary')		
			})			
			
			.state('/pendientes-de-envio/proveedores', {
				url: '/pendientes-de-envio/proveedores',
				templateUrl: 'views/proveedores/proveedores.html',
				controller: 'ProvidersViewController',
				controllerAs: 'providersVM',
				resolve:  resolveLasyLoad('view.providers')	
			})			
			
			.state('/pendientes-de-firma', {
				url: '/pendientes-de-firma',
				templateUrl: 'views/pendientes-firma/lista/pendientes-firma.html',
				controller: 'OperationsToSignViewController',
				controllerAs: 'operationsToSignVM',
				resolve:  resolveLasyLoad(['view.pendientes-firma.lista', 'view.pendientes-firma.autorizar-firmas', 'component.steps', 'component.operation-list', 'component.clave-planilla', 'component.change-password'], packComponent)		
			})
			
			.state('/pendientes-de-firma/operaciones-firmadas', {
				url: '/pendientes-de-firma/operaciones-firmadas',
				templateUrl: 'views/pendientes-firma/operaciones-firmadas/operaciones-firmadas.html',
				controller: 'OperationsSignedsViewController',
				controllerAs: 'operationsSignedsVM',
				resolve:  resolveLasyLoad(['view.pendientes-firma.operaciones-firmadas', 'component.operation-status', 'component.operation-list'])	
			})				
			
			.state('/pendientes-de-firma/operaciones-rechazadas', {
				url: '/pendientes-de-firma/operaciones-rechazadas',
				templateUrl: 'views/pendientes-firma/operaciones-firmadas/operaciones-firmadas.html',
				controller: 'OperationsSignedsViewController',
				controllerAs: 'operationsSignedsVM',
				resolve:  resolveLasyLoad('view.pendientes-firma.operaciones-firmadas', ['component.operation-status', 'component.operation-list'])	
			})				
			
			.state('/pendientes-de-firma/detalle-de-firma', {
				url: '/pendientes-de-firma/detalle-de-firma',
				templateUrl: 'views/pendientes-firma/detalle-firma/detalle-firma.html',
				controller: 'SignatureDetailViewController',
				controllerAs: 'signatureDetailVM',
				resolve:  resolveLasyLoad(['view.pendientes-firma.detalle-firma', 'component.operation-detail', 'component.input-text', 'component.carousel'])	
			})
			
			.state('/pendientes-de-firma/operacion-firmada', {
				url: '/pendientes-de-firma/operacion-firmada',
				templateUrl: 'views/pendientes-firma/operacion-firmada/operacion-firmada.html',
				controller: 'SignedOperationViewController',
				controllerAs: 'signedOperationVM',
				resolve:  resolveLasyLoad(['view.pendientes-firma.operacion-firmada', 'component.operation-status', 'view.pendientes-envio.autorizar-envio'])	
			})
			.state('/pendientes-de-firma/operacion-rechazada', {
				url: '/pendientes-de-firma/operacion-rechazada',
				templateUrl: 'views/pendientes-firma/operacion-firmada/operacion-firmada.html',
				controller: 'SignedOperationViewController',
				controllerAs: 'signedOperationVM',
				resolve: resolveLasyLoad(['view.pendientes-firma.operacion-firmada', 'component.operation-status', 'view.pendientes-envio.autorizar-envio']) 
			})				
			
			.state('/pendientes-de-firma/beneficiarios', {
				url: '/pendientes-de-firma/beneficiarios',
				templateUrl: 'views/beneficiarios/beneficiarios/beneficiarios.html',
				controller: 'BeneficiariesViewController',
				controllerAs: 'beneficiariesVM',
				resolve:  resolveLasyLoad('view.beneficiaries.beneficiaries')	
			})
			
			.state('/pendientes-de-firma/detalle-beneficiario', {
				url: '/pendientes-de-firma/detalle-beneficiario',
				templateUrl: 'views/beneficiarios/detalle-beneficiario/detalle-beneficiario.html',
				controller: 'BeneficiaryDetailViewController',
				controllerAs: 'beneficiaryDetailVM',
				resolve:  resolveLasyLoad('view.beneficiaries.detail-beneficiary')	
			})
			
			.state('/pendientes-de-firma/proveedores', {
				url: '/pendientes-de-firma/proveedores',
				templateUrl: 'views/proveedores/proveedores.html',
				controller: 'ProvidersViewController',
				controllerAs: 'providersVM',
				resolve:  resolveLasyLoad('view.providers')	
			})	
			
			
			.state('/perfil', {
				url: '/perfil',
				templateUrl: 'views/perfil/perfil.html',
				resolve:  resolveLasyLoad(['view.perfil', 'component.menu-profile'])	
			})					
			.state('/cambiar-clave', {
				url: '/cambiar-clave',
				templateUrl: 'views/cambiar-clave/cambiar-clave-1.html',
				resolve:  resolveLasyLoad('view.cambiar-clave')	
			})
			.state('/cambiar-clave/exito', {
				url: '/cambiar-clave/exito',
				templateUrl: 'views/cambiar-clave/cambiar-clave-2.html',
				resolve:  resolveLasyLoad('view.cambiar-clave')	
			})		
		
			
			// .otherwise({
				// redirectTo: '/'
			// });
	}

}(angular));