/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	 
    'use strict';
	
    angular
		.module('core.storage.services', [])
		.factory('$storageService', $storageService);
	
	$storageService.$inject = ['$base64', '$cacheFactory'];
	
	function $storageService ($base64, $cacheFactory) {
		
		var service = {
			deleteFrequentCard: deleteFrequentCard,
			getFrequentsCards: getFrequentsCards,
			setFrequentCard: setFrequentCard,
			updateCardName: updateCardName,
			validateUniqueCardAlias: validateUniqueCardAlias,
			getCasToken: getCasToken,
			setCasToken: setCasToken,
			getAuthToken: getAuthToken,
			setAuthToken: setAuthToken,
			setAppStorage: setAppStorage,
			getAppStorage: getAppStorage
		};
			
		verifyLocalStorage();
		
		var cache = $cacheFactory('cache');
		
		return service;
		
		/**************** UTILITARIOS ****************/

		// Verifica si el localstorage está disponible
		function verifyLocalStorage() {
			Modernizr.addTest('localstorage', function() {
				var mod = 'modernizr';
				try {
					localStorage.setItem(mod, mod);
					localStorage.removeItem(mod);
					return true;
				} catch (e) {
					return false;
				}
			});
		}
		
		function getStorage(storage, key, decode) {
			var data = storage.getItem(key);
			data = decode ? $base64.decode(data || '') : data;
			try{ return JSON.parse(data); } catch(e){ return data; }
		}
		
		function setStorage(storage, key, data, encode) {
			data = JSON.stringify(data);
			data = encode ? $base64.encode(data) : data;
			return storage.setItem(key, data);
		}
		
		function getLocalStorage(key, decode) {
			if(Modernizr.localstorage)
				return getStorage(localStorage, key, decode);
		}
		
		function setLocalStorage(key, data, encode) {
			if(Modernizr.localstorage)
				return setStorage(localStorage, key, data, encode);
		}
		
		/**************** FIN UTILITARIOS ****************/
		
		// Obtiene las tarjetas frecuentes
		function setFrequentsCards(data) {
			return setLocalStorage('FREQUENT_CARDS', data, true);
		}
		
		// Setea las tarjetas frecuentes
		function getFrequentsCards() {
			return getLocalStorage('FREQUENT_CARDS', true) || [];
		}		
		
		// Elimina la tarjeta frecuente
		function deleteFrequentCard (card) {
			
			var frequentsCards = getFrequentsCards()
				
			angular.forEach(frequentsCards, function(v, k) {
				if(v.cardNumber === card.cardNumber) {
					frequentsCards.splice(k, 1)
				}
			});
			
			setFrequentsCards(frequentsCards);
		}

		// Setea la nueva tarjeta frecuente
		function setFrequentCard(card) {
			
			var frequentsCards = getFrequentsCards(),
				bool = false;
				
			angular.forEach(frequentsCards, function(v) {
				if(v.cardNumber === card.cardNumber) {
					v.cardName = card.cardName;
					bool = true;
				}
			});
			
			if(!bool) {
				frequentsCards.unshift(card);
			}
			
			setFrequentsCards(frequentsCards);
		}
		
		// Valida que no exista otra tarjeta con el mismo alis
		function validateUniqueCardAlias(card) {
			
			var frequentsCards = getFrequentsCards();
			
			var uniqueCardAlias = true;
				
			angular.forEach(frequentsCards, function(v) {				
				if(v.cardNumber !== card.cardNumber &&
					v.cardName == card.cardName) {
						uniqueCardAlias = false;
				}
			});			
			
			return uniqueCardAlias;
		}

		// Actualiza el nombre de tarjeta frecuente
		function updateCardName(card) {
			
			var frequentsCards = getFrequentsCards();		
				
			angular.forEach(frequentsCards, function(v) {
				if(v.cardNumber === card.cardNumber) {
					v.cardName = card.cardName;
				}
			});
			
			setFrequentsCards(frequentsCards);
		}
		
		function getCasToken() {
			return getLocalStorage('cas_token');
		}
		
		function setCasToken(token) {
			setLocalStorage('cas_token', token);
		}
		
		function getAuthToken() {
			return getLocalStorage('auth_token');
		}
		
		function setAuthToken(token) {
			setLocalStorage('auth_token', token);
		}
		function setAppStorage(appValue){
			setLocalStorage('appValue', appValue);
		}
		function getAppStorage(){
			return getLocalStorage('appValue');
		}
		
	}

}(angular));