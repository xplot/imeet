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
				src:  '../static/js/app.js',
				dest: 'tmp/js/app.js'
			},
			views: {
				src:  '../static/js/views.js',
				dest: 'tmp/js/views.js'
			},
            external: {
              // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
              // runs and build the appropriate src-dest file mappings then, so you
              // don't need to update the Gruntfile when files are added or removed.
              files: [
                  {
                      expand: true,     // Enable dynamic expansion.
                      cwd: '../static/js/external/',      // Src matches are relative to this path.
                      src: ['**/*.js'], // Actual pattern(s) to match.
                      dest: 'tmp/js/external/',   // Destination path prefix.
                      ext: '.min.js',   // Dest filepaths will have this extension.
                      extDot: 'first'   // Extensions in filenames begin after the first dot
                  }
              ]
            }
		},
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
			},
			external: {
				files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: 'tmp/js/external/',      // Src matches are relative to this path.
                    src: ['**/*.js'], // Actual pattern(s) to match.
                    dest: '../static/js/',   // Destination path prefix.
                }
              ]
			},
			application_scripts: {
				files: {
					'../static/js/app.min.js': 'tmp/js/app.js',
					'../static/js/views.min.js': 'tmp/js/views.js'
				}
			}
		},
	//
	//	Use CSSMin to minify our css files (run after less)
	//
		cssmin: {
			all: {
				files: {
					'../static/css/imeet.min.css': [
                        '../static/less/external/bootstrapp.css',
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
				tasks: ['less', 'cssmin']
			},
			libs: {
				files: ['../static/js/external/*.js'],
				tasks: [
                    'directives:external',
                    'uglify:external'
                ]
			},
			application_scripts: {
				files: ['../static/js/*.js','!../static/js/*.min.js'],
				tasks: [
						'directives:app',
						'directives:views',
						'uglify:application_scripts']
			},
			jst: {
				files: ['../views/**/*.html'],
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
