module.exports = function (grunt) {
    var pkg = grunt.file.readJSON("package.json");
    grunt.initConfig({
        pkg: pkg,
        banner: grunt.file.read("js/lib/copy.js")
                .replace(/@VERSION/, "v3")
                .replace(/@DATE/, grunt.template.today("yyyy-mm-dd")) + "\n",
        concat: {
            admin: {
                dest: "js/dist/adminV3.js",
                src: [
                    "js/admin/Ut.js",
                    "js/admin/csstool.js",
                    "js/admin/zen.js",
                    "js/admin/ftip.js",
                    "js/admin/zalert.js",
                    "js/admin/form/zform.js",
                    "js/admin/core.js"
                ]
            }
        },
        uglify: {
            admin: {
                options: {banner: "<%= banner %>", report: "min"},
                src: "<%= concat.admin.src %>",
                dest: "js/dist/adminV3.min.js"
            }
        },
        watch: {
            uglify: {
                files: ["<%= concat.admin.src %>"],
//                tasks: ['concat', 'uglify']
                tasks: ['concat']
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["watch", "uglify", "concat"]);
};