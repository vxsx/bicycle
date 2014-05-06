# gruntjs.com
module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    sass:
      components:
        files: [{
          expand: true
          cwd: 'components/'
          src: '*/*.scss'
          dest: 'components/'
          ext: '.css'
        }]

    autoprefixer:
      options:
        browsers: ['last 2 versions', 'ie 9']
      components:
        files: [{
          expand: true
          cwd: 'components/'
          src: '*/*.css'
          dest: 'components/'
        }]


    watch:
      options:
        livereload: 35729
      sass:
        files: [
          'scss/*.scss'
          'components/**/*.scss'
        ],
        tasks: ['sass:components', 'autoprefixer']

  grunt.registerTask 'components', ['sass:components', 'autoprefixer:components']
  grunt.registerTask 'default', ['watch']
