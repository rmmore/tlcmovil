/**
 * @author Eduardo Iglesias (eiglesih@everis.com)
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';

	angular
		.module('sticky.directive', [])
		.directive('sticky', sticky)
		.directive('stickyAlerts', stickyAlerts)
		.directive('stickyAlertsItem', stickyAlertsItem);
		
	sticky.$inject = [
		'$window', 
		'$timeout',
		'$utilService'
	];
	
	function sticky(
		$window,
		$timeout,
		$utilService
	) {
		return {
			link: function(scope, element, attrs) {
				
				// var $win = angular.element($window);
				var $win = angular.element(document.getElementsByClassName('content-view')[0]);

				if (scope._stickyElements === undefined) {
					scope._stickyElements = [];
					
					$win.bind('scroll.sticky', /*$utilService.debounce(*/evaluePositions/*, 10)*/);
					$win.bind('load.sticky', recheckPositions);
					$win.bind('resize.sticky', /*$utilService.debounce(*/recheckPositions/*, 50)*/);
				}
				
				var initHeight;
				
				function evaluePositions() {
					var pos = $win.scrollTop();
					for (var i=0; i<scope._stickyElements.length; i++) {

						var item = scope._stickyElements[i];
						
						var start = item.start - angular.element('#header').height() + 1; // header mobile
						if(angular.element('#cabecera').is(':visible')){ // header desktop
							start = angular.element('#cabecera').height();
						}
						
						initHeight = item.element.hasClass('fixed') ? (initHeight || 50) : item.element.outerHeight() - element.find('.tab-content').height();
						
						if (!item.isStuck && pos > start + initHeight) {
							item.element.addClass('fixed');
							angular.element('#menu-container').addClass('fixed-menu');

							var height = element.height() - element.find('.tab-content').height();
							item.element.next().css('margin-top', height + 'px');

							item.isStuck = true;

							if (item.placeholder) {
								item.placeholder = angular.element('<div></div>')
								.css({height: item.element.outerHeight() + 'px'})
								.insertBefore(item.element);
							}
						}
						else if (item.isStuck && pos < start + 50) {
							item.element.removeClass('fixed');
							angular.element('#menu-container').removeClass('fixed-menu');
							item.element.next().css('margin-top', '0px');
							item.isStuck = false;

							if (item.placeholder) {
								item.placeholder.remove();
								item.placeholder = true;
							}
						}
					}
				}

				function recheckPositions() {
					for (var i=0; i<scope._stickyElements.length; i++) {
						var item = scope._stickyElements[i];
						if (!item.isStuck) {
							item.start = item.element.offset().top;
						} else if (item.placeholder) {
							item.start = item.placeholder.offset().top;
						}
					}
				}
				
				scope.$on('$destroy', function() {
					$win.unbind('scroll.sticky');
					$win.unbind('load.sticky');
					$win.unbind('resize.sticky');
				});

				$timeout(function() {
					var item = {
						element: element,
						isStuck: false,
						placeholder: attrs.usePlaceholder !== undefined,
						start: element.offset().top
					};

					scope._stickyElements.push(item);
				}, 500);				
			
					
			}	
		}
	}
	
	stickyAlerts.$inject = ['$timeout'];
	
	function stickyAlerts($timeout) {
		
		return {
			link: function(scope, element, attrs) {
				
				var $elem = angular.element(element);
				
				scope.reload = function() {
					$timeout(function(){
						angular
							.element(document.querySelector('[class*="sticky-content-body-"]'))						
							.css('top', $elem.outerHeight() + 'px');
					}, 100);
				};
			},
			controller: ['$scope', function($scope) {
				
				this.reload = function() {
					$scope.reload();
				}
			}]
		};
	}
	
	stickyAlertsItem.$inject = ['$interval'];	
	
	function stickyAlertsItem($interval) {
		
		return {
			require: '^stickyAlerts',
			link: function(scope, element, attrs, stickyAlertsCtrl) {

				var interval = $interval(function() {
					if(element.height()) {
						stickyAlertsCtrl.reload();
						$interval.cancel(interval);
					}
				});
				
				scope.$on('$destroy', stickyAlertsCtrl.reload);
			}
		};
	}

}(angular));