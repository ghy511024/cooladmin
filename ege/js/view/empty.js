(function (lib, img, cjs, ss, Egg) {
    Egg.XXX = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});
        this._init();
    }
    var _p = {
        _init: function () {
            this._initChild();
        },
        _initChild: function () {

        },
        update: function () {

        }
    }
    var p = cjs.extend(Egg.XXX, cjs.MovieClip); // p 为propertype 
    $.extend(p, _p);
    Egg.getXXX = function () {
        if (!Egg.singlton_XXX) {
            Egg.singlton_XXX = new Egg.XXX();
        }
        return  Egg.singlton_XXX;
    };
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Egg = Egg || {})

