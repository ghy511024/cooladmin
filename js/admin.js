/**
 * 章鱼tv 后端基础类库
 * @hongyu
 * @qq：249398279
 * @version v2.1
 * */
$(document).ready(function () {
    Admins.init();
    fytip.init();
});
var Admins = (function () {
    var admin = {
        init: function () {
            this.load();
            this.layout();
            this.initEvent();
        },
        layout: function () {
            $(".time").each(function () {
                var time = $(this).attr("time");
                if (Ut) {
                    var str = Ut.getTimeTostr(time)
                    $(this).html(str);
                }
            })
            var start = $("#start-time").attr("start") || Ut.getParam("start");
            var end = $("#end-time").attr("end") || Ut.getParam("end");
            if (start != null) {
                if (start.length == 10) {
                    start = Number(start) * 1000
                }
                var start = new Date(Number(start));
                var str = Ut.getTimeTostr(start)
                $("#start-time").val(str);
            }
            if (end != null) {
                if (end.length == 10) {
                    end = Number(end) * 1000
                }
                var end = new Date(Number(end));
                var str2 = Ut.getTimeTostr(end)
                $("#end-time").val(str2);
            }
            
        },
        initEvent: function () {
            $("table").on("click", ".trup", function () {
                var parent = $(this).parent().parent();
                var brother = $(parent).prev();
                brother.before(parent);
            });
            $("table").on("click", ".trdown", function () {
                var parent = $(this).parent().parent();
                var brother = $(parent).next();
                brother.after(parent);
            });
            $("table").on("click", ".trdel", function () {
                var parent = $(this).parent().parent();
                parent.remove();
            });
            $(".nav-tabs").on("click", "li a", function () {
                $(this).parent().parent().find(".active").removeClass("active");
                $(this).parent().addClass("active");
                var _id = $(this).attr("data-id");
                $(".nav-content").removeClass("active");
                $("#" + _id).addClass("active");
            })
        },
        load: function () {
            if ($(".topbar").length == 0) {
                $.ajax({
                    url: "/api/getadminpagelink",
                    type: "post",
                    data: ({}),
                    dataType: "json",
                    success: function (ret) {
                        admin.cpage(ret);
                    }
                })
            }
        },
        cpage: function (data) {
            //布局页面
            if (data) {
                //========读取变量============
                var ctop = AdminConf["top"];
                var ctag = AdminConf["tag"];
                var clink = AdminConf["link"];
                
                //==========创建 导航框架=============
                var topnav = $("<div class='topbar'></div>");
                var navhome = $('<div class="topbar-left left-home"><a href="#"><i class="fa fa-home fa-3x"></i></a></div>')
                var navbar = $('<div class="topbar-left"></div>')
                topnav.append(navhome);
                topnav.append(navbar);
                $("body").prepend(topnav);
                
                //===============包裹 内容页面 ===================
                $("#content").wrap("<div class='main-content'><div class='content-inner left-content'><div class='content-body'></div></div></div>")
                //========一级导航=========
                var mainContent = $(".main-content");
                var leftSlide = $('<div class="left-slide-bar"><ul></ul></div>')
                mainContent.append(leftSlide)
                //========二级导航=========
                var inner = $(".content-inner");
                var innerSlide = $("<div class='inner-slide-bar'><div class='list'></div></div>")
                inner.append(innerSlide);
                
                //========添加页面=============
                var topdata = null;
                for (var i in data) {
                    //===========添加导航链接==============
                    var topitem = data[i]
                    var name = topitem["name"];
                    var url = topitem["url"];
                    var navitem = $("<div><a href='" + url + "'><span></span></a></div>");
                    navitem.addClass("topbar-nav-btn");
                    navitem.find("a").attr("src", url);
                    navitem.find("span").html(name);
                    $(navbar).append(navitem);
                    if (name == ctop) {
                        topdata = topitem;
                        navitem.addClass("active")
                    }
                    //=======添加悬浮提示导航=======
                    var dropmenu = $("<div class='dropdown-menu'></div>");
                    var taglink = topitem["tag"] || [];
                    for (var i = 0; i < taglink.length; i++) {
                        var col = $("<div class='topbar-nav-col'><ul></ul></div>")
                        var links = taglink[i]["links"] || [];
                        for (var m = 0; m < links.length; m++) {
                            var src = links[m]["url"];
                            var name = links[m]["name"];
                            var link = $("<li ><a href='" + src + "'>" + name + "</a></li>");
                            $(col).find("ul").append(link);
                        }
                        dropmenu.append(col);
                    }
                    navitem.append(dropmenu);
                }
                //=============添加一级导航 链接============
                var tagdata = null;
                if (topdata != null && topdata["tag"] != null) {
                    for (var n = 0; n < topdata["tag"].length; n++) {
                        var liitem = topdata["tag"][n]
                        var li = $("<li><a href='" + liitem["url"] + "'>" + liitem["name"] + "</a></li>")
                        leftSlide.find("ul").append(li)
                        if (liitem["name"] == ctag) {
                            li.addClass("active");
                            tagdata = liitem;
                        }
                    }
                }
                //============添加二级导航 链接=============
                if (tagdata != null && tagdata["links"] != null && tagdata["links"].length > 0) {
                    var ul = $("<ul></ul>")
                    var title = tagdata["title"] || name
                    for (var i = 0; i < tagdata["links"].length; i++) {
                        var linkitem = tagdata["links"][i];
                        var link = $("<li><a href='" + linkitem["url"] + "'><div class='link'>" + linkitem["name"] + "</div></a></li>")
                        ul.append(link)
                        if (linkitem["name"] == clink) {
                            link.find("a").addClass("current");
                        }
                    }
                    innerSlide.find(".list").append(ul)
                    innerSlide.append("<div class='title'>" + title + "</div>")
                }
            }
        }
    }
    var ret = {
        init: function () {
            admin.init();
        }
    }
    return ret;
})();
//==============工具类====================
var Ut = (function () {
    Ut = {
        getParam: function (key) {
            var search = window.location.search;
            var param = {}
            var arry = search.replace("?", "").split("&")
            for (var i in arry) {
                var item = arry[i]
                param[item.split("=")[0]] = item.split("=")[1]
            }
            if (key != null) {
                return param[key];
            }
            else {
                return param;
            }
        }, gettime: function (str) {
            var ret = null;
            if (str == null || str.length == 0) {
                return;
            }
            var arry = str.split(" ");
            if (arry != null && arry.length > 1) {
                var dayarry = (arry[0] || "-").split("-");
                var y = dayarry[0];
                var M = Number(dayarry[1]) - 1;
                var d = dayarry[2]
                var harry = arry[1].split(":");
                var h = harry[0];
                var m = harry[1];
                ret = new Date(y, M, d, h, m).getTime();
            }
            return ret;
        }, Null: function (e) {
            return e == null || e == "" || e.length == 0;
        }, isURL: function (str) {
            if (str.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i) == null) {
                return false
            }
            else {
                return true;
            }
        },
        getTimeTostr: function (time) {
            var str = "";
            var time = (Number(time) || -1)
            if (time > 0) {
                var date = new Date(time)
                var M = (date.getMonth() + 1);
                M = M < 10 ? "0" + M : M;
                var D = (date.getDate());
                D = D < 10 ? "0" + D : D;
                var H = (date.getHours());
                H = H < 10 ? "0" + H : H;
                var m = (date.getMinutes());
                m = m < 10 ? "0" + m : m;
                str = date.getFullYear() + "-" + M + "-" + D + " " + H + ":" + m
            }
            return str;
        }
    }
    return Ut;
})();
var fytip = (function ($) {
    var instance;
    var fytip = {
        init: function () {
            this.layout();
            this.initEvent();
        },
        layout: function () {
            
        },
        initEvent: function () {
            $(".fy-tip").on({mouseenter: function () {
                    var tip = $(_this.getSinleton());
                    var top = $(this).offset().top;
                    var left = $(this).offset().left;
                    var w = $(this).innerWidth();
                    var h = $(this).innerHeight();
                    
                    var type = $(this).attr("data-tip") || "top";
                    var desc = $(this).attr("data-desc");
                    _this.reset();
                    tip.find(".arrow").addClass(type + "-arrow");
                    tip.find(".tip-inner").html(desc);
                    var sw = tip.width();
                    var sh = tip.height();
                    console.log(top, left, w, h, sw, sh);
                    console.log((left - (sw - w) / 2));
                    
                    if (type == "top") {
                        tip.css({left: (left - (sw - w) / 2), top: (top - sh - 5)});
                    }
                    if (type == "right") {
                        tip.css({left: (left + w), top: (top - (sh - h) / 2)});
                        tip.addClass("")
                    }
                    tip.show();
                },
                mouseleave: function () {
                    console.log("leave")
                    var tip = $(_this.getSinleton());
                    tip.hide();
                }
            })
        },
        reset: function () {
            var arrow = $(_this.getSinleton()).find(".arrow");
            arrow.removeClass("top-arrow")
            arrow.removeClass("right-arrow")
            arrow.removeClass("left-arrow")
            arrow.removeClass("bottom-arrow")
        },
        getSinleton: function () {
            
            function getInstance() {
                if (instance == null) {
                    instance = new createTip();
                }
                return instance;
            }
            function createTip() {
                var tip = document.createElement("div");
                $(tip).addClass("fy-slide-tip");
                $(tip).append($('<div class="arrow"></div>'));
                $(tip).append($('<div class="tip-inner"></div>'))
                $("body").append(tip);
                return tip;
            }
            return getInstance();
        }
    }
    var _this = fytip;
    return fytip;
    
})($)