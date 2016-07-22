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
                    "js/admin/form/imgajaxupload.js", //ajax 上传图片 插件
                    "js/admin/form/zform.js", //动态表单
                    "js/admin/maskimage.js", //图片展示
                    "js/admin/core.js"
                ]
            }, IE678: {
                dest: "js/dist/IE678.js",
                src: [
                    "js/IE/json2.js",
                    "js/IE/border-box.js",
                    "js/PIE2/PIE_IE678.js",
                    "js/PIE2/piepatch.js",
                ]
            }
        },
        uglify: {
            admin: {
                options: {banner: "<%= banner %>", report: "min"},
                src: "<%= concat.admin.src %>",
                dest: "js/dist/adminV3.min.js"
            },
            IE678: {
                options: {banner: "<%= banner %>", report: "min"},
                src: "<%= concat.IE678.src %>",
                dest: "js/dist/IE678.min.js"
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