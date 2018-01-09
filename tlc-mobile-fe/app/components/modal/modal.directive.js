/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
	'use strict';
	
	angular
		.module('modal.directives', [])		
		.directive('modalAutoHeight', modalAutoHeight)
		
		modalAutoHeight.$inject = ['$window'];
		
		function modalAutoHeight($window) {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					
					var $win = angular.element($window),
						id = scope.$id + new Date().getTime();
					
					$win.bind('resize.modal' + id, calculateHeight);
					
					function calculateHeight() {
						var height = $win.height() - (Number(attrs.modalAutoHeight) || 50);
						element.css('max-height', height + 'px');
					}
					
					scope.$on('$destroy', function() {
						$win.unbind('resize.modal' + id);
					});
					
					calculateHeight();
				}
			}
		}
		
}(angular))
