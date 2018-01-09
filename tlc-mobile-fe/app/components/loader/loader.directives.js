/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('component.loader.directives', []) 
		.directive('loader', loader);
		
	loader.$inject = ['$http', '$loader', '$timeout'];
	
	function loader($http, $loader, $timeout) {
		return {
			restrict: 'E',
			templateUrl: 'components/loader/loader.html',
			link: link 
		}
		
		function link ($scope, element, attrs) {
			
			$loader.setMessage = setMessage;
			$loader.showLoader = showLoader;
			$loader.hideLoader = hideLoader;
			$loader.noAutoHide = noAutoHide;
			
			////////////
			
			function getHttpWithLoader(){
				return $http.pendingRequests.filter(function(http) {
					return http.notLoader !== true;
				})
			}
			
			function isLoading () {				
				return getHttpWithLoader().length > 0;
			};
			
			var timeoutHide,
				timeoutMessage;
			
			$scope.$watch(isLoading, function (value) {
				if (value) {
					$timeout.cancel(timeoutHide);
					$timeout.cancel(timeoutMessage);
					showLoader();
				} else if(!$scope.noAutoHide){
					// timeout ya que puede haber otra petición
					// Se evita el parpadeo del loader
					timeoutHide = $timeout(hideLoader, 500);
				}
			});
			
			function setMessage(message) {
				$scope.message = message;
			}
			
			function showLoader(message) {
				$scope.displayValue = true;
				if(message) {
					setMessage(message);
				}				
			}
			
			function hideLoader(cancelNoAutoHide) {
				if(getHttpWithLoader().length == 0) {
					$scope.displayValue = false;
					$scope.noAutoHide = false;
					clearMessage();
				}
				
				if(cancelNoAutoHide) {
					$scope.noAutoHide = false;
				}
			}
			
			function noAutoHide() {
				$scope.noAutoHide = true;
			}
			
			function clearMessage() {
				// Timeout porque el loader se oculta con transición
				timeoutMessage = $timeout(function(){$scope.message = null}, 500);
			}
		}
	}
	
}(angular));