/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * 
 */
 
(function(angular) {
	 
    'use strict';
	
    angular
		.module('core.storage.services', [])
		.factory('$storageService', $storageService);
	
	$storageService.$inject = [
		'$cookies',
        '$location',
        '$coreConstants',
		'$cacheFactory'
	];
	
	function $storageService (
		$cookies, 
		$location, 
		$coreConstants,
		$cacheFactory
	) {
		
		var service = {
			clearAll: clearAll,
			getCasToken: getCasToken,
			setCasToken: setCasToken,
			getAuthToken: getAuthToken,
			setAuthToken: setAuthToken,
			getCSRFToken: getCSRFToken,
			getKeypad: getKeypad,
			getServiceTicket: getServiceTicket,
			isAuthenticated: isAuthenticated,
			setAuthenticated: setAuthenticated,
			setKeypad: setKeypad
		};
			
		verifySessionStorage();
		
		var cache = $cacheFactory('cache');
		
		return service;
		
		/**************** UTILITARIOS ****************/

		// Verifica si el sessionstorage está disponible
		function verifySessionStorage() {
			Modernizr.addTest('sessionstorage', function() {
				var mod = 'modernizr';
				try {
					sessionStorage.setItem(mod, mod);
					sessionStorage.removeItem(mod);
					return true;
				} catch (e) {
					return false;
				}
			});
		}
		
		function getStorage(storage, key, decode) {
			var data = storage.getItem(key);
			// data = decode ? $base64.decode(data || '') : data;
			try{ return JSON.parse(data); } catch(e){ return data || null; }
		}
			
		function setStorage(storage, key, data, encode) {
			data = JSON.stringify(data);
			// data = encode ? $base64.encode(data) : data;
			return storage.setItem(key, data);
		}
		
		function getSessionStorage(key, decode) {
			if(Modernizr.sessionstorage)
				return getStorage(sessionStorage, key, decode);
			else 
				return cache.get(key);
		}
		
		function setSessionStorage(key, data, encode) {
			if(Modernizr.sessionstorage)
				return setStorage(sessionStorage, key, data, encode);
			else
				return cache.put(key, data);
		}
		
		/**************** FIN UTILITARIOS ****************/

		// Limpia todos los valores
		function clearAll() {
			if(Modernizr.sessionstorage) {
				sessionStorage.clear();
			} else {
				cache.removeAll();
			}
		}

		// Obtiene el Keypad Token
		function getKeypad () {
			return getSessionStorage('x_token_keyboard_encripted');
		}

		// Obtiene el Service Ticket
		function getServiceTicket () {
			var value = $coreConstants.CAS_DUMMY ? 'ST-TOKEN' : value;
			return value ? value : $location.search().ticket
		}

		// Obtiene si esta autenticado
		function isAuthenticated () {
			var value = getSessionStorage('x_auth');
			value = $coreConstants.CAS_DUMMY ? true : value;
			return value != null ? value : false;
		}

		// Setea si esta autenticado
		function setAuthenticated (value) {
			setSessionStorage('x_auth', value);
		}

		// Setea el Keypad Token
		function setKeypad (value) {
			setSessionStorage('x_token_keyboard_encripted', value);
		}
		
		// Obtiene el CAS-TOKEN
		function getCasToken() {
			return getSessionStorage('cas_token');
		}

		// Setea el CAS-TOKEN
		function setCasToken(token) {
			setSessionStorage('cas_token', token);
		}

		// Obtiene el AUTH-TOKEN
		function getAuthToken() {
			return getSessionStorage('auth_token');
		}

		// Setea el AUTH-TOKEN
		function setAuthToken(token) {
			setSessionStorage('auth_token', token);
		}		

		// Obtiene el CSRF-TOKEN
		function getCSRFToken () {
			return $cookies.get('CSRF-TOKEN');
		}
		//Setea valor cuando se accede desde la app
		function setAppStorage(appValue){
			setLocalStorage('appValue', appValue);
		}
		//Obtiene valor cuando se accede desde la app
		function getAppStorage(){
			return getLocalStorage('appValue');
		}
	}

}(angular));