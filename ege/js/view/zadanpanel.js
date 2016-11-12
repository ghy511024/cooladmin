
(function (lib, img, cjs, ss, Egg) {
    Egg.p_w = 280;
    Egg.p_h = 440;
    Egg.p_x = 100;
    Egg.p_y = 30;

    Egg.font = "";
    Egg.myroot = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        this._init();
    };
    var _p = {
        _init: function () {
            this._layout();
            this._initChild();
            this._initEvent();
        },
        _layout: function () {
            this.width = Egg.p_w;
            this.height = Egg.p_h;
            this.x = Egg.p_x;
            this.y = Egg.p_y;
        },
        _initChild: function () {
            Egg.Full("rgba(0,0,0,0.5)", this)
            this.eggbox = Egg.getEggBox();
            this.eggbox.x = (this.width - this.eggbox.width) / 2;
            this.eggbox.y = 100;
            console.log(this.getBounds())
            this.cz = new lib.zhangyubtnchuizi();
            this.cz.parent = this;
            this.cz.visible = false;
            new cjs.ButtonHelper(this.cz, 0, 1, 2, false, new lib.zhangyubtnchuizi(), 3);
            this.an = new Egg.panel_animate(null, 0, true);

            this.an.x = (this.width - this.an.width) / 2;
            this.an.y = 100;
//            Egg.Full("rgba(0,0,0,0.1)", this.an)
            // 榜单
            this.bangdan = new Egg.btn_bangdan();
            //领取
            this.lingqu = new Egg.btn_lingqu();
            // 榜单面板
            this.panel_bangdan = Egg.getpanel_bangdan();
            // 倒计时
            this.time_count = Egg.getPanel_count(5);
            this.time_count.x = (this.width - this.time_count.width) / 2
            this.time_count.y = 320;
// 提示面板
            this.panel_bord = Egg.getpanel_bord();

            // 顶部提示面板
            this.toptip = Egg.getpanel_toptip();
            this.addChild(this.toptip);
            this.addChild(this.eggbox);
            this.addChild(this.an);
            this.addChild(this.time_count);
            this.addChild(this.cz);
            this.addChild(this.bangdan);
            this.addChild(this.lingqu);
            this.addChild(this.panel_bangdan);
            this.addChild(this.panel_bord);
        },
        _initEvent: function () {
            EEVT.addEventListener("eggsuccess_end", function () {
                Egg.getRoot().endSuccess();
            })
            EEVT.addEventListener("eggfail_end", function () {
                Egg.getRoot().endFail();
            })
            EEVT.addEventListener("eggbroken_end", function () {
                Egg.getRoot().endBroken();
            })
            this.cz.addEventListener("click", function (evt) {
                if (!Egg.Core.lock) {
                    Egg.Core.lucky();// 启动砸蛋逻辑
                    Egg.Core.lock = true;
                }
            })
        },
        movechuizi: function (x, y) {
            if (!!this.panel_bangdan.visible || !!this.panel_bord.visible) {
                return;
            }
            if (this.isInbox(x, y, this.width, this.height, this.x, this.y)) {
                this.cz.setTransform(x - this.x - (50), y - this.y - (50))
                if (!this.czIn) {
                    this.cz.visible = true;
                    this.cz.cursor = "none"
                    this.toptip.showUse();
                }
                this.czIn = true;
            } else {
                this.cz.visible = false;
                this.czIn = false;
                this.toptip.showReward();
            }
        },
        // 判断是否在root 范围内
        isInbox: function (stageX, stageY, thisW, thisH, thisX, thisY) {
            thisH = thisH - 220;
            thisY = thisY + 100;
            var b = stageX > thisX && stageX < thisX + thisW && stageY > thisY && stageY < thisY + thisH
            return b
        },
        showSuccess: function () {
            this.an.showSuccess();
        },
        endSuccess: function () {
            this.an.hideAll();
            var clevel = Egg.model.getClevel()
            this.eggbox.showEgg(clevel);
            Egg.Core.lock = false;
        }, showFail: function () {
            this.an.showFail();
        }, endFail: function () {
            this.an.hideAll();
            var clevel = Egg.model.getClevel()
            this.eggbox.showEgg(clevel);
            Egg.Core.lock = false;
        },
        showBroken: function () {
            this.an.showBroken();
        },
        // 砸破动画结束
        endBroken: function () {
            this.an.hideAll();
            var clevel = Egg.model.getClevel()
            this.eggbox.showEgg(clevel);
            Egg.Core.lock = false;
        },
        // 显示榜单
        showBandan: function (obj) {
            var array = [];
            for (var i = 0; i < 5; i++) {
                var obj = {rank: i, name: "name" + i, egg: i + "级蛋"};
                array.push(obj);
            }
            this.panel_bangdan.update(array);
            this.panel_bangdan.visible = true;
            this.hidecz = true;
        },
        // 隐藏榜单
        hideBandan: function () {
            this.panel_bangdan.visible = false;
            this.hidecz = false;
        },
        // 显示全局提示
        showAlert: function (text) {
            this.hidecz = true;
            this.panel_bord.visible = true;
            Egg.getpanel_bord().update(text)
        }
    }

    // 属性继承
    var p = cjs.extend(Egg.myroot, cjs.MovieClip);// p 为propertype 
    $.extend(p, _p);
    Egg.getRoot = function () {
        if (!Egg.singlton_root) {
            Egg.singlton_root = new Egg.myroot();
        }
        return  Egg.singlton_root;
    }
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})

