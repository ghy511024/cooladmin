define(function(require, exports, module) {
    var $ = require("JQ")
      , X = require("XM")
      , DRAG = require("DRAG")
      , AppNoWindowView = X.XM.extend({
        _constructor: function() {
            return this.uiAppBtn = null ,
            this
        },
        init: function(title, iconClass) {
            return this.uiAppBtn = (new X.UI).initWithHtmlElement($(this._createAppBtn(title, iconClass))),
            this._setUiAppBtnStatus(),
            this
        },
        _setUiAppBtnStatus: function() {
            this.uiAppBtn.setDefaultClassPrefix("M-app-UI-"),
            this.uiAppBtn.setStatusConfig("enable"),
            this.uiAppBtn.setStatusConfig("open"),
            this.uiAppBtn.setStatusConfig("disable")
        },
        _createAppBtn: function(title, iconClass) {
            var html = ['<div class="MR-app-item">', '<span class="icon ' + iconClass + '">', "</span>", '<span class="title">' + title + "</span>", "</div>"].join("");
            return html
        }
    })
      , AppView = AppNoWindowView.extend({
        _constructor: function() {
            return AppView._super._constructor.call(this),
            this.uiWin = null ,
            this.uiWinTitle = null ,
            this.uiAppBox = null ,
            this
        },
        init: function(title, iconClass) {
            return AppView._super.init.call(this, title, iconClass),
            this.uiWin = $(this._createWin(title)),
            this.uiWinTitle = this.uiWin.children().eq(0).find(".title"),
            this.uiAppBox = this.uiWin.children().eq(1),
            this
        },
        _createWin: function(title) {
            var html = ['<div class="MR-app-window">', '<h3 class="MR-app-title">', '<span class="title">' + title + "</span>", '<span class="close">X</span>', "</h3>", '<div class="MR-app-box"></div>', "</div>"].join("");
            return html
        }
    })
      , AppViewAnchor = AppView.extend({
        _createSwitch: function() {
            var html = ['<div class="MR-app-switch">', '<div class="switch">', '<span class="text">关</span>', '<span class="btn"></span>', "</div>", "</div>"].join("");
            return html
        },
        init: function(title, iconClass) {
            AppViewAnchor._super.init.call(this, title, iconClass);
            var switchArea = $(this._createSwitch());
            return this.uiWin.append(switchArea),
            this.uiSwitchBtn = (new X.UI).initWithHtmlElement(switchArea.find(".switch").eq(0)),
            this.uiSwitchBtn.setDefaultClassPrefix("M-app-UI-switch-"),
            this.uiSwitchBtn.setStatusConfig("open", {
                callback: function(flag) {
                    flag && this.node.find(".text").html("开")
                }
            }),
            this.uiSwitchBtn.setStatusConfig("close", {
                callback: function(flag) {
                    flag && this.node.find(".text").html("关")
                }
            }),
            this
        }
    })
      , AppNoWindow = X.XM.extend({
        _constructor: function() {
            return this._title = "App",
            this._iconClass = "app-icon-empty",
            this.view = new AppNoWindowView,
            this
        },
        init: function() {
            return this.view.init(this._title, this._iconClass),
            this.view.uiAppBtn.setStatus("enable"),
            this
        },
        appTo: function(parent) {
            return $(parent).append(this.view.uiAppBtn.node),
            this
        }
    });
    exports.appNoWindow = AppNoWindow;
    var App = AppNoWindow.extend({
        _constructor: function() {
            return App._super._constructor.call(this),
            this._initPos = {
                left: 0,
                top: 0,
                container: null ,
                posElem: "body"
            },
            this.view = new AppView,
            this._winNotInBody = !0,
            this._winOnOpen = !1,
            this._canDrag = !0,
            this._zIndexManager = null ,
            this
        },
        init: function() {
            return App._super.init.call(this),
            this._bindEvent(),
            this._canDrag && this._initDrag(),
            this
        },
        _bindEvent: function() {
            var _this = this;
            return this.view.uiAppBtn.node.on("click", function() {
                _this.view.uiAppBtn.isStatus("disable") || _this.open()
            }),
            this.view.uiWin.find(".close").on("click", function() {
                _this.close()
            }),
            this
        },
        _initDrag: function() {
            return this.view.uiWinTitle.css("cursor", "move"),
            DRAG.drag(this.view.uiWin, {
                handle: this.view.uiWinTitle
            }).init(),
            this
        },
        open: function() {
            if (this._winOnOpen)
                return !1;
            var _this = this;
            if (this._winNotInBody) {
                var _container = $("body")
                  , offset = $(this._initPos.posElem).offset();
                this._initPos.container && (_container = $(this._initPos.container),
                offset = {
                    top: 0,
                    left: 0
                }),
                _container.append(this.view.uiWin),
                this.setWinPos(this._initPos.left + offset.left, this._initPos.top + offset.top),
                this._zIndexManager && this._zIndexManager.add(this.view.uiWin[0]),
                this._winNotInBody = !1
            } else
                this._zIndexManager && this._zIndexManager.updateIndex(this.view.uiWin[0]);
            return _this.view.uiAppBtn.setStatus("open"),
            this.view.uiWin.stop(!0).fadeIn(200, function() {
                _this.didOpen.call(_this)
            }),
            this._winOnOpen = !0,
            this
        },
        didOpen: function() {},
        close: function() {
            return this._winOnOpen ? (this.view.uiWin.stop(!0).css("display", "none"),
            this.view.uiAppBtn.setStatus("enable"),
            this._winOnOpen = !1,
            this.didClose(),
            this) : !1
        },
        didClose: function() {},
        setAppBox: function(html) {
            return this.view.uiAppBox.html(html),
            this
        },
        clearAppBox: function() {
            return this.view.uiAppBox.empty(),
            this
        },
        setWinPos: function(left, top) {
            return this.view.uiWin.css({
                left: left,
                top: top
            }),
            this
        }
    });
    exports.app = App;
    var AppAnchor = App.extend({
        _constructor: function() {
            return AppAnchor._super._constructor.call(this),
            this.view = new AppViewAnchor,
            this
        },
        init: function() {
            return AppAnchor._super.init.call(this),
            this.view.uiSwitchBtn.setStatus("open"),
            this
        }
    });
    exports.appAnchor = AppAnchor
})
