/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1600,
            suffix: '_large_2x',
            quality: 30
          }, {
            width: 800,
            suffix: '_medium_2x',
            quality: 30
          },{
            width: 400,
            suffix: '_small_2x',
            quality: 30
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img_fullsize/',
          dest: 'img/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'img_fullsize/fixed/*.{gif,jpg,png,svg,ico}',
          dest: 'img/'
        }]
      },
    },

    /* blurr image for background */
    blurred_images: {
      myTask: {
        options: {
          engine: 'im',
          levels: [{ name: 'blurred', level: 100 }]
        },
        files: [{
          expand: true,
          src: ['img/teachmeapp-400_small_2x.jpg']
        }]
      }
    },

  });
  
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-blurred-images');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'blurred_images']);

};
