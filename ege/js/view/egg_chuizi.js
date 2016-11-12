//(function (lib, img, cjs, ss, Egg) {
//    Egg.btn_bangdan = function (mode, startPosition, loop) {
//        this.initialize(mode, startPosition, loop, {});
//        var bangdan = new lib.zhangyubtnbangdan();
//        this.addChild(bangdan);
//    }
//    cjs.btn_bangdan(Egg.myroot, cjs.MovieClip);
//
//})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {});
(function (lib, img, cjs, ss, Egg) {
    Egg.btn_chuizi = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        this._init();
    }
    var _p = {
        _init: function () {
            this._initChild();
        },
        _initChild: function () {
            this.cz = new lib.zhangyubtnchuizi();
            this.addChild(this.cz);
            this.cz.parent = this;
//            this.cz.visible = false;
            new cjs.ButtonHelper(this.cz, 0, 1, 2, false, new lib.zhangyubtnchuizi(), 3);
        },
        // 更新锤子位置
        moveUpdate: function (x, y) {
//            if (!this.hide) {
            if (this._inbox(x, y, Egg.p_w, 240, Egg.p_x, Egg.p_y+100)) {
                this.setTransform(x - Egg.p_x - (50), y - Egg.p_y - (50))
                console.log(x - Egg.p_x - (50))
                if (!this.czIn) {
                    this.cz.visible = true;
                    this.cz.cursor = "none"
                }
                this.czIn = true;
            }
            else {
                this.cz.visible = false;
                this.czIn = false;
            }
//            }
        },
        _inbox: function (stageX, stageY, thisW, thisH, thisX, thisY) {
            var b = stageX > thisX && stageX < thisX + thisW && stageY > thisY && stageY < thisY + thisH
            console.log(b);
            return b
        },
        update: function () {

        }
    }
    var p = cjs.extend(Egg.btn_chuizi, cjs.MovieClip); // p 为propertype 
    $.extend(p, _p);
    Egg.getbtn_chuizi = function () {
        if (!Egg.singlton_btn_chuizin) {
            Egg.singlton_btn_chuizi = new Egg.btn_chuizi();
        }
        return  Egg.singlton_btn_chuizi;
    };
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})




