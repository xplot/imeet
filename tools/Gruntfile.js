module.exports = function (grunt) {
/*
|---------------------------------------------------------------------------------
|	HELPER METHODS
|---------------------------------------------------------------------------------
*/
	var _tasks = [];
	var _desc  = null;

	function desc(d) {
		_desc = d || "";
	}

	function task () {
		_tasks.push({name: arguments[0], description:_desc || ""});
		_desc = null;
		grunt.registerTask.apply(grunt, arguments);
	}

	function log () {
		console.log.apply(null, arguments);
	}

/*
|---------------------------------------------------------------------------------
|	DEFINE THE HELP TASK TO OUTPUT LIST OF COMMANDS
|---------------------------------------------------------------------------------
*/
	desc('Show a list of commands');
	task('help', function () {

		log('');
		log('Usage: grunt COMMAND');
		log('');
		log('Commands:');
		log('');
		for (var i=0, l=_tasks.length; i<l; i++) {
			var tn = _tasks[i].name;
			var td = _tasks[i].description;

			while(tn && tn.length < 32) {
				tn += ' ';
			}

			log('  > '+ tn +'# '+ td);
		}

	});

/*
|---------------------------------------------------------------------------------
|	PROJECT CONFIGURATION
|---------------------------------------------------------------------------------
*/
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	//
	//	LESS is used to parse our scss files, and we have two files that need
	//	to be parsed and output into the /tmp folder.
	//
		less: {
			styles: {
				files: {
					'tmp/css/imeet.css': '../static/less/imeet.less'
				}
			}
		},
	//
	//	Run uglify to minify our scripts, both the third party libraries and our
	//	own app.js script. (run after directives)
	//
		uglify: {
			options: {
                compress:true,
                beautify:true
			},
            external: {
				src: [
                    '../static/js/external/jquery.js',
										'../static/js/external/underscore.js',
                    '../static/js/external/backbone.js',
										'../static/js/external/stickit.js',
                    '../static/js/external/bootstrap.js',
                    '../static/js/external/slider.js'
                ],
                dest: '../static/js/external.min.js'
			},
			application_scripts: {
				src: [
                    '../static/js/templates.js',
                    '../static/js/views/*.js',
					'../static/js/app.js'
                ],
                dest: '../static/js/imeet.min.js'

			}
		},
	//
	//	Use CSSMin to minify our css files (run after less)
	//
		cssmin: {
			all: {
				files: {
					'../static/css/imeet.min.css': [
                        '../static/less/external/*.css',
                        'tmp/css/*.css'
                    ]
				}
			}
		},

		//
		// Precompiles underscore templates
		//
			jst: {
			compile: {
				options: {
					templateSettings: {
						interpolate : /\{\{(.+?)\}\}/g
					},
					processName: function(filepath) {
						return filepath.substring(filepath.lastIndexOf("/") + 1);
  				}
				},
				files: {
					"../static/js/templates.js": ["../views/**/*.html"]
				}
			}
		},

		//
		//	Watch files for changes
		//
		watch: {
			less: {
				files: ['../static/less/*.less'],
				tasks: [
                    'less',
                    'cssmin'
                ]
			},
			libs: {
                files: ['../static/js/external/*.js'],
				tasks: [
                    'uglify:external',
                ]
			},
            application_scripts: {
				files: ['../views/**/*.html','../static/js/*.js','../static/js/views/*.js','!../static/js/*.min.js'],
				tasks: [
                    'jst',
                    'uglify:application_scripts'
                ]
			}
		}
	});

/*
|---------------------------------------------------------------------------------
|	LOAD PLUGINS
|---------------------------------------------------------------------------------
*/
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-directives');
	grunt.loadNpmTasks('grunt-contrib-jst');

/*
|---------------------------------------------------------------------------------
|	SETUP TASKS
|---------------------------------------------------------------------------------
*/
	grunt.registerTask('default', ['help']);

	desc('Watch for LESS/JS changes and rebuild (CTRL+C to exit)');
	task('assets:watch', ['watch']);

	desc('Rebuild all assets');
	task('assets:build', ['assets:build:less', 'assets:build:js']);

	desc('Build and minify LESS files');
	task('assets:build:less', ['less', 'cssmin']);

	desc('Build and minify JS files');
	task('assets:build:js', ['directives', 'uglify']);

	desc('Precompiles underscore templates');
	task('assets:templates', ['jst']);
}
