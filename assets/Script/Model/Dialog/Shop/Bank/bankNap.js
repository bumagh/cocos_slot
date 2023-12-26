
var BrowserUtil = require('BrowserUtil');
var helper      = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		labelBank:   cc.Label,
		labelNumber: cc.Label,
		labelName:   cc.Label,
		labelBranch: cc.Label,

		labelNickname:   cc.Label,

		moreBank: cc.Node,
		scrollviewBank: {
			default: null,
			type: cc.ScrollView,
		},
		prefab: cc.Prefab,
		isLoad: false,

		moreHinhThuc:  cc.Node,
		bodyNap:       cc.Node,
		labelHinhthuc: cc.Label,
		inputTien:     cc.EditBox,
		inputName:     cc.EditBox,
		inputKhop:     cc.EditBox,
		inputSTK:      cc.EditBox,
		inputNameGo:   cc.EditBox,
		hinhThuc:      '',
	},
	onLoad () {
		if(!this.isLoad) {
			cc.RedT.send({shop:{bank:{list:true}}});
		}
		let self = this;
		this.editboxs = [this.inputTien, this.inputName];
		this.keyHandle = function(t) {
			return t.keyCode === cc.macro.KEY.tab ? (self.isTop() && self.changeNextFocusEditBox(),
				t.preventDefault && t.preventDefault(),
				!1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onNapClick(),
				t.preventDefault && t.preventDefault(),
				!1) : void 0
		}
	},
    onEnable: function () {
        this.labelNickname.string = cc.RedT.user.name;
		cc.sys.isBrowser && this.addEvent();
	},
	onDisable: function () {
		this.moreBank.active = this.moreHinhThuc.active = false;
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
		this.inputTien.string = this.inputName.string = this.inputSTK.string = this.inputKhop.string = this.inputNameGo.string = '';
	},
	toggleMoreBank: function(){
		this.moreBank.active = !this.moreBank.active;
	},
	toggleHinhThuc: function(){
		this.moreHinhThuc.active = !this.moreHinhThuc.active;
	},
	onData: function(data){
		this.isLoad = true;
		if (data.length > 0) {
			this['i_arg'] = data.map(function(obj, index){
				let item = cc.instantiate(this.prefab);
				let componentLeft = item.getComponent('NapRed_itemOne');
				componentLeft.init(this, 'i_arg', 'labelBank','toggleMoreBank')
				componentLeft.text.string = obj.bank;
				this.scrollviewBank.content.addChild(item);
				componentLeft.data = obj;
				return componentLeft;
			}.bind(this));
		}
	},
	backT: function(data){
		this.labelNumber.string = data.number;
		this.labelName.string   = data.name;
		this.labelBranch.string = data.branch;
	},
	hinhThucSelect: function(event, select){
		this.hinhThuc = select;
		event.target.parent.children.forEach(function(obj){
			if (obj.name === select) {
				obj.children[0].active = true;
				this.labelHinhthuc.string = obj.children[1].getComponent(cc.Label).string;
			}else{
				obj.children[0].active = false;
			}
			this.moreHinhThuc.active = false;
		}.bind(this));

		switch(select) {
			case '1':
				this.bodyNap.children[0].active = true;
				this.bodyNap.children[1].active = false;
				this.bodyNap.children[2].active = false;
				break;
			case '2':
				this.bodyNap.children[0].active = false;
				this.bodyNap.children[1].active = true;
				this.bodyNap.children[2].active = false;
				break;
			case '3':
				this.bodyNap.children[0].active = false;
				this.bodyNap.children[1].active = false;
				this.bodyNap.children[2].active = true;
				break;
		}
	},
	onChangerRed: function(value = 0){
		value = helper.numberWithCommas(helper.getOnlyNumberInString(value));
		this.inputTien.string = value == 0 ? "" : value;
	},
	onClickNap: function(){
		if (!this.labelNumber.string.length) {
			cc.RedT.inGame.notice.show({title:"", text: "Vui lòng chọn ngân hàng muốn nạp."});
		}else if (this.hinhThuc === '1' && this.inputKhop.string.length < 6) {
			cc.RedT.inGame.notice.show({title:"", text: "Nhập mã giao dịch ngân hàng..."});
		}else if (this.hinhThuc === '2' && this.inputSTK.string.length < 6) {
			cc.RedT.inGame.notice.show({title:"", text: "Vui lòng nhập chính xác số tài khoản của bạn."});
		}else if (this.hinhThuc === '3' && this.inputNameGo.string.length < 6) {
			cc.RedT.inGame.notice.show({title:"", text: "Vui lòng nhập Họ Tên người đi chuyển tiền."});
		}else if (helper.getOnlyNumberInString(this.inputTien.string)>>0 < 200000) {
			cc.RedT.inGame.notice.show({title:"", text: "Nạp tối thiểu 200.000, tối đa 1.000.000.000"});
		}else if (this.inputName.string.length < 6) {
			cc.RedT.inGame.notice.show({title:"NẠP RED", text: "Vui lòng nhập chính xác Họ Tên người gửi"});
		}else{
			let data = {
				'hinhthuc': this.hinhThuc,
				'bank':     this.labelNumber.string,
				'money':    helper.getOnlyNumberInString(this.inputTien.string),
				'name':     this.inputName.string,
			};
			if (this.hinhThuc === '1') {
				data.khop = this.inputKhop.string;
			}
			if (this.hinhThuc === '2') {
				data.stk = this.inputSTK.string;
			}
			if (this.hinhThuc === '3') {
				data.namego = this.inputNameGo.string;
			}
			data = {'shop':{'bank':{'nap':data}}};
			cc.RedT.send(data);
		}
	},
	onCopyNumber: function(){
		cc.RedT.CopyToClipboard(this.labelNumber.string);
		cc.RedT.inGame.noticeCopy();
	},
	onCopyName: function(){
		cc.RedT.CopyToClipboard(this.labelName.string);
		cc.RedT.inGame.noticeCopy();
	},
	onCopyBranch: function(){
		cc.RedT.CopyToClipboard(this.labelBranch.string);
		cc.RedT.inGame.noticeCopy();
	},
	onCopyNoiDung: function(){
		cc.RedT.CopyToClipboard(this.labelNickname.string);
		cc.RedT.inGame.noticeCopy();
	},
});
