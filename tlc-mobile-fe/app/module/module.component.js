/**
 * @author Ricardo Rosales (rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	'use strict';
	
	angular
		.module('module.component', [
		
			'component.header',
			'component.menu',
			'component.footer',
			'component.main',
			'component.loader',
			'component.keypad',
			'component.modal',
			'component.document-events',
			'component.currency',
			'component.sticky',
			'component.token-card',
			'component.user-key'
			// lazy load
			// 'component.access',
			// 'component.contact',
			// 'component.banners',
			// 'component.tab-panel',
			// 'component.progressBar',
			// 'component.filters-alert',
			// 'component.input-mail',
			// 'component.input-number',
			// 'component.input-text',
			// 'component.chips',
			// 'component.dropdownlist',
			// 'component.datepicker',
			// 'component.page-title',
			// 'component.operation-detail',
			// 'component.operation-status',
			// 'component.alert',
			// 'component.table-load',
			// 'component.focus',
			// 'component.steps'
		]);

}(angular));