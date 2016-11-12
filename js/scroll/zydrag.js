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