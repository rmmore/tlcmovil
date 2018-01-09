/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	angular
		.module('camera.directive', []) 
		.directive('camera', camera);
		
	camera.$inject = ['$window'];
	
	function camera($window) {
		return {
			restrict: 'E',
			templateUrl: 'components/camera/camera.html',
			link: link 
		}
		
		function link (scope, element) {			

			init();
			
			function init () {
				if (!hasGetUserMedia() || !hasURL()) {
					console.log('Tu navegador no soporta getUserMedia()');
				} else {
					$window.navigator.getUserMedia(
						{video: true, audio: false},
						setStream,
						error
					);
				}
			}
			
			function hasGetUserMedia() {
				
				$window.navigator.getUserMedia = 
					$window.navigator.getUserMedia || // Opera
					$window.navigator.webkitGetUserMedia || // Chrome, Safari
					$window.navigator.mozGetUserMedia || // Mocilla nightly
					$window.navigator.msGetUserMedia;
					
				if ($window.navigator.getUserMedia) {
					return true
				}
				
				return false;
			}

			function hasURL() {
				$window.URL = 	$window.URL || $window.webkitURL ||
								$window.mozURL || $window.msURL;
								
				if ($window.URL && $window.URL.createObjectURL) {
					return true;
				}
				
				return false;
			}

			function error(e) {
				console.log('Fallo en la aplicación. ' + e);
			}

			function setStream(stream) {
				var webcam = element.find('video')[0];
				webcam.src = $window.URL.createObjectURL(stream);
				webcam.play();
			}
		}
	}
	
}(angular));