/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function() {
    'use strict';
     
    angular
        .module('beneficiaries.view.controller', [])
        .controller('BeneficiariesViewController', BeneficiariesViewController);
 
    BeneficiariesViewController.$inject = [
        '$navigator',
        '$beneficiariesService',
        '$dropdownList',
        '$loader',
        '$coreConstants',
        '$headerMobile',
        '$filtersAlert'
    ];
 
    function BeneficiariesViewController(
        $navigator,
        $beneficiariesService,
        $dropdownList,
        $loader,
        $coreConstants,
        $headerMobile,
        $filtersAlert
    ){
         
        var vm = this,
            filters = {},
            detailView = 'BeneficiaryDetailView';
             
        vm.filter = filter;
        vm.goDetail = goDetail;
        vm.search = search;
         
        $headerMobile.back = back;
         
        $dropdownList.onSelectTypeOrderingBeneficiaries = onSelectTypeOrdering;
             
        init();
         
        ////////////
 
        function init() {
 
            if(!$navigator.getViewParams().BeneficiariesView) {
                $navigator.goModule();
                return;
            }
             
            initStates();
             
        }
         
        function back() {
            $navigator.path($navigator.getViewParams().BeneficiariesView.viewParent);
        }
         
        function initStates() {
             
            filters.typeOrder = {}; 
             
            vm.querySearch = '';
         
            vm.scroll = {
                request: getBeneficiaries
            };
        }
     
        function getBeneficiaries(paramsScroll, callbackScroll) {
             
            var queryParam = {
                querySearch: filters.querySearch,
                idTypeOrder: filters.typeOrder.id,
                // orderBy: vm.orderBy || 'ASC',
                sqOperation: $navigator.getViewParams().BeneficiariesView.idOperation,
				typeModule: $navigator.getViewParams().BeneficiariesView.typeModule
            };
             
            $loader.setMessage($coreConstants.MSG_LOAD_BENEFICIARIES);
             
			vm.beneficiaries = [];
			
            $beneficiariesService.getBeneficiaries(angular.merge(queryParam, paramsScroll))
            .then(function(response) {          
                 
                vm.beneficiaries = (vm.beneficiaries || []).concat(response.data.response.paginationOperation.list || []); 
                                 
                vm.noRecords = !vm.beneficiaries.length;
                 
                if(callbackScroll) {
                    callbackScroll(response.data.response.paginationOperation.count, response.data.response.paginationOperation.pages);
                }       
 
                vm.showMain = true;
            });
             
        }
         
        function filter() {
             
            _filter();
             
            $filtersAlert.showAlertBeneficiaries({
                search: filters.querySearch,
                orderBy: filters.typeOrder
            });     
        }
         
        function _filter() {            
            vm.beneficiaries = [];  
 
            filters.typeOrder = $dropdownList.getTypeOrderingBeneficiaries();
            filters.querySearch = vm.querySearch;
             
            vm.scroll.init();
        }
         
        function search($event) {           
            if(!$event || $event.keyCode === 13) {
                filter();
            }           
        }
         
        function onSelectTypeOrdering(item) {
            vm.typeOrder = item
        }
         
        function goDetail(beneficiary) {
            $navigator.path($navigator.getModule() + '/detalle-beneficiario', [detailView, {
                beneficiary: beneficiary
            }]);
        }
    }
 
}(angular));