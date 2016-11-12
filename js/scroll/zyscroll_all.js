
/* 
 *鼠标滚动事件
 */
(function (a) {
    function d(b) {
        var c = b || window.event, d = [].slice.call(arguments, 1), e = 0, f = !0, g = 0, h = 0;
        return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), h = e, c.axis !== undefined && c.axis === c.HORIZONTAL_AXIS && (h = 0, g = -1 * e), c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120), c.wheelDeltaX !== undefined && (g = -1 * c.wheelDeltaX / 120), d.unshift(b, e, g, h), (a.event.dispatch || a.event.handle).apply(this, d)
    }
    var b = ["DOMMouseScroll", "mousewheel"];
    if (a.event.fixHooks)
        for (var c = b.length; c; )
            a.event.fixHooks[b[--c]] = a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener)
                for (var a = b.length; a; )
                    this.addEventListener(b[--a], d, !1);
            else
                this.onmousewheel = d
        },
        teardown: function () {
            if (this.removeEventListener)
                for (var a = b.length; a; )
                    this.removeEventListener(b[--a], d, !1);
            else
                this.onmousewheel = null
        }
    }, a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a)
        }
    })
})(jQuery);

/*
 * 拖动插件
 * 测试版本0.1
 * **/
window.drag = (function () {
    var _default = {
        handle: "",
        limit: !1,
        mxleft: 0,
        mxright: 9999,
        mxtop: 0,
        mxbottom: 9999,
        lock: !1,
        lockX: !1,
        lockY: !1,
        contrainer: null,
        onStart: function () {
        },
        onMove: function () {
        },
        onStop: function () {
        }
    };
    var drag = function (drag, options) {
        var setting = $.extend({}, _default, options);
        for (var name in setting)
            this[name] = setting[name];
        this.drag = $(drag)
    };
    drag.prototype = {
        init: function () {
            $(this.handle)[0] ? this.handle = $(this.handle) : this.handle = this.drag,
                    this._x = this._y = 0,
                    this.drag.css("position") != "fixed" && this.drag.css("position", "absolute"),
                    this.contrainer != null && (this.contrainer = $(this.contrainer)),
                    this.FM = this.inhertEvent(this, this.Move),
                    this.FS = this.inhert(this, this.Stop),
                    this.handle.bind("mousedown", this.inhertEvent(this, this.Start))
        },
        Start: function (oEvent) {
            if (this.lock)
                return;
            this._x = oEvent.clientX - this.drag.position().left,
                    this._y = oEvent.clientY - this.drag.position().top,
                    $(document).bind("mousemove", this.FM),
                    $(document).bind("mouseup", this.FS),
                    this.handle[0].losecapture ? (this.handle.bind("losecapture", this.FS),
                    this.handle[0].setCapture()) : ($(window).bind("blur", this.FS),
                    oEvent.preventDefault()),
                    this.onStart()
        },
        Move: function (oEvent) {
            if (this.lock) {
                this.Stop();
                return
            }
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            var vLeft = oEvent.clientX - this._x
                    , vTop = oEvent.clientY - this._y;
            this.limit && (vLeft = Math.max(Math.min(vLeft, this.mxright - this.drag.width()), this.mxleft),
                    vTop = Math.max(Math.min(vTop, this.mxbottom - this.drag.height()), this.mxtop)),
                    this.lockX || this.drag.css({
                        left: vLeft
                    }),
                    this.lockY || this.drag.css({
                        top: vTop
                    }),
                    this.onMove()
        },
        Stop: function (oEvent) {
            $(document).unbind("mousemove", this.FM),
                    $(document).unbind("mouseup", this.FS),
                    this.handle[0].losecapture ? (this.handle.unbind("losecapture", this.FS),
                    this.handle[0].releaseCapture()) : $(window).unbind("blur", this.FS),
                    this.onStop()
        },
        inhertEvent: function (object, fun) {
            return function (event) {
                return fun.call(object, event || window.event)
            }
        },
        inhert: function (object, fun) {
            return function () {
                return fun.apply(object, arguments)
            }
        }
    }
    return function (el, options) {
        return new drag(el, options)
    }
})()

/*
 * 滚动插件
 * @依赖 mousewheel 插件，drag 插件
 * @desc 单独使用时，将拖动插件集成进来。在zyuser 项目中，drag,与mousewheel，会集成到zylib 底层类库中
 * **/
window.ZYSC = (function () {
    var Scroll = function (el) {
        this.el = $(el);
    }
    Scroll.prototype = {
        init: function () {
            this._inintEvent();
            this._wrapDom();
            this._layout();
        },
        callback: function () {
        },
        // 包装dom
        _wrapDom: function () {
            var zyscwrap = $("<div class='zyscwrap'></div>");
            var scbar = $('<div class="scbar"><div class="scpanel"><div class="sc-bar"></div></div></div>');
            this.el.wrap(zyscwrap);
            this.el.parent().append(scbar);
            this.elc = this.el.find(".sc_content");
            this.elp = this.el.parent();
            this.bar = this.el.parent().find(".sc-bar");
        },
        // 计算容器高度
        _layout: function () {
            var ph = this.el.height();
            var pw = this.el.width();
            this.elp.css({height: ph, width: pw});
            this.update();
            var _options = {
                lockX: !0,
                limit: !0,
                mxbottom: ph,
                onMove: $.proxy(function () {
                    this._scrollByBar()
                }, this)
            }
            var dg = drag(this.bar, _options)
            dg.init();
        },
        //test
        _inintEvent: function () {
            this.el.mousewheel($.proxy(function (event, delta, deltaX, deltaY) {
                var e = e ? e : window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                this.el[0].scrollTop -= delta * 20
                this._setBarPosition();
                if (typeof this.callback == 'function') {
                    this.callback(this.el[0].scrollTop, this.el.height(), this.elc.height());
                }
            }, this))
        },
        _setBarPosition: function () {
            var all_h = this.elc.height();
            var c_h = this.el.height();
            var s_t = this.el[0].scrollTop;
            var top = s_t * (c_h - this.barh) / (all_h - c_h);
            this.bar.css({top: top})
        },
        _scrollByBar: function () {
            var all_h = this.elc.height();
            var c_h = this.el.height();
            var top = this.bar.position().top
            var s_t = top / ((c_h - this.barh) / (all_h - c_h));
            this.el.scrollTop(s_t);
        },
        // 更新容器
        update: function () {
            var h = this._coutBar();
            this.bar.css({height: h});
            this.barh = h;
            this._setBarPosition();
            if (typeof this.callback == 'function') {
                this.callback(this.el[0].scrollTop, this.el.height(), this.elc.height());
            }
        },
        // 自定义滚动
        scrollTo: function (type) {
            if (type == "top") {
                this.el.scrollTop(0);
                this.bar.css({top: 0})
            }
            else if (type == "bottom") {
                this.el.scrollTop(99999);
                if (this.barh > 0) {
                    this.bar.css({top: this.el.height() - this.barh})
                }
            }
            else if (typeof type == "number") {
                this.el.scrollTop(type);
                var top = type * (this.el.height() - this.barh) / (this.elc.height() - this.el.height());
                this.bar.css({top: top})
            }
        },
        //计算bar 高度
        _coutBar: function () {
            var ph = this.el.height();
            var ch = this.elc.height();
            ch == 0 && ph != 0 && (ch = ph);
            var ret = ch <= ph ? 0 : ph * ph / ch;
            return ret <= 20 ? 20 : ret;
        }
    }
    return function (el) {
        return new Scroll(el);
    };
})();


