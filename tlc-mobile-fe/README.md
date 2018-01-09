ANGULAR - V. 1.0.0
========================

Esta es una aplicación que describe la arquitectura principal de cada
proyecto frontend que será desarrollado en AngularJS. Se describen los procesos, componentes, flujos, librerias, paquetes de instalación, paquetes para test, paquetes de distribución y archivos principales HTML. Las librerias que acompañan esta arquitectura son: [Jquery](https://jquery.com/), [Angular](https://angularjs.org/) y [Bootstrap](http://getbootstrap.com/). Los programas escenciales que acompañan esta arquitectura son: [Protractor](https://angular.github.io/protractor/#/), [karma](http://karma-runner.github.io/0.8/plus/AngularJS.html), [grunt](http://gruntjs.com/installing-grunt), [bower](http://bower.io/) y [jasmine](https://docs.angularjs.org/guide/unit-testing) 

----------


Pre-requisitos
---------------- 

Se necesitan instalar los siguientes programas para el ambiente de desarrollo del proyecto. 

- Instalar [Node.js](https://nodejs.org/en/)
- Instalar [GIT](https://git-scm.com/downloads)
- Instalar [Bower](http://bower.io/)
- Instalar [Grunt-cli](http://gruntjs.com/getting-started)

Arquitectura
----------------
La arquitectura está estructurada en base a las buenas prácticas de AngularJS para proyectos grandes y escalables en el tiempo. Se busca poder actualizar constantemente el proyecto para llegar a un dinamismo óptimo en la construcción de nuevas aplicaciones *frontend* basadas en AngularJS.

A continuación se describen archivos principales en la fase de implementación inicial del proyecto.

#### <i class="icon-file"></i> package.json
Este archivo describe una estructura de elementos cuyo contenido hace mención principalmente a los aspectos de la aplicación como: Nombre del proyecto, versión, descripción, autor, licencia, etc. Entre otros aspectos se tiene también el registro completo de aplicaciones a instalar que ayudará al desarrollador en el proceso de implementación de nuevas funcionalidades, pruebas, etc. 

Ejemplo:

    {
        "name": "myapp",
        "version": "0.0.1",
        "devDependencies": {
            "protractor": "^2.1.0"
        }
    }

#### <i class="icon-file"></i> Gruntfile.js
Grunt es utilizado para automatizar procesos como: iniciar servidores locales, hacer uso de plugins y preparar archivos para conseguir una carpeta de distribución de la aplicación como muchas otras cosas más haciendo uso del archivo de configuración *Gruntfile.js*.

#### <i class="icon-file"></i> bower.json
Bower es utilizado para instalar librerias necesarias en la implementación de un proyecto como: JQuery, Bootstrap, Angular, etc., haciendo uso de este programa se pondrán descargar e instalar recursos necesarios en la fase de desarrollo. Ejemplo:

Ejemplo:

    {
        "name": "myapp",
        "description": "My project",
        "version": "0.0.1",
        "license": "My project license V. 0.0.1",
        "private": true,
        "dependencies": {
            "jquery": "~2.1.1",
            "angular": "~1.3.x"
        }
    }


*Estos tres principales archivos y sus descripciones ayudarán a entender mejor el proceso que levantamiento del proyecto hacia el desarrollo de la aplicación.*

Estructura
------------
Las carpetas principales en la arquitectura son:

    + app          // Archivos principales
    + app-test   // Carpetas para casos de prueba de tipo e2e o unit-test.

En la extensión de las mismas se tiene:

    + myapp  
        + app
           +- arch 
           +- bower-components 
           +- components
           +- connect  
           +- core 
           +- css
           +- flows
           +- img
           +- views
           +- app.css
           +- app.js
           +- index.min.html
           +- index.html
        + app-test
           +- e2e
           +- resources
           +- unit
        + bower.json
        + Gruntfile.js
        + package.json
        + README.md

La estructura pre-establecida puede ir aumentando en secciones de acuerdo a las necesidades que se enfrente pero como base se tiene siempre la descrita en este documento.

Instalación
-------------
La arquitectura depende de varias herramientas de node para su funcionamiento, como por ejemplo: <i>Node.js</i>, <i>Karma</i> y <i>Protractor</i>

Estas herramientas así como muchas otras más, son útiles para el proceso de desarrollo de código y flujos que se harán cada vez mas necesarias a lo largo de la implementación de nuevos componentes o funcionalidades requeridas.

Para empezar con la instalación de componentes principales en la arquitectura se debe abrir un <i>cmd</i> o <i>terminal</i>, colocarse en la raíz del proyecto que en este caso en particular es 'myapp' y dentro de esta ruta encontraremos las carpetas ya vistas, como son: app, app-test y archivos como <i>Package.json</i>, <i>bower.json</i> y <i>Gruntfile.js</i> de los cuales ya se han descrito conceptos para cada uno.

Para instalar los programas principales:

> $ npm install

Si se está usando un firewall o un proxy que pueda bloquear la identidad del usuario, usar:

> $ npm install -d

Para instalar dependencias usando bower ejecutar:
> $ bower install

Se instalaran las librerias demandadas en el archivo bower.json en la carpeta app/bowercomponentes, si se
desea cambiar de ruta se puede modificar el archivo .bowerrc ubicado en la raiz del proyecto.

Luego de haber ejecutado estos comandos en primera instancia se descargarán paquetes útiles para el desarrollo. 

- En el caso de la instalación de package.json se generará una carpeta descrita como <i>node_modules</i> ubicado en la raiz del proyecto. 
- En el caso de la instalación de bower.json se generará una carpeta descrita como <i>bower_components</i> ubicado bajo la ruta <i>myapp/app/bower_components</i>

Ejecutando la aplicación
-----------------------------
Para iniciar la aplicación se debe abrir un cmd o terminal, ubicarse en la carpeta raiz del proyecto y ejecutar el siguiente comando:

> $ grunt

Esta instrucción inicializará un server en local en donde correrá la aplicación. Entrar a http://localhost:9000/ para ver los resultados.

Ejecutando pruebas
-----------------------
El archivo <i>package.json</i> contiene la configuración para ejecutar este tipo de tests. Recordar que Karma o E2E se sirven en otros puertos que grunt se encarga de encontrar y definir por si solo.

 **Unit Test**
Se usa [Jasmine](https://github.com/jasmine/jasmine/releases) y [Karma](https://www.npmjs.com/package/karma) para los unit tests/spec

Luego de instalar los programas para <i>tests</i> solo queda incializar los plugins que manejarán la aplicación

 **Ejecución:**
 
>$ npm test

Un navegador se abrirá y se conectará al servidor Karma. Chrome es el navegador por defecto pero se puede cambiar facilmente a cualquier otro en la configuración del archivo 'karma.conf.js'

Karma permacerá escuchando si existe algún cambio en los escenarios de prueba hechos en los archivos <i>javascripts</i>, los ejecutará y mostrará resultados inmediatos de los test.

**Pruebas E2E**

Se requiere un webserver que sirva la aplicación.

- Instalar protractor: 
> $ npm install -g protractor 
- Levantar la aplicación en el servidor: 
> $ webdriver-manager start

- Protractor ejecutará los scripts de prueba tipo End2End (e2e) contra la aplicación al abrir un <i>cmd</i> o <i>terminal</i>, ubicarse en la raíz del proyecto y ejecutar: 
> $ protractor PATH_TO_MY_TESTS/protractor-conf.js
- La configuración esta puesta para correr los test en el Navegador Chrome directamente.
- Si se necesita ejecutar la aplicación en otros navegadores se debe instalar 'webDriver' bajo la siguiente ejecución en terminal. 'npm run update-webdriver' y modificar luego la configuración en el archivo test/protractor-conf.js

Valores constantes
-----------------------
Los valores constantes se encuentran definidos en la ruta: app/core/constants/constants.js y se cambian de acuerdo al entorno de desarrollo en el que se encuentre

Contacto
----------
Ricardo Gonzales - Frontend Developer (<i>jgonzabi@everis.com</i>)
Maria Cristina Huamancayo - Frontend Developer (<i>mhuamanc@everis.com</i>)

Actualizaciones
---------------
V. 1.0.1
- Separación de los archivos CSS por componentes
- Cambio en los nombres de los módulos de acuerdo a las buenas practicas
- Generación de Pruebas Unitarias por componente.
- Generación de Paquete de Distribución.
- Optimización de Librerias para distribución.


Portal Unico de Empresas - PUE
------------------------------
En el archivo README.md que se encuentra dentro de la carpeta app, se detalla la estructura del proyecto, al igual que los componentes utilizados.
En cada una de las carpetas de igual modo, existe un README.md que explica sobre su funcionalidad.

Contacto
--------
Rolando Paredes Alzamora - rparedea@everis.com
