/* 
 * 倒计时面板
 */


(function (lib, img, cjs, ss, Egg) {
    Egg.panel_count = function (time, mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        this.width = 100;
        this.height = 20;
        this._init();
//        Egg.Full("rgba(0,0,0,0.1)", this)
    };
    var _p = {
        _init: function () {
            this._initChild();
            this._layout();
            this.start(function () {
                console.log("砸蛋倒计时结束");
            });
        },
        _layout: function () {
            this.interval = null;
        },
        _initChild: function () {
            var str = this._getTimeStr(Egg.model.time);
            this.text = new cjs.Text(str, "14px Microsoft Yahei", "#ffe57c");
            this.text.width = 100;
            this.text.height = 20;
            this.text.textAlign = "left"
            this.addChild(this.text);
        },
        // 开始倒计时
        start: function (fn) {
            console.log("开始砸蛋倒计时，当前剩余时间", Egg.model.time)
            if (!this.interval) {
                this.interval = setInterval(function () {
                    var time = Egg.model.time;
                    if (time > 0) {
                        time--;
                        var str = Egg.getPanel_count()._getTimeStr(time);
                        Egg.getPanel_count().text.text = str;
                        Egg.model.time = time;
                    }
                    else {
                        if (typeof fn == "function") {
                            Egg.getPanel_count().end();
                            fn();
                        }
                    }

                }, 1000)
            }
        },
        _getTimeStr: function (time) {
            var ret = "倒计时：";
            var h = time / 3600 | 0;
            var m = (time / 60 | 0) % 60;
            var s = time % 60;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;
            if (h > 0) {
                ret += h + ":" + m + ":" + s
            }
            else {
                ret += m + ":" + s
            }
            return ret;
        },
        end: function () {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    // 属性继承
    var p = cjs.extend(Egg.panel_count, cjs.MovieClip); // p 为propertype 
    $.extend(p, _p);
    Egg.getPanel_count = function (time) {
        if (!Egg.singlton_panel_count) {
            Egg.singlton_panel_count = new Egg.panel_count(time);
        }
        return  Egg.singlton_panel_count;
    }
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {});
