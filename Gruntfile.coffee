# gruntjs.com
module.exports = (grunt) ->
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig
    # sass

    watch:
      options:
        livereload: 35729
      sass:
        files: [
          'scss/*.scss'
        ],
        tasks: 'sass'

  grunt.registerTask 'default', ['watch']
