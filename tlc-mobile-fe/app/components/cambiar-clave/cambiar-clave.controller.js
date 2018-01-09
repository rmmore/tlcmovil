/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 		   Rolando Paredes Alzamora  (rparedea@everis.com)
 */
(function(angular) {
    'use strict';

    angular
        .module('change-password.controller', [])
        .controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = [
        '$rootScope',
        '$uibModalInstance',
        '$modalService',
        '$coreConstants',
        'changePasswordService',
        'options'
    ];

    function ChangePasswordController(
        $rootScope,
        $uibModalInstance,
        $modalService,
        $coreConstants,
        changePasswordService,
        options
    ) {

        var vm = this;
       
        vm.accept = accept;
        vm.cancel = cancel;
        
        vm.validaNumeros = validaNumeros;
		vm.validaLetras = validaLetras;
		vm.validaCaracteresExtranios = validaCaracteresExtranios;

        initStates();

        ////////////

        function initStates() {

            vm.password = null;
        }

        function accept() {
            var vm = this;
         
            if (!vm.password) {
                $modalService.open({
                    title: $coreConstants.ERROR,
                    description: $coreConstants.MSG_NO_WORKSHEET_PASSWORD,
                    showCancel: false
                });
                return;
            }
            
            if(vm.password.length < 6 || vm.password.length > 8){
                $modalService.open({
                    title: $coreConstants.ERROR,
                    description: $coreConstants.MSG_LENGTH_INVALID_PASSWORD,
                    showCancel: false
                });
                return;
            }

            if (!vm.passwordConfirm) {
                $modalService.open({
                    title: $coreConstants.ERROR,
                    description: $coreConstants.MSG_NO_WORKSHEET_PASSWORD_CONFIRM,
                    showCancel: false
                });
                return;
            }
            if (vm.password !== vm.passwordConfirm) {
                $modalService.open({
                    title: $coreConstants.ERROR,
                    description: $coreConstants.MSG_NO_PASSWORD_EQUALS,
                    showCancel: false
                });
                vm.password = null;
                vm.passwordConfirm = null;

                return;
            }

            //Validación para password (contenga al menos una letra y un número)
            var array;
        	for(var i = 0; i < vm.password.length;i++){
				array = vm.password.split("");;
			}
	
	
		  var numberValidate = validaNumeros(array);//true
		  var letterValidate = validaLetras(array);//true
		  //var bizzareChars = validaCaracteresExtranios(array);//false
		  
		  if(numberValidate && letterValidate){
		  }else{
			$modalService.open({
					title: $coreConstants.ERROR,
					description: $coreConstants.MSG_PASSWORD_INCORRECT_FORMAT,
					showCancel: false
				});
				return;
		  }

            var parms = {
                password1: vm.password,
                password2: vm.passwordConfirm,
                passwordNew:vm.password,
                sqOperation: options.sqOperation
            };            

            changePasswordService.changePassword(parms).then(function(response) {
                    
                if (response.errorCode == null) {
                    $modalService.open({
                        title: $coreConstants.COMPLETED_PROCESS,
                        description: $coreConstants.MSG_PROCESS_CHANGE_PASSWORD_CORRECT,
                        showCancel: false
                    });
                    close(vm.password);
                } else {
                    $modalService.open({
                        title: $coreConstants.ERROR,
                        description: $coreConstants.MSG_PROCESS_CHANGE_PASSWORD_INCORRECT,
                        showCancel: false
                    });
                }
                vm.password = null;
                vm.passwordConfirm = null;

            });

        }
        
        function validaNumeros(array){
			for(var i = 0; i < array.length;i++){
				if(!isNaN(array[i])){
					return true;
				}
			}
		}

		function validaLetras(array){
			for(var i = 0; i < array.length;i++){
				if(/^([a-z])*$/.test(array[i])){
					return true;
				}
			}
		}

		function validaCaracteresExtranios(array) {
		    var characterReg = /[`~!@#$%^&*()_°¬|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;			
			for(var i = 0; i < array.length;i++){	
				if(characterReg.test(array[i])) {			
					return true;	
				}
			}	 
		}

        function close(data) {
            $uibModalInstance.close(data);
            $rootScope.$$listeners['$closeModal'] = null;
        }

        function cancel() {
            $uibModalInstance.dismiss();
            $rootScope.$$listeners['$closeModal'] = null;
        };

        $rootScope.$on('$closeModal', function() {
            cancel();
        });
    }

}(angular));