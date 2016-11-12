(function (lib, img, cjs, ss, Egg) {
    Egg.panel_bord = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});


        this._init();
    }
    var _p = {
        _init: function () {
            this._layout();
            this._initChild();
            this._initEvent();
        },
        _layout: function () {
            this.width = 243;
            this.height = 120;
            this.x = (Egg.p_w - this.width) / 2
            this.y = (Egg.p_h - this.height) / 2
            this.visible = false;
        },
        _initChild: function () {
            var bord = new lib.zhangyupicboard();

            this.text1 = new cjs.Text("", "12px Microsoft Yahei", "#444444");
            this.text1.x = 121;
            this.text1.y = 52;
            this.text1.textAlign = "center";
            this.close = new lib.zhangyubtnclose();
            this.close.x = this.width - 20;
            this.close.y = 10;
            this.addChild(bord);
            this.addChild(this.text1)
            this.addChild(this.close);
            new cjs.ButtonHelper(this.close, 0, 1, 2, false, new lib.zhangyubtnclose(), 3);
        },
        _initEvent: function () {
            this.close.addEventListener("click", function (evt) {
                Egg.getpanel_bord().visible = false;
                Egg.getRoot().hidecz = false;
            })
        },
        update: function (text) {
            this.text1.text = text;
        }
    }
    var p = cjs.extend(Egg.panel_bord, cjs.MovieClip); // p 为propertype 
    $.extend(p, _p);
    Egg.getpanel_bord = function () {
        if (!Egg.singlton_panel_bord) {
            Egg.singlton_panel_bord = new Egg.panel_bord();
        }
        return  Egg.singlton_panel_bord;
    };
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})

