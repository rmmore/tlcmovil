/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('book-block.diretive',[])
		.directive('bookBlock', bookBlock);

	bookBlock.$inject = ['$timeout'];	
	
    function bookBlock($timeout){

		var directive = {
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div class="bb-custom-wrapper"><div class="bb-bookblock" data-ng-transclude></div>',
			controller: 'BookBlockController',
			controllerAs: 'bookBlockVM',
			link: link
		};
		
        return directive;
		
		////////////
		
		function link (scope, element, attrs, ctrl) {			
				
			$timeout(function() {
				var config = {
					$bookBlock : element.find('.bb-bookblock')
				};
				
				config.$bookBlock.bookblock({
					speed : 300,
					shadowSides : 0.8,
					shadowFlip : 0.7
				});
				
				// Fix para navegador nativo de samsumg
				$.data(config.$bookBlock[0], 'bookblock').transEndEventName = [
					'webkitTransitionEnd.bookblock',
					'transitionend.bookblock',
					'oTransitionEnd.bookblock',
					'MSTransitionEnd.bookblock'
				].join(' ');
				
				ctrl.init(config);
			});
        }
    }

}(angular));