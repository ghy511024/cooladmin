// 榜单面板
(function (lib, img, cjs, ss, Egg) {
    Egg.panel_animate = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        this._init();

    }
    var _p = {
        _init: function () {
            this._initChild()
            this._layout()
        }
        , _initChild: function () {
            this.san = new lib.zhangyuansuccess();// 成功动画
            this.ean = new lib.zhangyuanfail();
            this.ban = new lib.zhangyuanbroken();

            this.san.visible = false;
            this.ean.visible = false;
            this.ban.visible = false;
            this.addChild(this.san);
            this.addChild(this.ean);
            this.addChild(this.ban);
        },
        _layout: function () {
            this.width = 206;
            this.height = 206;
            this.san.x = 12;
            this.san.y = 25;
            this.ean.x = 26;
            this.ean.y = 14;
            this.ban.x = 26;
            this.ban.y = 14;
        },
        showSuccess: function () {
            this.san.gotoAndPlay(0);
            this.san.visible = true;
            this.ean.visible = false;
            this.ban.visible = false;
            this.ean.stop();
            this.ban.stop();

        }, showFail: function () {
            this.san.visible = false;
            this.ean.visible = true;
            this.ban.visible = false;
            this.san.stop();
            this.ean.gotoAndPlay(0);
            this.ban.stop();
        }, showBroken: function () {
            this.san.visible = false;
            this.ean.visible = false;
            this.ban.visible = true;
            this.san.stop();
            this.ean.stop();
            this.ban.gotoAndPlay(0);
        }, hideAll: function () {
            this.san.visible = false;
            this.ean.visible = false;
            this.ban.visible = false;
            this.san.stop();
            this.ean.stop();
            this.ban.stop();
        }, _change: function (type) {

        }
    }
    var p = cjs.extend(Egg.panel_animate, cjs.MovieClip);// p 为propertype 
    $.extend(p, _p);
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})