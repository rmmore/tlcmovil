/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
  
(function(angular) {    
    'use strict'
 
    angular
        .module('cards-swiper.controller', [])
        .controller('CardsSwiperController', CardsSwiperController);
         
    CardsSwiperController.$inject = [
        '$storageService',
        '$modalService',
        '$cardsSwiperService',
        '$coreConstants'
    ];
         
    function CardsSwiperController(
        $storageService,
        $modalService,
        $cardsSwiperService,
        $coreConstants
    ) {     
        var vm = this,
            currentIndex = null;
         
        vm.deleteCard = deleteCard;
        vm.editCard = editCard;
        vm.keyupCardNumber = keyupCardNumber;
        vm.selectRemember = selectRemember;
        vm.initBookBlock = initBookBlock;
         
        init();
         
        ////////////
         
        function init() {
            initStates();
            getSlides();
        }
         
        function initStates() {
                     
            vm.slides = [];
             
            vm.card = {}; 
     
            vm.regex = {frequentCard: $coreConstants.REGEX.FREQUENT_CARD};
             
            vm.swiper = {
                onChange: onChangeCard
            };
        }
         
        function getSlides() {          
            $cardsSwiperService.getCardTypes().then(function(response) {
                var slides = response.data.response;
                 
                angular.forEach(slides, function(slide) {
                    slide.cardNumberBase = slide.cardNumber.split('-');
					slide.cardNumber = angular.copy(slide.cardNumberBase);
                });
                 
                vm.slides = $storageService.getFrequentsCards().concat(slides);         
            });         
        }
         
        function clearCard(index) {
			
			vm.card.cardNumber = null;
			vm.card.cardName = null;
			
            var slide = vm.slides[index === 0 ? 0 : (index || currentIndex)];
			
            if(slide) {
				slide.disabledCheck = true;
				slide.showCardName = false;
				
				if(slide.bookBlock) {
					slide.bookBlock.first();
				}
				
				if(angular.isDefined(index) && !slide.isRemember) {
					slide.cardNumber = angular.copy(slide.cardNumberBase);
				}
			}
        }
         
        function deleteCard(card) {
            $storageService.deleteFrequentCard(card);
			
			vm.slides.splice(currentIndex, 1);
        }
         
        function updateCard(modalClose) {
            if(!vm.card.cardName) {         
                $modalService.open({
                    title: $coreConstants.ERROR,
                    description: $coreConstants.MSG_INCOMPLETE_ALIAS_CARD,
                    showCancel: false
                });
                return;
            }
             
            if(!$storageService.validateUniqueCardAlias(vm.card)) {             
                $modalService.open({
                    title: $coreConstants.ERROR,
                    description: $coreConstants.MSG_ANOTHER_CARD_SAME_ALIAS,
                    showCancel: false
                });
                return;
            }
             
            vm.slides[currentIndex].cardName = vm.card.cardName;
            $storageService.updateCardName(vm.slides[currentIndex]);           
             
            modalClose();
        }
         
        function editCard() {
             
            vm.card.cardName = vm.slides[currentIndex].cardName;
             
            $modalService.open({
                templateUrl: 'components/swiper/swiper-cards/card-edit.html',
                controllerAs: 'editCardVM',
                windowClass: 'modal-page modal-edit-card',
                size: 'md',
                animation: true,
                resolve: {
                    card: vm.card,
                    deleteCard: deleteCard,
                    updateCard: updateCard,
                    regexFrequentCard: vm.regex.frequentCard
                },
                cancel: function() {vm.card.cardName = null;}
            });
        }       
         
        // function selectSlide(nextSlide) {
        function onChangeCard(_currentIndex, oldIndex) {
             
            // var slide = nextSlide.slide.actual;
            currentIndex = _currentIndex;
            var slide = vm.slides[currentIndex];
             
            blurCardNumber();
			
			clearCard();
			clearCard(oldIndex);
			 
			// Se asigna los valores por defecto de la siguiente tarjeta
			vm.card.cssClass = slide.cssClass;
			 
			if(slide.isRemember) {
				vm.card.cardNumber = slide.cardNumber;
			} else {					
				slide.cardNumber = angular.copy(slide.cardNumberBase);
			}
                 
        }
 
        function blurCardNumber() {      
			var slide = vm.slides[currentIndex];
            if(slide.cardNumberFocus){              
                slide.cardNumberFocus[1].blur();               
                slide.cardNumberFocus[2].blur();               
                slide.cardNumberFocus[3].blur();
            }
        }
         
        function initBookBlock(bookBlockVM, index) {
			var slide = vm.slides[index];
            slide.bookBlock = bookBlockVM;
        }
                     
        function keyupCardNumber($charCode, $oldValue, $value, cardNumberX) {     
			var slide = vm.slides[currentIndex];      
                         
            // Posiciona el foco en el siguiente cardNumber cuando se ha completado los 4 caracteres
            if(String($value || '').length >= 4) {               
                if(slide.cardNumberFocus[cardNumberX + 1])
                    slide.cardNumberFocus[cardNumberX + 1].focus();
            }           
             
            // Posiciona el foco en el anterior cardNumber cuando esta vacio y se presiona la tecla para borrar
            var isDelete = [8, 46, 229].indexOf($charCode) !== -1;

            if(isDelete && !$oldValue && !$value && cardNumberX - 1 !== 0){
                if(slide.cardNumberFocus[cardNumberX - 1]) {
                    slide.cardNumberFocus[cardNumberX - 1].focus();
					
					var val = slide.cardNumber[cardNumberX - 1] || '';
					var length = val.length - 1 > 0 ? val.length - 1 : 0;
					vm.slides[currentIndex].cardNumber[cardNumberX - 1] = String(val).substring(0, length);
				}
            }
             
            getCardNumber();
        }
         
        function getCardNumber() {			
			var slide = vm.slides[currentIndex];      
			
            var cardNumber = ''.concat(
                (slide.cardNumber[0] || ''), '-',
                (slide.cardNumber[1] || ''), '-',
                (slide.cardNumber[2] || ''), '-',
                (slide.cardNumber[3] || '')
            )
             
            if(cardNumber.length !== 19) {
                clearCard();
            } else {
                // Para que pierda el foco el card number
                slide.cardNumberFocus[3].blur();
                slide.disabledCheck = false;
                vm.card.cardNumber = cardNumber;                
            }
        }
         
        function selectRemember() {
			var slide = vm.slides[currentIndex];  
			
            if(slide.showCardName && slide.cardNameFocus) {
				slide.cardNameFocus.focus();
            }
        }
    }
     
}(angular));