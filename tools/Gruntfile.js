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
					'tmp/css/imeet.css': '../static/less/imeet.less',
                    'tmp/css/index.css': '../static/less/index.less',
                    'tmp/css/contacts.css': '../static/less/contacts.less',
                    'tmp/css/invite_edit.css': '../static/less/invite_edit.less',
                    'tmp/css/invite.css': '../static/less/invite.less',
                    'tmp/css/kaboom.css': '../static/less/error.less',
                    'tmp/css/palette.css': '../static/less/palette/*.less',
				}
			}
		},
	//
	//	Run uglify to minify our scripts, both the third party libraries and our
	//	own app.js script. (run after directives)
	//
		uglify: {
//            options: {
//                compress:true,
//                beautify:false,
//		        mangle: true
//			},
			options: {
                compress:false,
                beautify:true,
		        mangle: false
			},
            header_js: {
				src: [
                    '../static/js/external/modernizr.min.js',
                ],
                dest: '../static/js/imeet_header.min.js'
			},
            external: {
				src: [
                    '../static/js/external/jquery.js',
                    '../static/js/external/underscore.js',
                    '../static/js/external/backbone.js',
                    '../static/js/external/stickit.js',
					'../static/js/external/moment.js',
                    '../static/js/external/bootstrap.min.js',
					'../static/js/external/datepicker.js',
                    '../static/js/external/jquery-xslider.js',
                    '../static/js/external/bootstrap-typeahead.js',
                    '../static/js/external/slider.js',
                    '../static/js/external/backbone_store.js'
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
                        'tmp/css/imeet.css'
                    ],
                    '../static/css/index.min.css': [
                        '../static/less/external/*.css',
                        'tmp/css/index.css'
                    ],
                    '../static/css/contacts.min.css': [
                        '../static/less/external/*.css',
                        'tmp/css/contacts.css'
                    ],
                    '../static/css/invite_edit.min.css': [
                        '../static/less/external/*.css',
                        'tmp/css/invite_edit.css'
                    ],
                    '../static/css/invite.min.css': [
                        '../static/less/external/*.css',
                        'tmp/css/invite.css'
                    ],
                    '../static/css/kaboom.min.css': [
                        'tmp/css/kaboom.css'
                    ],
                    '../static/css/palette.min.css': [
                        'tmp/css/palette.css'
                    ],
				}
			}
		},

		//
		// Precompiles underscore templates
		//
			jst: {
			compile: {
				options: {
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
				files: ['../static/less/*.less', '../static/less/palette/*.less'],
				tasks: [
                    'less',
                    'cssmin'
                ]
			},

			libs: {
                files: ['../static/js/external/*.js'],
				tasks: [
                    'uglify:external',
                    'uglify:header_js',
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
	//grunt.loadNpmTasks('grunt-directives');
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
	task('assets:build:js', ['uglify']);

	desc('Precompiles underscore templates');
	task('assets:templates', ['jst']);
}
