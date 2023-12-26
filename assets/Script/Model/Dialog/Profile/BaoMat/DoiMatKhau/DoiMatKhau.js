
var BrowserUtil = require('BrowserUtil');
var helper      = require('Helper');
cc.Class({
    extends: cc.Component,

    properties: {
        OldPassword: {
            default: null,
            type:    cc.EditBox,
        },
        NewPassword: {
            default: null,
            type:    cc.EditBox,
        },
        ReNewPassword: {
            default: null,
            type:    cc.EditBox,
        },
    },
    onLoad () {
        var self = this;
        this.editboxs = [this.OldPassword, this.NewPassword, this.ReNewPassword];
        this.keyHandle = function(t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onChangerClick(),
                t.preventDefault && t.preventDefault(),
                !1) : void 0
        }
    },
    onEnable: function () {
        cc.sys.isBrowser && this.addEvent();
    },
    onDisable: function () {
        cc.sys.isBrowser && this.removeEvent();
        this.clear();
    },
    addEvent: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1)
        }
    },
    removeEvent: function() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1)
        }
    },
    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
            case cc.macro.KEY.enter:
                this.isTop() && this.onChangerClick();
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
    onChangerClick: function() {
        if (this.OldPassword.string.length < 6 ||
            this.OldPassword.string.length > 32 ||
            this.NewPassword.string.length < 6 ||
            this.NewPassword.string.length > 32 ||
            this.ReNewPassword.string.length < 6 ||
            this.ReNewPassword.string.length > 32)
        {
            cc.RedT.inGame.notice.show({title: "", text: "Mật khẩu từ 6 đến 32 ký tự.\n\nHãy kiểm tra lại các thông tin."});
        }else if (this.OldPassword.string == this.NewPassword.string) {
            cc.RedT.inGame.notice.show({title: "", text: "Mật khẩu mới không trùng với mật khẩu cũ."});
        }else if (this.NewPassword.string != this.ReNewPassword.string) {
            cc.RedT.inGame.notice.show({title: "", text: "Nhập lại mật khẩu mới không khớp."});
        }else{
            cc.RedT.inGame.loading.active = !0;
            cc.RedT.send({user: {doi_pass: {passOld: this.OldPassword.string, passNew: this.NewPassword.string, passNew2: this.ReNewPassword.string}}})
        }
    },
    clear: function(){
        this.OldPassword.string = this.NewPassword.string = this.ReNewPassword.string = "";
    },
});
