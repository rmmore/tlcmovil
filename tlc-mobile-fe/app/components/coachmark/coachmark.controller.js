/**
 * Esta clase controladora manejará todos los procesos
 * que estan conectados hacia la directiva 'datepicker'
 *
 * Capa de Componentes
 *
 * @author Ricardo Gonzales (jgonzabi@everis.com)
 * @author Cristina Huamancayo (mhuamanc@everis.com)
 * @author Eduardo Iglesias (eiglesih@everis.com)
 * 
 */

'use strict'

angular.module('coachmark.controller', [])
	.controller('coachmarks', function ($scope) {
        $scope.slides = [
            {image: 'img/modules/slide/mobile/step-01.jpg', description: 'Paso numero uno'},
            {image: 'img/modules/slide/mobile/step-02.jpg', description: 'Paso numero dos'},
            {image: 'img/modules/slide/mobile/step-03.jpg', description: 'Paso numero tres'},
        ];

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    })
    // .animation('.slide-animation', function () {
    //     return {
    //         beforeAddClass: function (element, className, done) {
    //             var scope = element.scope();

    //             if (className == 'ng-hide') {
    //                 var finishPoint = element.parent().width();
    //                 if(scope.direction !== 'right') {
    //                     finishPoint = -finishPoint;
    //                 }
    //                 TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
    //             }
    //             else {
    //                 done();
    //             }
    //         },
    //         removeClass: function (element, className, done) {
    //             var scope = element.scope();

    //             if (className == 'ng-hide') {
    //                 element.removeClass('ng-hide');

    //                 var startPoint = element.parent().width();
    //                 if(scope.direction === 'right') {
    //                     startPoint = -startPoint;
    //                 }

    //                 TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
    //             }
    //             else {
    //                 done();
    //             }
    //         }
    //     };
    // });
