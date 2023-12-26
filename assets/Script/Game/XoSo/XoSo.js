
var helper = require('Helper');
var notice = require('Notice');

var XoSo_Main = require('XoSo_Main');

cc.Class({
	extends: cc.Component,

	properties: {
		redhat:       cc.Node,
		balans:       cc.Label,
		username:     cc.Label,
		today:        cc.Label,
		nodeNotice:   cc.Node,
		prefabNotice: cc.Prefab,
		loading:      cc.Node,
		notice:       notice,

		XoSo_Main:    XoSo_Main,

		games:       cc.Node,
		position:    '',
	},
	onLoad () {
		cc.RedT.inGame = this;
		cc.RedT.MiniPanel.node.parent = this.redhat;

		cc.RedT.send({scene:'xo_so'});
		this.username.string = cc.RedT.user.name;
		this.balans.string   = helper.numberWithCommas(cc.RedT.user.red);

		this.XoSo_Main.init(this);
	},
	onData: function(data) {
		if (void 0 !== data.user){
			this.userData(data.user);
			cc.RedT.userData(data.user);
		}
		if (void 0 !== data.XoSo){
			this.XoSo(data.XoSo);
		}
		if (void 0 !== data.mini){
			cc.RedT.MiniPanel.onData(data.mini);
		}
		if (void 0 !== data.TopHu){
			cc.RedT.MiniPanel.TopHu.onData(data.TopHu);
		}
		if (void 0 !== data.taixiu){
			cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(data.taixiu);
		}
		if (void 0 !== data.notice){
			this.notice.show(data.notice);
		}
		if (void 0 !== data.vipp) {
			cc.RedT.MiniPanel.Dialog.VipPoint.onData(data.vipp);
		}
	},
	XoSo: function(data){
		if (void 0 !== data.notice) {
			this.addNotice(data.notice);
		}
		if (void 0 !== data.history) {
			this.XoSo_Main.History.onData(data.history);
		}
		if (void 0 !== data.kq) {
			this.XoSo_Main.KetQua.onData(data.kq);
		}
	},
	userData: function(data){
		this.balans.string = helper.numberWithCommas(data.red);
	},
	addNotice:function(text){
		var notice = cc.instantiate(this.prefabNotice)
		var noticeComponent = notice.getComponent('mini_warning')
		noticeComponent.text.string = text;
		this.nodeNotice.addChild(notice);
	},
	backGame: function(){
		switch(this.position) {
			case 'Main':
				cc.RedT.MiniPanel.node.parent = null;
				this.loading.active = true;
				cc.director.loadScene('MainGame');
				break;
			case 'MienBac':
				this.onSelectDat(null, 'Main');
				break;
			case 'History':
				this.XoSo_Main.showMain();
				this.onSelectDat(null, 'Main');
				break;
			case 'KetQua':
				this.XoSo_Main.showMain();
				this.onSelectDat(null, 'Main');
				break;
		}
	},
	signOut: function(){
		cc.RedT.MiniPanel.node.parent = null;
		cc.director.loadScene('MainGame', function(){
			cc.RedT.inGame.signOut();
		});
	},
	update: function(){
		let timestamp = new Date();
		this.today.string = this.day(timestamp.getDay()) + ' ' + helper.addZero10(timestamp.getDate()) + '/' + helper.addZero10((timestamp.getMonth()+1)) + '/' + timestamp.getFullYear() + ' ' + helper.addZero10(timestamp.getHours()) + ':' + helper.addZero10(timestamp.getMinutes()) + ':' + helper.addZero10(timestamp.getSeconds());
	},
	day: function(day){
		let weekday = new Array(7);
		weekday[0] = "CN";
		weekday[1] = "T2";
		weekday[2] = "T3";
		weekday[3] = "T4";
		weekday[4] = "T5";
		weekday[5] = "T6";
		weekday[6] = "T7";
		return weekday[day];
	},
	onSelectDat: function(event, game) {
		this.position = game;
		this.games.children.forEach(function(obj){
			if (obj.name === game) {
				obj.active = true;
			}else{
				obj.active = false;
			}
		});
	},
});
