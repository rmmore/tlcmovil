﻿﻿/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @author Rolando Paredes Alzamora  (rparedea@everis.com)
 */
	
(function(angular){
 
	'use strict';
	
	var URL_HOST = window.location.protocol + '//' + window.location.hostname,

		APP_MOCK = true,
		DIRECTORY_MOCK = '/core/mock',
    
		REST_URL_PORT	= '',
		REST_URL_PATH	= '/services-movil/app',
		REST_URL_HOST	= URL_HOST + REST_URL_PORT,
		REST_URL		= REST_URL_HOST + REST_URL_PATH,
		
		APP_URL_PORT	= !APP_MOCK ? '' : '',
		APP_URL_PATH 	= !APP_MOCK ? '/movil' : '/movil',
		APP_URL_HOST	= URL_HOST + APP_URL_PORT,
		APP_URL			= APP_URL_HOST + APP_URL_PATH,
		
		APP_CAS_PORT	= !APP_MOCK ? '' : '',
		APP_CAS_PATH	= !APP_MOCK ? '/cas-movil' : '/cas',
		APP_CAS_HOST	= URL_HOST + APP_CAS_PORT,
		APP_CAS_URL		= APP_CAS_HOST + APP_CAS_PATH,

		CAS_URL_LOGIN 		= APP_CAS_URL + '/login.html',
		CAS_URL_LOGOUT_FULL = APP_CAS_URL + '/api/v1/logout/full',
		CAS_URL_LOGOUT_CAS 	= APP_CAS_URL + '/api/v1/logout/cas',
		CAS_URL_SERVICE_VALIDATE = APP_CAS_URL + '/api/v1/service/validate';

	var HEADER_CAS_TOKEN 	= 'x-cas-token',
		HEADER_AUTH_TOKEN 	= 'x-auth-token',
		HEADER_X_CSRF_TOKEN 	= 'X-CSRF-TOKEN',
		HEADER_KEYPAD_TOKEN 	= 'x_token_keyboard_encripted';
		
	if(APP_MOCK) {
		CAS_URL_LOGIN 		= APP_CAS_URL + '/login.html';
		CAS_URL_LOGOUT_FULL = APP_URL + DIRECTORY_MOCK + APP_CAS_PATH + '/logout.json';
		CAS_URL_LOGOUT_CAS 	= APP_URL + DIRECTORY_MOCK + APP_CAS_PATH + '/logout.json';
		CAS_URL_SERVICE_VALIDATE = APP_URL + DIRECTORY_MOCK + APP_CAS_PATH + '/serviceValidate.xml';
	}
		
	function getURL(alias, IS_MOCK) {
		
		if(APP_MOCK || IS_MOCK) {			
			return APP_URL + DIRECTORY_MOCK + '/app' + alias + '.json';
		}
		
		return REST_URL + alias;
	}
		
		
	angular
		.module('core.constants', [])

		.constant('$coreConstants', {
			
			// Url del la aplicacion
			'APP_URL': APP_URL,

			// Usar datos de prueba para el CAS
			'CAS_DUMMY': false,
			'APP_MOCK': APP_MOCK,

			// Llama al servicio de logout al abadonar la página
			'UNLOAD_LOGOUT': true,

			// Timeout de los servicios (en segundos)
			"TIMEOUT_VALUE" : '10',

			// Contexto de la página de inicio
			'HOME_PATH': APP_URL_PATH,

			'HEADER' : {
				'CAS_TOKEN': HEADER_CAS_TOKEN,
				'AUTH_TOKEN' : HEADER_AUTH_TOKEN,
				'X_CSRF_TOKEN' : HEADER_X_CSRF_TOKEN,
				'KEYPAD_TOKEN' : HEADER_KEYPAD_TOKEN
			},

			// URL de CAS
			'URL_CAS_LOGIN': 			CAS_URL_LOGIN + '?service=' + APP_URL,
			'URL_CAS_LOGOUT_FULL': 		CAS_URL_LOGOUT_FULL,
			'URL_CAS_LOGOUT_CAS': 		CAS_URL_LOGOUT_CAS,
			'URL_CAS_SERVICE_VALIDATE': CAS_URL_SERVICE_VALIDATE + '?service=' + APP_URL,
			
			// URL de los servicios REST
			'URL_POST_LOGIN': 		getURL('/login'),
			'URL_POST_LOGOUT': 		getURL('/logout'),
			'URL_GET_LOGGED_USER': 	getURL('/admin/user/info'),
			'URL_POST_MENU': 		getURL('/admin/menu'),
			'URL_GET_HOME_INFO': 	getURL('/admin/generic/pending'),
			'URL_GET_COMPANIES': 	getURL('/balance/companies/list'),
			'URL_GET_ACCOUNTS': 	getURL('/balance/accounts/list'),
			'URL_GET_ACCOUNT_INFO': getURL('/balance/account/info'),
			'URL_GET_FILE_TYPES': 	getURL('/filesTypes' ,true),
			'URL_GET_SEPARATORS': 	getURL('/separators' ,true),
			'URL_GET_COINS': 		getURL('/admin/currency/list'),
			'URL_GET_HISTORIC_MOVEMENTS': 	getURL('/balance/movements/historic/list'),
			'URL_GET_LAST20_MOVEMENTS': 	getURL('/balance/movements/list'),
			'URL_POST_SEND_MOVEMENTS': 	getURL('/export/movements'),
			'URL_GET_TYPES_ACCOUNTS': 	getURL('/balance/account/type/list'),
			'URL_GET_TYPES_OPERATION': 	getURL('/operations/type'),
			'URL_GET_TYPES_OPERATION_MOVEMENTS': 	getURL('/balance/movements/operations/types'),
			'URL_POST_SEND_OPERATIONS': getURL('/operations/send/operation'),
			'URL_GET_DETAIL_OPERATION': getURL('/operations/detail'),
			'URL_GET_BENEFICIARIES': 	getURL('/operations/detail/beneficiaries'),
			'URL_GET_PROVIDERS': 	getURL('/operations/detail/providers'),
			'URL_POST_SIGN_OPERATIONS': getURL('/operations/sign/operation'),
			'URL_GET_TYPES_ORDERING_BENEFICIARIES'	: getURL('/typesOrderingBeneficiaries' , true),
			'URL_GET_TYPES_ORDERING_PROVIDERS'		: getURL('/typesOrderingProviders' , true),
			'URL_GET_OPERATIONS_TO_SEND': getURL('/operations/send/pending/list'),
			'URL_POST_REJECT_OPERATION': getURL('/operations/sign/reject'),
			'URL_POST_EXPORT_OPERATIONS_SENT': 	getURL('/exportOperationsSent'),
			'URL_GET_OPERATIONS_FOR_SIGNING': 	getURL('/operations/sign/pending/list'),
			'URL_GET_CARD_TYPES': 	getURL('/cardTypes'),
			'URL_GET_CONTRACTS': 	getURL('/admin/contract/list'),
			'URL_GET_KEYPAD': 		getURL('/admin/keyboard'),
			'URL_POST_EXPORT_MOVEMENTS': APP_URL + DIRECTORY_MOCK + '/export/',
			'URL_UPDATE_PASSWORD': 	getURL('/account/cardpwdupd/update'),
			'URL_GET_KEYBOARD': 	getURL('/account/cardpwdupd/keyboard'),
			'URL_GET_CAPTCHA': 	getURL('/captcha'),
			'URL_POST_AFFILIATE': 	getURL('/admin/contract/affiliate'),
			'URL_POST_DISAFFILIATION': 	getURL('/admin/contract/disaffiliation'),
			'URL_POST_ENABLE': 	getURL('/admin/contract/enable'),
			'URL_POST_DISABLE': 	getURL('/admin/contract/disable'),
			'URL_POST_SELECT_CONTRACT': 	getURL('/admin/contract/select'),
			'URL_GET_DATE_RANGE': 	getURL('/admin/generic/sparameter'),
			'URL_POST_VALIDATE_OPERATION_DETAIL': 	getURL('/operations/validate/detail'),
			'URL_POST_CHANGE_PASSWORD': getURL('/operations/pending/changepassword'),

			// TLC Web
			'URL_TLC_WEB': 'https://www.telecreditobcp.com/tlcnp/',
			
			// INFINITE SCROLL - LOAD MORE
			'SCROLL': {
				'SIZE': 20,
				'OFFSET': 0
			},
			
			// MONTHS
			'MONTHS': [
				'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
				'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'
			],
			
			// PARAMETROS PARA EL CALENDARIO
			'DATEPICKER_PARAMS': ['INTER_DATE', 'RANGE_DATE'],
			
			// CARACTERES PARA MÁSCARA DE NUMERO DE TARJETA
			"CARDNUMBER_SEPARATOR"	: "-",
			"CARDNUMBER_MASK_CHAR"	: "*",
			
			// CARACTERES PARA MÁSCARA DE NUMERO DE CUENTA
			"ACCOUNT_SEPARATOR"	: "-",
			
			// Validación con expresiones regulares
			// La expresion 'E_MAIL_REG', está implementada en inputMailController.js como una funcion separada de este archivo constante ya que genera errores sin comillas en algunos dispositivos
			'REGEX': {
				'E_MAIL': '^[A-Za-z0-9]{1}[A-Za-z0-9._-]{0,60}[A-Za-z0-9]{1}?@[A-Za-z0-9]{1}[A-Za-z0-9.]{0,136}[A-Za-z0-9]{1}\\.[A-Za-z0-9]{2,50}$',
				'E_MAIL_REG': '/^\w+([\.-]?\w+)*(@\w+)(([\.-]\w{2})|([\.-]\w{3})(\.\w{2})?)$/',
				'REASON_REJECTION': '^[0-9a-zA-ZÁÉÍÓÚáéíóúñÑ\\s\\\'\\-\\/&().]*$'
			},
			
			// URL del sitio de seguridad
			'URL_FOOTER_SEGURIDAD': 'https://www.abcdelabanca.com/que-tiene-el-bcp-para-ti/canales-de-atencion/juntos-somos-mas-seguros.html',

			// Lista de aplicaciones
			'APLICACIONES': [
				{ nombre: 'Telecrédito Web', url: 'https://www.telecreditobcp.com/tlcnp/' },
				{ nombre: 'Factoring Electrónico', url: 'https://www.factoringelectronicobcp.com/' },
				{ nombre: 'Letras BCP', url: 'https://www.letrasbcp.com/LetrasWebInternet/' }
			],

			// Lista de redes sociales
			'REDES_SOCIALES': [
				{ nombre: 'Twitter', url: 'https://twitter.com/bcpcomunica', class: 'twitter' },
				{ nombre: 'Facebook', url: 'http://www.facebook.com/bancodecreditobcp', class: 'facebook' },
				{ nombre: 'Linkedin', url: 'https://www.linkedin.com/company/banco-de-credito-bcp', class: 'linkedin' },
				{ nombre: 'Youtube', url: 'https://www.youtube.com/user/BancodeCreditoBCP', class: 'youtube' }
			],

			// Lista de imagenes del carrusel
			'CARRUSEL': [
				{imagen: 'img/banner/banner0.png', url: 'https://www.viabcp.com/wps/portal/viabcpp/pymes' },
				{imagen: 'img/banner/banner1.png', url: '#' },
				{imagen: 'img/banner/banner2.png', url: '#' },
				{imagen: 'img/banner/banner3.png', url: '#' }
			],

			// Maximo de tarjetas frecuentes
			'MAX_REMENBER_CARD': 5,
			
			// Maximo de operaciones por enviar y firmar
			'MAX_OPERATIONS_TO_SEND': 10,
			'MAX_OPERATIONS_TO_SIGN': 10,
			
			// Máximo de correos en envío movimientos
			'MAX_MAXIMUM_NUMBERS_MAIL': 5,
			
			//Máxima longitud por email
			'MAX_LENGTH_PER_MAIL': 60,
			
			// Estados de operaciones
			'OPERATION_STATUS': {
				'STATUS-11': 'Pendiente de firma',
				'STATUS-12': 'Parcialmente firmada',
				'STATUS-51': 'Rechazada por firmante',	'REJECT_SIGNATURE': '51',
				'STATUS-13': 'Pendiente de envío',		'PENDIENTE_ENVIO': '13',
				'STATUS-36': 'En proceso',
				'STATUS-35': 'En consulta',
				'STATUS-40': 'Procesada',
				'STATUS-21': 'Enviada'				
			},
			
			// Estados de contratos
			'CONTRACT_STATUS': {
				'SUSPENDED': 50
			},
			
			// Enumarables para el detalle de operacion
			'OPERATION_DETAIL': {
				'PENDING_SIGNATURE_BEFORE'	: '10',
				'PENDING_SIGNATURE_AFTER'	: '11',
				'PENDING_SHIPMENT_BEFORE'	: '12',
				'PENDING_SHIPMENT_AFTER'	: '13'				
			},
			
			// Códigos que identifica a los módulos para la auditoría
			'MODULES': {
				'SIGN': 0,
				'SEND': 1
			},
			
			// Tipos de documentos
			'DOCUMENT_TYPES': {
				'TYPE-1'	: 'DNI',			
				'TYPE-2'	: 'CI',			
				'TYPE-3'	: 'CE',			
				'TYPE-4'	: 'PAS',			
				'TYPE-6'	: 'RUC',			
				'TYPE-7'	: 'FIC',			
				'TYPE-A'	: 'MDNI',			
				'TYPE-B'	: 'MCI',			
				'TYPE-C'	: 'MCE',			
				'TYPE-D'	: 'MPAS',
				'TYPE-L'	: 'Letras'			
			},

			'SUBTYPE_VALUES': {
				'TYPE-G'	: 'Gratificación - Exonerado de ITF',			
				'TYPE-V'	: 'Vacaciones - Exonerado de ITF',			
				'TYPE-M'	: 'Movilidad',			
				'TYPE-P'	: 'Pensionista - Exonerado de ITF',			
				'TYPE-T'	: 'Préstamos al personal',			
				'TYPE-4'	: '4ta. Categoría',			
				'TYPE-Z'	: 'Otros pagos - Exonerado de ITF',			
				'TYPE-O'	: 'Otros pagos al personal',		
				'TYPE-X'	: '5ta. Categoría - Exonerado de ITF'
			},			
			
			// Si / No
			'YES_NO': {
				'S': 'Si',
				'N': 'No'		
			},
			
			// DROPDOWN LIST 
			'DROPDOWNLIST_DEFAULT': {
				name: 'Todos'
			},
			
			// Texto por defecto cuando no hay observación
			'DEFAULT_OBSERVATION': 'Ninguna',
			
			// Separador para fechar
			'DATE_SEPARATOR': '/',
			'HOUR_SEPARATOR': ':',
			'HOUR_AM': 'AM',
			'HOUR_PM': 'PM',
						
			// Mensajes de carga y envio de datos
			'MSG_LOAD_CONTRACTS': 'Cargando contratos',
			'MSG_LOAD_MENU': 'Cargando menu',
			'MSG_LOAD_COMPANIES': 'Cargando empresas',
			'MSG_LOAD_ACCOUNTS': 'Cargando cuentas',
			'MSG_LOAD_MOVEMENTS': 'Cargando movimientos',
			'MSG_SENDING_MOVEMENTS': 'Enviando movimientos',
			'MSG_LOAD_MOVEMENT_DETAIL': 'Cargando detalle del movimiento',
			'MSG_LOAD_OPERATIONS_SIGNING': 'Cargando operaciones para firmar',
			'MSG_LOAD_OPERATIONS_SEND': 'Cargando operaciones para enviar',
			'MSG_LOAD_OPERATION_DETAIL': 'Cargando detalle de la operacion',
			'MSG_SIGNING_OPERATIONS': 'Firmando operaciones',
			'MSG_SIGNING_OPERATION': 'Firmando operacion',
			'MSG_REJECTING_OPERATIONS': 'Rechazando operaciones',
			'MSG_REJECTING_OPERATION': 'Rechazando operacion',
			'MSG_SENDING_OPERATIONS': 'Enviando operaciones',
			'MSG_SENDING_OPERATION': 'Enviando operacion',
			'MSG_LOAD_BENEFICIARIES': 'Cargando beneficiarios',
			'MSG_LOAD_PROVIDERS': 'Cargando proveedores',
			'MSG_LOAD_BENEFICIARY_DETAIL': 'Cargando detalle del beneficiario',
			'MSG_LOAD_KEYPAD': 'Obteniendo teclado seguro',
			'MSG_UPDATED_CALENDAR': 'Actualizando el calendario "Hasta"',
			'MSG_AFFILIATING_CONTRACT': 'Afiliando el contrato.',
			'MSG_DISAFFILIATION_CONTRACT': 'Desafiliando el contrato.',
			'MSG_ENABLE_CONTRACT': 'Habilitando el contrato.',
			'MSG_DISABLE_CONTRACT': 'Deshabilitando el contrato.',
			
			// Mensajes de alerta de filtros
			'MSG_FILTER_LAST20_MOVEMENTS': 'Últimos movimientos.',
			'MSG_FILTER_TYPE_OPERATION': 'Tipo de operación: ',
			'MSG_FILTER_HISTORIC': 'Desde {{from}} hasta {{end}}',
			'MSG_FILTER_TYPE_ACCOUNT': 'Tipo de cuenta: ',
			'MSG_FILTER_TYPE_COIN': 'Moneda: ',
			'MSG_FILTER_SEARCH': 'Búsqueda: ',
			'MSG_FILTER_ORDER_BY': 'Ordernado por: ',
			
			// Mensajes de validacion 
			'MSG_MAXIMUM_OPERATIONS_TO_SEND': 'Sólo puede enviar hasta 10 operaciones a la vez.',
			'MSG_MAXIMUM_OPERATIONS_TO_SIGN': 'Sólo puede firmar hasta 10 operaciones a la vez.',
			'MSG_NO_TOKEN': 'No ha ingresado la tarjeta token.',
			'MSG_INVALID_TOKEN': 'El token ingresado no es válido. Por favor intente nuevamente. De ser necesario, comuníquese con Helpdesk al teléfono 313-2999 / 625-2999 (Lima) ó 0-801-1-8888 (Provincias).',
			'MSG_NO_KEY': 'No ha ingresado la clave.',
			'MSG_NO_KEY_INCOMPLETE': 'La clave está incompleta.',
			'MSG_CONFIRM_SENDING_OPERATIONS': '¿Está seguro que desea enviar las operaciones?',
			'MSG_CONFIRM_SENDING_OPERATION': '¿Está seguro que desea enviar la operación?',
			'MSG_CONFIRM_SIGNING_OPERATIONS': '¿Está seguro que desea firmar las operaciones?',
			'MSG_CONFIRM_SIGNING_OPERATION': '¿Está seguro que desea firmar la operación?',
			'MSG_CONFIRM_REJECT_OPERATIONS': '¿Está seguro que desea rechazar las operaciones?',
			'MSG_CONFIRM_REJECT_OPERATION': '¿Está seguro que desea rechazar la operación?',
			'MSG_INCOMPLETE_CARD': 'La tarjeta está incompleta.',
			'MSG_INCOMPLETE_PASSWORD': 'La clave de internet está incompleta.',
			'MSG_INCOMPLETE_CAPTCHA': 'No ha ingresado el captcha.',
			'MSG_INVALID_EMAIL': 'El e-mail introducido no es correcto.',
			'MSG_MAXIMUM_EMAIL_LENGTH': 'El e-mail introducido debe contener como máximo 60 caracteres.',
			'MSG_MAXIMUM_NUMBERS_MAIL': 'Sólo puede ingresar hasta 5 correos.',
			'MSG_UNAUTHORIZED_ACCESS': 'Su contrato no permite el acceso a Telecrédito Movil. Puede acceder mediante Telecrédito web.',
			'MSG_INCOMPLETE_REASON_REJECTION': 'No ha ingresado el motivo del rechazo.',
			'MSG_WITHOUT_EMAILS': 'No ha ingresado destinatario.',
			'MSG_TERMS_USE': 'Condiciones de uso',
			'MSG_CLOSING_SESSION': 'Cerrando sesión',
			'MSG_NO_WORKSHEET_PASSWORD': 'No ha ingresado la clave actual.',
			'MSG_LENGTH_INVALID_PASSWORD' : 'La clave debe ser entre 6 y 8 caracteres de longitud.',
			'MSG_NO_WORKSHEET_PASSWORD_CONFIRM' : 'No ha ingresado la confirmación de la clave.',
			'MSG_NO_PASSWORD_EQUALS': 'Las claves no coinciden.',
			'MSG_PROCESS_CHANGE_PASSWORD_CORRECT': 'El reseteo de la clave se modificó satisfactoriamente.',
			'MSG_PROCESS_CHANGE_PASSWORD_INCORRECT': 'El reseteo de la clave no se pudo realizar satisfactoriamente.',
			'MSG_PASSWORD_INCORRECT_FORMAT': 'La clave ingresada no es válida. Esta clave debe tener al menos una letra y un número.',
			'MSG_INCOMPLETE_WORKSHEET_PASSWORD': 'La clave actual está incompleta.',
			'MSG_CONFIRM_ENABLE': '¿Está seguro que desea habilitar el contrato?',
			'MSG_CONFIRM_DISABLE': '¿Está seguro que desea deshabilitar el contrato?',
			'MSG_CONFIRM_AFFILIATION': '¿Está seguro que desea afiliar el contrato?',
			'MSG_CONFIRM_DISAFFILIATION': '¿Está seguro que desea desafiliar el contrato?',
			'MSG_SUCCESS_ENABLE': 'El contrato ha sido habilitado.',
			'MSG_SUCCESS_DISABLE': 'El contrato ha sido deshabilitado.',
			'MSG_SUCCESS_AFFILIATION': 'El contrato ha sido afiliado.',
			'MSG_SUCCESS_DISAFFILIATION': 'El contrato ha sido desafiliado.',
			'MSG_SUSPENDED_CONTRACT': 'El contrato se encuentra suspendido. Por favor comuníquese con Helpdesk al teléfono 313-2999 / 625-2999 (Lima) ó 0-801-1-8888 (Provincias).',
			
			// Descripciones, literales, labels
			'DESC_EMAIL_PLACEHOLDER':  'E-mail destinatario',
			
			// Tipos de datos
			'TYPE_EMAIL': 'email',
			
			// Tipos de alerta
			'ALERT_INFO': 'info',

			// Mensajes y datos de validación
			'ERROR'                 : 'Error',
			'CONFIRMATION'          : 'Confirmar',
			'COMPLETED_PROCESS'     : 'Proceso completo',
			'ALERTA'                : 'alert',
			'CONFIRMA'              : 'confirm',
			'PASSWORD_EMPTY'        : 'La Clave de Internet que has ingresado no es válida. Tu Clave de Internet está compuesta por 6 dígitos. Por favor vuelve a intentarlo.',
			'PASSWORD_ONE_TWO_SAME' : 'La Clave de Internet (clave de 6 dígitos) que has ingresado es igual a tu clave actual. Por favor ingresa una nueva clave de Internet.',
			'PASSWORD_SAME_NUMBER'  : 'La Clave de Internet (clave de 6 dígitos) que has digitado no coincide con la clave ingresada en el campo de confirmación. Por favor vuelve a intentarlo.',
			'ERROR_INTERNO'         : 'Error interno, intentelo de nuevo.',
			'ERROR_INTERNO_LATER'   : 'Error interno. Por favor, inténtelo más tarde.',
			'ERROR_INTERNO_INTENTAR': 'Ocurrió un error. Por favor, vuelva a intentarlo.',
			'CLOSE_SESSION_QUESTION': '¿Desea cerrar su sesión?',
			'SESSION_EXPIRED'       : 'Su sesión ha expirado.',
			'SI_VALUE'              : 'Si',
			'NO_VALUE'              : 'No',
			'OK_VALUE'              : 'OK',
			'CLOSE'              	: 'Cerrar',
			
			'ERROR_CODE' : {				
				'ERROR001': 'La operación ha sido actualizada por otra persona.',
				'ERROR002': 'La operación no ha podido ser firmada por el motivo.',
				'ERROR003': 'La operación no ha podido ser enviada por el motivo.',
				'ERT001'  : 'El número ingresado no es válido. Por favor ingrese el nuevo número que aparece en su Clave Digital Token.',
				'ERT002'  : 'El número de Clave Digital Token ingresado no es válido. Por favor intente nuevamente.',
				'ERP002'  : 'La clave de la planilla es inválida',
				'ESC001'  : 'Error al consultar el servicio.'
			},
			
			'ERROR_RELOAD_PAGE': ['ERP001'],
			
			// Códigos de error en los cuales se va a tomar el mensaje del response
			'ERROR_CODE_SERVIDOR': ['ECS001'],
			// Código de error que retorna al validar horario de respuesta de telecredito web
			'ERROR_CODE_SCHEDULE': ['EC0006']
			
		});
	
}(angular));