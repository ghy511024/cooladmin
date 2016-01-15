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
        "border": "1px solid #46b8da",
        "color": "#fff",
        "background-color": "#5bc0de",
        "font-size": "14px",
        "text-align": "center",
        "cursor": "pointer",
        "margin": "0px auto 20px",
        "top": "25%",
        "padding": "2px 5px"
    },
    "#zalert .zbtn:hover": {
        "background-color": "#7BC1D6"
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