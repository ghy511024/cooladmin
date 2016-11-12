/**
 * 后端版本控制 加载 js 类库和css 类库
 * @author ghy
 * @constant qq249398279
 * */
(function () {
    var Z = document.getElementsByTagName('script')[0];
    var csss = [
        "http://static.ws.kukuplay.com/common/lib/jquery-ui/v1.8.21/jquery-ui.1.8.21.min.css",
        "http://static.ws.kukuplay.com/common/styles/dataTables.bootstrap.css",
//        "http://static.ws.kukuplay.com/common/lib/zylib/v3.0/adminpageV3.7.css" //后端样式
        "/css/adminpageV3.0.css", //后端样式

    ];
    var jss = [
        "http://static.ws.kukuplay.com/common/lib/bootstrap/v3.3.5/js/bootstrap.min.js", //bootstrap 核心
        "http://static.ws.kukuplay.com/common/lib/jquery-ui/v1.8.21/jquery-ui.1.8.21.min.js", //jquery ui 日期插件
        "http://static.ws.kukuplay.com/common/scripts/lib/jquery.dataTables.min.js", // 数据表格
        "http://static.ws.kukuplay.com/common/scripts/lib/dataTables.bootstrap.js",
//        "http://static.ws.kukuplay.com/common/lib/zylib/v3.0/adminV3.1.min.js",
//        "/js/admin/form/imgajaxupload.js",
//        "/js/admin/form/zform.js",
        "/js/dist/adminV3.js",
    ];

    for (var i = 0; i < csss.length; i++) {
        var tmpcss = document.createElement('link');
        tmpcss.rel = "stylesheet";
        tmpcss.href = csss[i];
        Z.parentNode.insertBefore(tmpcss, Z);
    }
//    var t = +new Date()
//    while ( + new Date < t + 5000)
//        ;
    for (var i = 0; i < jss.length; i++) {
        var tmpjs = document.createElement('script');
        tmpjs.type = 'text/javascript';
        tmpjs.async = false;
        tmpjs.src = jss[i];
        Z.parentNode.insertBefore(tmpjs, Z);
    }
    window.HOME_LINK = "/";
//    window.CONF_URL="";
//    window.CONF_URL="http://www.inter.zhangyu.tv/api/getadminpagelink";
    window.zadmin = (function (fun) {
        var tmpfun = [];
        admin = {
            ready: function (fun) {
                if (typeof fun === "function") {
                    tmpfun.push(fun);
                }
            }, init: function () {
                for (var i in tmpfun) {
                    tmpfun[i]();
                }
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
                    , {
                        name: "zform 教程",
                        url: "/jspage/zform.html"
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
                ]
            }
        ]
    }
    , {
        name: "develop js",
        url: "/jspage/html5video.html", tag: [
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
                    },
                    {
                        name: "ajax 上传图片",
                        url: "/jspage/ajaximg.html"
                    }
                ]
            }, {
                name: "插件开发",
                title: "底层支持",
                url: "/jspage/csstool.html",
                links: [
                    {
                        name: "css tool",
                        url: "/jspage/csstool.html"
                    },
                    {
                        name: "zen html",
                        url: "/jspage/zenhtml.html"
                    },
                    {
                        name: "hover白光闪过",
                        url: "/jspage/csswhite.html"
                    }
                ]
            },
            {
                name: "备份",
                title: "简单易忘片段",
                url: "/jspage/keycode.html",
                links: [
                    {
                        name: "code part",
                        url: "/jspage/keycode.html"
                    }
                ]
            }
        ]},
    {
        name: "前端规范",
        url: "/jspage/jsmodel.html", tag: [
            {
                name: "js相关",
                title: "js模块化",
                url: "/jspage/jsmodel.html",
                links: [
                    {
                        name: "js模块化",
                        url: "/jspage/jsmodel.html"
                    },
                    {
                        name: "ajax模块化",
                        url: "/jspage/ajaxmodel.html"
                    },
                    {
                        name: "font-icon 图标字体",
                        url: "/page/font.html"
                    },
                ]
            }
        ]}
];
window.AdminRightPage = [{
        name: "按钮1",
        cla: "logout"
    }, {
        name: "按钮2",
        cla: "logout"
    }
]