
var helper      = require('Helper');
var BrowserUtil = require('BrowserUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        xu: {
            default: null,
            type: cc.Label,
        },
        red: {
            default: null,
            type: cc.EditBox,
        },
        captcha: {
            default: null,
            type: cc.EditBox,
        },
        capchaSprite: cc.Sprite,
    },
    onLoad(){
        var self = this;
        this.editboxs = [this.red, this.captcha];
        this.keyHandle = function(t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onClickMua(),
                t.preventDefault && t.preventDefault(),
                !1) : void 0
        }
    },
    onEnable: function () {
        cc.sys.isBrowser && this.addEvent();
        this.reCaptcha();
    },
    onDisable: function () {
        cc.sys.isBrowser && this.removeEvent();
        this.clean();
    },
    addEvent: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1)
        }
    },
    removeEvent: function() {
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1)
        }
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
            case cc.macro.KEY.enter:
                this.isTop() && this.onClickMua();
        }
    },
    changeNextFocusEditBox: function() {
        for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++){
            if (BrowserUtil.checkEditBoxFocus(this.editboxs[e])) {
                BrowserUtil.focusEditBox(this.editboxs[e]);
                t = !0;
                break
            }
        }
        !t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[0]);
    },
    isTop: function() {
        return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active;
    },
    clean: function(){
        this.red.string = this.xu.string = this.captcha.string = '';
    },
    onChanger: function(red) {
        var value    = helper.getOnlyNumberInString(red);
        var valueRed = helper.numberWithCommas(value);

        this.xu.string  = helper.numberWithCommas(value*3);
        this.red.string = valueRed == "0" ? "" : valueRed;
    },
    onClickMua: function() {
        if (parseInt(helper.isEmpty(this.red.string) || helper.getOnlyNumberInString(this.red.string)) < 1000) {
            cc.RedT.inGame.notice.show({title: "", text: "Số RED mua XU tối thiểu là 1.000"})
        }else if(helper.isEmpty(this.captcha.string)){
            cc.RedT.inGame.notice.show({title: "", text: "Vui lòng nhập chính xác mã xác nhận."})
        }else{
            cc.RedT.send({shop:{mua_xu:{red: helper.getOnlyNumberInString(this.red.string), captcha: this.captcha.string}}});
        }
    },
    initCaptcha: function(t) {
        var i = this
          , o = new Image;
        o.src = t,
        o.width = 150,
        o.height = 50,
        setTimeout(function() {
            var t = new cc.Texture2D;
            t.initWithElement(o),
            t.handleLoadedTexture();
            var e = new cc.SpriteFrame(t);
            i.capchaSprite.spriteFrame = e
        }, 10)
    },
    reCaptcha: function(){
        cc.RedT.send({captcha: 'withdrawXu'});
    },
});
