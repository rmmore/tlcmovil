/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
(function(angular) {
    'use strict';
	
	angular
		.module('modal.controller', [])
		.controller('ModalController', ModalController);		
		
	ModalController.$inject = [
		'$rootScope',
		'$uibModalInstance',
		'$sce',
		'options'
	];
	
	function ModalController(
		$rootScope,
		$uibModalInstance,
		$sce,
		options
	) {
		
		var vm = this;
		
		vm.accept = accept;
		vm.cancel = cancel;
		
		initStates();
		
		if(options.init) {
			options.init();
		}
		
		////////////
		
		function initStates() {
			
			vm.title 		= options.title;
			vm.showTitle	= options.showTitle !== false;
			vm.textAccept	= options.textAccept || 'Aceptar';
			vm.description	= $sce.trustAsHtml(options.description);
			vm.showAccept	= options.showAccept !== false;
			vm.textCancel 	= options.textAccept || 'Cancelar';
			vm.showCancel	= options.showCancel !== false;
			vm.classHeader	= options.classHeader;
			vm.classBody	= options.classBody;
			vm.classFooter	= options.classFooter;
			vm.styleBody	= options.styleBody;
			vm.showFooter	= options.showFooter !== false;
			vm.include		= options.include;
			vm.headerCloseable	= options.headerCloseable;
			vm.showButtonsBody	= options.showButtonsBody;
			vm.templateBodyURL	= options.templateBodyURL || false;
			
			angular.extend(vm, options.resolve || {});
		}
		
		function close() {
			$uibModalInstance.close();
			$rootScope.$$listeners['$closeModal'] = null;
		}
		
		function accept() {
			close();
		}
		
		function cancel(flag) {
			$uibModalInstance.dismiss(flag);
			$rootScope.$$listeners['$closeModal'] = null;
		}
		
		$rootScope.$on('$closeModal',function(){
			close();
		})
	};

}(angular));