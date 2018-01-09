/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {	
	'use strict'

	angular
		.module('login-carousel.controller', [])
		.controller('LoginCarouselController', LoginCarouselController);
		
	LoginCarouselController.$inject = [
		'$coreConstants',
		'$modalService',
		'$storageService',
		'$window',
		'$utilService'
	];
		
	function LoginCarouselController(
		$coreConstants,
		$modalService,
		$storageService,
		$window,
		$utilService
	) {
		
		var vm = this;
		
		vm.options = vm.options || {};
		
		vm.whichIskey = whichIskey;
		vm.next = next;
		vm.prev = prev;
		vm.login = login;
		
		vm.options.clearAll = clearAll;
		
		initStates();
		
		////////////	
					
		function initStates() {
		
			vm.card = {cardNumber: null, cardName: null, cssClass: null};	
			
			vm.urlTlcWeb = $coreConstants.URL_TLC_WEB;
			
			vm.keypadOptions = {maxLength: 6, secureKeypad: true, code: null};
			
			vm.captchaOptions = {code: null, value: null, uuid: null};
			
			vm.active = 0;
			
			vm.isApp = $window.location.search.indexOf('app') !== -1;
		}
		
		function next() {
			if(!vm.card.cardNumber) {
			
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_INCOMPLETE_CARD,
					showCancel: false
				});
				
				return;
			}
					
			if(Modernizr.localstorage && vm.card.cardName) {
				if($storageService.getFrequentsCards().length >= $coreConstants.MAX_FREQUENT_CARD) {
					
					$modalService.open({
						title: $coreConstants.ERROR,
						description: $coreConstants
										.MSG_MAX_FREQUENT_CARD
										.replace('{{max}}', $coreConstants.MAX_FREQUENT_CARD),
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
			}
			
			if(!Modernizr.localstorage && vm.card.cardName) {
				$modalService.open({
					title: $coreConstants.WARNING,
					description: $coreConstants.MSG_NO_LOCAL_STORAGE_CARD,
					showCancel: false
				});
			}
			
			vm.active = 1;
			clearAll();
		}
		
		function prev() {
			vm.active = 0;
		}
		
		function whichIskey() {
			$modalService.open({
				title: $coreConstants.MSG_WHICH_IS_KEY,
				classBody: 'text-size-justify line-normal',
				description: $coreConstants.MSG_WHICH_IS_KEY_DESC,
				showCancel: false
			});
		}
		
		function login() {
			
			if(!vm.password || vm.password.length !== $coreConstants.PASSWORD_LENGTH) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_INCOMPLETE_PASSWORD,
					showCancel: false
				});
				return;
			}
			
			if(!vm.captchaOptions.value) {
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_INCOMPLETE_CAPTCHA,
					showCancel: false
				});							
				return;							
			}
			
			vm.options.login({
				
				cardNumber: $utilService.clearCardNumber(vm.card.cardNumber),
				password: vm.password,
				captcha: vm.captchaOptions.value.toLowerCase(),
				captchaCode: vm.captchaOptions.code,
				captchaUuid: vm.captchaOptions.uuid,
				keypadCode: vm.keypadOptions.code,
				serviceUrl: $coreConstants.APP_TLC_URL
				
			}, saveCard);
			
		}
		
		function saveCard() {			
			if(Modernizr.localstorage && vm.card.cardName) {
				var rememberCar = {
					cardNumber: vm.card.cardNumber,
					cardName: vm.card.cardName,
					cssClass: vm.card.cssClass,
					isRemember: true
				};
				
				$storageService.setFrequentCard(rememberCar);
			}
		}
		
		function clearAll() {
			vm.password = null;
			vm.captchaOptions.reload();
		}
	}
	
}(angular));