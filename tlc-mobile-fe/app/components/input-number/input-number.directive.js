/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 * NOTA: 	La finalidad de esta directiva es que los inputs en dispositivo movil 
 *			trabajen de la misma forma que en desktop.
 *			(Solucionado) Al escribir 001 en el model no se setea con 1
 */

(function(angular) {
    'use strict';
	
	angular
		.module('input-number.diretive',[])
		.directive('inputNumber', inputNumber)
		.directive('inputModel', inputModel);

	inputNumber.$inject = ['$timeout', '$parse'];	
	
    function inputNumber($timeout, $parse){

        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link (scope, element, attrs) {
			
			var keyup = $parse(attrs.inputKeyup),
				oldValue;
			
			init();
			
			////////////
			
			function init() {				
				bindEventListeners();
				scope.$on('$destroy', unbindEventListeners);
			}
			
			function bindEventListeners() {				
				element.bind('keypress keydown keyup', eventHandler);
			}
			
			function unbindEventListeners() {
				element.unbind('keypress');
				element.unbind('keydown');
				element.unbind('keyup');
			}	
			
			function setLastValue() {				
				element.val('1234');
				element.val(oldValue);
				updateModel(oldValue); 
			}
			
			function updateModel(value) {
				$parse(attrs.inputModel).assign(scope, value);  
			}
			
            function eventHandler(e) {
				
				var charCode 	= e.keyCode || e.which,
					value 		= element.val(),
					isValid 	= true,
					isDelete	= [8, 46].indexOf(charCode) !== -1,
					isNumber	= (48 <= charCode && charCode <= 57) ||
								  (96 <= charCode && charCode <= 105),
					isSelection	= [37, 39].indexOf(charCode) !== -1;
					
				if(	(229 == charCode && !value && oldValue && oldValue.length > 1) || // Teclas . y - en android
					(37 == charCode && e.type === 'keypress') // Tecla % para ipad
				) {
					setLastValue();
					return false;
				}

				if(e.type === 'keydown') {
					// valida que solo sean numeros
					if(!isNumber && !isDelete && !isSelection) {
						isValid = false;
					}	
					
					// Valida que no supere el maxlength
					if(attrs.maxlength) {
						if(value.length >= attrs.maxlength && !isDelete && !isSelection) {
							if(229 == charCode && value.length > attrs.maxlength) setLastValue(); // Samsumg
							isValid = false;
						}	
					}				
				}		
									
				updateModel(value);
				
				if(e.type === 'keyup') {	
					scope.$evalAsync(function() {
						keyup(scope, {$charCode: charCode, $oldValue: oldValue, $value: value});
					});	
				}
				
				if(e.type === 'keydown') {		
					oldValue = element.val();
				}								
				
				return isValid;	
			}
        }
    }
		
	function inputModel() {
		 var directive = {
            restrict: 'A',
            link: link
        };
		
		return directive;
		
		function link (scope, element, attrs, ctrl) {
			
			scope.$watch(attrs.inputModel, function(newVal) {
				element.val(newVal);
			});
		}
	}

}(angular));