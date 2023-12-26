
var TX_Main    = require('TaiXiuMain');
var TX_ThongKe = require('TaiXiuThongKe');

cc.Class({
	extends: cc.Component,
	properties: {
		TX_Main:    TX_Main,
		TX_ThongKe: TX_ThongKe,
		board:      true,
	},
	init(obj){
		this.RedT = obj;
		this.node.runScale = false;
		cc.RedT.setting.taixiu = cc.RedT.setting.taixiu || {scale:1, getLogs: false};
		this.TX_LichSu      = obj.Dialog.TaiXiuLichSu;
		this.TX_Top         = obj.Dialog.TaiXiuTop;
		this.TX_LichSuPhien = obj.Dialog.TaiXiuLichSuPhien;
		this.TX_Main.init(this);
		this.TX_ThongKe.init(this);

		let check = localStorage.getItem('taixiu');
		if (check == "true") {
			this.node.active = true;
		}
	},
	onEnable: function () {
		this.regEvent(true);
	},
	onDisable: function () {
		this.regEvent(false);
	},
	regEvent: function(bool){
		cc.RedT.send({taixiu: !cc.RedT.setting.taixiu.getLogs ? {view:bool, getLogs:true} : {view: bool}});
	},
	setTop: function(){
		cc.RedT.setting.taixiu.scale = 1;
		this.node.parent.insertChild(this.node);
		this.RedT.setTop(this.node);
	},
	openGame: function (e, taixiu = '1') {
		cc.RedT.audio.playClick();
		if (cc.RedT.IS_LOGIN){
			this.node.active = !0;
			localStorage.setItem('taixiu', true);
			this.setTop();
		}else{
			cc.RedT.inGame.dialog.showSignIn();
		}
	},
	closeGame: function () {
		cc.RedT.audio.playUnClick();
		this.node.active = this.TX_ThongKe.node.active = this.TX_Main.TX_Board.node.active = !1;
		localStorage.setItem('taixiu', false);
	},
	newGame: function(){
		this.TX_ThongKe.node.active = this.TX_Main.TX_Board.node.active = false;
		this.TX_Main.setDefautl();
	},
	signIn:function(){
        !this.node.active && (this.TX_Main.nodeTimePopup.active = true);
    },
});
