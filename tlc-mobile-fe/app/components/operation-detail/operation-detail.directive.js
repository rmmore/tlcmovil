/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @description Esta directiva permite mostrar el detalle de la operacion según el código 
 * de su tipo de operación.
 * @example <operation-detail data-operation-detail-options="options"></operation-detail>
 * @param {object} `options` es un objeto de opciones que tiene las siguientes propiedades:
 *		- ´idOperation´ {int}: Representa al id de la operacion.
 *		- ´codeTypeOperation´ {string}: Representa al código del tipo de la operacion,
 *			segun este codigo se muestra la plantilla correspondiente.
 *		- ´typeDetail´ {string}: Representa al código del tipo de detalle, según este código
 *			se muestra el detalle de tipo ANTES o de tipo DESPUES
 *		- ´onLoad´ {function}: Esta funcion se ejecuta al obtener el detalle de la operación
 *			y se le envía como parámetro el detalle de la operación obtenida del servicio
 */
 
(function(angular) {
	'use strict';

	angular
		.module('operation-detail.directives', [])
		.directive('operationDetail', operationDetail);		

	function operationDetail() {
		
		var directive = {
			restrict: 'E',
			replace: true,
			controller: 'OperationDetailController',
			controllerAs: 'operationDetailVM',
			template: '<div data-ng-include="urlTemplate"></div>',
			link: link,
			bindToController: {
				options: '=operationDetailOptions'
			}
		};
		
		return directive;			
	
		function link(scope) {

			getUrlTemplate();
			
			function getUrlTemplate() {
				if(scope.operationDetailVM.options && scope.operationDetailVM.options.codeTypeOperation) {
					// Caché bust
					switch(scope.operationDetailVM.options.codeTypeOperation) {
						case 'OMBILL':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMBILL.html';
							break; 
						case 'OMDTCP':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMDTCP.html';
							break; 
						case 'OMFACT':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMFACT.html';
							break; 
						case 'OMPMCT':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMPMCT.html';
							break; 
						case 'OMPMDV':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMPMDV.html';
							break; 
						case 'OMPMSP':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMPMSP.html';
							break; 
						case 'OMPMSV':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMPMSV.html';
							break; 
						case 'OMPSER':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMPSER.html';
							break; 
						case 'OMPTCR':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMPTCR.html';
							break; 
						case 'OMREFC':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMREFC.html';
							break; 
						case 'OMTRFG':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTRFG.html';
							break; 
						case 'OMTRMO':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTRMO.html';
							break; 
						case 'OMTRMT':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTRMT.html';
							break; 
						case 'OMTRON':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTRON.html';
							break; 
						case 'OMTROW':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTROW.html';
							break; 
						case 'OMTRTH':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTRTH.html';
							break; 
						case 'OMTRTN':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTRTN.html';
							break; 
						case 'OMTRWN':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTRWN.html';
							break; 
						case 'OMTRWR':
							scope.urlTemplate = 'components/operation-detail/template/operation-detail-OMTRWR.html';
							break; 
					}
				}
			}	
			
		}
	}
	
}(angular));