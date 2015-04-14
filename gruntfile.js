module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['lib/**/*.js'],
        tasks: ['build'],
        options: {
            spawn: false
            //livereload: true,
        },
      },
      mocha: {
        files: ['test/**/*.js'],
        tasks: ['mochaTest']
      }
    },
    jshint: {
      all: ['gruntfile.js', 'lib/*.js', 'test/**/*.js']
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      test: ['mochaTest', 'watch']
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
    },
    browserify: {
      dist: {
        files: {
           'dist/miruken-bundle.js':    ['lib/index.js'],
           'dist/miruken-ng-bundle.js': ['lib/index.js', 'lib/mvc/index.js', 'lib/angular/index.js'],
           'dist/miruken-tests.js':     ['test/**/*.js']
        }
      },
      debug: {
        files: {
           'debug/miruken-tests.js':  ['test/validate/validatejs-test.js']
           //'debug/miruken-tests.js':     ['test/**/*.js']
        }
      }
    },
    uglify: {
        dist: {
          files: {
              'dist/miruken-bundle.min.js': ['dist/miruken-bundle.js'],
              'dist/miruken-ng-bundle.min.js': ['dist/miruken-ng-bundle.js'],
          }
        }
    },
    copy: {
       main:{
         files: [
            {expand: true, flatten: true, src: ['dist/miruken-ng-bundle.js'], dest: 'demo/mytodo/app/scripts/'}
         ]
      }
    },
    karma: {
        dist: {
          configFile: 'karma.conf.js',
          singleRun: true
        },
        debug: {
          configFile: 'karma.conf.js',
          options: {
              files: ['debug/miruken-tests.js']
          },
          singleRun: false
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Test task.
  grunt.registerTask('test',  ['concurrent:test']);
  grunt.registerTask('build', ['browserify:dist','copy:main', 'karma:dist']);
  grunt.registerTask('debug',   ['browserify:debug','karma:debug']);
};
