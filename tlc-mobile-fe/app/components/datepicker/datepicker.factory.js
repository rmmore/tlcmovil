/**
 * @author Ricardo Rosales Maldonado(rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('datepicker.factory', [])
		.factory('$movementHistory', $movementHistory);

    $movementHistory.$inject = [];

    function $movementHistory(){
		
		var data = {};
		
		var services  = {
			
			// Implementado en el controlador de la vista
			// Se ejecuta para limpiar la informacion de la grilla
			closeAlert: null,
			
			// Implementado en DatepickerEndcontroller
			// Se ejecuta para poner la fecha por defecto en el calendario dtEnd
			defaultDtEnd: null,
			
			// Implementado en DatepickerFormcontroller
			// Se ejecuta para poner la fecha por defecto en el calendario dtForm
			defaultDtFrom: null,
			
			// Implementado en DatepickerEndcontroller
			// Se ejecuta cuando se selecciona una fecha en el calendario DESDE
			onSelectDtEnd: null,
			
			// Implementado en el controlador de la vista
			// Se ejecuta cuando se ha seleccionado una fecha dtEnd
			onSelectDtFrom: null,
			
			// Implementado en DatepickerController
			// Se ejecuta para mostrar el calendario dtEnd
			showDtEnd: null,
			
			// Implementado en DatepickerController
			// Se ejecuta para mostrar el caledario dtFrom
			showDtFrom: null,
			
			getDateRange: getDateRange,
			setDateRange: setDateRange,
						
			// Ejecutado desde DatepickerController
			// Se ejecuta para iniciar la configuración del calendario
			readyConfig: null
		};	
		
		return services;
		
		////////////
		
		function getDateRange() {
			return data.dateRange
		}
		
		function setDateRange(dateRange) {
			data.dateRange = dateRange
		}
	}

}(angular));