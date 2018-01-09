/**
 * Simple contador para contar cuando ocurre el $digests
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @see https://toddmotto.com/super-fast-angular-ng-model-options-limit-digest-cycles/
 */
 
(function(angular) {
    'use strict';
	
	angular
		.module('track-digests.directive', [])
		.directive('trackDigests', trackDigests);
		
	trackDigests.$inject = ['$rootScope'];
	
	function trackDigests($rootScope) {
		return {
			restrict: 'E',
			templateUrl: 'components/track-digest/track-digest.html',
			link: link
		};
		
		function link(scope, element) {
			
			var count = 0;
			
			function countDigests() {
				count++;
				element.find('.track-digests')[0].innerHTML = '$digests: ' + count;
			}
			
			$rootScope.$watch(countDigests);
		}
	}

}(angular));