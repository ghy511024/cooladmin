
//蛋容器
(function (lib, img, cjs, ss, Egg) {
    Egg.eggbox = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        this._init();
    };
    var _p = {
        _init: function () {
            this._layout();
            this._initChild();
            this._showEgg();
        },
        _layout: function () {
            this.width = 206;
            this.height = 206;
        },
        _initChild: function () {
            var eggbox = this.eggbox = [];
            this.eggbox.push(new lib.zhangyupicegg0());
            this.eggbox.push(new lib.zhangyupicegg1());
            this.eggbox.push(new lib.zhangyupicegg2());
            this.eggbox.push(new lib.zhangyupicegg3());
            this.eggbox.push(new lib.zhangyupicegg4());
            this.eggbox.push(new lib.zhangyupicegg5());
            this.eggbox.push(new lib.zhangyupicegg6());
            this.eggbox.push(new lib.zhangyupicegg7());
            this.eggbox.push(new lib.zhangyupicegg8());
            this.eggbox.push(new lib.zhangyupicegg9());
            for (var i = 0; i < this.eggbox.length; i++) {
                var egg = this.eggbox[i];
                egg.visible = false;
                this.addChild(egg)
            }
        },
        _showEgg: function () {
            var level = Egg.model.getClevel();
            this.eggbox[level].visible = true;
        },
        getEgg: function (level) {
            if (level > 9 && level < 0) {
                return null;
            }
            return this.eggbox[level];
        },
        getCurrentEgg: function () {

        }, showEgg: function (level) {
            for (var i = 0; i < this.eggbox.length; i++) {
                this.eggbox[i].visible = false;
            }
            this.eggbox[level].visible = true;
        }
    }
// 属性继承
    var p = cjs.extend(Egg.eggbox, cjs.MovieClip); // p 为propertype 
    $.extend(p, _p);
    Egg.getEggBox = function () {
        if (!Egg.singlton_Eggbox) {
            Egg.singlton_Eggbox = new Egg.eggbox();
        }
        return  Egg.singlton_Eggbox;
    }
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})