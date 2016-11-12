(function (lib, img, cjs, ss, Egg) {
    Egg.btn_lingqu = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        var lingqu = new lib.zhangyubtnlingqu();
        lingqu.stop();
        lingqu.x = 160;
        lingqu.y = 356;
        new cjs.ButtonHelper(lingqu, 0, 1, 2, false, new lib.zhangyubtnlingqu(), 3);
        this.addChild(lingqu);
        lingqu.addEventListener("click", function (evt) {
            if (Egg.getpanel_bord().visible) {
                return;
            }
            if (Egg.model.allReward > 0) {
                Egg.Core.getReward();
            }
            else {
                Egg.getRoot().showAlert("暂无可领取奖励，赶紧去砸蛋吧")
            }
        })
    }
    cjs.extend(Egg.btn_lingqu, cjs.MovieClip);
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})
