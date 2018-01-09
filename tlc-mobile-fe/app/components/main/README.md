Descripcion:

1) main es el encargado de llamar al objeto main-controller.js

2) main-controller.js : Es el controlador principal de la aplicacion, obtiene la url que se coloca en el navegador y valida que la navegacion sea solo por el menu. Setea el
							 showBigLoader a true, esto para que el cargar la pagina por primera vez carge el loader antes de la respuesta de los request al backend.
							 Almacena en storage los token, obtiene respuesta del servicio del usuario logueado y muestra los datos accesibles a nivel global en toda la aplicacion.
							 Posee funcion de cierre de sesión de PUE.
							 
3) user-service.js     : Llama al servicio rest de usuario logueado.
							 
							 
							 
Contacto
----------
Ricardo Rosales Maldonado - rrosalem@everis.com							 								