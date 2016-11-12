(function (lib, img, cjs, ss) {

    var p; // shortcut to reference prototypes
    lib.webFontTxtInst = {};
    var loadedTypekitCount = 0;
    var loadedGoogleCount = 0;
    var gFontsUpdateCacheList = [];
    var tFontsUpdateCacheList = [];

// library properties:
    lib.properties = {
        width: 550,
        height: 400,
        fps: 24,
        color: "#FFFFFF",
        opacity: 1.00,
        webfonts: {},
        manifest: [
            {src: "images/eggobj_atlas_.png", id: "eggobj_atlas_"}
        ]
    };



    lib.ssMetadata = [
        {name: "eggobj_atlas_", frames: [[0, 302, 300, 300], [906, 823, 107, 36], [304, 1682, 160, 48], [906, 634, 110, 61], [791, 906, 150, 181], [304, 1437, 150, 181], [456, 1437, 150, 181], [608, 1455, 150, 181], [760, 1455, 150, 181], [152, 1565, 150, 181], [302, 302, 300, 300], [832, 1089, 150, 181], [302, 604, 300, 300], [302, 1199, 150, 181], [0, 604, 300, 300], [0, 1208, 150, 181], [604, 604, 300, 300], [454, 1254, 150, 181], [0, 906, 300, 300], [606, 1254, 150, 181], [0, 0, 300, 300], [758, 1272, 150, 181], [604, 302, 300, 300], [152, 1382, 150, 181], [302, 0, 300, 300], [906, 532, 100, 100], [0, 1391, 150, 181], [604, 0, 300, 300], [906, 697, 53, 124], [587, 1132, 243, 120], [454, 1199, 128, 39], [910, 1272, 64, 26], [304, 1382, 142, 28], [302, 906, 283, 291], [943, 965, 70, 24], [943, 1017, 70, 24], [943, 1043, 70, 24], [943, 991, 70, 24], [997, 378, 10, 10], [978, 381, 10, 10], [586, 1638, 280, 60], [906, 129, 110, 126], [906, 0, 118, 127], [906, 257, 118, 103], [868, 1638, 122, 99], [466, 1700, 160, 45], [587, 906, 202, 224], [997, 362, 13, 14], [978, 362, 17, 17], [0, 1574, 130, 170], [152, 1208, 130, 170], [906, 362, 70, 168], [943, 913, 71, 24], [906, 861, 71, 24], [943, 887, 71, 24], [943, 939, 71, 24], [1012, 374, 10, 10], [304, 1620, 280, 60], [1012, 362, 10, 10]]}
    ];



    lib.updateListCache = function (cacheList) {
        for (var i = 0; i < cacheList.length; i++) {
            if (cacheList[i].cacheCanvas)
                cacheList[i].updateCache();
        }
    };

    lib.addElementsToCache = function (textInst, cacheList) {
        var cur = textInst;
        while (cur != exportRoot) {
            if (cacheList.indexOf(cur) != -1)
                break;
            cur = cur.parent;
        }
        if (cur != exportRoot) {	//we have found an element in the list		
            var cur2 = textInst;
            var index = cacheList.indexOf(cur);
            while (cur2 != cur) { //insert all it's children just before it		
                cacheList.splice(index, 0, cur2);
                cur2 = cur2.parent;
                index++;
            }
        }
        else {	//append element and it's parents in the array		
            cur = textInst;
            while (cur != exportRoot) {
                cacheList.push(cur);
                cur = cur.parent;
            }
        }
    };

    lib.gfontAvailable = function (family, totalGoogleCount) {
        lib.properties.webfonts[family] = true;
        var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];
        for (var f = 0; f < txtInst.length; ++f)
            lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);

        loadedGoogleCount++;
        if (loadedGoogleCount == totalGoogleCount) {
            lib.updateListCache(gFontsUpdateCacheList);
        }
    };

    lib.tfontAvailable = function (family, totalTypekitCount) {
        lib.properties.webfonts[family] = true;
        var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];
        for (var f = 0; f < txtInst.length; ++f)
            lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);

        loadedTypekitCount++;
        if (loadedTypekitCount == totalTypekitCount) {
            lib.updateListCache(tFontsUpdateCacheList);
        }
    };
// symbols:



    (lib.开始 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.成功文字 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.鸡蛋凿坏了字 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.失败字 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib._11 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib._10 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib._11_1 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib._12 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib._13 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();



    (lib._14 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(9);
    }).prototype = p = new cjs.Sprite();



    (lib._1级 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(10);
    }).prototype = p = new cjs.Sprite();



    (lib._2 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(11);
    }).prototype = p = new cjs.Sprite();



    (lib._2级蛋 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(12);
    }).prototype = p = new cjs.Sprite();



    (lib._3 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(13);
    }).prototype = p = new cjs.Sprite();



    (lib._3级 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(14);
    }).prototype = p = new cjs.Sprite();



    (lib._4 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(15);
    }).prototype = p = new cjs.Sprite();



    (lib._4级 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(16);
    }).prototype = p = new cjs.Sprite();



    (lib._5 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(17);
    }).prototype = p = new cjs.Sprite();



    (lib._5级 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(18);
    }).prototype = p = new cjs.Sprite();



    (lib._6 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(19);
    }).prototype = p = new cjs.Sprite();



    (lib._6级 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(20);
    }).prototype = p = new cjs.Sprite();



    (lib._7 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(21);
    }).prototype = p = new cjs.Sprite();



    (lib._7级 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(22);
    }).prototype = p = new cjs.Sprite();



    (lib._8 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(23);
    }).prototype = p = new cjs.Sprite();



    (lib._8级 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(24);
    }).prototype = p = new cjs.Sprite();



    (lib.砸蛋锤子png复制 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(25);
    }).prototype = p = new cjs.Sprite();



    (lib._9 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(26);
    }).prototype = p = new cjs.Sprite();



    (lib._9级蛋 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(27);
    }).prototype = p = new cjs.Sprite();



    (lib.background = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(28);
    }).prototype = p = new cjs.Sprite();



    (lib.board = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(29);
    }).prototype = p = new cjs.Sprite();



    (lib.光圈2 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(30);
    }).prototype = p = new cjs.Sprite();



    (lib.光晕1 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(31);
    }).prototype = p = new cjs.Sprite();



    (lib.降级提示 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(32);
    }).prototype = p = new cjs.Sprite();



    (lib.排行榜 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(33);
    }).prototype = p = new cjs.Sprite();



    (lib.榜单 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(34);
    }).prototype = p = new cjs.Sprite();



    (lib.榜单点击 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(35);
    }).prototype = p = new cjs.Sprite();



    (lib.榜单点击png复制 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(36);
    }).prototype = p = new cjs.Sprite();



    (lib.榜单移入 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(37);
    }).prototype = p = new cjs.Sprite();



    (lib.点击 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(38);
    }).prototype = p = new cjs.Sprite();



    (lib.点击png复制 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(39);
    }).prototype = p = new cjs.Sprite();



    (lib.蓝灰 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(40);
    }).prototype = p = new cjs.Sprite();



    (lib.蛋壳11 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(41);
    }).prototype = p = new cjs.Sprite();



    (lib.蛋壳12 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(42);
    }).prototype = p = new cjs.Sprite();



    (lib.蛋壳21 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(43);
    }).prototype = p = new cjs.Sprite();



    (lib.蛋壳22 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(44);
    }).prototype = p = new cjs.Sprite();



    (lib.蛋壳3 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(45);
    }).prototype = p = new cjs.Sprite();



    (lib.金色光 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(46);
    }).prototype = p = new cjs.Sprite();



    (lib.金点小 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(47);
    }).prototype = p = new cjs.Sprite();



    (lib.金点中 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(48);
    }).prototype = p = new cjs.Sprite();



    (lib.金线1 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(49);
    }).prototype = p = new cjs.Sprite();



    (lib.金线21 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(50);
    }).prototype = p = new cjs.Sprite();



    (lib.金线3 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(51);
    }).prototype = p = new cjs.Sprite();



    (lib.领取 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(52);
    }).prototype = p = new cjs.Sprite();



    (lib.领取点击 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(53);
    }).prototype = p = new cjs.Sprite();



    (lib.领取点击png复制 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(54);
    }).prototype = p = new cjs.Sprite();



    (lib.领取移入 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(55);
    }).prototype = p = new cjs.Sprite();



    (lib.高亮png复制 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(56);
    }).prototype = p = new cjs.Sprite();



    (lib.黑色 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(57);
    }).prototype = p = new cjs.Sprite();



    (lib.默认png复制 = function () {
        this.spriteSheet = ss["eggobj_atlas_"];
        this.gotoAndStop(58);
    }).prototype = p = new cjs.Sprite();



    (lib.zhangyupicblack = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.黑色();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 280, 60);


    (lib.zhangyubtnlingqu = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.领取();
        this.instance.parent = this;

        this.instance_1 = new lib.领取移入();
        this.instance_1.parent = this;

        this.instance_2 = new lib.领取点击();
        this.instance_2.parent = this;

        this.instance_3 = new lib.领取点击png复制();
        this.instance_3.parent = this;

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.instance}]}).to({state: [{t: this.instance_1}]}, 1).to({state: [{t: this.instance_2}]}, 1).to({state: [{t: this.instance_3}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 71, 24);


    (lib.zhangyupicblue = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.蓝灰();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 280, 60);


    (lib.zhangyupicbackground = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.background();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 53, 124);


    (lib.zhangyubtnbangdan = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.榜单();
        this.instance.parent = this;

        this.instance_1 = new lib.榜单移入();
        this.instance_1.parent = this;

        this.instance_2 = new lib.榜单点击();
        this.instance_2.parent = this;

        this.instance_3 = new lib.榜单点击png复制();
        this.instance_3.parent = this;

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.instance}]}).to({state: [{t: this.instance_1}]}, 1).to({state: [{t: this.instance_2}]}, 1).to({state: [{t: this.instance_3}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 70, 24);





    (lib.zhangyupicegg4 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._4级();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.zhangyupicegg5 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._5级();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.zhangyupicegg2 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._2级蛋();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.烟雾111 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._11();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 150, 181);


    (lib.金光 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.金色光();
        this.instance.parent = this;
        this.instance.setTransform(-136, -28);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-136, -28, 202, 224);


    (lib.降级提示_1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.降级提示();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 142, 28);


    (lib.jinxian3 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.金线3();
        this.instance.parent = this;
        this.instance.setTransform(90, -30);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(90, -30, 70, 168);


    (lib.jinxian2 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.金线21();
        this.instance.parent = this;
        this.instance.setTransform(-6, -13);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-6, -13, 130, 170);


    (lib.jinxian1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.金线1();
        this.instance.parent = this;
        this.instance.setTransform(-151, -29);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-151, -29, 130, 170);


    (lib.jindian1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.金点小();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 13, 14);


    (lib.guangyun = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.光圈2();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 128, 39);


    (lib.guangdian2 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.金点中();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 17, 17);


    (lib.元件4 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.鸡蛋凿坏了字();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 160, 48);


    (lib.元件3 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._14();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 150, 181);


    (lib.元件1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.光晕1();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 64, 26);


    (lib.失败字_1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.失败字();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 110, 61);


    (lib.成功文字_1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.成功文字();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 107, 36);


    (lib.zhangyupicegg6 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._6级();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.zhangyupicegg8 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._8级();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.补间6 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.蛋壳12();
        this.instance.parent = this;
        this.instance.setTransform(-39, -42);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-39, -42, 118, 127);


    (lib.补间5 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.蛋壳11();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 110, 126);


    (lib.补间4 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.蛋壳22();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 122, 99);


    (lib.补间3 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.蛋壳21();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 118, 103);


    (lib.zhangyubtnclose = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.默认png复制();
        this.instance.parent = this;

        this.instance_1 = new lib.高亮png复制();
        this.instance_1.parent = this;

        this.instance_2 = new lib.点击();
        this.instance_2.parent = this;

        this.instance_3 = new lib.点击png复制();
        this.instance_3.parent = this;

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.instance}]}).to({state: [{t: this.instance_1}]}, 1).to({state: [{t: this.instance_2}]}, 1).to({state: [{t: this.instance_3}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 10, 10);


    (lib.zhangyupicboard = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.board();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 243, 120);


    (lib.zhangyupicegg9 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._9级蛋();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.zhangyupicegg0 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.开始();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.zhangyubtnchuizi = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.砸蛋锤子png复制();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({rotation: -60, x: -18.2, y: 68.3}, 0).wait(1).to({rotation: 0, x: 0, y: 0}, 0).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 100, 100);


    (lib.zhangyupicegg3 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._3级();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.zhangyupicegg7 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._7级();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.zhangyupicegg1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib._1级();
        this.instance.parent = this;
        this.instance.setTransform(0, 0, 0.687, 0.687);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 206, 206);


    (lib.zhangyuanbroken = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // timeline functions:
        this.frame_39 = function () {
            if (EEVT) {
                EEVT.dispatchEvent("eggbroken_end");
            }
        }

        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).wait(39).call(this.frame_39).wait(1));

        // 图层 4 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        var mask_graphics_27 = new cjs.Graphics().p("AwZK8IAA13MAgzAAAIAAV3g");

        this.timeline.addTween(cjs.Tween.get(mask).to({graphics: null, x: 0, y: 0}).wait(27).to({graphics: mask_graphics_27, x: 55, y: 70}).wait(13));

        // 图层 2
        this.instance = new lib.元件4();
        this.instance.parent = this;
        this.instance.setTransform(79, -49, 1, 1, 0, 0, 0, 73, 22);
        this.instance.alpha = 0;
        this.instance._off = true;

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(26).to({_off: false}, 0).to({y: 54, alpha: 1}, 3).to({y: 72}, 2).to({y: 54}, 2).to({_off: true}, 6).wait(1));

        // 图层 6
        this.instance_1 = new lib.蛋壳3();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-4, 130);
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(23).to({_off: false}, 0).wait(15).to({_off: true}, 1).wait(1));

        // 图层 8
        this.instance_2 = new lib.蛋壳22();
        this.instance_2.parent = this;
        this.instance_2.setTransform(-4, 54);

        this.instance_3 = new lib.补间3("synched", 0);
        this.instance_3.parent = this;
        this.instance_3.setTransform(-3, 52);

        this.instance_4 = new lib.补间4("synched", 0);
        this.instance_4.parent = this;
        this.instance_4.setTransform(1, 55);

        this.timeline.addTween(cjs.Tween.get({}).to({state: []}).to({state: [{t: this.instance_2}]}, 25).to({state: [{t: this.instance_3, p: {x: -3}}]}, 3).to({state: [{t: this.instance_4, p: {x: 1, y: 55}}]}, 3).to({state: [{t: this.instance_3, p: {x: 2}}]}, 3).to({state: [{t: this.instance_4, p: {x: -11, y: 55.5}}]}, 4).to({state: []}, 1).wait(1));

        // 图层 7
        this.instance_5 = new lib.蛋壳12();
        this.instance_5.parent = this;
        this.instance_5.setTransform(58, 28);

        this.instance_6 = new lib.补间5("synched", 0);
        this.instance_6.parent = this;
        this.instance_6.setTransform(48, 27);

        this.instance_7 = new lib.补间6("synched", 0);
        this.instance_7.parent = this;
        this.instance_7.setTransform(88, 65);

        this.timeline.addTween(cjs.Tween.get({}).to({state: []}).to({state: [{t: this.instance_5}]}, 25).to({state: [{t: this.instance_6, p: {x: 48, y: 27}}]}, 3).to({state: [{t: this.instance_7, p: {y: 65}}]}, 3).to({state: [{t: this.instance_6, p: {x: 52, y: 26}}]}, 3).to({state: [{t: this.instance_7, p: {y: 72}}]}, 4).to({state: []}, 1).wait(1));

        // 图层 1
        this.instance_8 = new lib.烟雾111();
        this.instance_8.parent = this;
        this.instance_8.setTransform(48.5, 86.5, 1, 1, 0, 0, 0, 48.5, 58.5);
        this.instance_8.alpha = 0;

        this.instance_9 = new lib._2();
        this.instance_9.parent = this;

        this.instance_10 = new lib._3();
        this.instance_10.parent = this;

        this.instance_11 = new lib._4();
        this.instance_11.parent = this;

        this.instance_12 = new lib._5();
        this.instance_12.parent = this;

        this.instance_13 = new lib._6();
        this.instance_13.parent = this;

        this.instance_14 = new lib._7();
        this.instance_14.parent = this;

        this.instance_15 = new lib._8();
        this.instance_15.parent = this;

        this.instance_16 = new lib._9();
        this.instance_16.parent = this;

        this.instance_17 = new lib._10();
        this.instance_17.parent = this;

        this.instance_18 = new lib._11_1();
        this.instance_18.parent = this;

        this.instance_19 = new lib._12();
        this.instance_19.parent = this;

        this.instance_20 = new lib._13();
        this.instance_20.parent = this;

        this.instance_21 = new lib.元件3();
        this.instance_21.parent = this;
        this.instance_21.setTransform(48.5, 58.5, 1, 1, 0, 0, 0, 48.5, 58.5);
        this.instance_21._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.instance_8}]}).to({state: [{t: this.instance_8}]}, 3).to({state: [{t: this.instance_9}]}, 1).to({state: [{t: this.instance_10}]}, 1).to({state: [{t: this.instance_11}]}, 1).to({state: [{t: this.instance_12}]}, 1).to({state: [{t: this.instance_13}]}, 1).to({state: [{t: this.instance_14}]}, 1).to({state: [{t: this.instance_15}]}, 1).to({state: [{t: this.instance_16}]}, 1).to({state: [{t: this.instance_17}]}, 1).to({state: [{t: this.instance_18}]}, 1).to({state: [{t: this.instance_19}]}, 1).to({state: [{t: this.instance_20}]}, 1).to({state: [{t: this.instance_21}]}, 1).to({state: [{t: this.instance_21}]}, 4).to({state: []}, 1).to({state: []}, 18).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_8).to({y: 58.5, alpha: 1}, 3).to({_off: true}, 1).wait(36));
        this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(16).to({_off: false}, 0).to({alpha: 0.148}, 4).to({_off: true}, 1).wait(19));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 28, 150, 181);


    (lib.zhangyuanfail = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // timeline functions:
        this.frame_42 = function () {
            if (EEVT) {
                EEVT.dispatchEvent("eggfail_end");
            }
        }

        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).wait(42).call(this.frame_42).wait(1));

        // 图层 4 (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        var mask_graphics_32 = new cjs.Graphics().p("ArtOIIAA8QIXbAAIAAcQg");

        this.timeline.addTween(cjs.Tween.get(mask).to({graphics: null, x: 0, y: 0}).wait(32).to({graphics: mask_graphics_32, x: 75, y: 90.5}).wait(11));

        // 图层 3
        this.instance = new lib.失败字_1();
        this.instance.parent = this;
        this.instance.setTransform(74.5, -55.5, 1, 1, 0, 0, 0, 55.5, 31.5);
        this.instance.alpha = 0;
        this.instance._off = true;

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(31).to({_off: false}, 0).to({y: 74.5, alpha: 1}, 4).to({y: 86.5}, 3).to({y: 74.5}, 3).to({_off: true}, 1).wait(1));

        // 图层 2
        this.instance_1 = new lib.降级提示_1();
        this.instance_1.parent = this;
        this.instance_1.setTransform(76, 124, 1, 1, 0, 0, 0, 71, 14);
        this.instance_1.alpha = 0.148;
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({_off: false}, 0).to({alpha: 1}, 3).wait(19).to({_off: true}, 1).wait(1));

        // 图层 1
        this.instance_2 = new lib.烟雾111();
        this.instance_2.parent = this;
        this.instance_2.setTransform(75.5, 94.5, 1, 1, 0, 0, 0, 75.5, 94.5);
        this.instance_2.alpha = 0.102;

        this.instance_3 = new lib._2();
        this.instance_3.parent = this;

        this.instance_4 = new lib._3();
        this.instance_4.parent = this;

        this.instance_5 = new lib._4();
        this.instance_5.parent = this;

        this.instance_6 = new lib._5();
        this.instance_6.parent = this;

        this.instance_7 = new lib._6();
        this.instance_7.parent = this;

        this.instance_8 = new lib._7();
        this.instance_8.parent = this;

        this.instance_9 = new lib._8();
        this.instance_9.parent = this;

        this.instance_10 = new lib._9();
        this.instance_10.parent = this;

        this.instance_11 = new lib._10();
        this.instance_11.parent = this;

        this.instance_12 = new lib._11_1();
        this.instance_12.parent = this;

        this.instance_13 = new lib._12();
        this.instance_13.parent = this;

        this.instance_14 = new lib._13();
        this.instance_14.parent = this;

        this.instance_15 = new lib.元件3();
        this.instance_15.parent = this;
        this.instance_15.setTransform(48.5, 58.5, 1, 1, 0, 0, 0, 48.5, 58.5);
        this.instance_15._off = true;

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.instance_2}]}).to({state: [{t: this.instance_2}]}, 3).to({state: [{t: this.instance_3}]}, 1).to({state: [{t: this.instance_4}]}, 1).to({state: [{t: this.instance_5}]}, 1).to({state: [{t: this.instance_6}]}, 1).to({state: [{t: this.instance_7}]}, 1).to({state: [{t: this.instance_8}]}, 1).to({state: [{t: this.instance_9}]}, 1).to({state: [{t: this.instance_10}]}, 1).to({state: [{t: this.instance_11}]}, 1).to({state: [{t: this.instance_12}]}, 1).to({state: [{t: this.instance_13}]}, 1).to({state: [{t: this.instance_14}]}, 1).to({state: [{t: this.instance_15}]}, 1).to({state: [{t: this.instance_15}]}, 4).to({state: []}, 1).to({state: []}, 15).wait(7));
        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regY: 98.5, y: 98.5, alpha: 1}, 3).to({_off: true}, 1).wait(39));
        this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(16).to({_off: false}, 0).to({alpha: 0.148}, 4).to({_off: true}, 1).wait(22));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 150, 181);


    (lib.zhangyuansuccess = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // timeline functions:
        this.frame_0 = function () {
            /* jinxian2.mask=zz1*/
            /* jinxian1.mask=zz3*/
        }
        this.frame_7 = function () {
            /* jinxian3.mask=zz2*/
        }
        this.frame_18 = function () {
            /* jinguang.mask=zz4*/
        }
        this.frame_39 = function () {
            if (EEVT) {
                EEVT.dispatchEvent("eggsuccess_end");
            }
        }

        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7).call(this.frame_7).wait(11).call(this.frame_18).wait(21).call(this.frame_39).wait(1));

        // 光圈1
        this.instance = new lib.guangyun();
        this.instance.parent = this;
        this.instance.setTransform(85, 171.5, 1, 1, 0, 0, 0, 64, 19.5);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(18).to({_off: false}, 0).to({scaleX: 1.15, scaleY: 1.15, x: 86.9, y: 169.5}, 5).to({x: 88.9, y: 173.5, alpha: 0.148}, 9).to({_off: true}, 1).wait(7));

        // 光晕
        this.instance_1 = new lib.元件1();
        this.instance_1.parent = this;
        this.instance_1.setTransform(85.6, 165, 1, 1, 0, 0, 0, 32, 13);
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(24).to({_off: false}, 0).to({scaleX: 1.31, scaleY: 1.31, x: 86, y: 169.1}, 5).to({scaleX: 1.56, scaleY: 1.54, y: 171, alpha: 0.148}, 8).to({_off: true}, 1).wait(2));

        // 图层 5
        this.instance_2 = new lib.jindian1();
        this.instance_2.parent = this;
        this.instance_2.setTransform(72, 166.5, 1, 1, 0, 0, 0, 6.5, 7);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x: 54.6, y: -10.7}, 19).to({guide: {path: [54.5, -10.8, 59.3, -16.8, 65.8, -23.3]}, alpha: 0.141}, 3).to({_off: true}, 1).wait(17));

        // 图层 3
        this.instance_3 = new lib.guangdian2();
        this.instance_3.parent = this;
        this.instance_3.setTransform(72.5, 160.5, 1, 1, 0, 0, 0, 8.5, 8.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({guide: {path: [72.4, 160.4, 77.6, 158.9, 82.8, 157.3, 94, 153.1, 98.2, 147.3, 104.9, 138, 92.6, 126.4, 80.3, 114.8, 49.1, 100.9, 22.3, 89, 15.1, 73.7, 9.1, 60.7, 17.8, 46, 25.2, 33.6, 41.7, 22.1, 56.1, 12, 71.4, 6.6, 88.7, 0.6, 96.4, -6.3, 104.1, -13.2, 102.1, -20.9, 100.2, -28.5, 91.6, -33.8]}}, 22).to({_off: true}, 1).wait(17));

        // 金线
        this.jinxian2 = new lib.jinxian2();
        this.jinxian2.parent = this;
        this.jinxian2.setTransform(83.5, 92.5, 1, 1, 0, 0, 0, 53.5, 72.5);
        this.jinxian2.cache(-8, -15, 134, 174);

        this.timeline.addTween(cjs.Tween.get(this.jinxian2).to({_off: true}, 13).wait(27));

        // 图层 4
        this.instance_4 = new lib.jindian1();
        this.instance_4.parent = this;
        this.instance_4.setTransform(79.2, 157.6, 1, 1, 0, 0, 0, 6.5, 7);
        this.instance_4.alpha = 0;
        this.instance_4._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({_off: false}, 0).to({x: 49.2, y: 149.3, alpha: 1}, 2).to({guide: {path: [49.3, 149.2, 47.8, 148.4, 46.5, 147.5, 36.3, 140.7, 45.4, 132.7, 54.5, 124.7, 82.9, 115.5, 115.9, 104.8, 95.1, 78.7, 81.7, 62.1, 53.4, 45.2, 41.1, 37.7, 49.6, 17.9, 50.6, 15.6, 51.7, 13.4]}}, 19).to({guide: {path: [51.5, 13.2, 55.2, 6.1, 60.4, -0.4]}, alpha: 0.301}, 1).to({_off: true}, 1).wait(10));

        // 金线
        this.jinxian3 = new lib.jinxian3();
        this.jinxian3.parent = this;
        this.jinxian3.setTransform(-8, 98.5, 1, 1, 0, 0, 0, 21, 63.5);
        this.jinxian3._off = true;
        this.jinxian3.cache(88, -32, 74, 172);

        this.timeline.addTween(cjs.Tween.get(this.jinxian3).wait(7).to({_off: false}, 0).to({_off: true}, 24).wait(9));

        // 图层 4
        this.instance_5 = new lib.jindian1();
        this.instance_5.parent = this;
        this.instance_5.setTransform(65.5, 136.1, 1, 1, 0, 0, 0, 6.5, 7);
        this.instance_5.alpha = 0;

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({guide: {path: [65.4, 136, 67.3, 134.6, 69.7, 133.2]}, alpha: 1}, 2).to({guide: {path: [70, 133.2, 84, 124.8, 115.5, 115.5, 160.8, 102, 153.4, 78.5, 147.3, 59.7, 107.5, 35.2, 93.1, 26.4, 87.6, 18.9, 82, 11.3, 85.2, 5.1, 87.5, 0.6, 92.9, -2]}}, 22).to({x: 114.5, y: -7, alpha: 0.301}, 1).to({_off: true}, 1).wait(14));

        // 金线
        this.jinxian1 = new lib.jinxian1();
        this.jinxian1.parent = this;
        this.jinxian1.setTransform(232.5, 98.5, 1, 1, 0, 0, 0, 53.5, 65.5);
        this.jinxian1.cache(-153, -31, 134, 174);

        this.timeline.addTween(cjs.Tween.get(this.jinxian1).to({_off: true}, 15).wait(25));

        // 图层 4
        this.instance_6 = new lib.成功文字_1();
        this.instance_6.parent = this;
        this.instance_6.setTransform(87.5, 106.5, 1, 1, 0, 0, 0, 53.5, 18);
        this.instance_6._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(27).to({_off: false}, 0).wait(5).to({alpha: 0.148}, 5).to({_off: true}, 1).wait(2));

        // 图层 1
        this.jinguang = new lib.金光();
        this.jinguang.parent = this;
        this.jinguang.setTransform(84, 92, 1, 1, 0, 0, 0, -36, 92);
        this.jinguang._off = true;
        this.jinguang.cache(-138, -30, 206, 228);

        this.timeline.addTween(cjs.Tween.get(this.jinguang).wait(18).to({_off: false}, 0).wait(9).to({regX: 68, regY: 86, x: 188, y: 86}, 0).wait(11).to({alpha: 0.141}, 0).to({_off: true}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(24, 4, 134, 173);

    (lib.zhangyupicpaihang = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // 图层 1
        this.instance = new lib.排行榜();
        this.instance.parent = this;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 283, 291);
// stage content:



    (lib.无标题1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = null;

})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {});
var lib, images, createjs, ss;