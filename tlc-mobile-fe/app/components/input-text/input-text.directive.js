/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @see http://ascii.cl/es/
 * @based  https://github.com/angular-ui/ui-mask
 */

(function(angular) {
    'use strict';
	
	angular
		.module('input-text.diretive',[])
		.directive('inputText', inputText);

	inputText.$inject = ['$utilService'];	
	
    function inputText($utilService){

        var directive = {
            restrict: 'A',
			require: 'ngModel',
            link: link
        };

        return directive;

        function link (scope, element, attrs, ctrl) {
			
			var valueOld = element.val() || '',
				caretPosOld = 0;
			
			var regex = new RegExp(attrs.inputText);
			
			init();
			
			function init() {				
				bindEventListeners();
				scope.$on('$destroy', unbindEventListeners);
			}
			
			function bindEventListeners() {
				
				// No se usa kerpress dado que en android no reconoce ese evento
				// https://bugs.chromium.org/p/chromium/issues/detail?id=118639
				// element.bind('keypress', keypress);
				
				element.bind('input keydown keyup paste click copy focus', eventHandler);
			}
			
			function unbindEventListeners() {
				element.unbind('input');
				element.unbind('keydown');
				element.unbind('keyup');
				element.unbind('paste');
				element.unbind('click');
				element.unbind('copy');
				element.unbind('focus');
			}						
			
			function keypress(e) {
				var charCode = e.keyCode || e.which,
					letter = String.fromCharCode(charCode);
			}
			
			function eventHandler(e) {

				e = e || {};
				
				var charCode = e.keyCode || e.which,
					eventType = e.type,
					value = element.val(),					
					caretPos = $utilService.getCaretPosition(element) || 0,
					isSelection = (charCode >= 37 && charCode <= 40)

				// These events don't require any action
				if (isSelection || (eventType === 'click' || eventType === 'keyup' || eventType === 'copy' || eventType === 'focus')) {
					caretPosOld = caretPos;			
					return;
				}
				
				if(!regex.test(value)) {
					value = valueOld;
					
					if(eventType === 'input') {
						caretPos = caretPosOld;
					}
				}			
				
				// if($.browser.chrome && $.browser.versionNumber < 40) {				
					// if(value.length > attrs.maxlength) {
						// value = value.substr(0, attrs.maxlength - 1);
					// }
				// }			

				element.val(value);
				
				valueOld = value;
				
				scope.$evalAsync(function() {
					ctrl.$setViewValue(value);
				});			
				
				// if($.browser.chrome && $.browser.versionNumber < 40) {
					// if(caretPos == 0 && value.length > 1) {
						// $utilService.setCaretPosition(element, value.length);
						// return;
					// }
				// }
				
				if(value.length === 1 && caretPos == 0) {
					$utilService.setCaretPosition(element, 1);
					return;
				}	
				
				$utilService.setCaretPosition(element, caretPos);
			}			
        }

    }

}(angular));