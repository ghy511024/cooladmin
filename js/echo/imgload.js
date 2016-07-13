/* 
 * 图片在页面不可见区域延时加载 兼容ie7
 * @author ghy
 * 
 */
window.Imgload = (function () {
    var delay = 250;//消抖 延时
    var interval;
    var imgload = {
        init: function () {
            $(window).scroll(function () {
                _this.scroll();
            })
            _this.render();
        },
        // 鼠标滚动函数消抖核心
        scroll: function () {
            if (!!interval) {
                return;
            }
            clearTimeout(interval);
            interval = setTimeout(function () {
                _this.render();
                interval = null;
            }, delay)
        },
        //定时轮训
        render: function () {
            var doms = $("img[data-zimg]");
            var view = {//可视区域 暂定为 窗口大小
                l: 0,
                t: 0,
                b: $(window).height(),
                r: $(window).width()
            }
            for (var i = 0; i < doms.length; i++) {
                var el = doms[i];
                if (_this.inView(el, view)) {
                    var hasload = $(this).data("zimgload");
                    if (!hasload) {
                        var src = $(el).data("zimg");
                        $(el).attr("src", src);
                        $(el).attr("data-zimgload", "true");
                    } else {
                    }
                } else {
                }
            }
        },
        //判断是否在可视区域内
        inView: function (el, view) {
            if ($(el)[0]) {
                if (isHidden($(el)[0])) {
                    return false;
                }
                var box = $(el)[0].getBoundingClientRect();
                return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
            }
            else {
                return false;
            }
        }
    }
    var isHidden = function (element) {
        return (element.offsetParent === null);
    };
    var _this = imgload;
    return imgload;
})()
$(function () {
    Imgload.init();
})

