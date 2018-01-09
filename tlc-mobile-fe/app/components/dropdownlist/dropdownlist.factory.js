/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 */

(function(angular) {
    'use strict';
	
	angular
		.module('dropdownlist.factory', [])
		.factory('$dropdownList', $dropdownList);

    $dropdownList.$inject = [
		'$dropdownlistService',
		'$modalService',
		'$utilService',
		'$coreConstants'
	];

    function $dropdownList(
		$dropdownlistService,
		$modalService,
		$utilService,
		$coreConstants
	){		
		
		var services = {
		
			//	funcniones tipo default: 
			//		- Implementada en dropdownlist xxxController
			//		- Ejecutada desde la vista para poner el dropdownList 
			//		  en su elemento por defecto
			defaultTypeFile		: null,
			defaultTypeOperation: null,
			defaultTypeSeparator: null,
			defaultTypeAccount	: null,
			defaultTypeCoin		: null,
			defaultTypeOperationMovements: null,
			defaultTypeOrderingBeneficiaries: null,
			defaultTypeOrderingProviders: null,
		
			//	funciones tipo get: 
			//		- Implementada en dropdownlist xxxController
			//		- Ejecutada desde la vista para obtener el item
			//		  seleccionado
			getTypeFile		: null,
			getTypeOperation: null,
			getTypeSeparator: null,		
			getTypeAccount	: null,		
			getTypeCoin		: null,	
			getTypeOperationMovements: null,	
			getTypeOrderingBeneficiaries: null,	
			getTypeOrderingProviders: null,	
		
			//	funciones tipo select: 
			//		- Implementada en la vista
			//		- Ejecutada desde dropdownlist xxxController para 
			//		  detectar cuando se ha seleccionado un item
			onSelectTypeFile: null,
			onSelectSeparator: null,
			onSelectTypeOrderingBeneficiaries: null,
			onSelectTypeOrderingProviders: null,
			
			// Construye el controlador
			buildController: buildController
		};
		
		return services;
		
		////////////		
			
		// Construye las funciones principales de un controlador dropdownList
		function buildController(options) {			
				
			options.vm.name = options.name;
			options.vm.selectItem = selectItem;
			options.vm.getList = getList;	
			options.vm.show = false;		
			options.vm.type = options.type;
			
			options.vm.selection = {};
			// options.vm.listData = [];
			
			options.vm.openModal = openModal;
			services[options.onDefault] = onDefault;
			services[options.getSelection] = getSelection;
			
			var isPositionSelection = false;
			
			if(options.cachedService) {
				getCachedList();
			} else {
				options.vm.getList();
			}
			
			options.vm.show = {items: false};
			
			function selectItem(select) {
				options.vm.selection = select;
				if(options.onSelect) {
					services[options.onSelect](select);
				}
			}
			
			function getList() {				
				$dropdownlistService[options.getList]().then(function(response) {
						
					if(options.responseField) {
						response.data.response = response.data.response[options.responseField] || [];
					} else {
						response.data.response = response.data.response || [];
					}
					
					if(options.itemAll) {						
						response.data.response.unshift(angular.copy($coreConstants.DROPDOWNLIST_DEFAULT));
					}
					
					if(options.hasChildren) {
						var list = [];
						
						angular.forEach(response.data.response, function(item) {
							
							item.isParent = true;
							
							list.push(item);
							
							angular.forEach(item.items, function(subItem) {
								subItem.isChild = true;
								list.push(subItem);
							});
						});
						
						options.vm.listData = transformData(list);
					} else {
						options.vm.listData = transformData(response.data.response);
					}
					
					if(options.byDefault) {
						services[options.onDefault]();
					}
					
					if(isPositionSelection) {
						positionSelection(isPositionSelection);
					}
				});		
			};
			
			function getCachedList() {
				
				var list = angular.copy(options.cachedService()) || [];
				
				list.unshift($coreConstants.DROPDOWNLIST_DEFAULT);
				
				options.vm.listData = transformData(list);
					
				if(options.byDefault) {
					services[options.onDefault]();
				}
			}
			
			function transformData(list) {
				var newList = [];
				
				angular.forEach(list, function(item) {
					newList.push({
						id: item[options.fieldId] || item.id,
						name: item[options.fieldName] || item.name,
						isParent: item.isParent,
						isChild: item.isChild
					})
				})
				
				return newList;
			}
			
			function getSelection() {
				return options.vm.selection;
			}
			
			function onDefault(show, id) {
				if(show === false) {
					selectItem({});
				} else {
					if(id) {
						if(options.vm.listData) {
							positionSelection(id);
						} else {
							isPositionSelection = id;
						}
					} else {
						selectItem(options.vm.listData[0]);
					}
				}
				
				options.vm.show = show;
			}
			
			function positionSelection(id) {
				angular.forEach(options.vm.listData, function(item) {
					if((item[options.fieldId] || item.id) == id) {
						selectItem(item);
					}
				});
			}
			
			function openModal() {				
						
				$modalService.open({
					templateBodyURL: 'components/dropdownlist/dropdownlist-modal.html',
					windowClass: 'modal-dropdownlist',
					title: options.vm.name,
					headerCloseable: true,
					size: 'md',
					resolve: {
						listData: options.vm.listData,
						selectItem: options.vm.selectItem,
						selection: options.vm.selection
					},
					rendered: function() {
						// Posiciona el scroll en el elemento seleccionado							
						$utilService.scroll(
							'.modal-dropdownlist .modal-body', 
							'.modal-dropdownlist .dwl-active'
						)
					}
				});
			}	
		}
	}

}(angular));