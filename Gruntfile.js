module.exports = function(grunt){
    //Configuración de las tareas
    grunt.initConfig({
        clean:['dist'],
        copy: {
            libs_to_dist:{
                expand:true,
                cwd:'src/libs/',
                src:['**'],
                dest:'dist/libs'
            },
            partials_to_dist:{
                expand:true,
                cwd:'src/partials',
                src:['**'],
                dest:'dist/partials'
            },
            resources_to_dist:{
                expand:true,
                cwd:'src/resources',
                src:['**'],
                dest:'dist/resources'
            },
            meta_to_dist:{
                expand:true,
                flatten:true,
                src:['README.md','src/plugin.json'],
                dest:'dist/'
            }
        },
        babel:{
            options: {
                sourceMap: true,
                presets: ['es2015'],
                plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of'],
            },
            dist: {
                files:  [{
                  cwd: 'src',
                  expand: true,
                  src: ['*.js'],
                  dest: 'dist',
                  ext:'.js'
                }]
            },
            ts: {
                files:  [{
                  cwd: 'src/features',
                  expand: true,
                  src: ['*/*.ts'],
                  dest: 'dist/features',
                  ext:'.js'
                }]
            }

        },
        watch: {
            partials:{
                files:['src/partials/*'],
                tasks:['copy:partials_to_dist'],
                options:{
                    debounceDelay: 200,
                }
            },
            meta:{
                files:['README.md','src/plugin.json'],
                tasks:['copy:meta_to_dist'],
                options:{
                    debounceDelay: 200,
                }
            },
            scripts:{
                files:['src/*.js', 'src/features/**/*'],
                tasks:['babel'],
                options:{
                    debounceDelay: 200,
                }
            }
        }
    });

    //Cargar las tareas instaladas a través de npm
    //grunt.loadNpmTasks();
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('buildClean', ['clean', 'copy', 'babel']);
    grunt.registerTask('build', ['copy', 'babel']);
    //Tarea por defecto
    grunt.registerTask('default', ['copy', 'babel', 'watch']);
};
