(function (lib, img, cjs, ss, Egg) {
    Egg.btn_bangdan = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        var btn = new lib.zhangyubtnbangdan();
        btn.stop();
        btn.x = 50;
        btn.y = 356;
        new cjs.ButtonHelper(btn, 0, 1, 2, false, new lib.zhangyubtnbangdan(), 3);
        this.addChild(btn);
        btn.addEventListener("click", function (evt) {
//              Egg.getRoot().showAlert();
            if (!Egg.getRoot().panel_bangdan.visible) {
                Egg.getRoot().showBandan();
            } else {
                Egg.getRoot().hideBandan();
            }
        })
    }
    cjs.extend(Egg.btn_bangdan, cjs.MovieClip);
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {});

// 榜单面板
(function (lib, img, cjs, ss, Egg) {
    Egg.panel_bangdan = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        var bangdan = new lib.zhangyupicpaihang();
        this.addChild(bangdan);
        this._init();
    }
    var _p = {
        _init: function () {
            this._layout();
            this._initChild();
            this._initEvent();
        }, _initChild: function () {
            var top = 105;
            this.array = [];
            for (var i = 0; i < 5; i++) {
                this.array.push(new Egg.panel_bangdan_text(i + 1));
                this.array[i].y = top + 34 * i;
                this.addChild(this.array[i]);
            }
            this.close = new lib.zhangyubtnclose();
            this.close.x = this.width - 20;
            this.close.y = 10;
            this.addChild(this.close);
            new cjs.ButtonHelper(this.close, 0, 1, 2, false, new lib.zhangyubtnclose(), 3);
        }, _layout: function () {
            this.width = 281;
            this.height = 291;
            this.y = 52;
            this.x = -1;
            this.visible = false;
        },
        _initEvent: function () {
            this.close.addEventListener("click", function (evt) {
                Egg.getpanel_bangdan().visible = false;
            })
        },
        // 更新榜单数据
        update: function (array) {
            for (var i = 0; i < array.length; i++) {
                var rank = array[i]["rank"];
                var name = array[i]["name"];
                var egg = array[i]["egg"];
                if (i < 5) {
                    this.array[i].update(rank, name, egg);
                }
            }
        }
    }
    // 属性继承
    var p = cjs.extend(Egg.panel_bangdan, cjs.MovieClip); // p 为propertype 
    $.extend(p, _p);
    Egg.getpanel_bangdan = function () {
        if (!Egg.singlton_panel_bangdan) {
            Egg.singlton_panel_bangdan = new Egg.panel_bangdan();
        }
        return  Egg.singlton_panel_bangdan;
    };
    //===================================================================================
    // 单条文字
    Egg.panel_bangdan_text = function (rank, name, egg) {
        this.initialize(null, 0, true, {});
        this._init(rank, name, egg);
    };
    var _p2 = {
        _init: function (rank, name, egg) {
            this._initChild(rank);
            this.update(rank || "", name || "", egg || "");
        },
        _initChild: function (rank) {
            var color1 = "#404345";
            if (rank == 1) {
                color1 = "#ffb924";
            } else if (rank == 2) {
                color1 = "#a1b1c2";
            } else if (rank == 3) {
                color1 = "#cc673a";
            }
            this.text1 = new cjs.Text("", "14px Microsoft Yahei", color1);
            this.text1.textAlign = "left"
            this.text2 = new cjs.Text("", "14px Microsoft Yahei", color1);
            this.text2.textAlign = "left"
            this.text3 = new cjs.Text("", "14px Microsoft Yahei", "#949697");
            this.text3.textAlign = "left"

            this.text1.x = 20;
            this.text2.x = 70;
            this.text3.x = 225;
            this.addChild(this.text1);
            this.addChild(this.text2);
            this.addChild(this.text3);
        },
        update: function (rank, name, egg) {
            var str = this._cutstr(name, 18)["ret"]
            this.text1.text = "NO." + rank;
            this.text2.text = str;
            this.text3.text = egg;
        }, _cutstr: function (str, len) {
            var retobj = {cut: false, ret: str};
            if (str == null || str.length == 0) {
                return retobj;
            }
            var str_length = 0;
            var str_len = 0;
            var str_cut = new String();
            str_len = str.length;
            var a;
            for (var i = 0; i < str_len; i++)
            {
                a = str.charAt(i);
                str_length++;
                if (escape(a).length > 4)
                {
                    str_length++;
                }
                if (str_length <= len)
                {
                    str_cut = str_cut.concat(a);
                }
                else {
                    str_cut = str_cut.concat("");
                    retobj["cut"] = true;
                    retobj["ret"] = str_cut;
                }
            }
            retobj["len"] = str_length;
            return retobj;
        }
    }
    var p2 = cjs.extend(Egg.panel_bangdan_text, cjs.MovieClip);  // p 为propertype 
    $.extend(p2, _p2);
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})