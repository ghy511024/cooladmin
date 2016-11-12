/*
 * 砸蛋游初始化模块
 * **/
var canvas, stage, exportRoot, Egg={}, EEVT;
(function () {
    var egg = {
        init: function () {
            canvas = document.getElementById("canvas");
            createjs.MotionGuidePlugin.install();
            images = images || {};
            ss = ss || {};
            var loader = new createjs.LoadQueue(false);
            loader.addEventListener("fileload", egg.handleFileLoad);
            loader.addEventListener("complete", egg.handleComplete);
            loader.loadManifest(lib.properties.manifest);
        }, handleComplete: function (evt) {
            var queue = evt.target;
            var ssMetadata = lib.ssMetadata;
            for (i = 0; i < ssMetadata.length; i++) {
                ss[ssMetadata[i].name] = new createjs.SpriteSheet({"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames})
            }
            EEVT = new createjs.EventDispatcher();
            window.exportRoot = Egg.getRoot();
            stage = new createjs.Stage(canvas);
            stage.addChild(exportRoot);
            stage.enableMouseOver();
            stage.addEventListener("stagemousemove", function (evt) {
                exportRoot.movechuizi(evt.stageX, evt.stageY);
            })
            // 初始化事件

            createjs.Ticker.addEventListener("tick", stage);
            //Code to support hidpi screens and responsive scaling.
            (function (isResp, respDim, isScale, scaleType) {
                var lastW, lastH, lastS = 1;
                window.addEventListener('resize', resizeCanvas);
                resizeCanvas();
                function resizeCanvas() {
                    var w = lib.properties.width, h = lib.properties.height;
                    var iw = window.innerWidth, ih = window.innerHeight;
                    var pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
                    if (isResp) {
                        if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                            sRatio = lastS;
                        }
                        else if (!isScale) {
                            if (iw < w || ih < h)
                                sRatio = Math.min(xRatio, yRatio);
                        }
                        else if (scaleType == 1) {
                            sRatio = Math.min(xRatio, yRatio);
                        }
                        else if (scaleType == 2) {
                            sRatio = Math.max(xRatio, yRatio);
                        }
                    }
                    canvas.style.width = '500px';
                    canvas.style.height = '600px';
                    lastW = iw;
                    lastH = ih;
                    lastS = sRatio;
                }
            })(true, 'both', false, 1);
        },
        handleFileLoad: function (evt) {
            if (evt.item.type == "image") {
                images[evt.item.id] = evt.result;
            }
        }

    }
    $.extend(Egg, egg);
})();