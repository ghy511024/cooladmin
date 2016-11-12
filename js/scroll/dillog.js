define(function(require, exports, module) {
    var $ = require("JQ")
      , drag = require("DRAG")
      , Util = require("UTIL")
      , _default = {
        container: null ,
        width: "auto",
        height: "auto",
        left: "auto",
        right: "auto",
        top: "auto",
        bottom: "auto",
        lock: !0,
        fixed: !1,
        drag: !0,
        skin: "dds-dialog",
        title: "Dialog Title",
        content: "Dialog Content",
        onOpen: function() {},
        onClosed: function() {},
        bgClosed: !1,
        zIndexCout: "dialogZindexCout",
        initZIndex: 2e3,
        fx: 0,
        timing: !1,
        delay: 5e3,
        tipClose: !1,
        isDestroy: !0,
        towards: "bottom"
    };
    function dialog(options) {
        var setting = $.extend({}, _default, options);
        for (var name in setting)
            this[name] = setting[name];
        this.timer = null
    }
    dialog.prototype = {
        init: function() {
            this.dom(),
            this.setParams(),
            this.addEvent(),
            this.open(),
            this.setFx(),
            this.timing && this.setTiming()
        },
        getH: function() {
            if (!this.isFullScreen)
                return this.relPanel.height();
            var ch = document.documentElement.clientHeight || document.body.clientHeight
              , sh = document.documentElement.scrollHeight || document.body.scrollHeight;
            return ch < sh ? sh : ch
        },
        dom: function() {
            this.relPanel = this.container,
            this.isFullScreen = !1,
            this.container === null && (this.container = $(document.body),
            this.relPanel = $(window),
            this.isFullScreen = !0),
            this.lock && (this.pageBg = $('<div class="' + this.skin + '-bg"></div>'),
            this.pageBg.css({
                height: this.getH(),
                zIndex: window[this.zIndexCout] || this.initZIndex
            }),
            this.container.append(this.pageBg)),
            this.boxer = $("<div></div>"),
            this.boxer.addClass(this.skin + "-boxer"),
            this.container.append(this.boxer);
            var str = '<span class="' + this.skin + '-closed"></span>';
            this.boxer.append('<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="' + this.skin + '-tl"></div></td>' + '<td><div class="' + this.skin + '-tc">' + '<span class="' + this.skin + '-title">' + this.title + "</span>" + str + "</div></td>" + '<td><div class="' + this.skin + '-tr"></div></td></tr>' + '<tr><td class="' + this.skin + '-cl"></td>' + '<td><div class="' + this.skin + '-cc">' + this.content + "</div></td>" + '<td class="' + this.skin + '-cr"></td></tr>' + '<tr><td><div class="' + this.skin + '-bl"></div></td>' + '<td><div class="' + this.skin + '-bc"></div></td>' + '<td><div class="' + this.skin + '-br"></div></td>' + "</tr></tbody></table>").css({
                width: this.width,
                height: this.height,
                zIndex: window[this.zIndexCout] || this.initZIndex
            }),
            typeof window[this.zIndexCout] != "undefined" ? window[this.zIndexCout] += 1 : window[this.zIndexCout] = this.initZIndex + 1
        },
        setTiming: function() {
            var _this = this;
            this.boxer.bind("mouseover", function() {
                clearTimeout(_this.timer)
            }).bind("mouseout", function() {
                _this.openTiming()
            })
        },
        openTiming: function() {
            var _this = this;
            this.timer = setTimeout(function() {
                _this.fx === 3 ? _this.boxer.animate({
                    opacity: 0
                }, "200", "swing", function() {
                    _this.destroy()
                }) : _this.destroy()
            }, this.delay)
        },
        setFx: function() {
            if (this.fx === 3) {
                this.boxer.css({
                    opacity: 0
                }),
                this.boxer.animate({
                    opacity: 1
                }, "400", "swing");
                return
            }
            var l = this.boxer.offset().left;
            if (this.fx === 2)
                this.boxer.animate({
                    left: l + 5
                }, 100, "swing").animate({
                    left: l - 5
                }, 100, "swing").animate({
                    left: l
                }, 100, "swing");
            else if (this.fx === 1) {
                var t = this.boxer.offset().top
                  , w = this.boxer.width()
                  , h = this.boxer.height();
                this.boxer.css({
                    opacity: 0,
                    width: 0,
                    height: 0,
                    left: l + w / 2,
                    top: t + h / 2
                }),
                this.boxer.animate({
                    opacity: 1,
                    top: t,
                    left: l,
                    width: w,
                    height: h
                }, 200, "swing")
            }
        },
        setBg: function() {
            this.pageBg.css({
                height: this.getH()
            })
        },
        setPos: function(t, l) {
            return this.right != "auto" ? (this.bottom != "auto" ? this.boxer.css({
                right: this.right,
                bottom: this.bottom
            }) : this.boxer.css({
                right: this.right,
                top: t
            }),
            !1) : (this.bottom != "auto" ? this.boxer.css({
                left: l,
                bottom: t
            }) : this.boxer.css({
                left: l,
                top: t
            }),
            !1)
        },
        setParams: function() {
            var tc = $("." + this.skin + "-tc", this.boxer)
              , tl = $("." + this.skin + "-tl", this.boxer)
              , tr = $("." + this.skin + "-tr", this.boxer)
              , cl = $("." + this.skin + "-cl", this.boxer)
              , cc = $("." + this.skin + "-cc", this.boxer)
              , cr = $("." + this.skin + "-cr", this.boxer)
              , bl = $("." + this.skin + "-bl", this.boxer)
              , bc = $("." + this.skin + "-bc", this.boxer)
              , br = $("." + this.skin + "-br", this.boxer)
              , w = this.boxer.width()
              , h = this.boxer.height();
            tc.css({
                width: w - tl.width() - tr.width()
            }),
            bc.css({
                width: w - tl.width() - tr.width()
            }),
            this.height != "auto" && cc.css({
                height: h - tl.height() - tr.height()
            }),
            this.width != "auto" && cc.css({
                width: w - tl.width() - tr.width()
            });
            var t = (this.relPanel.height() - h) / 2
              , l = (this.relPanel.width() - w) / 2;
            this.relPanel.height() < h && (t = 15),
            this.fixed || (t += $(document).scrollTop(),
            l += $(document).scrollLeft()),
            t = this.top != "auto" ? this.top : t,
            l = this.left != "auto" ? this.left : l,
            this.setPos(t, l)
        },
        reWAH: function(width, height) {
            this.width = width,
            this.height = height,
            this.boxer.css({
                width: width,
                height: height
            });
            var w = this.boxer.width()
              , h = this.boxer.height()
              , cc = $("." + this.skin + "-cc", this.boxer)
              , tl = $("." + this.skin + "-tl", this.boxer)
              , tr = $("." + this.skin + "-tr", this.boxer);
            this.height != "auto" && cc.css({
                height: h - tl.height() - tr.height()
            }),
            this.width != "auto" && cc.css({
                width: w - tl.width() - tr.width()
            }),
            this.reSize()
        },
        reSize: function() {
            var t = (this.relPanel.height() - this.boxer.height()) / 2
              , l = (this.relPanel.width() - this.boxer.width()) / 2;
            this.relPanel.height() < this.boxer.height() && (t = 15),
            this.fixed || (t += $(document).scrollTop(),
            l += $(document).scrollLeft()),
            t = this.top != "auto" ? this.top : t,
            l = this.left != "auto" ? this.left : l,
            this.setPos(t, l),
            this.lock && this.setBg()
        },
        addEvent: function() {
            var _this = this;
            this.fixed && $(this.boxer).css({
                position: "fixed"
            }),
            this.drag && drag.drag(this.boxer[0], {
                handle: $("." + this.skin + "-tc", this.boxer)[0]
            }).init(),
            $("." + this.skin + "-closed", this.boxer).bind("click", function() {
                _this.destroy()
            }).hover(function() {
                $(this).addClass(_this.skin + "-closed-over")
            }, function() {
                $(this).removeClass(_this.skin + "-closed-over")
            }),
            $(this.relPanel).bind("resize", function() {
                _this.reSize()
            }),
            this.bgClosed && this.pageBg.bind("click", function() {
                _this.destroy()
            })
        },
        open: function() {
            this.show(),
            this.onOpen(this)
        },
        show: function() {
            this.pageBg && this.pageBg.css("display", "block"),
            $(this.boxer).css("display", "block")
        },
        close: function() {
            this.pageBg && this.pageBg.css("display", "none"),
            $(this.boxer).css("display", "none"),
            this.onClosed()
        },
        destroy: function() {
            this.close();
            if (!this.isDestroy)
                return !1;
            this.pageBg && this.pageBg.remove(),
            $(this.boxer).remove()
        },
        alert: function(content, fun, isclose) {
            this.title = "提示";
            var _this = this
              , txt = content || "";
            return this.content = '<div class="' + this.skin + '-alert">' + '<div class="' + this.skin + '-txt">' + txt + "</div>" + '<div class="' + this.skin + '-btnc">' + '<input type="button" value="" class="' + this.skin + '-btn"/>' + "</div></div>",
            this.onOpen = function(Class) {
                var btn = $("input", Class.boxer);
                Util.browser.Ipad || btn.get(0).focus(),
                btn.click(function() {
                    Class.destroy(),
                    fun && $.isFunction(fun) && fun()
                }),
                fun && isclose && $("." + Class.skin + "-closed", Class.boxer).bind("click", function() {
                    fun()
                })
            }
            ,
            this.init(),
            Util.browser.Ipad && this.boxer.css({
                left: "50%",
                top: "50%",
                "-webkit-transform": "translate(-50%,-50%)"
            }),
            this
        },
        confirm: function(content, fun, isclose) {
            this.title = "询问";
            var txt = content || "";
            return this.content = '<div class="' + this.skin + '-confirm"><div class="' + this.skin + '-txt">' + txt + "</div>" + '<div class="' + this.skin + '-btn">' + '<input type="button" value="" class="' + this.skin + '-sure" />' + '<input type="button" value="" class="' + this.skin + '-cancel" /></div>',
            this.onOpen = function(Class) {
                $("." + Class.skin + "-cancel", Class.boxer).click(function() {
                    Class.destroy(),
                    fun && $.isFunction(fun) && fun(!1)
                }),
                $("." + Class.skin + "-sure", Class.boxer).click(function() {
                    Class.destroy(),
                    fun && $.isFunction(fun) && fun(!0)
                }),
                fun && isclose && $("." + Class.skin + "-closed", Class.boxer).bind("click", function() {
                    fun(!1)
                })
            }
            ,
            this.init(),
            this
        },
        tip: function(content, Ele_contrast, options) {
            var _this = this;
            this.title = "",
            this.content = '<div class="' + this.skin + '-con">' + content + "</div>",
            this.lock = !1,
            this.drag = !1,
            this.fx = 3,
            this.timing = !0,
            this.emptySpace = 1,
            this.repairSpace = 0;
            var contrast = $(Ele_contrast)
              , top = contrast.offset().top
              , left = contrast.offset().left
              , width = contrast.width()
              , height = contrast.height();
            for (var name in options)
                this[name] = options[name];
            this.dom(),
            this.boxer.addClass(this.skin + "-tip");
            if (this.tipClose) {
                var _closed = $("." + this.skin + "-closed", this.boxer);
                _closed.addClass(this.skin + "-closed-on"),
                _closed.bind("click", function() {
                    _this.destroy()
                }).hover(function() {
                    $(this).addClass(_this.skin + "-closed-over")
                }, function() {
                    $(this).removeClass(_this.skin + "-closed-over")
                })
            }
            var w = this.boxer.width()
              , h = this.boxer.height()
              , arrowsPos = {
                top: 0,
                left: 0
            };
            return this.towards === "bottom" ? (this.top = top - h - this.emptySpace - 6 + this.repairSpace,
            arrowsPos = {
                top: h - this.emptySpace,
                left: width / 2
            },
            width <= w ? (this.left = left,
            left + w >= $(this.relPanel).width() && (this.left = left - w + width,
            arrowsPos.left = w - width / 2 - 8)) : (this.left = left + (width - w) / 2,
            arrowsPos.left = w / 2)) : this.towards === "top" ? (this.top = top + h + this.emptySpace + this.repairSpace,
            arrowsPos = {
                top: -6 + this.emptySpace,
                left: width / 2
            },
            width <= w ? (this.left = left,
            left + w >= $(this.relPanel).width() && (this.left = left - w + width,
            arrowsPos.left = w - width / 2 - 8)) : (this.left = left + (width - w) / 2,
            arrowsPos.left = w / 2)) : this.towards === "left" ? (this.top = top - h / 2 + height / 2,
            arrowsPos = {
                top: (h - 20) / 2,
                left: -5
            },
            this.left = left + this.emptySpace + width + 8 + this.repairSpace) : this.towards === "right" && (this.top = top - h / 2 + height / 2,
            arrowsPos = {
                top: (h - 20) / 2,
                left: w - 5
            },
            this.left = left - this.emptySpace - w - 8 - this.repairSpace),
            this.boxer.css({
                top: this.top,
                left: this.left
            }),
            this.boxer.append('<div class="' + this.skin + "-arrows " + this.skin + "-" + this.towards + '" style="left:' + arrowsPos.left + "px;top:" + arrowsPos.top + 'px;"></div>'),
            this.onOpen(this),
            this.setFx(),
            this.timing && (Util.browser.Ipad || this.setTiming(),
            this.openTiming()),
            this
        }
    },
    exports.dialog = function(options) {
        return new dialog(options)
    }
    ,
    exports.alert = function(msg, fn, isclose) {
        return (new dialog).alert(msg, fn, isclose)
    }
    ,
    exports.confirm = function(msg, fn, isclose) {
        return (new dialog).confirm(msg, fn, isclose)
    }
    ,
    exports.tip = function(content, Ele_contrast, options) {
        return (new dialog).tip(content, Ele_contrast, options)
    }
})
