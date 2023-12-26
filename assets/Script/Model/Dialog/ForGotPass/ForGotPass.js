
var BrowserUtil = require('BrowserUtil');

var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		username: {
			default: null,
			type: cc.EditBox,
		},
		newpass: {
			default: null,
			type: cc.EditBox,
		},
		renewpass: {
			default: null,
			type: cc.EditBox,
		},
		otp: {
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
		this.editboxs = [this.username, this.newpass, this.renewpass, this.otp, this.captcha];
		this.keyHandle = function(t) {
			return t.keyCode === cc.macro.KEY.tab ? (self.changeNextFocusEditBox(),
				t.preventDefault && t.preventDefault(),
				!1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onForGotClick(),
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
				this.isTop() && this.onForGotClick();
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
		this.username.string = this.newpass.string = this.renewpass.string = this.otp.string = this.captcha.string = '';
	},
	onForGotClick: function() {
		if (this.username.string.length < 3 || this.username.string.length > 32) {
			cc.RedT.inGame.notice.show({title:"LỖI", text:'Vui lòng nhập chính xác tên tài khoản...'});
		} else if (this.username.string.match(new RegExp("^[a-zA-Z0-9]+$")) === null){
			cc.RedT.inGame.notice.show({title:"LỖI", text:'Tên tài khoản chỉ gồm Chữ và Số!'});
		} else if (this.newpass.string.length < 6 || this.newpass.string.length > 32) {
			cc.RedT.inGame.notice.show({title:"LỖI", text:'Độ dài mật khẩu tối thiểu 6-32 kí tự...'});
		} else if (this.newpass.string.length != this.renewpass.string.length) {
			cc.RedT.inGame.notice.show({title:"LỖI", text:'Nhập lại mật khẩu không đúng...'});
		} else if (this.otp.string.length != 4){
			cc.RedT.inGame.notice.show({title:"LỖI", text:'Mã OTP không hợp lệ...'});
		} else if (this.captcha.string.length != 4){
			cc.RedT.inGame.notice.show({title:"LỖI", text:'Captcha không đúng.'});
		}else{
			cc.RedT.send({forgotpass:{iforgot: {name: this.username.string, pass: this.newpass.string, otp: this.otp.string, captcha: this.captcha.string}}});
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
		cc.RedT.send({captcha: 'forgotpass'});
	},
	onClickOTP: function(){
		var username = this.username.string.trim();
		if (this.username.string.length < 3 || this.username.string.length > 32) {
			cc.RedT.inGame.notice.show({title:"", text:'Vui lòng nhập chính xác tên tài khoản...'});
		}else{
			cc.RedT.send({forgotpass:{sendOTP: this.username.string}});
		}
	},
});
