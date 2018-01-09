/**
 *
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 *         Rolando Paredes Alzamora  (rparedea@everis.com)
 * 
 */
	
(function(angular){ 
	'use strict';
	
	var URL_HOST = window.location.protocol + '//' + window.location.hostname,
		
		APP_MOCK = true,
		DIRECTORY_MOCK = '/core/mock',
		
		REST_URL_PORT	= '',
		REST_URL_PATH	= '/cas-movil',
		REST_URL_HOST	= URL_HOST + REST_URL_PORT,
		REST_URL		= REST_URL_HOST + REST_URL_PATH,
		
		APP_URL_PORT	= !APP_MOCK ? '' : '',
		APP_URL_PATH 	= !APP_MOCK ? '/cas-movil' : '/cas',
		APP_URL_HOST	= URL_HOST + APP_URL_PORT,
		APP_URL			= APP_URL_HOST + APP_URL_PATH,
		
		APP_TLC_PORT	= !APP_MOCK ? '' : '',
		APP_TLC_PATH	= !APP_MOCK ? '/movil' : '/movil',
		APP_TLC_HOST	= URL_HOST + APP_TLC_PORT,
		APP_TLC_URL		= APP_TLC_HOST + APP_TLC_PATH;
		
	function getURL(alias) {
		
		if(APP_MOCK) {			
			return APP_URL + DIRECTORY_MOCK + alias + '.json';
		}
		
		return REST_URL + alias;
	}
		
		
	angular
		.module('core.constants', [])

		.constant('$coreConstants', {
			
			// Url del la aplicacion
			'APP_URL': APP_URL,
			'APP_TLC_URL': APP_TLC_URL,
			
			// URL de los servicios REST
			'URL_GET_CARD_TYPES':	getURL('/api/v1/cards'),
			'URL_GET_KEYPAD':		getURL('/api/v1/keyboard'),
			'URL_GET_CAPTCHA':		getURL('/api/v1/kaptcha'),
			'URL_POST_LOGIN':		getURL('/api/v1/login'),

			// Timeout de los servicios (en segundos)
			"TIMEOUT_VALUE" : '10',

			// TLC Web
			'URL_TLC_WEB': 'https://www.telecreditobcp.com/tlcnp/',

			// Lista de imagenes de tarjetas
			'MAX_FREQUENT_CARD': 5,
			
			// Mensajes de carga
			'MSG_LOAD_KEYPAD': 'Obteniendo teclado seguro',
			'MSG_LOAD_CAPTCHA': 'Obteniendo imagen',
			
			// Validación con expresiones regulares
			'REGEX': {
				'FREQUENT_CARD': '^[0-9a-zA-ZÁÉÍÓÚáéíóúñÑ\\s.]*$',
				'CAPTCHA': '^[0-9a-zA-Z]*$',
			},
			
			// MÁSCARA PARA NUMERO DE TARJETA
			"CARDNUMBER_SEPARATOR"	: "-",
			"CARDNUMBER_MASK_CHAR"	: "*",
			
			// Mensajes de errores en los servicios
			'ERROR_INTERNO'         : 'Error interno, intentelo de nuevo.',
			'ERROR_INTERNO_LATER'   : 'Error interno, inténtelo más tarde.',
			
			// Logintud de inputs
			'PASSWORD_LENGTH': 6,
			
			// Mensajes y datos de validación
			'ERROR': 'Error',
			'WARNING': 'Advertencia',
			'MSG_INCOMPLETE_CARD': 'Tarjeta Incompleta.',
			'MSG_FREQUENT_CARD_INCOMPLETE' : 'Ingrese su tarjeta frecuente',
			'MSG_WHICH_IS_KEY': '¿Qué es la Clave de Internet?',
			'MSG_WHICH_IS_KEY_DESC': 'La clave de internet es la misma que utilizas para ingresar a Telecrédito Web.<br/>Recuerda que tienes 4 intentos válidos para ingresar tu clave antes que se bloquee.<br/>Si no cuentas con la clave o no la recuerdas llama a HelpDesk Servicios para Empresas.',
			'MSG_INCOMPLETE_PASSWORD': 'Por favor ingresa tu clave.',
			'MSG_PARCIAL_PASSWORD': 'La clave de internet está incompleta.',
			'MSG_INCOMPLETE_CAPTCHA': 'No ha ingresado el captcha.',
			'MSG_INCOMPLETE_ALIAS_CARD': 'No ha ingresado el alias de la tarjeta.',
			'MSG_MAX_FREQUENT_CARD': 'No puede registrar más de {{max}} tarjetas frecuentes.',
			'MSG_ANOTHER_CARD_SAME_ALIAS': 'Existe otra tarjeta con el mismo alias.',
			'MSG_UNAUTHORIZED_ACCESS': 'Su contrato no permite el acceso a Telecrédito Móvil. Puede acceder mediante Telecredito web.',
			'MSG_LOAD_USER_LOGGING': 'Iniciando sesión de usuario',
			'MSG_NO_LOCAL_STORAGE_CARD': 'Su navegador no permite la opción de almacenamiento local, la tarjeta frecuente no será guardada.',
			
			// Mensajes de errores
			'ERROR_INTERNO_INTENTAR': 'Ocurrió un error, vuelva a intentarlo.',
			
			// Código y mensajes de error
			'ERROR001': 'Existe una sesión activa.',
			
			'ERROR_CODE' : {
				'PU0007' : 'Ya hay una sesión de Ingresa a tus Cuentas en uso. Cierre su sesión abierta antes de poder loguearse nuevamente.',
				'PU0008' : 'Error al ingresar el texto captcha. Si prefieres, puedes pedir otra imagen.',
				'PU0022' : 'El número de tarjeta o la clave que has ingresado no existe. Por favor, vuelve a intentarlo.',
				'PU0023' : 'El número de tarjeta o la clave que has ingresado no existe. Por favor, vuelve a intentarlo.',
				'PU0024' : 'Genera tu clave Internet en Telecrédito Web',
				'PU0025' : 'La clave de 6 dígitos de tu tarjeta ya fue generada anteriormente.',
				'PU0026' : 'Su tarjeta ha sido bloqueada. Comuníquese con Helpdesk al teléfono 313-2999 / 625-2999 (Lima) ó 0-801-1-8888 (Provincias).',
				'PU0027' : 'Tarjeta sin asignar',
				'PU0028' : 'Tarjeta vencida',
				'PU0029' : 'Tu tarjeta se encuentra bloqueada. Por favor, acércate a nuestras agencias para solicitar una nueva',
				'PU0030' : 'Tu tarjeta se encuentra bloqueada. Por favor, acércate a nuestras agencias para solicitar una nueva.',
				'PU0031' : 'Tarjeta en tramite'
			}
			
		});
	
}(angular));