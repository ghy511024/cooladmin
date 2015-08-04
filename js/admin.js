$(document).ready(function () {
    Admins.init();
    fytip.init();
})
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
            var start = Ut.getParam("start");
            var end = Ut.getParam("end");
            if (start != null) {
                var start = new Date(Number(start));
                var str = Ut.getTimeTostr(start)
                $("#start-time").val(str);
            }
            if (end != null) {
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