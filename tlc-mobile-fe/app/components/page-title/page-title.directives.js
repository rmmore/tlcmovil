/**
 * 
 * @author Ricardo Rosales Maldonado
 */
 
(function() {
	'use strict';
	
	angular
		.module('page-title.directives',[])
		.directive('pageTitle', pageTitle);
		
		pageTitle.$inject = ['$timeout'];

		function pageTitle($timeout) {

			var directive = {
				restrict: 'A',
				link: link
			};

			return directive;

			function link($scope, $element) {
				
				$timeout(function() {
					var title = $element.html();

					if(title) {
						angular.element('#page-title').html(title);
						angular.element('#page-title').css('display', 'inline-block');
						angular.element('#page-logo').hide();
					} else {
						angular.element('#page-title').hide();
						angular.element('#page-logo').css('display', 'inline-block');
					};
				});				
			}	
			
		}

}(angular));
