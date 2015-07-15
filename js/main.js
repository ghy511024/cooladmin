$(document).ready(function () {
    Wiki.init();
});
var Wiki = (function () {
    var model = {};
    var wiki = {
        init: function () {
            this.layout()
            this.initEvent();
        }, layout: function () {
            hljs.configure({tabReplace: '    '});
            hljs.initHighlightingOnLoad()
        }, initEvent: function () {
        }, load: function (link) {
        }
    };
    var ret = {
        init: function () {
            wiki.init();
        }
    }
    return ret;
})()