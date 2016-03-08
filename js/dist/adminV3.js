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
        },
        gettime: function (str) {
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
        },
        Null: function (e) {
            return e == null || e == "" || e.length == 0;
        },
        isURL: function (str) {
            if (str.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+(\w|\/)$/i) == null) {
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
        },
        search: function (key, value) {
            var param = Ut.getParam();
            param[key] = value;
            var array = [];
            for (var keys in param) {
                if (keys != null && keys.length > 0) {
                    array.push(keys + "=" + param[keys]);
                }
            }
            var str = array.join("&");
            return str;
        }
    }
    return Ut;
})();
/**
 * @version 1.0
 * @description 第一版实现基础解析，暂时不支持高级语法
 * @author hongyu.gong
 * @date 2015-11-6
 * */
var CssTool = {
    makstyle: function (styleobj) {
        var stylestr = this.getstyle(styleobj);
        $('<style type="text/css">' + stylestr + '</style>').appendTo("head");
    },
    getstyle: function (styleobj) {
        var retstr = "";
        var styarray = this._getstyleArray(styleobj)
        for (var i = 0; i < styarray.length; i++) {
            var styles = styarray[i];
            for (var j = styles.length - 1; j >= 0; j--) {
                var style = styles[j];
                for (var ids in style) {
                    var idksys = ids.replace(/[#]/gi, " #").replace(/[\.]/gi, " .").replace(/&\s/gi, "&").replace(/&/gi, "")
                    var str = style[ids];
                    retstr += idksys + "{" + str + "}";
                }
            }
        }
        retstr = retstr.replace(/^\s/gi, "")
        return retstr;
    },
    _getstyleArray: function (obj) {
        var array = [];
        for (var key in obj) {
            var ret = this._getyles(key, obj[key]);
            array.push(ret);
        }
        return array;
    },
    _getyles: function (key, pa) {
        var array = [];
        var ret = [];
        getstyle(key, pa);
        function getstyle(perfix, obj) {
            var tmp = {}
            for (var key in obj) {
                if (/[#\.&]/gi.test(key) && (typeof obj[key] == "object")) {
                    getstyle(perfix + key, obj[key]);
                } else {
                    tmp[perfix] = (tmp[perfix] || "") + key + ":" + obj[key] + ";";
                }
            }
            array.push(tmp)
        }
        return array
    }
};
/**
 * @author ghy
 * @desc zen 模版基础类库
 * @contact qq 249398279
 * */
jQuery.fn.zen = function (selector, callback) {
    var $this = $(this);
    if (typeof selector == undefined)
        return $this;
    selector.replace(/^([^>+]+)(([>+])(.*))?/, function ($0, instruction, $1, operator, subSelector) {
        instruction.replace(/^([^*]+)(\*([0-9]+))?/, function ($0, tag, multiplier, factor) {
            if (factor == undefined)
                factor = 1;
            if (factor < 1)
                factor = 1;
            var tagName = tag.match(/[^.#]+/)[0];
            for (var i = 1; i <= factor; i++) {
                var el = $('<' + tagName + '>');
                tag.replace(/([.#])([^.#]+)/g, function ($0, kind, name) {
                    if (kind == '#') {
                        el.attr('id', name);
                    } else if (kind == '.') {
                        el.addClass(name);
                    }
                });
                $this.append(el);
                if (operator == undefined) {
                    if (callback != undefined)
                        jQuery.each([el], callback);
                } else if (operator == '+') {
                    $this.zen(subSelector, callback);
                } else if (operator == '>') {
                    el.zen(subSelector, callback);
                }
            }
        });
    });
    return $(this);
}
window.zen = function (selector, callback) {
    var dom = $("<span>").zen(selector, callback).html();
    return  $(dom);
}
/**
 * @author ghy
 * @desc tip 小插件，针对后端，报名之类的表格数据特别多，影响布局的页面
 * @contact qq 249398279
 * */
window.fytip = (function ($) {
    var instance;
    var inlock = false;
    var flock = false;
    var fytip = {
        init: function () {
            this.layout();
            this.initEvent();
        },
        layout: function () {
            var style = {
                ".fy-slide-tip": {
                    position: "fixed",
                    padding: "5px",
                    "z-index": "1000",
                    "font-size": "12px",
                    "line-height": "1.4",
                    opacity: "0.95",
                    top: "0px",
                    ".arrow": {
                        "position": "absolute",
                        width: "0",
                        height: "0",
                        "border-color": "transparent",
                        "border-style": "solid",
                        "border-width": "5px 5px 5px 5px",
                        "&.top-arrow": {
                            left: "50%",
                            bottom: "-5px",
                            "margin-left": "-5px",
                            "border-top-color": "#425160"
                        },
                        "&.right-arrow": {
                            top: "50%",
                            left: "-5px",
                            "margin-top": "-5px",
                            "border-right-color": "#425160"
                        }
                    },
                    ".tip-inner": {
                        "max-width": "400px",
                        "padding": "12px 8px",
                        color: "#fff",
                        "text-align": "center",
                        "text-decoration": "none",
                        "border-radius": "0",
                        background: "#163342"
                    }
                }
            }
            if ($(".fy-tip").length) {
                CssTool.makstyle(style);
            }
        },
        initEvent: function () {
            $(".fy-tip").on({mouseenter: function () {
                    inlock = true;
                    var tip = $(_this.getSinleton());
                    var top = $(this).offset().top;
                    var left = $(this).offset().left;
                    var w = $(this).innerWidth();
                    var h = $(this).innerHeight();
                    var type = $(this).attr("data-tip") || "top";
                    var desc = $(this).attr("data-desc") || "content";
                    if (desc == "content") {
                        desc = $(this).html();
                    }
                    _this.reset();
                    tip.find(".arrow").addClass(type + "-arrow");
                    tip.find(".tip-inner").html(desc);
                    var sw = tip.width();
                    var sh = tip.height();
                    if (type == "top") {
                        tip.css({left: (left - (sw - w + 5) / 2), top: (top - sh - 10)});
                    }
                    if (type == "right") {
                        tip.css({left: (left + w + 2), top: (top - (sh - h) / 2 - 5)});
                        tip.addClass("")
                    }
                    tip.show();
                },
                mouseleave: function () {
                    inlock = false;
                    setTimeout(function () {
                        if (!inlock && !flock) {
                            var tip = $(_this.getSinleton());
                            tip.hide();
                        }
                    }, 50)
                }
            })
            $(document).on("mouseenter", ".fy-slide-tip",
                    function () {
                        flock = true;
                    })
            $(document).on("mouseleave", ".fy-slide-tip",
                    function () {
                        flock = false;
                        var tip = $(_this.getSinleton());
                        tip.hide();
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
})($);
$(document).ready(function () {
    fytip.init();
})
//==============alert弹窗===========
var alertStyle = {
    "#zalert": {
        "display": "none",
        "font-family": "'微软雅黑'",
        "top": "0",
        left: "0",
        width: "100%",
        height: "100%",
        position: "fixed",
        "z-index": "99999"
    },
    "#zalert .bk": {
        opacity: "0.5",
        width: "100%",
        height: "100%",
        background: "#000",
        filter: "alpha(opacity=50)"
    },
    "#zalert .z-close": {
        position: "absolute",
        right: "8px",
        "font-size": "24px",
        top: "0px",
        color: "#B3B2B2",
        cursor: "pointer"
    },
    "#zalert .z-close:hover": {
        color: "#5F5A5A"
    },
    "#zalert .panel": {
        "background": "#FFF",
        "border-radius": "3px",
        "position": "fixed",
        "z-index": "99999999",
        width: "400px",
        "min-height": "100px",
        "padding": "15px 20px",
        "left": "50%",
        "top": "25%",
        "margin-left": "-200px"
    }
    ,
    "#zalert .info": {
        "margin": "30px auto",
        "text-align": "center",
        "font-size": "14px",
        height: "24px",
        "line-height": "24px",
        width: "100%"
    },
    "#zalert .zbtn": {
        "width": "60px",
        "border": "1px solid #df1155",
        "color": "#fff",
        "background-color": "#f71d65",
        "font-size": "14px",
        "text-align": "center",
        "cursor": "pointer",
        "margin": "0px auto 20px",
        "top": "25%",
        "padding": "2px 5px"
    },
    "#zalert .zbtn:hover": {
        "background-color": "#FD4884"
    }
}
window.zalert = (function () {
    var zalert = {
        init: function () {
            this.cstyle();
            this.initEvent();
            this.cpage();
        },
        cstyle: function () {
            $('<style type="text/css">' + zalert.getstyle(alertStyle) + '</style>').appendTo("head");
        },
        cpage: function () {
            var dom = zen("div#zalert>div.bk+div.panel");
            var panel = $(dom).find(".panel")
            panel.zen("div.title-wrap>div.z-title+div.z-close");
            panel.zen("div.content>div.info+div.zbtn");
            $(panel).find(".z-close").html("×")
            $(panel).find(".z-title").html("来自章鱼tv的提示")
            $(panel).find(".zbtn").html("确定")
            $("body").append(dom)
        },
        initEvent: function () {
            $(document).on("click", "#zalert .zbtn,#zalert .z-close", function () {
                $("#zalert").hide();
            })
        },
        alert: function (desc, title) {
            $("#zalert").fadeIn();
            $("#zalert .info").html(desc);
        },
        getstyle: function (obj) {
            var stylestr = getstyle(obj)
            function getstyle(obj) {
                var alls = ""
                for (var key in obj) {
                    //样式
                    if (/[#\.]/gi.test(key) && (typeof obj[key] == "object")) {
                        var style = obj[key];
                        var str = "";
                        for (var st in  style) {
                            str += st + ":" + style[st] + ";";
                        }
                        alls += key + "{" + str + "}";
                    }
                }
                return alls;
            }

            return(stylestr);
        }

    }
    $(document).ready(function () {
        zalert.init();
    })
    return function (desc, title) {
        zalert.alert(desc, title)
    };
})();
/**
 * 
 *图片上传 控件
 * 
 * */
window.ImgUp = (function () {
    var imgup = {
        init: function () {
            this.wrapAllImgUp();
            this.layout();
            this.viewImg();

        }, initEvent: function () {

        },
        layout: function () {
            loadJs("http://static.ws.kukuplay.com/common/lib/ajaximg/ajaxupload.js", function () {
                imgup.bindAllImgUp();
            })
        },
        wrapAllImgUp: function () {
            $(".zy-imgup").each(function () {
                imgup.wrapImgUp($(this));
            })
        },
        wrapImgUp: function (el) {
            $(el).wrap("<div class='zyform-up-wrap'></div>");
            var eyeicon = $('<i class="fa fa-eye zyadmin-eyeicon"></i>')
            var upbtn = $('<i class="fa fa-cloud-upload zyadmin-upicon"></i>')
            $(el).parent().append(eyeicon).append(upbtn);
        },
        bindAllImgUp: function () {

            $(".zyform-up-wrap .zyadmin-upicon").each(function () {
                imgup.bindImgUp($(this));

            })

        },
        bindImgUp: function (el) {
            window.UpConf = window.UpConf || {};
            var url = UpConf["upurl"] || "/picture/multiupload";
            var retimg = UpConf["returl"] || "origin";
            var fun = UpConf["success"];
            if (url != null && url.length > 0) {
                new AjaxUpload(el, {
                    action: url,
                    name: 'upfile',
                    data: ({maxWidth: "120", maxHeight: "120"}),
                    dataType: 'json',
                    autoSubmit: true,
                    onSubmit: function (file, ext) {
                    },
                    onComplete: function (file, retobj) {
                        console.log("上传回调:" + retobj)
                        if (typeof retobj == "string") {
                            try {
                                retobj = JSON.parse(retobj);
                            }
                            catch (e) {
                                console.log("返回数据转换为对象失败。。。", retobj)
                            }
                        }
                        if (retobj != null) {
                            if (retobj instanceof Array) {//数组处理多图片上传
                                for (var i in retobj) {
                                    var obj = retobj[i]
                                    var img = obj[retimg]//原始图 字段
                                    var url = img["url"];
                                    $(el).parent().find("input").val(url);
                                }
                            }
                            else { // 单图片上传接口
                                var imgurl = retobj[retimg]//原始图 字段
                                if (imgurl instanceof Array) {//返回数组 取第一个图片地址
                                    if (imgurl != null && imgurl.length > 0) {
                                        $(el).parent().find("input").val(imgurl[0]);
                                    }
                                }
                                else if (typeof imgurl == "string") {
                                    $(el).parent().find("input").val(imgurl);
                                }
                            }
                            if (typeof fun == "function") {
                                fun(retobj, $(el).parent().find("input"))
                            }
                        }
                        else {
                            alert("返回数据为空")
                        }
                    }
                });
            }
        },
        viewImg: function () {
            $(document).on("mouseenter", ".zyadmin-eyeicon", function () {
                var imgurl = $(this).parent().find("input").val();
                if (imgurl.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+(\w|\/)$/i) == null) {
                    return false
                }
                if ($(this).parent().find(".viewimg").length) {
                    $(this).parent().find(".viewimg").attr("src", imgurl).show();
                } else {
                    $(this).parent().append("<img class='viewimg' src='" + imgurl + "'/>")
                    $(this).parent().find("img").show();
                }
            })
            $(document).on("mouseleave", ".zyform-up-wrap", function () {
                $(this).parent().find(".viewimg").hide();
            })
        }
    }
    var loadJs = function (src, fun) {
        var script = null;
        script = document.createElement("script");
        script.type = "text/javascript";
        if (typeof fun === "function") {
            script.onload = script.onreadystatechange = function () {
                var r = script.readyState;
                if (!r || r === 'loaded' || r === 'complete') {
                    script.onreadystatechange = null;
                    fun();
                }
            };
        }
        script.src = src;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    return imgup;
})()
$(function () {
    ImgUp.init();
})

/* 
 * @后端通用弹窗模版 v1
 * 探索脚步从未停止
 * @author ghy;
 * @contact qq:249398279
 */
window.zform = (function () {
    var tmpfun;
    var zform = {
        init: function () {
            zform.initEvent();
        }, initEvent: function () {
            $(document).on("click", ".add-dyn", function () {
                var tmp = $(this).parent().find(".dyn-tmp").clone().removeClass("dyn-tmp");
                $(this).parent().find(".dyn-list").append(tmp);
                //上传图片动态列表 特殊处理
                var ipt = $(tmp).find(".zy-imgup");
                if (ipt.length) {
                    ImgUp.wrapImgUp(ipt)
                    ImgUp.bindImgUp($(ipt).parent().find(".zyadmin-upicon"))
                }
            })
            $(document).on("click", ".up-dyn", function () {
                var parent = $(this).parent();
                var brother = $(parent).prev();
                brother.before(parent);
            })
            $(document).on("click", ".del-dyn", function () {
                var parent = $(this).parent();
                parent.remove();
            })
            //==============close===========
            $(document).on("click", ".z-form .close,.z-form .cancel", function () {
                $(".zform-cover").hide();
                tmpfun = null;
            })
            //===========save 获取数据=======
            $(document).on("click", ".z-form .save", function () {
                zform.save();
            })
        }, bindEvent: function () {

        }, save: function () {
            var data = zform.getData();
            console.log("save data:", JSON.stringify(data));

            if (tmpfun != null && typeof tmpfun == "function") {

                tmpfun(data)
            } else {
                alert("callback is null")
            }

        }, getData: function () {
            var data = {};
            $(".z-form .form .item").each(function () {
                var type = $(this).data("ftype");
                var key = $(this).data("fkey")
                if (!Ut.Null(key)) {
                    //普通input
                    if (type == "text") {
                        var value = ($(this).find("input").val() || "").trim();
                        if (value != null && value.length > 0) {
                            data[key] = value;
                        }
                    }
                    //普通input
                    else if (type == "time") {
                        var value = ($(this).find("input").val() || "").trim();
                        if (value != null && value.length > 0) {
                            try {
                                var times = Ut.gettime(value)
                                data[key] = times;
                            }
                            catch (e) {
                                alert(e)
                            }
                        }
                    }
                    //下拉列表
                    else if (type == "select") {
                        var value = $(this).find("select").val();
                        if (value != null && value.length > 0) {
                            data[key] = value;
                        }
                    }
                    //radio
                    else if (type == "radio") {
                        var name = $(this).find("input[type='radio']").attr("name");
                        var value = $(this).find("input[name='" + name + "']:checked").val();
                        if (value != null && value.length > 0) {
                            data[key] = value;
                        }
                    }
                    //textarea
                    else if (type == "textarea") {
                        var value = $(this).find("textarea").val();
                        if (value != null && value.length > 0) {
                            data[key] = value;
                        }
                    }
                    //checkbox
                    else if (type == "checkbox") {
                        var checkret = [];
                        $(this).find("input[type='checkbox']:checked").each(function () {
                            var value = $(this).val();
                            checkret.push(value);
                        })
                        if (checkret.length > 0) {
                            data[key] = checkret;
                        }
                    }
                    //imgup 图片上传
                    else if (type == "imgup") {
                        var value = $(this).find("input").val(); //表单中默认字段
                        var cvalue = $(this).find("input").data("cvalue");// 图片上传 覆盖字段
                        if (cvalue != null) { //覆盖字段不为空，则提交覆盖字段
                            var obj = {};
                            if (typeof cvalue == "string") {
                                try {
                                    obj = eval(data);
                                } catch (e) {
                                }
                            } else {
                                obj = cvalue
                            }
                            data[key] = obj;
                        }
                        else if (value != null && value.length > 0) {
                            data[key] = value;
                        }
                    }
                    //dyn list(动态列表)
                    else if (type == "dynlist") {
                        var array = zform.getDynlist($(this));
                        if (array.length > 0) {
                            data[key] = array;
                        }
                    }
                }
            })

            return data;
        },
        getDynlist: function (el) {
            var retarray = [];
            $(el).find(".dyn-list .dyn-item").each(function () {
                var map = {};
                var haskey = false;
                $(this).find("input").each(function () {
                    var key = $(this).attr("key");
                    var value = $(this).val();
                    // 图片上传 覆盖字段
                    var cvalue = $(this).data("cvalue");
                    if (cvalue != null) { //覆盖字段不为空，则提交覆盖字段
                        var obj = {};
                        if (typeof cvalue == "string") {
                            try {
                                obj = eval(cvalue);
                            } catch (e) {
                            }
                        } else {
                            obj = cvalue
                        }
                        haskey = true;
                        if (obj instanceof Array) {
                            if (obj.length > 0) {
                                map = obj[0];
                            }
                        } else {
                            map = obj
                        }

                    }
                    else if (key != null && value != null && value.length > 0) {
                        map[key] = value;
                        haskey = true;
                    }
                })
                if (haskey) {
                    retarray.push(map);
                }
            })
            return retarray;
        }, cform: function (data, fun) {
            if (typeof fun == "function") {
                tmpfun = fun
            }
            cform.cform(data);
        }, eform: function (el, data, fun) {
            if (typeof fun == "function") {
                tmpfun = fun
            }
            cform.eform(el, data);
        }
    }
    return zform;
})();
window.cform = (function () {
    var instance;
    var cform = {
        //创建表单
        cform: function (data) {
            var form = _this.getSinleton();
            var panel = $(form).find(".form");
            $(panel).empty();
            for (var key in data) {
                var item = data[key];
                if (item != null) {
                    var type = item["type"];
                    if (type == "text") {//普通input
                        var item = _this._getText(data[key], key);
                        $(panel).append(item);
                    }
                    else if (type == "radio") {
                        var item = _this._getRadio(data[key], key);
                        $(panel).append(item);
                    }
                    else if (type == "checkbox") {
                        var item = _this._getCheckbox(data[key], key);
                        $(panel).append(item);
                    }
                    else if (type == "textarea") {
                        var item = _this._getTextArea(data[key], key);
                        $(panel).append(item);
                    }
                    else if (type == "dynlist") {// 动态列表
                        var item = _this._getDynlist(data[key], key);
                        $(panel).append(item);
                    }
                    else if (type == "imgup") {//上传图片控件
                        var item = _this._getImgUp(data[key], key);
                        $(panel).append(item);
                    }
                    else if (type == "time") {//时间控件
                        var item = _this._getTime(data[key], key);
                        $(panel).append(item);
                    }
                }

            }

            //=============功能按钮============
            var opwrap = zen("div.item.save-wrap>div.btn.btn-default.cancel+div.btn.btn-success.save");
            $(opwrap).find(".cancel").html("取消")
            $(opwrap).find(".save").html("保存")
            $(panel).append(opwrap);
            //=============显示panel===========
            $(window).resize();
            $(form).show();
            var ch = $(".zform-cover").find(".form").height();
            var ph = $(".zform-cover").find(".z-form").height();
            if (ph - ch > 70) {
                $(".zform-cover .z-form").css({"height": ch + 70});
            }
        },
        /*
         * 编辑表单
         * 
         * **/
        eform: function (el, data, fun) {
            var tmpdata = {};
            $(el).find("td").each(function () {
                var key = $(this).data("key");//key
                var value = $(this).data("value");
                var forbid = $(this).data("forbid");// 是否为不可编辑字段
                if (key != null && key.length > 0) {
                    if (data[key] && (value == null || value.length == 0)) {
                        if (data[key]["type"] == "text" || data[key]["type"] == "textarea") {
                            value = ($(this).html() || "").trim();//值 默认为文本内容
                        }
                    }
                    for (var tmpkey in data) {
                        if (tmpkey == key) {
                            tmpdata[key] = clone(data[key]);
//                            tmpdata[key] = data[key];
                            if (/^\[/gi.test(value)) {
                                try {
                                    tmpdata[key]["value"] = eval(value);
                                }
                                catch (e) {
                                    console.log("td数据转换出错", el);
                                }
                            }
                            else {
                                tmpdata[key]["value"] = value;
                            }
                            if (forbid != null && forbid) {
                                tmpdata[key]["forbid"] = true;
                            }
                            break;
                        }
                    }
                }
            })
            cform.cform(tmpdata);
        },
        _getText: function (item, key) {
            if (item == null || key == null) {
                return;
            }
            var name = item["name"];
            var value = item["value"];
            var forbid = item["forbid"];
            var dom = zen("div.item>label");
            $(dom).attr("data-ftype", "text");
            $(dom).attr("data-fkey", key);
            $(dom).find("label").html(name + "：");
            $(dom).append($("<input type='text' value='" + (value || "") + "'/>"));
            if (forbid) {
                $(dom).find("input").attr("disabled", "true");
            }
            return $(dom);
        },
        _getImgUp: function (item, key) {
            if (item == null || key == null) {
                return;
            }
            var name = item["name"];
            var value = item["value"];
            var forbid = item["forbid"];
            var dom = zen("div.item>label");
            $(dom).attr("data-ftype", "text");
            $(dom).attr("data-fkey", key);
            $(dom).find("label").html(name + "：");
            var ipt = $("<input type='text' value='" + (value || "") + "' class='zy-imgup'/>");
            $(dom).append(ipt);
            if (forbid) {
                $(dom).find("input").attr("disabled", "true");
            }
            ImgUp.wrapImgUp(ipt)
            ImgUp.bindImgUp($(ipt).parent().find(".zyadmin-upicon"))
            return $(dom);
        },
        /**
         * item: {type: "radio", check: [{name: "男", value: "1"}]},
         * */
        _getRadio: function (item, key) {
            if (item == null || key == null) {
                return;
            }
            var rlist = item["check"]
            var defvalue = item["value"];
            var dom = zen("div.item.check-item>label");
            $(dom).attr("data-ftype", "radio");
            $(dom).attr("data-fkey", key);
            for (var i in rlist) {
                var t = rlist[i];
                var name = t["name"];
                var value = t["value"];
                var l = $("<label>" + name + "：</label>");
                if (defvalue == value) {
                    var c = $("<input type='radio' name='" + key + "' value='" + value + "' checked/>");
                }
                else {
                    var c = $("<input type='radio' name='" + key + "' value='" + value + "'/>");
                }
                $(dom).append(l);
                $(dom).append(c);
            }
            return $(dom);
        },
        _getCheckbox: function (item, key) {
            if (item == null || key == null) {
                return;
            }
            var rlist = item["check"]
            var defvalue = item["value"];
            if (typeof defvalue == "string") {
                defvalue = JSON.parse(defvalue);
            }
            var dom = zen("div.item.check-item>label");
            $(dom).attr("data-ftype", "checkbox");
            $(dom).attr("data-fkey", key);

            for (var i in rlist) {
                var t = rlist[i];
                var name = t["name"];
                var value = t["value"];
                var b = $("<label>" + name + "：</label>")
                var c = $("<input type='checkbox' value='" + value + "'/>");
                for (var m in defvalue) {
                    if (defvalue[m] == value) {
                        c.attr("checked", "true");
                    }
                }
                $(dom).append(b);
                $(dom).append(c);
            }
            return $(dom);
        },
        _getTextArea: function (item, key) {
            if (item == null || key == null) {
                return;
            }
            var name = item["name"];
            var value = item["value"];
            var dom = zen("div.item>label");
            $(dom).attr("data-ftype", "textarea");
            $(dom).attr("data-fkey", key);
            $(dom).find("label").html(name + "：");
            $(dom).append($("<textarea>" + (value || "") + "</textarea>"));
            return $(dom);
        },
        _getDynlist: function (item, key, value) {
            if (item == null || key == null) {
                return;
            }
            var name = item["name"];
            var list = item["list"];
            var defvalue = item["value"];
            var imgup = item["imgup"] + "" == "true";
            if (list != null && list.length > 0) {
                var dom = zen("div.item>label+div.dyn-list");
                $(dom).attr("data-ftype", "dynlist");
                $(dom).attr("data-fkey", key);
                $(dom).find("label").html(name + "：");
                var add_btn = zen("span.op-btn.add-dyn>i.fa.fa-plus-square.fa-1x")
                $(dom).append(add_btn);
                var listpanel = $(dom).find(".dyn-list");
                var tmp_item = zen("div.dyn-item.dyn-tmp>span.op-btn.del-dyn+span.op-btn.up-dyn")
                $(tmp_item).find(".del-dyn").append(zen("i.fa.fa-trash-o.fa-1x"))
                $(tmp_item).find(".up-dyn").append(zen("i.fa.fa-arrow-up.fa-1x"));
                $(dom).append(tmp_item);
                for (var i in list) {
                    var name = list[i]["name"];
                    var tkey = list[i]["key"];
                    var b = $("<label>" + name + "：</label>");
                    var c = $($("<input type='text' key='" + tkey + "'>"));
                    $(tmp_item).append(b);
                    $(tmp_item).append(c);
                    if (imgup) {// 标记为上传图片input 当点击添加按钮的时候再去触发绑定上传图片事件
                        c.addClass("zy-imgup");
                    }
                }
                for (var n in defvalue) {
                    var c_item = zen("div.dyn-item>span.op-btn.del-dyn+span.op-btn.up-dyn")
                    var item = defvalue[n];
                    for (var ckey in item) {
                        var b = $("<label>" + ckey + "：</label>");
                        item[ckey]["value"] = item[ckey]["value"] || "";
                        var c = $($("<input type='text' key='" + item[ckey]["key"] + "'  value='" + item[ckey]["value"] + "'>"));

                        $(c_item).append(b);
                        $(c_item).append(c);
                        //上传图片动态列表 特殊处理
                        if (imgup) {
                            c.addClass("zy-imgup");
                            ImgUp.wrapImgUp(c)
                            ImgUp.bindImgUp($(c).parent().find(".zyadmin-upicon"))
                            // 覆盖值             
                            var cvalue = item[ckey]["cvalue"];
                            if (cvalue != null) {
                                c.attr("data-cvalue", JSON.stringify(cvalue));
                            }
                        }
                    }
                    $(c_item).find(".del-dyn").append(zen("i.fa.fa-trash-o.fa-1x"))
                    $(c_item).find(".up-dyn").append(zen("i.fa.fa-arrow-up.fa-1x"));
                    listpanel.append(c_item);
                }
                return dom;
            }
        },
        _getTime: function (item, key) {
            if (item == null || key == null) {
                return;
            }
            var name = item["name"];
            var value = item["value"];
            var forbid = item["forbid"];
            var dom = zen("div.item>label");
            $(dom).attr("data-ftype", "time");
            $(dom).attr("data-fkey", key);
            $(dom).find("label").html(name + "：");
//            $(dom).append($("<input type='text' value='" + (value || "") + "'/>"));
            var ipt = $("<input type='text'/>");
            try {
                ipt.datetimepicker();
                value = value + "";
                if (!Ut.Null(value) && value.length == 13) {
                    var timestr = Ut.getTimeTostr(value);
                    $(ipt).val(timestr);
                }
            }
            catch (e) {

            }
            $(dom).append(ipt);
            if (forbid) {
                $(dom).find("input").attr("disabled", "true");
            }
            return $(dom);
        },
        getSinleton: function () {
            function getInstance() {
                if (instance == null) {
                    instance = new createForm();
                }
                return instance;
            }
            function createForm() {
                var tip = document.createElement("div");
                $(tip).addClass("zform-cover");
                $(tip).append($('<div class="bk"></div>'));
                $(tip).append($('<div class="z-form"><div class="close">×</div><div class="form-scroll"><div class="form"></div></div></div>'))
                $("body").append(tip);
                return tip;
            }
            return getInstance();
        }
    };
    function clone(obj) {
        function Fn() {
        }
        Fn.prototype = obj;
        var o = new Fn();
        for (var a in o) {
            if (typeof o[a] == "object") {
                o[a] = clone(o[a]);
            }
        }
        return o;
    }
    var _this = cform;
    return cform;
})();
$(function () {
    zform.init();
})
/**
 * 章鱼tv 后端 渲染核心模块
 * @hongyu
 * @qq：249398279
 * @version v3.0
 * */
var Admins = (function () {
    var admin = {
        init: function () {
            this.load();
            this.layout();
            this.initEvent();
        },
        layout: function () {
            this.timePicker();
            //延时加载==========datatable===============
            setTimeout(function () {
                $('#table,#example').dataTable({
                    "iDisplayLength": 100,
                    "sScrollX": "100%",
                    "sScrollXInner": "100%",
                    "aLengthMenu": [100, 200, 300]});
                $('#table10').dataTable({
                    "iDisplayLength": 10,
                    "aLengthMenu": [[10, 20, 50, 100], [10, 20, 50, 100]],
                    "sScrollX": "100%",
                    "sScrollXInner": "100%"
                });

            }, 500)
        },
        timePicker: function () {
            $(".time").each(function () {
                var time = $(this).attr("time");
                if (Ut) {
                    var str = Ut.getTimeTostr(time)
                    $(this).html(str);
                }
            })
            try {
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
                $(".timepicker").datetimepicker();
            }
            catch (e) {

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
                if ((typeof AdminPage != "undefined") && AdminPage != null) {
                    admin.cpage(AdminPage);
                } else {
                    var url = window.CONF_URL;
                    if (Ut.Null(url)) {
                        url = "/api/getadminpagelink";
                    }
                    $.ajax({
                        url: url,
                        type: "post",
                        data: ({}),
                        dataType: "json",
                        success: function (ret) {
                            admin.cpage(ret);
                        }
                    })
                }
            }
            this.cRightPage();
        },
        cpage: function (data) {
            //布局页面
            if (data) {
                //========读取变量============
                var ctop = "";
                var ctag = ""
                var clink = ""
                //检查配置
                if (typeof AdminConf != "undefined") {
                    ctop = AdminConf["top"];
                    ctag = AdminConf["tag"];
                    clink = AdminConf["link"];
                }
                else {
                    var ret = admin.getCurrentPage(data)
                    ctop = ret["ctop"];
                    ctag = ret["ctag"];
                    clink = ret["clink"];
                }
                //==========创建 导航框架=============
                var topnav = zen("div.topbar>div.topbar-left.left-home>a>i.fa.fa-home.fa-3x");
                var navbar = zen("div.topbar-left")
                topnav.append(navbar);
                if (window.HOME_LINK) {
                    topnav.find("a").attr("href", window.HOME_LINK)
                }
                $("body").prepend(topnav);
                //===============包裹 内容页面 ===================
//                $("#content").wrap("<div class='main-content'><div class='content-inner left-content'><div class='content-body'></div></div></div>")
                $("#content").wrap(zen("div.main-content>div.content-inner.left-content>div.content-body"))
                //========一级导航=========
                var mainContent = $(".main-content");
                mainContent.zen("div.left-slide-bar>ul")
                var leftSlide = mainContent.find(".left-slide-bar");
                //========二级导航=========
                var inner = $(".content-inner");
                inner.zen("div.inner-slide-bar>div.list")
                var innerSlide = inner.find(".inner-slide-bar");
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
                    var dropmenu = zen("div.dropdown-menu");
                    var taglink = topitem["tag"] || [];
                    for (var i = 0; i < taglink.length; i++) {
                        var col = zen("div.topbar-nav-col>div.col-title+ul");
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
        },
        getCurrentPage: function (data) {
            var pathname = window.location.pathname;
            var href = window.location.href;
            var host = window.location.host;
            var ctop = ""
            var ctag = "";
            var clink = "";
            var ret = {};
            for (var i in data) {
                var topdata = data[i]
                for (var n = 0; n < topdata["tag"].length; n++) {
                    var tagdata = topdata["tag"][n]
                    for (var m = 0; m < tagdata["links"].length; m++) {
                        var linkitem = tagdata["links"][m]
                        if (linkitem["url"] == pathname || "http://" + host + linkitem["url"] == href) {
                            ctop = topdata["name"];
                            ctag = tagdata["name"];
                            clink = linkitem["name"];
                            ret["ctop"] = ctop
                            ret["ctag"] = ctag
                            ret["clink"] = clink
                        }
                        else {
                            if (linkitem["item"] != null) {
                                for (var j in linkitem["item"]) {
                                    if (linkitem["item"][j] == pathname || "http://" + host + linkitem["item"][j] == href) {
                                        ctop = topdata["name"];
                                        ctag = tagdata["name"];
                                        clink = linkitem["name"];
                                        ret["ctop"] = ctop
                                        ret["ctag"] = ctag
                                        ret["clink"] = clink
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return ret;
        }, cRightPage: function () {
            if (window.AdminRightPage) {
                var r = zen("div.topbar-right")
                for (var i in AdminRightPage) {
                    var btn = zen("a.link")
                    var name = AdminRightPage[i].name
                    var url = AdminRightPage[i].url
                    var cla = AdminRightPage[i].cla
                    $(btn).html(name)
                    if (url != null) {
                        $(btn).attr("href", url);
                    }
                    $(btn).addClass(cla)
                    $(r).append(btn)
                }
                $(".topbar").append($(r))
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
$(document).ready(function () {
    Admins.init();
    if (window.zadmin) {
        zadmin.init();
    }
})