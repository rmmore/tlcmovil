/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('cards-swiper.services', [])
		.factory('$cardsSwiperService', $cardsSwiperService);

    $cardsSwiperService.$inject = [
		'$coreConstants',
		'$promiseServices'
	];

    function $cardsSwiperService(
		$coreConstants,
		$promiseServices
	){

		function getCardTypes() {
			var promise = $promiseServices.get({
				url: $coreConstants.URL_GET_CARD_TYPES
			});
			
			return promise;
		} 
		
		return {
			getCardTypes: getCardTypes
		};		
	}

}(angular));