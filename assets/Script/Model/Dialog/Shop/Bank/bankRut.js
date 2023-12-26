
var BrowserUtil = require('BrowserUtil');
var helper      = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		editBank:   cc.EditBox,
		editNumber: cc.EditBox,
		editName:   cc.EditBox,
		editRut:    cc.EditBox,
		editOTP:    cc.EditBox,
		typeOTP: '',
	},
	init(){
		var self = this;
		this.editboxs = [this.editBank, this.editNumber, this.editName, this.editRut, this.editOTP];
		this.keyHandle = function(t) {
			return t.keyCode === cc.macro.KEY.tab ? (self.isTop() && self.changeNextFocusEditBox(),
				t.preventDefault && t.preventDefault(),
				!1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onNapClick(),
				t.preventDefault && t.preventDefault(),
				!1) : void 0
		}
	},
	onEnable: function () {
		cc.sys.isBrowser && this.addEvent();
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
				this.isTop() && this.onNapClick();
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
		this.editBank.string = this.editNumber.string = this.editName.string = this.editRut.string = this.editOTP.string = '';
	},
	onClickOTP: function(){
		cc.RedT.send({otp:{type:this.typeOTP}});
	},
	changerTypeOTP: function(e){
		this.typeOTP = e.node.name;
	},
	onChangerRed: function(value = 0){
		value = helper.numberWithCommas(helper.getOnlyNumberInString(value));
		this.editRut.string = value == 0 ? "" : value;
	},
	onClick: function(){
		var error = null;
		if(helper.isEmpty(this.editBank.string) ||
			helper.isEmpty(this.editNumber.string) ||
			helper.isEmpty(this.editName.string) ||
			helper.isEmpty(this.editRut.string) ||
			helper.isEmpty(this.editOTP.string))
		{
			error = "Kiểm tra lại các thông tin..."
		} else if(helper.getOnlyNumberInString(this.editRut.string) < 10000){
			error = "Số tiền RÚT tối thiểu là 100.000."
		}
		if (error){
			cc.RedT.inGame.notice.show({title: "", text: error});
		} else {
			cc.RedT.send({shop:{bank:{rut:{bank:this.editBank.string, number:this.editNumber.string, name:this.editName.string, rut:helper.getOnlyNumberInString(this.editRut.string), otp:this.editOTP.string}}}});
			//branch:this.editBranch.string,
		}
	},
});
