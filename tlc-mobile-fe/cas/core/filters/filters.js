/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('core.filters', [])
		.filter('cardnumberSeparator', cardnumberSeparator)
		.filter('cardnumberMask', cardnumberMask);
		
	cardnumberSeparator.$inject =
	cardnumberMask.$inject = ['$coreConstants'];
		
	function cardnumberSeparator($coreConstants) {
		return function (input) {
            if (!input) return input;
            var cardNumberArr = [input.slice(0, 4),  input.slice(4, 8), input.slice(8, 12), input.substring(12)];
			return cardNumberArr.join($coreConstants.CARDNUMBER_SEPARATOR);
        }
	}
		
	function cardnumberMask($coreConstants) {
		return function (input) {
            if (!input) return input;
            var string1 = input.slice(0, input.lastIndexOf($coreConstants.CARDNUMBER_SEPARATOR)),
				string2 = input.substring(input.lastIndexOf($coreConstants.CARDNUMBER_SEPARATOR) + 1);
            return string1.replace(/[a-z0-9A-Z@#%&-_]/g, $coreConstants.CARDNUMBER_MASK_CHAR) + string2;
        }
	}

}(angular));