(function (lib, img, cjs, ss, Egg) {
    Egg.panel_toptip = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        this.width = 280;
        this.height = 60;
        this._init();

    }
    var _p = {
        _init: function () {
            this._initChild();
            this.showReward();
            this.update();
        },
        _initChild: function () {
            this.bk = new lib.zhangyupicblack();
            this.text1 = new cjs.Text("本次砸蛋消耗", "12px Microsoft Yahei", "#d8dbdc");
            this.text2 = new cjs.Text("", "12px Microsoft Yahei", "#ffb924");
            this.text3 = new cjs.Text("章鱼币，概率为", "12px Microsoft Yahei", "#d8dbdc");
            this.text4 = new cjs.Text("", "12px Microsoft Yahei", "#ffb924");
            this.text1.x = 27;
            this.text2.x = this.text1.x + 90;
            this.text3.x = this.text2.x + 20;//20
            this.text4.x = this.text3.x + 90;//90
            this.text1.y = this.text2.y = this.text3.y = this.text4.y = 20;
            this.text2.textAlign = "center";
            this.addChild(this.bk);
            this.addChild(this.text1);
            this.addChild(this.text2);
            this.addChild(this.text3);
            this.addChild(this.text4);
//            =====================奖励文字===================
            this.text5 = new cjs.Text("收获可得", "12px Microsoft Yahei", "#d8dbdc");
            this.text6 = new cjs.Text("", "12px Microsoft Yahei", "#ffb924");
            this.text7 = new cjs.Text("，下级奖励", "12px Microsoft Yahei", "#d8dbdc");
            this.text8 = new cjs.Text("", "12px Microsoft Yahei", "#ffb924");
            this.text5.x = 50;
            this.text6.x = this.text5.x + 70;
            this.text7.x = this.text6.x + 18;// 收获数字宽度 最大值 999999
            this.text8.x = this.text7.x + 68;
            this.text5.y = this.text6.y = this.text7.y = this.text8.y = 20;
            this.text6.textAlign = "center";
            this.addChild(this.bk);
            this.addChild(this.text1);
            this.addChild(this.text2);
            this.addChild(this.text3);
            this.addChild(this.text4);
            this.addChild(this.text5);
            this.addChild(this.text6);
            this.addChild(this.text7);
            this.addChild(this.text8);
        },
        // 显示消耗
        showReward: function () {
            this.text1.visible = this.text2.visible = this.text3.visible = this.text4.visible = false;
            this.text5.visible = this.text6.visible = this.text7.visible = this.text8.visible = true;

        },
        // 显示消耗情况
        showUse: function () {
            this.text1.visible = this.text2.visible = this.text3.visible = this.text4.visible = true;
            this.text5.visible = this.text6.visible = this.text7.visible = this.text8.visible = false;
        },
        // 更新数据
        update: function () {
            this.text2.text = Egg.model.cost;// 消耗
            this.text4.text = Egg.model.chances + "%"//概率
            this.text6.text = Egg.model.allReward;// 总的收获
            this.text8.text = Egg.model.nextReward;//下一级收获
        }
    }
    var p = cjs.extend(Egg.panel_toptip, cjs.MovieClip); // p 为propertype 
    $.extend(p, _p);
    Egg.getpanel_toptip = function () {
        if (!Egg.singlton_panel_toptip) {
            Egg.singlton_panel_toptip = new Egg.panel_toptip();
        }
        return  Egg.singlton_panel_toptip;
    };
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})

