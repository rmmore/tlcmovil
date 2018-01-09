/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 		   Rolando Paredes Alzamora (rparedea@everis.com)
 */

(function() {
    'use strict';
	
	angular
		.module('input-mail.controller', [])
		.controller('InputMailController', InputMailController);
	
	InputMailController.$inject = [
		'$modalService',
		'$coreConstants',
		'$utilService',
		'$timeout'
	];

    function InputMailController(
		$modalService,
		$coreConstants,
		$utilService,
		$timeout
	){
		
		var vm = this,
			mainCtrl;
		
		vm.init = init;
		vm.send = send;
		
		////////////
				
		function init(_mainCtrl){
			
			vm.mails = [];
			
			mainCtrl = _mainCtrl;
			
			vm.options = {
				placeholder: $coreConstants.DESC_EMAIL_PLACEHOLDER,
				onAdd: onAdd,
				onMore: onMore,
				chipBuffer: null,
				maxlength: 254
			}
		};


		function isValidEmail(mail){
//    		return $coreConstants.REGEX.E_MAIL_REG.test(mail);
			var regex = new RegExp(/^\w+([\.-]?\w+)*(@\w+)(([\.-]\w{2})|([\.-]\w{3})(\.\w{2})?)$/);
			return regex.test(mail);
		}
		
		function onAdd(input) {

			var emailValid = isValidEmail(input);
			if(!emailValid){
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_INVALID_EMAIL,
					showCancel: false
				});
				
				return false;
			}

		
			if(input.length > $coreConstants.MAX_LENGTH_PER_MAIL){
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_MAXIMUM_EMAIL_LENGTH,
					showCancel: false
				});
				
				return false;				
			}
			
			
			if(vm.mails.length >= $coreConstants.MAX_MAXIMUM_NUMBERS_MAIL) {				
				$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_MAXIMUM_NUMBERS_MAIL,
					showCancel: false
				});
				
				return false;
			}
			
			return true;
		}
		
		function onMore() {
			$utilService.scroll('.tab-content', '.mtp-mod-emails');
		}
		
		function send() {
			
			$timeout(function() {
				var okEmails = true;
				
				var mails = angular.copy(vm.mails);
				
				if(vm.options.chipBuffer) {
					
					okEmails = onAdd(vm.options.chipBuffer);
					
					if(okEmails) {
						mails.push(vm.options.chipBuffer);
					}
				}			
				
				if(!vm.mails.length && !vm.options.chipBuffer) {
					$modalService.open({
						title: $coreConstants.ERROR,
						description: $coreConstants.MSG_WITHOUT_EMAILS,
						showCancel: false
					});
					 
					return;
				}
				
				if(okEmails) {
					mainCtrl.sendMovements(mails);	
				}
			});
		}
	}

}(angular));


