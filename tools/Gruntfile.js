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
	//	We will use directives to parse js files and concat them.
	//	Our main file is app.js and within it we include the rest as we
	//	need them.
	//
		directives: {
			app: {
				src:  '../js/app.js',
				dest: 'tmp/app.js'
			},
			views: {
				src:  '../js/views.js',
				dest: 'tmp/views.js'
			},
			contact_me: {
				src:  '../js/contact_me.js',
				dest: 'tmp/contact_me.js'
			}
		},
	//
	//	LESS is used to parse our scss files, and we have two files that need
	//	to be parsed and output into the /tmp folder.
	//
		less: {
			styles: {
				files: {
					'../css/freelancer.css': '../less/freelancer.less',
					'../css/mixins.css': '../less/mixins.less',
					'../css/variables.css': '../less/variables.less'
				}
			}
		},
	//
	//	Run uglify to minify our scripts, both the third party libraries and our
	//	own app.js script. (run after directives)
	//
		uglify: {
			options: {

			},
			external: {
				files: {
					'../js/freelancer.min.js': '../js/freelancer.js',
					'../js/classie.min.js': '../js/classie.js'
				}
			},
			application_scripts: {
				files: {
					'../js/app.min.js': 'tmp/app.js',
					'../js/views.min.js': 'tmp/views.js',
					'../js/contact_me.min.js': 'tmp/contact_me.js'
				}
			}
		},
	//
	//	Use CSSMin to minify our css files (run after less)
	//
		cssmin: {
			all: {
				files: {
					'../css/freelancer.min.css': '../css/freelancer.css',
					'../css/mixins.min.css': '../css/mixins.less',
					'../css/variables.min.css': '../css/variables.less'
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
					}
				},
				files: {
					"../js/templates.js": ["../views/**/*.html"]
				}
			}
		},

		//
		//	Watch files for changes
		//
		watch: {
			less: {
				files: ['../less/*.less'],
				tasks: ['less', 'cssmin']
			},
			libs: {
				files: ['../js/*.js'],
				tasks: ['uglify:external']
			},
			application_scripts: {
				files: ['../js/*.js'],
				tasks: [
						'directives:app',
						'directives:views',
						'directives:contact_me',
						'uglify:application_scripts']
			},
			jst: {
				files: ['../templates/**/*.html'],
				tasks: ['jst']
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
