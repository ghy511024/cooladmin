/**
 * 后端版本控制 加载 js 类库和css 类库
 * @author ghy
 * @constant qq249398279
 * */
(function () {
    var Z = document.getElementsByTagName('script')[0];
    var csss = [
        "http://static.ws.kukuplay.com/common/lib/bootstrap/v3.3.5/css/bootstrap.min.css", //bootstrap 核心
        "http://static.ws.kukuplay.com/common/lib/jquery-ui/v1.8.21/jquery-ui.1.8.21.min.css",
        "http://static.ws.kukuplay.com/common/styles/dataTables.bootstrap.css",
//        "http://static.ws.kukuplay.com/common/lib/zylib/v3.0/adminpageV3.0.css" //后端样式
        "/css/adminpageV3.0.css" //后端样式
    ];
    var jss = [
        "http://static.ws.kukuplay.com/common/lib/bootstrap/v3.3.5/js/bootstrap.min.js", //bootstrap 核心
        "http://static.ws.kukuplay.com/common/lib/jquery-ui/v1.8.21/jquery-ui.1.8.21.min.js", //jquery ui 日期插件
        "http://static.ws.kukuplay.com/common/scripts/lib/jquery.dataTables.min.js", // 数据表格
        "http://static.ws.kukuplay.com/common/scripts/lib/dataTables.bootstrap.js",
//        "http://static.ws.kukuplay.com/common/lib/zylib/v3.0/adminV3.1.min.js",
        "/js/dist/adminV3.js"
    ];
    for (var i = 0; i < csss.length; i++) {
        var tmpcss = document.createElement('link');
        tmpcss.rel = "stylesheet";
        tmpcss.href = csss[i];
        Z.parentNode.insertBefore(tmpcss, Z);
    }
    for (var i = 0; i < jss.length; i++) {
        var tmpjs = document.createElement('script');
        tmpjs.type = 'text/javascript';
        tmpjs.async = false;
        tmpjs.src = jss[i];
        Z.parentNode.insertBefore(tmpjs, Z);
    }
    window.HOME_LINK = "/";
    window.zadmin = (function (fun) {
        var tmpfun = function () {
        };
        admin = {
            ready: function (fun) {
                if (typeof fun === "function") {
                    tmpfun = fun;
                }
            }, init: function () {
                tmpfun();
                console.log("admin ready...")
            }
        };
        return admin;
    })();
})();

/**
 * 
 * 页面配置 没有下面配置则默认从服务器获取信息  地址 "/api/getadminpagelink"
 * 章鱼tv 后端配置从服务器获取 不需要此配置
 * 小型项目（博客，单个项目等）可采用下面配置
 * 
 * */
window.AdminPage = [{
        name: "coolAdmin V3",
        url: "/page/start.html",
        tag: [
            {
                name: "光速上手",
                title: "上手指南",
                url: "/page/start.html",
                links: [
                    {
                        name: "开始使用",
                        url: "/page/start.html"
                    }
                    , {
                        name: "demo",
                        url: "/page/demo.html"
                    }
                    , {
                        name: "结构介绍",
                        url: "/page/structure.html"
                    }
                    , {
                        name: "工具函数",
                        url: "/page/utils.html"
                    }
                ]
            },
            {
                name: "资源集合",
                title: "常用资源集合",
                url: "/",
                links: [
                    {
                        name: "cdn 类库",
                        url: "/"
                    }
//                    ,
//                    {
//                        name: "模块依赖资源",
//                        url: "/page/basicdep.html"
//                    }
//                    ,
//                    {
//                        name: "vdsf",
//                        url: "/test/adminload.html",
//                        item: ["/test/test2.html", "/test/test3.html"]
//                    }
                ]
            },
//            {
//                name: "数据表格",
//                title: "datatable 介绍",
//                url: "/datatable/basic.html",
//                links: [
//                    {
//                        name: "基本使用",
//                        url: "/datatable/basic.html"
//                    }
//                ]
//            },
//            {
//                name: "日期插件",
//                title: "日期插件",
//                url: "/page/date.html",
//                links: [
//                    {
//                        name: "jquery 通用版",
//                        url: "/page/date.html"
//                    },
//                    {
//                        name: "jquery 最新版",
//                        url: "/page/datenew.html"
//                    },
//                    {
//                        name: "bootstrap 版",
//                        url: "/page/bootdate.html"
//                    }
//                ]
//            }
        ]
    }
    , {
        name: "develop js",
        url: "/jspage/keycode.html", tag: [
            {
                name: "代码片段",
                title: "简单易忘片段",
                url: "/jspage/keycode.html",
                links: [
                    {
                        name: "code part",
                        url: "/jspage/keycode.html"
                    }
                ]
            },
            {
                name: "常用插件",
                title: "常用插件",
                url: "/jspage/html5video.html",
                links: [
                    {
                        name: "html5 video",
                        url: "/jspage/html5video.html"
                    },
                    {
                        name: "zclip 一键复制",
                        url: "/jspage/zcopy.html"
                    }
                ]
            }
        ]}
//    , {
//        name: "java",
//        url: "/jspage/keycode.html", tag: [
//            {
//                name: "代码片段",
//                title: "code part",
//                url: "/javapage/partcode.html",
//                links: [
//                    {
//                        name: "code part",
//                        url: "/javapage/partcode.html"
//                    },
//                    {
//                        name: "paging 分页",
//                        url: "/javapage/paging.html"
//                    }
//                ]
//            }
//
//        ]}, {
//        name: "上线日志",
//        url: "/zytv/m10.html", tag: [
//            {
//                name: "上线日志",
//                title: "章鱼10月",
//                url: "/zytv/m10.html",
//                links: [
//                    {
//                        name: "10月日志",
//                        url: "/zytv/m10.html"
//                    }
//                ]
//            }
//        ]
//    }
];