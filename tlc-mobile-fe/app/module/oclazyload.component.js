/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	var app = angular		
		.module('ocLazyLoad.component', [])
		.config(config)
		
	config.$inject = ['$ocLazyLoadProvider'];		
	
	function config($ocLazyLoadProvider) {
		
		$ocLazyLoadProvider.config({
			// debug: true,
			serie: true,
			modules: [
				{name: 'component.access', files: [
					'components/access/access.controller.js',
					'components/access/access.directives.js',
					'components/access/access.module.js'
				], serie: true},
				
				{name: 'component.alert', files: [
					'components/alert/alert.controller.js',
					'components/alert/alert.directive.js',
					'components/alert/alert.module.js'
				], serie: true},
				
				{name: 'component.banners', files: [
					'components/banners/banners.controller.js',
					'components/banners/banners.directives.js',
					'components/banners/banners.module.js'
				], serie: true},
				
				{name: 'component.book-block', files: [
					'components/book-block/book-block-slide.directive.js',
					'components/book-block/book-block.controller.js',
					'components/book-block/book-block.directive.js',
					'components/book-block/book-block.module.js'
				], serie: true},
				
				{name: 'component.breadcrumb', files: [
					'components/breadcrumb/breadcrumb.directives.js',
					'components/breadcrumb/breadcrumb.services.js',
					'components/breadcrumb/breadcrumb.module.js'
				], serie: true},
				
				{name: 'component.change-password', files: [
					'components/cambiar-clave/cambiar-clave.controller.js',
					'components/cambiar-clave/cambiar-clave.factory.js',
					'components/cambiar-clave/cambiar-clave.service.js',
					'components/cambiar-clave/cambiar-clave.module.js'
				], serie: true},
				
				{name: 'component.camera', files: [
					'components/camera/camera.directive.js',
					'components/camera/camera.module.js'
				], serie: true},
				
				{name: 'component.captcha', files: [
					'components/captcha/captcha.controller.js',
					'components/captcha/captcha.directive.js',
					'components/captcha/captcha.services.js',
					'components/captcha/captcha.module.js'
				], serie: true},
				
				{name: 'component.carousel-login', files: [
					'components/carousel/carousel-login/carousel-login.controller.js',
					'components/carousel/carousel-login/carousel-login.directives.js',
					'components/carousel/carousel-login/carousel-login.module.js'
				], serie: true},
				
				{name: 'component.carousel', files: [
					'components/carousel/carousel.interceptor.js',
					'components/carousel/carousel.module.js'
				], serie: true},
				
				{name: 'component.chips', files: [
					'components/chips/chips.controller.js',
					'components/chips/chips.directive.js',
					'components/chips/chips.module.js'
				], serie: true},
				
				{name: 'component.clave-planilla', files: [
					'components/clave-planilla/clave-planilla.controller.js',
					'components/clave-planilla/clave-planilla.factory.js',
					'components/clave-planilla/clave-planilla.service.js',
					'components/clave-planilla/clave-planilla.module.js'
				], serie: true},
				
				{name: 'component.coachmark', files: [
					'components/coachmark/coachmark.controller.js',
					'components/coachmark/coachmark.directive.js',
					'components/coachmark/coachmark.module.js'
				], serie: true},
				
				{name: 'component.contact', files: [
					'components/contact/contact.controller.js',
					'components/contact/contact.directives.js',
					'components/contact/contact.module.js'
				], serie: true},
				
				{name: 'component.currency', files: [
					'components/currency/currency.constants.js',
					'components/currency/currency.directive.js',
					'components/currency/currency.factory.js',
					'components/currency/currency.filters.js',
					'components/currency/currency.service.js',
					'components/currency/currency.module.js'
				], serie: true},
				
				{name: 'component.datepicker', files: [
					'components/datepicker/datepicker-end.controller.js',
					'components/datepicker/datepicker-from.controller.js',
					'components/datepicker/datepicker-interceptor.directive.js',
					'components/datepicker/datepicker.controller.js',
					'components/datepicker/datepicker.directive.js',
					'components/datepicker/datepicker.factory.js',
					'components/datepicker/datepicker.service.js',
					'components/datepicker/datepicker.module.js'
				], serie: true},
				
				{name: 'component.document-events', files: [
					'components/document-events/document-events.directives.js',
					'components/document-events/document-events.module.js'
				], serie: true},
				
				{name: 'component.dropdownlist', files: [
					'components/dropdownlist/dropdownlist.controller.js',
					'components/dropdownlist/dropdownlist.directive.js',
					'components/dropdownlist/dropdownlist.factory.js',
					'components/dropdownlist/dropdownlist.services.js',
					'components/dropdownlist/dropdownlist.module.js'
				], serie: true},
				
				{name: 'component.filters-alert', files: [
					'components/filters-alert/filters-alert.controller.js',
					'components/filters-alert/filters-alert.factory.js',
					'components/filters-alert/filters-alert.module.js'
				], serie: true},
				
				{name: 'component.focus', files: [
					'components/focus/focus.directive.js',
					'components/focus/focus.module.js'
				], serie: true},
				
				{name: 'component.footer-basic', files: [
					'components/footer/footer-basic/footer-basic.controller.js',
					'components/footer/footer-basic/footer-basic.directives.js',
					'components/footer/footer-basic/footer-basic.module.js'
				], serie: true},
				
				{name: 'component.footer', files: [
					'components/footer/footer.directives.js',
					'components/footer/footer.module.js'
				], serie: true},
				
				{name: 'component.header-basic', files: [
					'components/header/header-basic/header-basic.controller.js',
					'components/header/header-basic/header-basic.directives.js',
					'components/header/header-basic/header-basic.module.js'
				], serie: true},
				
				{name: 'component.header-mobile', files: [
					'components/header/header-mobile/header-mobile.controller.js',
					'components/header/header-mobile/header-mobile.directives.js',
					'components/header/header-mobile/header-mobile.factory.js',
					'components/header/header-mobile/header-mobile.module.js'
				], serie: true},
				
				{name: 'component.header', files: [
					'components/header/header.controller.js',
					'components/header/header.directives.js',
					'components/header/header.module.js'
				], serie: true},
				
				{name: 'component.input-mail', files: [
					'components/input-mail/inputMail.controller.js',
					'components/input-mail/inputMail.module.js'
				], serie: true},
				
				{name: 'component.input-number', files: [
					'components/input-number/input-number.directive.js',
					'components/input-number/input-number.module.js'
				], serie: true},
				
				{name: 'component.input-text', files: [
					'components/input-text/input-text.directive.js',
					'components/input-text/input-text.module.js'
				], serie: true},
				
				{name: 'component.keypad-desktop', files: [
					'components/keypad/keypad-desktop/keypad.controller.js',
					'components/keypad/keypad-desktop/keypad.directives.js',
					'components/keypad/keypad-desktop/keypad.services.js',
					'components/keypad/keypad-desktop/keypad.module.js'
				], serie: true},
				
				{name: 'component.keypad-mobile', files: [
					'components/keypad/keypad-mobile/keypad-mobile-input/keypad-mobile-input.controller.js',
					'components/keypad/keypad-mobile/keypad-mobile-input/keypad-mobile-input.directive.js',
					'components/keypad/keypad-mobile/keypad-mobile-key.directive.js',
					'components/keypad/keypad-mobile/keypad-mobile-partial/keypad-mobile-partial.directive.js',
					'components/keypad/keypad-mobile/keypad-mobile.controller.js',
					'components/keypad/keypad-mobile/keypad-mobile.directive.js',
					'components/keypad/keypad-mobile/keypad-mobile.factory.js',
					'components/keypad/keypad-mobile/keypad-mobile.services.js',
					'components/keypad/keypad-mobile/keypad-mobile.module.js'
				], serie: true},
				
				{name: 'component.keypad', files: [
					'components/keypad/keypad-mobile/keypad-mobile-input/keypad-mobile-input.controller.js',
					'components/keypad/keypad-mobile/keypad-mobile-input/keypad-mobile-input.directive.js',
					'components/keypad/keypad-mobile/keypad-mobile-partial/keypad-mobile-partial.directive.js',
					'components/keypad/keypad.services.js',
					'components/keypad/keypad.module.js'
				], serie: true},
				
				{name: 'component.loader', files: [
					'components/loader/loader.directives.js',
					'components/loader/loader.factory.js',
					'components/loader/loader.module.js'
				], serie: true},
				
				{name: 'component.main', files: [
					'components/main/main.controller.js',
					'components/main/main.services.js',
					'components/main/main.module.js'
				], serie: true},
				
				{name: 'component.menu-basic', files: [
					'components/menu/menu-basic/menu-basic.controller.js',
					'components/menu/menu-basic/menu-basic.directives.js',
					'components/menu/menu-basic/menu-basic.services.js',
					'components/menu/menu-basic/menu-basic.module.js'
				], serie: true},
				
				{name: 'component.menu-mobile-items', files: [
					'components/menu/menu-mobile/menu-mobile-items/menu-mobile-items.controller.js',
					'components/menu/menu-mobile/menu-mobile-items/menu-mobile-items.directive.js',
					'components/menu/menu-mobile/menu-mobile-items/menu-mobile-items.module.js'
				], serie: true},
				
				{name: 'component.menu-mobile', files: [
					'components/menu/menu-mobile/menu-mobile.controller.js',
					'components/menu/menu-mobile/menu-mobile.directives.js',
					'components/menu/menu-mobile/menu-mobile.services.js',
					'components/menu/menu-mobile/menu-toggle.controller.js',
					'components/menu/menu-mobile/menu-mobile.module.js'
				], serie: true},
				
				{name: 'component.menu-profile', files: [
					'components/menu/menu-profile/menu-profile.controller.js',
					'components/menu/menu-profile/menu-profile.directives.js',
					'components/menu/menu-profile/menu-profile.module.js'
				], serie: true},
				
				{name: 'component.menu', files: [
					'components/menu/menu.controller.js',
					'components/menu/menu.directives.js',
					'components/menu/menu.factory.js',
					'components/menu/menu.services.js',
					'components/menu/menu.module.js'
				], serie: true},
				
				{name: 'component.modal', files: [
					'components/modal/modal.controller.js',
					'components/modal/modal.directive.js',
					'components/modal/modal.factory.js',
					'components/modal/modal.module.js'
				], serie: true},
				
				{name: 'component.operation-detail', files: [
					'components/operation-detail/operation-detail.controller.js',
					'components/operation-detail/operation-detail.directive.js',
					'components/operation-detail/operation-detail.services.js',
					'components/operation-detail/operation-detail.module.js'
				], serie: true},
				
				{name: 'component.operation-list', files: [
					'components/operation-list/operation-list.directive.js',
					'components/operation-list/operation-list.module.js'
				], serie: true},
				
				{name: 'component.operation-status', files: [
					'components/operation-status/operation-status.controller.js',
					'components/operation-status/operation-status.directive.js',
					'components/operation-status/operation-status.module.js'
				], serie: true},
				
				{name: 'component.page-title', files: [
					'components/page-title/page-title.directives.js',
					'components/page-title/page-title.module.js'
				], serie: true},
				
				{name: 'component.progressBar', files: [
					'components/progressBar/progressBar.controller.js',
					'components/progressBar/progressBar.module.js'
				], serie: true},
				
				{name: 'component.steps', files: [
					'components/steps/steps.controller.js',
					'components/steps/steps.directives.js',
					'components/steps/steps.module.js'
				], serie: true},
				
				{name: 'component.sticky', files: [
					'components/sticky/sticky.directive.js',
					'components/sticky/sticky.module.js'
				], serie: true},
				
				{name: 'component.cards-swiper', files: [
					'components/swiper/swiper-cards/swiper-cards.controller.js',
					'components/swiper/swiper-cards/swiper-cards.directives.js',
					'components/swiper/swiper-cards/swiper-cards.services.js',
					'components/swiper/swiper-cards/swiper-cards.module.js'
				], serie: true},
				
				{name: 'component.swiper', files: [
					'components/swiper/swiper.controller.js',
					'components/swiper/swiper.directive.js',
					'components/swiper/swiper.module.js'
				], serie: true},
				
				{name: 'component.tab-panel', files: [
					'components/tab-panel/tab-panel.controller.js',
					'components/tab-panel/tab-panel.directives.js',
					'components/tab-panel/tab-panel.factory.js',
					'components/tab-panel/tab-panel.module.js'
				], serie: true},
				
				{name: 'component.infinite-scroll', files: [
					'components/table-load/infinite-scroll/infinite-scroll.directives.js',
					'components/table-load/infinite-scroll/infinite-scroll.module.js'
				], serie: true},
				
				{name: 'component.load-more', files: [
					'components/table-load/load-more/load-more.directives.js',
					'components/table-load/load-more/load-more.module.js'
				], serie: true},
				
				{name: 'component.pagination', files: [
					'components/table-load/pagination/pagination.controller.js',
					'components/table-load/pagination/pagination.directive.js',
					'components/table-load/pagination/pagination.module.js'
				], serie: true},
				
				{name: 'component.table-load', files: [
					'components/table-load/table-load.controller.js',
					'components/table-load/table-load.module.js'
				], serie: true},
				
				{name: 'component.token-card', files: [
					'components/token-card/token-card-modal.controller.js',
					'components/token-card/token-card-modal.factory.js',
					'components/token-card/token-card.controller.js',
					'components/token-card/token-card.directives.js',
					'components/token-card/token-card.module.js'
				], serie: true},
				
				{name: 'component.track-digests', files: [
					'components/track-digest/track-digest.directive.js',
					'components/track-digest/track-digest.module.js'
				], serie: true},
				
				{name: 'component.user-key', files: [
					'components/user-key/user-key-modal.controller.js',
					'components/user-key/user-key-modal.factory.js',
					'components/user-key/user-key.controller.js',
					'components/user-key/user-key.directives.js',
					'components/user-key/user-key.module.js'
				], serie: true}
				
			]
		});
	}

}(angular));