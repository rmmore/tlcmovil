/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */

(function(angular) {
    'use strict';
	
	angular
		.module('core.navigator.services', [])
		.factory('$navigator', $navigator);

    $navigator.$inject = [
		'$location',
		'$timeout',
		'$rootScope',
		'$state'
	];

    function $navigator(
		$location,
		$timeout,
		$rootScope,
		$state
	){
		
		var service = {
			clear: clear,
			path: path,
			getViewParams: getViewParams,
			getTemporalParams: getTemporalParams,
			getModule: getModule,
			goModule: goModule
		};

		var viewParams = {};
		var temporalParams = {};
		
		return service;
		
		////////////		

		// Limpia los parametros guardados
		function clear(view) {
			if(view) {
				viewParams[view] = null;
			} else {
				viewParams = {};
			}
		}
		
		// Guarda los parametros y redirige al path indicado
		function path(alias, _viewParams, _temporalParams) {
			
			if(alias) {
				if(_viewParams) {
					viewParams[_viewParams[0]] =  _viewParams[1];	
				}
				if(_temporalParams) {
					temporalParams = _temporalParams;
				}

				$rootScope.navigator = true;
				
				// return $location.path(alias);
				return $state.go(alias);
			} else {
				return $location.path();
			}					
		} 
		
		// Obtiene los parametros
		// Si isClear es true limpia el parametro luego de retornar su valor
		function getViewParams(view, isClear) {
			if(view) {
				if(isClear) {
					$timeout(function() {clear(view)});
				}
				return viewParams[view];
			} else {
				return viewParams || {};
			}
		}
		
		// Retorna los parametros temporales y luego los elimina
		function getTemporalParams() {
			$timeout(function() { temporalParams = {}; });
			return temporalParams;
		}
		
		// Obtiene el nombre del modulo principal
		function getModule() {
			return "\/" + $location.path().split('/')[1];
		}
		
		// Redirige al modulo principal
		function goModule() {
			return $state.go(getModule());
		}
	}

}(angular));