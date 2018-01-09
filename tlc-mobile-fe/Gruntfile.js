/**
 * Este archivo muestra una configuración para iniciar el servidor y
 * levantar al plugin watch.
 *
 * Note: Configuración básica para los primeros entregables
 * se trata de no tener muchos archivos, o instrucciones sueltas
 * en la aplicación.
 *
 * @author Ricardo Gonzales (jgonzabi@everis.com)
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 */
'use strict';

module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');
	
    var config = {
        app: 'app',
		app2: 'cas',
        dist: 'app-dist',
		path: 'tlc',
		path2: 'cas',
        build: 'build',
		vendor: 'bower_components',
		
		buildTemplates: 'build_templates',
		
		dependencies: [
			'<%= config.vendor %>/jquery/dist/jquery.min.js',
			'<%= config.vendor %>/jquery.browser/dist/jquery.browser.min.js',
			'<%= config.vendor %>/angular/angular.min.js',
			'<%= config.vendor %>/angular-ui-indeterminate/dist/indeterminate.min.js',
			'<%= config.vendor %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'<%= config.vendor %>/angular-ui-router/release/angular-ui-router.min.js',
			'<%= config.vendor %>/angular-touch/angular-touch.min.js',
			
			'<%= config.vendor %>/angular-material/modules/js/core/core.min.js',
			'<%= config.vendor %>/angular-material/modules/js/backdrop/backdrop.min.js',
			'<%= config.vendor %>/angular-material/modules/js/sidenav/sidenav.min.js',
			'<%= config.vendor %>/angular-material/modules/js/swipe/swipe.min.js',
			
			'<%= config.vendor %>/angular-animate/angular-animate.min.js',
			'<%= config.vendor %>/angular-i18n/angular-locale_es-pe.js',
			'<%= config.vendor %>/angular-cookies/angular-cookies.min.js',
			'<%= config.vendor %>/ngstorage/ngStorage.min.js',
			'<%= config.vendor %>/fastclick/lib/fastclick.js',		
			'<%= config.vendor %>/codrops/BookBlock/js/modernizr.custom.js',		
			'<%= config.vendor %>/oclazyload/dist/ocLazyLoad.min.js',		
		],

		cssDependencies: [
			'<%= config.vendor %>/bootstrap/dist/css/bootstrap.min.css',
			'<%= config.vendor %>/angular-material/modules/js/core/core.min.css',
			'<%= config.vendor %>/angular-material/modules/js/backdrop/backdrop.min.css',
			'<%= config.vendor %>/angular-material/modules/js/sidenav/sidenav.min.css',
		],

		fontsDependencies: [
			'<%= config.vendor %>/bootstrap/dist/fonts/**/*',
		]
    };

    grunt.initConfig({

		pkg: pkg,
        config: config,
		
        // Conexión al servidor local
        connect: { 
            server: {
                options: {
                    port: 9000,
                    base: '<%= config.app %>/'
                }
            }
        },
        // Configuración de 'watch' con livereload    
        watch: { 
            project: {
                files: [
					'<%= config.app %>/**/*.js', 
					'<%= config.app %>/**/*.html', 
					'<%= config.app %>/**/*.json', 
					'<%= config.app %>/**/*.css'
				],
                options: {
                    livereload: true
                }
            }
        },
        // JavaScript - Minificación
        uglify: { 
            dist: {
				options: {
					beautify: false,
					compress: true,
					preserveComments: false
				},
                files: [{ 
					expand: true, 
					cwd: '<%= config.dist %>',
					// src: ['*.js', 'components/**/*.js', 'core/**/*.js', 'views/**/*.js'],
					src: ['**/*.js', '!**/*.min.js'],
					dest: '<%= config.dist %>'
				}],
            }
        },
        // HTML - Minificación
        htmlmin: {
            dist: {
                options: { 
                    removeComments: true,
					removeTagWhitespace: false,
					collapseWhitespace: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true
                },
                files: [{ 
					expand: true, 
					cwd: '<%= config.dist %>',
					// src: ['*.html', 'components/**/*.html', 'views/**/*.html'],
					src: ['**/*.html', '!**/*.min.html'],
					dest: '<%= config.dist %>'
				}]
            }
        },
        // CSS - Minificación
        cssmin: {
			dist: {
				options: {
					restructuring: false,
					roundingPrecision: -1
				},
				files: [{ 
					expand: true, 
					cwd: '<%= config.dist %>',
					// src: ['components/**/*.css', 'views/**/*.css', 'css/**/*.css', '!**/*fonts*.css'],
					src: ['**/*.css', '!**/*.min.css', '!**/*fonts*.css'],
					dest: '<%= config.dist %>'
				}]
			}
        },
        // Limpiar el directorio de distribución 
        clean: {
			dist: ['<%= config.dist %>'],
			build: ['<%= config.build %>']
        },
        // Copia los fuentes de la aplicación en el directorio de distribución
		copy: {
			dist: {
				files: [{ 
					expand: true, 
					cwd: '<%= config.app %>', 
					src: ['**/*', '!**/*.md', '!**/*.txt', '!**/<%= config.vendor %>/**'], 
					dest: '<%= config.dist %>/<%= config.path %>' 
				},{ 
					expand: true, 
					cwd: '<%= config.app2 %>', 
					src: ['**/*', '!**/*.md', '!**/*.txt', '!**/<%= config.vendor %>/**'], 
					dest: '<%= config.dist %>/<%= config.path2 %>' 
				}]
			},
			build_dependencies: {
				expand: true,
				cwd: '<%= config.app %>', 
				src: ['<%= config.dependencies %>'],
				dest: '<%= config.dist %>/<%= config.path %>'
			},
			build_cssDependencies: {
				expand: true,
				cwd: '<%= config.app %>', 
				src: ['<%= config.cssDependencies %>'],
				dest: '<%= config.dist %>/<%= config.path %>'
			},
			build_fontsDependencies: {
				expand: true,
				cwd: '<%= config.app %>', 
				src: ['<%= config.fontsDependencies %>'],
				dest: '<%= config.dist %>/<%= config.path %>'
			},
			build: {
				expand: true,
				cwd: '<%= config.build %>', 
				src: ['**/*'],
				dest: '<%= config.dist %>'
			}
		},
		// Comprime directorio de distribución
		compress: {
			dist: {
				cwd: '<%= config.dist %>/',
				options: {
					archive: '<%= config.build %>/<%= pkg.name %>-<%= pkg.version %>.zip'
				},
				expand: true,
				src: ['**']
			}
		},
		// Genera la configuración de los módulos a cargar bajo demanda
		// Excluye los archivos que empiecen con _
		ocLazyLoad: {
			build_view: {
				cwd: '<%= config.app %>/',
				src: ['views/**/*.js'],
				fileTemplate: 'oclazyload.view.js',
				dest: '<%= config.app %>/module/'
			},
			build_component: {
				cwd: '<%= config.app %>/',
				src: ['components/**/*.js'],
				fileTemplate: 'oclazyload.component.js',
				dest: '<%= config.app %>/module/'
			}
		},
		cacheBust: {
			// cacheBustHtmlTlc: {
				// options: {
					// deleteOriginals: true,
					// baseDir: '<%= config.dist %>/tlc/',
					// assets: ['**/*.html','!index.html','!error.html','!login.html']
				// },
				// files: [{   
					// expand: true,
					// cwd: '<%= config.dist %>/tlc/',
					// src: ['**/*.html', '**/*.js']
				// }] 
			// },
			cacheBustTlc: {
				options: {
					deleteOriginals: true,
					baseDir: '<%= config.dist %>/tlc/',
					assets: ['**/*.js', '**/*.css']
				},
				files: [{   
					expand: true,
					cwd: '<%= config.dist %>/tlc/',
					src: ['index.html', 'module/oclazyload*']
				}] 
			},
			// cacheBustHtmlCas: {
				// options: {
					// deleteOriginals: true,
					// baseDir: '<%= config.dist %>/cas/',
					// assets: ['**/*.html','!index.html','!logout.html','!login.html']
				// },
				// files: [{   
					// expand: true,
					// cwd: '<%= config.dist %>/cas/',
					// src: ['**/*.html', '**/*.js']
				// }] 
			// },
			cacheBustCas: {
				options: {
					deleteOriginals: true,
					baseDir: '<%= config.dist %>/cas/',
					assets: ['**/*.js', '**/*.css']
				},
				files: [{   
					expand: true,
					cwd: '<%= config.dist %>/cas/',
					src: ['login.html']
				}] 
			}
		},
		imagemin: { 
			imageTlc: {		 
				files: [{
					expand: true,
					cwd: '<%= config.dist %>/tlc/img/',
					src: ['**/*.{png,jpg,gif,.svg}'],
					dest: '<%= config.dist %>/tlc/img/'
				}]		 
			},
			imageCas: {		 
				files: [{
					expand: true,
					cwd: '<%= config.dist %>/cas/img/',
					src: ['**/*.{png,jpg,gif,.svg}'],
					dest: '<%= config.dist %>/cas/img/'
				}]		 
			}		 
		}
    });

    // Carga de paquetes instalados en 'node_modules'
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-cache-bust');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
  
    // Registro de tareas para levantar procesos de grunt.
    // Si se desea agregar mas tareas deben ser agregadas tambien
    // en esta linea.
    grunt.registerTask('default', [
        'clean',
		'copy',
        'uglify', 
        'htmlmin', 
        'cssmin',
        'connect', 
        'watch'
    ]);
	
    grunt.registerTask('dev', [
        'connect', 
        'watch'
    ]);
	
    grunt.registerTask('release', [
        'clean',
		'ocLazyLoad',
		'copy',
        'uglify', 
        'htmlmin', 
        'cssmin',
		'imagemin',
		'cacheBust'
    ]);
	
    grunt.registerTask('zip', [
		'compress',
		'clean:dist',
		'copy:build',
		'clean:build'
    ]);
	
	
	var fs = require('fs');
	
	(function () {
		
		var ext = function (ext) {
			var extRE = new RegExp('^[^_]+\.' + ext + '$');
			return RegExp.prototype.test.bind(extRE);
		};
		
		var directory = function (dir) {
			var dirRE = new RegExp('^' + dir);
			return RegExp.prototype.test.bind(dirRE);
		};

		var task = function () {

			var dir = this.data.dir,
				files = this.filesSrc,
				src = config.buildTemplates + '/' + this.data.fileTemplate,
				dest = this.data.dest + this.data.fileTemplate;

			var relativePath = function (file) {
				return file.replace(dir + '/', '');
			};
			
			var scripts = files.filter(ext('js')).map(relativePath),
				modules = files.filter(ext('module.js')).map(relativePath);

			var views = [];

			modules.forEach(function(module) {

				var path = module.slice(0, module.lastIndexOf('/'));

				var fileContent = fs.readFileSync(config.app + '/' + module, 'utf8');

				var dependencies = scripts.filter(directory(path)).map(relativePath);
				var _dependencies = [];
				
				dependencies.forEach(function(file, k) {
					if(file.slice(0, file.lastIndexOf('/')) !== path) { // .js que están en sub directorio
						var _f = fs.readdirSync(config.app + '/' + file.slice(0, file.lastIndexOf('/') + 1));
						if(_f.filter(ext('module.js')).length == 0) {  // no existe un .module.js en ese sub directorio
							_dependencies.push(file);
						}
					} else {
						if(module !== file) {
							_dependencies.push(file);
						}
					}
				});
				
				// Agrega la final al propio modulo ya que este depende de los otros .js
				_dependencies.push(module);
				
				views.push({
					name: fileContent.match(/module\(\'(.*)\'/)[1].split('\'')[0],
					files: _dependencies
				})
			});
			
			grunt.file.copy(src, dest, {
				process: function (contents) {
					return grunt.template.process(contents, {
						data: { ocLazyLoad: {
							views: views
						}}
					});
				}
			});
		};

		grunt.registerMultiTask('ocLazyLoad', task);
	})();

};