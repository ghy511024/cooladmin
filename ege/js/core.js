window.Egg = window.Egg || {};
window.Egg.model = (function () {
    var model = {
        _clevel: 0, //当前蛋等级
        time: 0, // 剩余时间
        allReward: 0, // 已经获得到的奖励
        cReward: 0, //本级别奖励
        nextReward: 0, // 下一级奖励
        cost: 0, // 当前级别消耗金币
        chances: 0, //当前概率
        config: {},
        getClevel: function () {
            return model._clevel || 0;
        },
        updateLevel: function (level) {
            level = (Number(level) || 0);
            if (level < 0) {
                level = 0;
            }
            model._clevel = level;
            var conf = model.config[model._clevel + 1];
            if (conf != null) {
                model.cost = conf["cost"];
                model.chances = conf["rate"];
                model.cReward = conf["award"];
                model.nextReward = conf["award"];
            }
            return model._clevel;
        }
        // 当前级别
    }
    return model;
})();
Egg.Full = function (color, el) {
    try {
        var w = el.width;
        var h = el.height;
        var b = el.getBounds();
        if (b != null) {
            w = w || b.width;
            h = h || b.height;
        }
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawRect(0, 0, w, h);
        el.addChild(shape);// 测试容器大小
    } catch (e) {

    }
}
//核心业务逻辑
Egg.Core = (function () {
    var model = Egg.model;

    var core = {
        lock: false, //砸蛋锁
        init: function () {
            _this.check();
        },
        lucky: function () {
            // ajax 请求数据
            var level = model._clevel;
            if (level >= 9) {
                alert("不能砸了，系统已经破产")
                return;
            }
            var rand = Math.random() * 100 | 0;
            var chance = (model.config[level + 1] || {})["rate"] || 0;
            if (rand < chance) {
                var url = "mock/hit_success.json"
            } else {
                url = "mock/hit_faile.json"
            }
            console.log("当前概率：" + chance);
            _this._ajax(url).then(function (ret) {
                if (ret["ret"] == 0) {
//                    var level = ret["level"];

                    model.allReward = model.allReward + model.nextReward;
                    var level = model._clevel + 1;
                    model.updateLevel(level);
                    Egg.getRoot().showSuccess();

                } else if (ret["ret"] == 10005) {
//                    var level = ret["level"];
                    var level = model._clevel - 2;
                    model.updateLevel(level);
                    Egg.getRoot().showFail();
                } else {
                    //其他处理
                }
                Egg.getpanel_toptip().update();
                console.log("砸蛋结果：" + (rand > 30) + "当前级别：", level)
            })

        },
        //用户检查蛋
        check: function () {
            _this._ajax("mock/check.json").then(function (ret) {
                if (ret["ret"] == 0) {
                    Egg.model._clevel = ret["level"] || 0;
                    Egg.model.time = ret["gameTime"] || 0;
                    _this.getConf();
                }
            })
        },
        getConf: function () {
            _this._ajax("mock/eggconf.json").then(function (ret) {
                if (ret["ret"] == 0) {
                    var conf = ret["config"] || [];
                    for (var i = 0; i < conf.length; i++) {
                        Egg.model.config[conf[i]["level"]] = conf[i];
                    }
                    Egg.model.updateLevel(Egg.model._clevel);
                    Egg.init();
                }
            })
        },
        // 领取奖励接口
        getReward: function () {
            _this._ajax("mock/get.json").then(function (ret) {
                if (ret["ret"] == 0) {
                    Egg.getRoot().showAlert("成功领取：" + model.allReward + "章鱼币")
                    _this.reset();
                }
            })
        },
        reset: function () {
            model.updateLevel(0);
            model.allReward = 0;
            Egg.getpanel_toptip().update();
            Egg.getEggBox().showEgg(0);
        },
        _ajax: function (url, data) {
            var dfd = $.Deferred();
            $.ajax({
                url: url,
                type: "post",
                data: (data),
                dataType: "json",
                error: function (jqXHR, textStatus, errorThrown) {
                    dfd.reject();
                },
                success: function (ret) {
                    dfd.resolve(ret);
                }
            });
            return dfd.promise();
        }
    };
    var _this = core;
    return core;
})();
$(function () {
    Egg.Core.init();
})
