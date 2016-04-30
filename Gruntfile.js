module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');  
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    watch: {
      browserify: {
        files: ['public/lib/**/*.js'],
        tasks: ['browserify']
      }
    },

    browserify: {
      dist: {
        options: {
          transform: [['babelify', {presets: ['es2015', 'react']}]]
        },
        src:['public/lib/**/*.js'],
        dest: 'public/bundle.js',
      }
    }

  });
};
