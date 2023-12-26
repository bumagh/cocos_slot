
var BrowserUtil = require('BrowserUtil');
var helper      = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		NhanhMang: {
			default: null,
			type: cc.Label,
		},
		MenhGia: {
			default: null,
			type: cc.Label,
		},
		editSoLuong: {
			default: null,
			type: cc.EditBox,
		},
		editOTP: {
			default: null,
			type: cc.EditBox,
		},
		moreNhaMang: {
			default: null,
			type: cc.Node,
		},
		moreMenhGia: {
			default: null,
			type: cc.Node,
		},
		scrollviewNhaMang: {
			default: null,
			type: cc.ScrollView,
		},
		scrollviewMenhGia: {
			default: null,
			type: cc.ScrollView,
		},
		bangGia: {
			default: null,
			type: cc.ScrollView,
		},
		prefabLeft: {
			default: null,
			type: cc.Prefab,
		},
		prefabRight: {
			default: null,
			type: cc.Prefab,
		},
	},
	init(){
		var self = this;
		this.isLoaded = false;
		this.editboxs = [this.editSoLuong, this.editOTP];
		this.keyHandle = function(t) {
			return t.keyCode === cc.macro.KEY.tab ? (self.isTop() && self.changeNextFocusEditBox(),
				t.preventDefault && t.preventDefault(),
				!1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onClickMua(),
				t.preventDefault && t.preventDefault(),
				!1) : void 0
		}
	},
	onEnable: function () {
		cc.sys.isBrowser && this.addEvent();
		if(!this.isLoaded) {
			cc.RedT.send({shop:{info_mua: true}})
		}
	},
	onDisable: function () {
		this.moreNhaMang.active = this.moreMenhGia.active = false;
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
		return !this.moreNhaMang.active && !this.moreMenhGia.active && !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active;
	},
	clean: function(){
		this.editSoLuong.string = '';
	},
	toggleMoreNhaMang: function(){
		this.moreNhaMang.active = !this.moreNhaMang.active;
		this.moreMenhGia.active = !1;
	},
	toggleMoreMenhGia: function(){
		this.moreMenhGia.active = !this.moreMenhGia.active;
	},
	infoSet: function(data, i_arg, i_text, nhamang = false){
		var self = this;
		if (data.length > 0) {
			Promise.all(data.map(function(obj, index){
				var item = cc.instantiate(self.prefabLeft);
				var componentLeft = item.getComponent('NapRed_itemOne');
				componentLeft.init(self, i_arg, i_text)
				if (nhamang) {
					if (index == 0) {
						componentLeft.background.active = true;
						self.NhanhMang.string = obj.name
					}
					componentLeft.text.string = obj.name;
					self.scrollviewNhaMang.content.addChild(item);
				}else{
					var name  = helper.numberWithCommas(obj.name);
					var value = helper.numberWithCommas(obj.values);
					if (index == 0) {
						componentLeft.background.active = true;
						self.MenhGia.string = name;
					}
					componentLeft.text.string = name;
					self.scrollviewMenhGia.content.addChild(item);
					var itemR = cc.instantiate(self.prefabRight);
					itemR = itemR.getComponent('NapRed_itemTT');
					itemR.init(name, value);
					itemR.bg.active = index%2;
					self.bangGia.content.addChild(itemR.node);
				}
				return componentLeft;
			}))
			.then(result => {
				this[i_arg] = result;
			})
		}
	},
	onData: function(data) {
		if (void 0 !== data.info && !this.isLoaded){
			this.isLoaded = true;
			if (void 0 !== data.info.nhamang){
				this.infoSet(data.info.nhamang, "nhamangList", "NhanhMang", true);
			}
			if (void 0 !== data.info.menhgia){
				this.infoSet(data.info.menhgia, "menhgiaList", "MenhGia");
			}
		}
	},
	onClickMua: function(){
		var isN = this.editSoLuong.string>>0;
		if (isN > 3 || isN < 0) {
			cc.RedT.inGame.notice.show({title: "", text: "Số lượng không hợp lệ..."})
		}else if(this.editOTP.string.length != 4){
			cc.RedT.inGame.notice.show({title: "", text: "Mã OTP không đúng..."})
		}else{
			cc.RedT.send({shop:{mua_the:{nhamang:this.NhanhMang.string, menhgia:helper.getOnlyNumberInString(this.MenhGia.string), soluong:this.editSoLuong.string, otp:this.editOTP.string}}});
		}
	},
	onClickOTP: function(){
		cc.RedT.send({otp:true});
	},
});
