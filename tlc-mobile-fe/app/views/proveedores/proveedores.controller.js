/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function() {
    'use strict';
     
    angular
        .module('providers.view.controller', [])
        .controller('ProvidersViewController', ProvidersViewController);
 
    ProvidersViewController.$inject = [
        '$navigator',
        '$providersService',
        '$dropdownList',
        '$loader',
        '$coreConstants',
        '$headerMobile',
        '$filtersAlert',
		'$utilService',
		'$timeout'
    ];
 
    function ProvidersViewController(
        $navigator,
        $providersService,
        $dropdownList,
        $loader,
        $coreConstants,
        $headerMobile,
        $filtersAlert,
		$utilService,
		$timeout
    ){
         
        var vm = this,
            filters = {};
             
        vm.filter = filter;
        vm.search = search;
        vm.showDetail = showDetail;
        vm.showList = showList;
         
        $headerMobile.back = back;
         
        $dropdownList.onSelectTypeOrderingProviders = onSelectTypeOrdering;
             
        init();
         
        ////////////
 
        function init() {
 
            if(!$navigator.getViewParams().ProvidersView) {
                $navigator.goModule();
                return;
            }
             
            initStates();
             
        }
         
        function back() {
            $navigator.path($navigator.getViewParams().ProvidersView.viewParent);
        }
         
        function initStates() {
             
            filters.typeOrder = {}; 
             
            vm.querySearch = '';
         
            vm.scroll = {
                request: getProviders
            };
        }
     
        function getProviders(paramsScroll, callbackScroll) {
             
            var queryParam = {
                querySearch: filters.querySearch,
                idTypeOrder: filters.typeOrder.id,
                // orderBy: vm.orderBy || 'ASC',
                sqOperation: $navigator.getViewParams().ProvidersView.idOperation,
				typeModule: $navigator.getViewParams().ProvidersView.typeModule
            };
             
            $loader.setMessage($coreConstants.MSG_LOAD_PROVIDERS);
             
			vm.providers = [];
			
            $providersService.getProviders(angular.merge(queryParam, paramsScroll))
            .then(function(response) {          
                 
                vm.providers = (vm.providers || []).concat(response.data.response.paginationOperation.list || []); 
                                 
                vm.noRecords = !vm.providers.length;
                 
                if(callbackScroll) {
                    callbackScroll(response.data.response.paginationOperation.count, response.data.response.paginationOperation.pages);
                }       
 
                vm.showMain = true;
            });
             
        }
         
        function filter() {
             
            _filter();
             
            $filtersAlert.showAlertProviders({
                search: filters.querySearch,
                orderBy: filters.typeOrder
            });     
        }
         
        function _filter() {            
            vm.providers = [];  
 
            filters.typeOrder = $dropdownList.getTypeOrderingProviders();
            filters.querySearch = vm.querySearch;
             
            vm.scroll.init();
			
			if(vm.provider) {
				showList();
			}
			
        }
         
        function search($event) {           
            if(!$event || $event.keyCode === 13) {
                filter();
            }           
        }
         
        function onSelectTypeOrdering(item) {
            vm.typeOrder = item
        }
		
		function showDetail(provider) {
			vm.provider = provider; 
			vm.next = true; 
			scrollTop();
		}
		
		function showList() {
			vm.prev = true; 
			vm.provider = null;
			// scrollTop();
			
		}
		
		function scrollTop() {
			$utilService.scroll('.sticky-content-scroll', null, null, 500);
			// $utilService.scroll('.content-view', null, null, 500);
		}
    }
 
}(angular));