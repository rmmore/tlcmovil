/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */ 

(function(angular) {
    'use strict';
	
	angular
		.module('dropdownlist.controller', [])
		.controller('DropdownListController', DropdownListController);
		
	DropdownListController.$inject = [
		'$scope', 
		'$injector', 
		'$timeout', 
		'$modalService', 
		'$window'
	];	
	
	function DropdownListController(
		$scope, 
		$injector, 
		$timeout, 
		$modalService, 
		$window
	) {
		
		$scope.options = $scope.options || {};
		
		$scope.selectItem = selectItem;		
		$scope.getList = getList;	
		$scope.openModal = openModal;
		
		$scope.options.onDefault = onDefault;
		
		$scope.name = $scope.options.name;
		$scope.show = true;		
		$scope.type = $scope.options.type;
		$scope.selection = {};
		$scope.listData = [];		
		
		getList();
		
		function selectItem(select) {
			
			$scope.selection = select;
			
			$scope.options.select = select;
			
			if($scope.options.onSelect) {
				$scope.options.onSelect(select)
			}
		}
		
		function getList() {				
			$injector.get($scope.options.service)[$scope.options.getList]().then(function(response) {
				
				$scope.listData = response.data.response;
				
				if($scope.options.byDefault) {
					onDefault();
				}	
			});		
		}
		
		function onDefault(show) {
			if(show === false) {
				selectItem({});
			} else {
				selectItem($scope.listData[0]);
			}
			
			$scope.show = show;
		}
		
		function openModal() {
			$modalService.open({
				templateBodyURL: 'components/dropdownlist/dropdownlist-modal.html',
				windowClass: 'modal-dropdownlist',
				title: $scope.name,
				headerCloseable: true,
				resolve: {
					listData: $scope.listData,
					selectItem: $scope.selectItem,
					selection: $scope.selection
				},
				opened: function() {
					var height = (angular.element($window).height() - 150) + 'px';
					// Espera a que se muestre el modal
					$timeout(function() {
						angular.element('.modal-dropdownlist').find('.modal-body').css('max-height', height);
					});
					
					scrollTop();
				}
			});
		}	
		
		// Posiciona el scroll en el elemento seleccionado
		function scrollTop() {
			// Espera a que se muestre el modal
			$timeout(function() {
				
				var body = angular.element('.modal-dropdownlist .modal-body'),
					item = angular.element('.modal-dropdownlist .dwl-active');
				
				if(item.length) {
					item.focus();
					
					body.animate({scrollTop: (item.eq(0).offset().top - body.eq(0).offset().top - 2)  }, 
						'slow', function() { 
							// Se coloca la clase selectable para evitar el efecto 
							// ':active' al cargar el modal 
							body.addClass('selectable');
					});				
				}
			},200);
		}	
		
    }

}(angular));