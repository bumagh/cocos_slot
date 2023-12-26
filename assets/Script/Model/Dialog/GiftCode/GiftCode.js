
var BrowserUtil = require('BrowserUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        giftcode: {
            default: null,
            type: cc.EditBox,
        },
        captcha: {
            default: null,
            type: cc.EditBox,
        },
        capchaSprite: cc.Sprite,
    },
    onLoad () {
        var self = this;
        this.editboxs = [this.giftcode, this.captcha];
        this.keyHandle = function(t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onSendClick(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.escape ? (cc.RedT.inGame.dialog.onClickBack(),
                t.preventDefault && t.preventDefault(),
                !1) : void 0
        }
    },
    onEnable: function () {
        cc.sys.isBrowser && this.addEvent();
        this.node.runAction(cc.RedT.inGame.dialog.actionShow);
        this.reCaptcha();
    },
    onDisable: function () {
        cc.sys.isBrowser && this.removeEvent();
        this.clean();
        cc.RedT.inGame.dialog.resetSizeDialog(this.node);
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
            case cc.macro.KEY.escape:
                this.isTop() && cc.RedT.inGame.dialog.onClickBack();
                break;
            case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
            case cc.macro.KEY.enter:
                this.isTop() && this.onSendClick();
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
        this.giftcode.string = this.captcha.string = '';
    },
    onSendClick: function() {
        var error = null;

        if (this.giftcode.string.length > 32 || this.giftcode.string.length < 3)
            error = 'Mã Giftcode không hợp lệ...';
        else if (this.captcha.string.length < 4)
          error = 'Vui lòng nhập Captcha.';

        if (error) {
            cc.RedT.inGame.notice.show({title:"GIFT CODE", text:error});
            return;
        }else{
            cc.RedT.send({giftcode: {code: this.giftcode.string, captcha:this.captcha.string}});
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
        cc.RedT.send({captcha: 'giftcode'});
    },
});
