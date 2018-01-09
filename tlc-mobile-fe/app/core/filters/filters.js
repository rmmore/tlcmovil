/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('core.filters', [])
		.filter('cardnumberSeparator', cardnumberSeparator)
		.filter('cardnumberMask', cardnumberMask)
		.filter('accountNumberMask', accountNumberMask)
		.filter('dateMask', dateMask)
		.filter('operationStatusMask', operationStatusMask)
		.filter('defaultObservationMask', defaultObservationMask)
		.filter('documentTypeMask', documentTypeMask)
		.filter('subTypeMask',subTypeMask)
		.filter('yesNoMask', yesNoMask);
		
	cardnumberSeparator.$inject =
	cardnumberMask.$inject = 	
	accountNumberMask.$inject =
	operationStatusMask.$inject =
	defaultObservationMask.$inject =
	documentTypeMask.$inject =
	subTypeMask.$inject =
	yesNoMask.$inject = ['$coreConstants'];
	dateMask.$inject = ['$utilService'];
		
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
		
	function accountNumberMask($coreConstants) {
		return function (input) {
            if (!input) return input;
            input = input.trim();
			if(input.length === 13)
				return [input.substring(0,3), 
						input.substring(3,10), 
						input.substring(10,11), 
						input.substring(11,13)
						].join($coreConstants.ACCOUNT_SEPARATOR)
			if(input.length === 14)
				return [input.substring(0,3), 
						input.substring(3,11), 
						input.substring(11,12), 
						input.substring(12,14)
						].join($coreConstants.ACCOUNT_SEPARATOR)
			if(input.length === 15)
				return [input.substring(0,3), 
						input.substring(3,5), 
						input.substring(5,7), 
						input.substring(7,14), 
						input.substring(14)
						].join($coreConstants.ACCOUNT_SEPARATOR)
			if(input.length === 20)
				return [input.substring(0,3), 
						input.substring(3,6), 
						input.substring(6,18), 
						input.substring(18,20)
						].join($coreConstants.ACCOUNT_SEPARATOR)
			return input;
        }
	}
		
	function dateMask($utilService) {			
		return function (input, type) {
			if (!input) return input;
            return $utilService.dateFormat(Number(input), type);
        }
	}
		
	function dateSeparatorMask($coreConstants) {			
		return function (input, type) {
			if (!input) return input;
            return $utilService.dateFormat(Number(input), type);
        }
	}
		
	function operationStatusMask($coreConstants) {			
		return function (input, type) {
			if (!input) return input;
            return $coreConstants.OPERATION_STATUS['STATUS-'+input];
        }
	}
		
	function defaultObservationMask($coreConstants) {			
		return function (input) {
			// if (!input) return $coreConstants.DEFAULT_OBSERVATION;
            return input || $coreConstants.DEFAULT_OBSERVATION;
        }
	}
		
	function documentTypeMask($coreConstants) {			
		return function (input) {
			if (!input) return input;
            return $coreConstants.DOCUMENT_TYPES['TYPE-'+input];
        }
	}
		
	function subTypeMask($coreConstants) {			
		return function (input) {
			if (!input) return input;
            return $coreConstants.SUBTYPE_VALUES['TYPE-'+input];
        }
	}

	function yesNoMask($coreConstants) {			
		return function (input) {
			if (!input) return input;
            return $coreConstants.YES_NO[input];
        }
	}

}(angular));