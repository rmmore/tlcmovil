/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('focus.diretive',[])
		.directive('focus', focus);

	focus.$inject = ['$timeout'];	
	
    function focus($timeout){

        var directive = {
            restrict: 'A',
			scope: {
				focus: '='
			},
            link: link
        };

        return directive;

        function link (scope, element) {
		
			// Se pone este timeout cuando hay varios inputs con el mismo model
			// para esperar a que se concatenen los eventos
			$timeout(function() {
			
				scope.focus = scope.focus || {};
				
				scope.focus.focus = scope.focus.focus || function(options) {
					angular.forEach(scope.focus.focus.$list, function(v){
						v(options);
					});
				};
				
				scope.focus.focus.$list = scope.focus.focus.$list || [];
				
				scope.focus.focus.$list[scope.focus.focus.$list.length] = function(options) {

					$timeout(function() {
						if(element.is(':visible')){
							element[0].focus();
						}		
					});
				}
				
				scope.focus.blur = scope.focus.blur || function() {
					angular.forEach(scope.focus.blur.$list, function(v){
						v();
					});
				};
				
				scope.focus.blur.$list = scope.focus.blur.$list || [];
				
				scope.focus.blur.$list[scope.focus.blur.$list.length] = function() {
					element[0].blur();
				}
			});

		}

    }

}(angular));