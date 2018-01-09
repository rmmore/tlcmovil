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
			
			function isLoading () {
				return $http.pendingRequests.length > 0;
			};
			
			var timeoutHide;
			
			$scope.$watch(isLoading, function (value) {
				if (value) {
					$timeout.cancel(timeoutHide);
					showLoader();
				} else if(!$scope.noAutoHide){
					// timeout ya que puede haber otra petición
					// Se evita el parpadeo del loader
					timeoutHide = $timeout(function(){hideLoader();}, 500);
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
			
			function hideLoader() {
				$scope.displayValue = false;
				$scope.noAutoHide = false;
				clearMessage();
			}
			
			function noAutoHide() {
				$scope.noAutoHide = true;
			}
			
			function clearMessage() {
				// Timeout porque el loader se oculta con transición
				$timeout(function(){$scope.message = null}, 1000);
			}
		}
	}
	
}(angular));