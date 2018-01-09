/**
 * Esta clase controladora manejará todos los procesos
 * que estan conectados hacia la directiva 'dropdownlist'
 *
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('dropdownlist.controller', [])
		.controller('TypeAccountController', TypeAccountController)
		.controller('TypeCoinController', TypeCoinController)
		.controller('TypeFileController', TypeFileController)
		.controller('SeparatorController', SeparatorController)
		.controller('TypeOperationSendingController', TypeOperationSendingController)
		.controller('TypeOperationSigingController', TypeOperationSigingController)
		.controller('TypeOperationMovementsController', TypeOperationMovementsController)
		.controller('TypeOrderBeneficiariesController', TypeOrderBeneficiariesController)
		.controller('TypeOrderProvidersController', TypeOrderProvidersController);
		
	TypeAccountController.$inject = 
	TypeFileController.$inject = 
	SeparatorController.$inject = 
	TypeOperationMovementsController.$inject = 
	TypeOperationSendingController.$inject = 
	TypeOperationSigingController.$inject = 
	TypeOrderBeneficiariesController.$inject = ['$dropdownList'];
	TypeOrderProvidersController.$inject = ['$dropdownList'];
	TypeCoinController.$inject = ['$dropdownList', '$currency'];	
	
	
    function TypeAccountController($dropdownList) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Tipo de cuenta',
			getList: 'getTypesAccounts',
			getSelection: 'getTypeAccount',
			onDefault: 'defaultTypeAccount',
			byDefault: true,
			itemAll: true,
			type: 'modal',
			responseField: 'listAccountTypes'
		});
    }	
	
    function TypeCoinController($dropdownList, $currency) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Moneda',
			getSelection: 'getTypeCoin',
			onDefault: 'defaultTypeCoin',
			byDefault: true,
			itemAll: true,
			type: 'modal',
			cachedService: $currency.getCurrency,
			fieldId: 'cdCurrency',
			fieldName: 'dsCurrency'
		});
    }	
	
    function TypeFileController($dropdownList) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Tipo de archivo',
			getList: 'getFileTypes',
			getSelection: 'getTypeFile',
			onSelect: 'onSelectTypeFile',
			onDefault: 'defaultTypeFile',
			byDefault: true,
			type: 'modal'
		});
    }	
	
    function SeparatorController($dropdownList) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Separador',
			getList: 'getSeparators',
			getSelection: 'getTypeSeparator',
			onSelect: 'onSelectSeparator',
			onDefault: 'defaultTypeSeparator',
			byDefault: false,
			type: 'modal'
		});
    }	
	
    function TypeOperationSigingController($dropdownList) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Tipo de operación',
			getList: 'getTypesOperationSiging',
			getSelection: 'getTypeOperation',
			onDefault: 'defaultTypeOperation',
			hasChildren: true,
			byDefault: true,
			itemAll: true,
			type: 'modal',
			responseField: 'listOperationTypeItemDto'
		});
    }	
	
    function TypeOperationSendingController($dropdownList) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Tipo de operación',
			getList: 'getTypesOperationSending',
			getSelection: 'getTypeOperation',
			onDefault: 'defaultTypeOperation',
			hasChildren: true,
			byDefault: true,
			itemAll: true,
			type: 'modal',
			responseField: 'listOperationTypeItemDto'
		});
    }	
	
    function TypeOperationMovementsController($dropdownList) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Tipo de operación',
			getList: 'getTypesOperationMovements',
			getSelection: 'getTypeOperationMovements',
			onDefault: 'defaultTypeOperationMovements',
			byDefault: true,
			itemAll: true,
			type: 'modal',
			responseField: 'listOperationTypeItemDto'
		});
    }	
	
    function TypeOrderBeneficiariesController($dropdownList) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Ordenar por',
			getList: 'getTypesOrderingBeneficiaries',
			getSelection: 'getTypeOrderingBeneficiaries',
			onSelect: 'onSelectTypeOrderingBeneficiaries',
			onDefault: 'defaultTypeOrderingBeneficiaries',
			byDefault: true,
			type: 'modal'
		});		
		
    }
	
    function TypeOrderProvidersController($dropdownList) {
       
        $dropdownList.buildController({
			vm: this,
			name: 'Ordenar por',
			getList: 'getTypesOrderingProviders',
			getSelection: 'getTypeOrderingProviders',
			onSelect: 'onSelectTypeOrderingProviders',
			onDefault: 'defaultTypeOrderingProviders',
			byDefault: true,
			type: 'modal'
		});		
		
    }

}(angular));
    

    