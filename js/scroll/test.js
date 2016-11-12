define(function (require, exports, module) {
    var $ = require("JQ")
            , drag = require("ui/drag/drag")
            , _default = {
                Ele_panel: null,
                Ele_scroll: null,
                fixedHeight: 0,
                height: "auto",
                width: "auto",
                rollerX: !1,
                rollerY: !0,
                flow: !1,
                minHeight: 15,
                minWidth: 15,
                skin: "dds-scroll",
                onScroll: function (type, positionPercent) {
                }
            };
    function Scroll(options) {
        var setting = $.extend({}, _default, options);
        for (var name in setting)
            this[name] = setting[name];
        return this.scrollCbTimer = null,
                this
    }
    Scroll.prototype = {
        init: function () {
            this.Ele_panel = $(this.Ele_panel),
                    this.panel_parent = this.Ele_panel.parent(),
                    this.Ele_scroll = $(this.Ele_scroll),
                    this.rollerY ? (this.height = this.height == "auto" ? this.panel_parent.height() : this.height,
                            this.setHeight(this.height)) : this.rollerX && (this.width = this.width == "auto" ? this.panel_parent.width() : this.width,
                    this.setWidth(this.width)),
                    this.flow && this.Ele_scroll.hide(),
                    this.dom()
        },
        setHeight: function (h) {
            this.height = h,
                    this.panel_parent.css({
                        height: this.height
                    }),
                    this.Ele_scroll.css({
                        height: this.height
                    }),
                    this.scrollPanel && (this.scrollPanel.css({
                        height: this.height
                    }),
                            this.drag.mxbottom = this.height,
                            this.resetH())
        },
        setWidth: function (w) {
            this.width = w,
                    this.panel_parent.css({
                        width: this.width
                    }),
                    this.Ele_scroll.css({
                        width: this.width
                    }),
                    this.scrollPanel && (this.scrollPanel.css({
                        width: this.width
                    }),
                            this.drag.mxright = this.width,
                            this.resetW())
        },
        dom: function () {
            this.scrollPanel = $('<div class="' + this.skin + '-panel"><div class="top-bg"></div><div class="bottom-bg"></div></div>'),
                    this.scrollPanel.css({
                        height: this.height
                    }),
                    this.slider = $('<div class="' + this.skin + '-slider"><div class="top-bg"></div><div class="bottom-bg"></div></div>'),
                    this.scrollPanel.append(this.slider),
                    this.Ele_scroll.append(this.scrollPanel),
                    this.rollerY ? this.resetH() : this.rollerX && (this.scrollPanel.addClass(this.skin + "-panel-x"),
                    this.resetW()),
                    this.addEvent()
        },
        clearScreen: function () {
            this.rollerY ? (this.resetH(),
                    this.slider.css({
                        top: 0
                    }),
                    this.panel_parent.scrollTop(0)) : this.rollerX && (this.resetW(),
                    this.slider.css({
                        left: 0
                    }),
                    this.panel_parent.scrollLeft(0))
        },
        addEvent: function () {
            var _this = this;
            this.slider.hover(function () {
                $(this).addClass(_this.skin + "-over")
            }, function () {
                $(this).removeClass(_this.skin + "-over")
            }),
                    this.scrollPanel.bind("click", function (e) {
                        if (_this.slider.css("display") != "none") {
                            var source = e.srcElement || e.target;
                            if (source.className != _this.skin + "-panel")
                                return;
                            if (_this.rollerY) {
                                var _y = e.pageY - _this.scrollPanel.offset().top
                                        , _top = _this.slider.position().top;
                                _y >= _top ? _this.slider.css({
                                    top: _y - _this.slider.height()
                                }) : _this.slider.css({
                                    top: _y
                                })
                            } else if (this.rollerX) {
                                var _x = e.pageX - _this.scrollPanel.offset().left
                                        , _left = _this.slider.position().left;
                                _x >= _left ? _this.slider.css({
                                    left: _x - _this.slider.width()
                                }) : _this.slider.css({
                                    left: _x
                                })
                            }
                            _this.scrollTxt()
                        }
                    });
            var options = {};
            this.rollerY ? _options = {
                lockX: !0,
                limit: !0,
                mxbottom: this.height,
                onMove: function () {
                    _this.scrollTxt()
                }
            } : this.rollerX && (_options = {
                lockY: !0,
                limit: !0,
                mxright: this.width,
                onMove: function () {
                    _this.scrollTxt()
                }
            }),
                    this.drag = drag.drag(this.slider, _options),
                    this.drag.init();
            var isFF = navigator.userAgent.indexOf("Firefox") >= 0 ? !0 : !1;
            isFF ? this.Ele_panel[0].addEventListener("DOMMouseScroll", function (e) {
                e.preventDefault();
                var delta = -e.detail / 3;
                delta && (_this.rollerY ? _this.panel_parent[0].scrollTop -= delta * 20 : _this.rollerX && (_this.panel_parent[0].scrollLeft -= delta * 20),
                        _this.setScrollPos())
            }, !1) : this.Ele_panel[0].onmousewheel = function (e) {
                var e = e ? e : window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                var delta = e.wheelDelta ? e.wheelDelta / 120 : -e.detail / 3;
                delta && (_this.rollerY ? _this.panel_parent[0].scrollTop -= delta * 20 : _this.panel_parent[0].scrollLeft -= delta * 20,
                        _this.setScrollPos())
            }
        },
        setScrollPos: function () {
            if (this.rollerY) {
                var H = this.Ele_panel.height()
                        , _h = this.panel_parent[0].scrollTop
                        , _top = _h * this.height / H;
                _h >= H - this.height && (_top = this.height - this.slider.height()),
                        this.slider.css({
                            top: _top
                        }),
                        this.onScrollCb("y", _h / (H - this.height))
            } else if (this.rollerX) {
                var W = this.Ele_panel.width()
                        , _w = this.panel_parent[0].scrollLeft
                        , _left = _w * this.width / W;
                _w >= W - this.width && (_left = this.width - this.slider.width()),
                        this.slider.css({
                            left: _left
                        }),
                        this.onScrollCb("x", _w / (W - this.width))
            }
        },
        scrollTxt: function () {
            if (this.rollerY) {
                var _top = this.slider.position().top
                        , H = this.Ele_panel.height()
                        , _h = _top * H / this.height;
                _top <= 0 ? _h = 0 : _top >= this.height - this.slider.height() && (_h = H - this.height),
                        this.panel_parent.scrollTop(_h),
                        this.onScrollCb("y", _h / (H - this.height))
            } else if (this.rollerX) {
                var _left = this.slider.position().left
                        , W = this.Ele_panel.width()
                        , _w = _left * W / this.width;
                _left <= 0 ? _w = 0 : _left >= this.width - this.slider.width() && (_w = W - this.width),
                        this.panel_parent.scrollLeft(_w),
                        this.onScrollCb("x", _w / (W - this.width))
            }
        },
        resetW: function () {
            var w = this.coutW();
            this.slider.css({
                width: w
            }),
                    w <= 0 || this.width < this.minWidth ? (this.slider.hide(),
                            this.scrollPanel.hide()) : (this.slider.show(),
                    this.scrollPanel.show()),
                    w + this.slider.position().left > this.width && this.toRight()
        },
        resetH: function () {
            var h = this.coutH();
            this.slider.css({
                height: h
            }),
                    h <= 0 || this.height < this.minHeight ? (this.slider.hide(),
                            this.scrollPanel.hide()) : (this.slider.show(),
                    this.scrollPanel.show()),
                    h + this.slider.position().top > this.height && this.toBottom()
        },
        toRight: function () {
            if (this.coutW() <= 0)
                return !1;
            this.slider.css({
                left: this.width - this.coutW()
            }),
                    this.panel_parent.scrollLeft(99999)
        },
        toLeft: function () {
            this.slider.css({
                left: 0
            }),
                    this.panel_parent.scrollTop(0)
        },
        toBottom: function () {
            if (this.coutH() <= 0)
                return !1;
            this.slider.css({
                top: this.height - this.coutH()
            }),
                    this.panel_parent.scrollTop(99999)
        },
        toTop: function () {
            this.slider.css({
                top: 0
            }),
                    this.panel_parent.scrollTop(0)
        },
        coutW: function () {
            var W = this.Ele_panel.width();
            return W <= this.width ? 0 : this.width * this.width / W
        },
        coutH: function () {
            var H = this.Ele_panel.height();
            return H == 0 && this.fixedHeight != 0 && (H = this.fixedHeight),
                    H <= this.height ? 0 : this.height * this.height / H
        },
        onScrollCb: function (type, percent) {
            this.scrollCbTimer && (clearTimeout(this.scrollCbTimer),
                    this.scrollCbTimer = null);
            var _this = this;
            this.scrollCbTimer = setTimeout(function () {
                _this.onScroll.call(_this, type, percent),
                        _this.scrollCbTimer = null
            }, 200)
        }
    },
    exports.scroll = function (options) {
        return new Scroll(options)
    }
})
