
var helper = require('Helper');
var reel   = require('BigBabol_reel');
var	line   = require('BigBabol_line');

cc.Class({
	extends: cc.Component,

	properties: {
		background: cc.Node,
		line: line,
		labelLine: cc.Label,
		reels: {
			default: [],
			type: reel,
		},
		icons: {
			default: [],
			type: cc.SpriteFrame,
		},
		iconPrefab:  cc.Prefab,
		buttonLine:  cc.Node,
		buttonSpin:  cc.Node,
		buttonAuto:  cc.Node,
		buttonStop:  cc.Node,
		bet: cc.Node,
		notice: cc.Node,
		phien: cc.Label,
		hu:    cc.Label,
		cuoc:     "",
		isAuto:  false,
		isSpeed: false,
		isSpin:  false,
	},
	init(obj){
		this.RedT = obj;
		cc.RedT.setting.big_babol = cc.RedT.setting.big_babol || {scale:1, bet: this.cuoc};

		var check = localStorage.getItem('big_babol');
		if (check == "true") {
			this.node.active = true;
		}
		if (void 0 !== cc.RedT.setting.big_babol.position) {
			this.node.position = cc.RedT.setting.big_babol.position;
		}
		if (void 0 !== cc.RedT.setting.big_babol.bet && cc.RedT.setting.big_babol.bet != this.cuoc) {
			this.intChangerBet();
		}
		if (void 0 !== cc.RedT.setting.big_babol.isAuto && this.isAuto != cc.RedT.setting.big_babol.isAuto) {
			this.onClickAuto();
		}
	},
	onLoad () {
		this.ttOffset = null;
		this.line.init(this);

		this.reels.forEach(function(reel) {
			reel.init(this);
		}.bind(this));
	},
	onEnable: function() {
		this.onGetHu();
		this.background.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.background.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.background.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.background.on(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	onDisable: function() {
		this.background.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.background.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.background.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.background.off(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
		this.onCloseGame();
	},
	eventStart: function(e){
		this.setTop();
		this.ttOffset  = cc.v2(e.touch.getLocationX() - this.node.position.x, e.touch.getLocationY() - this.node.position.y)
	},
	eventMove: function(e){
		this.node.position = cc.v2(e.touch.getLocationX() - this.ttOffset.x, e.touch.getLocationY() - this.ttOffset.y)
	},
	eventEnd: function(){
		cc.RedT.setting.big_babol.position = this.node.position;
	},
	setTop:function(){
		cc.RedT.setting.big_babol.scale = 1;
		this.node.parent.insertChild(this.node);
		this.RedT.setTop(this.node);
	},
	openGame: function () {
		cc.RedT.audio.playClick();
		if (cc.RedT.IS_LOGIN){
			this.node.active = !0;
			localStorage.setItem('big_babol', true);
			this.setTop();
		}
		else
			cc.RedT.inGame.dialog.showSignIn();
	},
	closeGame:function(){
		cc.RedT.audio.playUnClick();
		this.node.active = !1;
		localStorage.setItem('big_babol', false);
	},
	autoSpin: function(){
		this.reels.forEach(function(reel, index) {
			reel.spin(index);
		});
	},
	onSpin: function(){
		this.buttonLine.pauseSystemEvents();
		this.buttonSpin.pauseSystemEvents();
		this.line.node.active = false;
		this.bet.children.forEach(function(bet){
			bet.pauseSystemEvents();
		});
	},
	offSpin: function(){
		this.isSpin = this.buttonStop.active = this.isAuto = false;
		this.buttonAuto.color  = cc.color(155,155,155);
		this.buttonLine.resumeSystemEvents();
		this.buttonSpin.resumeSystemEvents();
		this.bet.children.forEach(function(bet){
			if(bet.children[0].active) bet.resumeSystemEvents();
		});
	},
	onClickSpin: function(){
		if (cc.RedT.setting.big_babol.line.length < 1) {
			this.addNotice('Chọn ít nhất 1 dòng');
		}else{
			if (!this.isSpin) {
				this.isSpin = true;
				this.onSpin();
				this.onGetSpin();
			}
		}
	},
	onClickAuto: function(){
		this.isAuto            = cc.RedT.setting.big_babol.isAuto = !this.isAuto;
		this.buttonAuto.color  = this.isAuto ? cc.Color.WHITE : cc.color(155,155,155);
		this.buttonStop.active = this.isSpin ? (this.isAuto ? true : false) : false;
	},
	onClickStop: function(){
		this.onClickAuto();
		this.buttonStop.active = false;
	},
	intChangerBet: function(){
		this.bet.children.forEach(function(obj){
			if (obj.name === cc.RedT.setting.big_babol.bet) {
				this.cuoc = obj.name;
				obj.children[0].active = false;
				obj.children[1].active = true;
				obj.pauseSystemEvents();
			}else{
				obj.children[0].active = true;
				obj.children[1].active = false;
				obj.resumeSystemEvents();
			}
		}.bind(this));
	},
	changerBet: function(event){
		let name = event.target.name;
		this.cuoc = cc.RedT.setting.big_babol.bet = name;
		this.bet.children.forEach(function(obj){
			if (obj.name === name) {
				obj.children[0].active = false;
				obj.children[1].active = true;
				obj.pauseSystemEvents();
			}else{
				obj.children[0].active = true;
				obj.children[1].active = false;
				obj.resumeSystemEvents();
			}
		});
		this.onGetHu();
	},
	onGetInfo: function(){
		cc.RedT.send({g:{big_babol:{info:{cuoc:this.cuoc}}}});
	},
	onGetSpin: function(){
		cc.RedT.send({g:{big_babol:{spin:{cuoc:this.cuoc, line:cc.RedT.setting.big_babol.line}}}});
	},
	onCloseGame: function(){
		this.isSpin = false;
		this.reels.forEach(function(reel) {
			reel.stop();
		});
		this.offSpin();
	},
	addNotice:function(text){
		var notice = cc.instantiate(this.RedT.prefabMiniNotice)
		var noticeComponent = notice.getComponent('mini_warning')
		noticeComponent.text.string = text;
		this.notice.addChild(notice);
	},
	onData:function(data){
		if (void 0 !== data.status) {
			if (data.status === 1) {
				this.notice.destroyAllChildren();
				this.win      = data.win;
				this.nohu     = data.nohu;
				this.isBigWin = data.isBigWin;
				this.buttonStop.active = this.isAuto ? true : false;
				data.cel.forEach(function(cel, cel_index){
					cel.forEach(function(icon, index){
						this.reels[cel_index].icons[index].setIcon(icon, true);
					}.bind(this));
				}.bind(this));
				this.autoSpin();
			}else{
				this.offSpin();
			}
		}

		if (void 0 !== data.line_win) {
			this.line_win = data.line_win;
		}

		if (void 0 !== data.phien) {
			this.phien.string = data.phien;
		}
		if (void 0 !== data.log) {
			this.RedT.Dialog.BigBabol_LichSu.onData(data.log);
		}
		if (void 0 !== data.top) {
			this.RedT.Dialog.BigBabol_Top.onData(data.top);
		}
		if (void 0 !== data.notice) {
			this.addNotice(data.notice);
		}
	},
	copy: function(){
		this.reels.forEach(function(reel){
			if (void 0 !== reel.icons &&
				void 0 !== reel.icons[25] &&
				void 0 !== reel.icons[25].setIcon)
			{
				reel.icons[25].setIcon(reel.icons[2].data);
				reel.icons[24].setIcon(reel.icons[1].data);
				reel.icons[23].setIcon(reel.icons[0].data);
			}
			//reel.node.y = 0;
		});
	},
	hieuUng: function(){
		if (this.nohu) {
			this.nohu = false;
			// Nổ Hũ
			if (this.isAuto == true) {
				this.onClickStop();
			}
			var nohu = cc.instantiate(this.RedT.PrefabNoHu);
			nohu = nohu.getComponent(cc.Animation);
			var text = nohu.node.children[6].getComponent(cc.Label);
			var Play = function(){
				var huong = cc.callFunc(function(){
					cc.RedT.audio.playEf('winHu');
					helper.numberTo(text, 0, this.win, 1000, true);
				}, this);
				nohu.node.runAction(cc.sequence(cc.delayTime(0.25), huong));
			};
			var Finish = function(){
				nohu.node.destroy();
				this.win = 0;
				this.hieuUng();
			};
			this.RedT.nodeEfect.addChild(nohu.node);
			nohu.on('play',     Play,   this);
			nohu.on('finished', Finish, this);
			nohu.play();
		}else if (!this.nohu && this.isBigWin) {
			// BigWin
			this.isBigWin = false;
			var BigWin = cc.instantiate(this.RedT.prefabBigWin);
			BigWin     = BigWin.getComponent(cc.Animation);
			var BigWinFinish = function(){
				BigWin.node.destroy();
				if (this.isAuto) {
					this.onGetSpin();
				}else{
					this.offSpin();
				}
			}
			BigWin.on('finished', BigWinFinish, this);
			BigWin.node.bet = this.win;
			BigWin.node.position = cc.v2(0,75);
			this.notice.addChild(BigWin.node);
			this.win = 0;
			if (!this.isAuto) {
				this.offSpin();
			}
		}else if (!this.isBigWin && this.win > 0) {
			var node = new cc.Node;
			node.addComponent(cc.Label);
			node = node.getComponent(cc.Label);
			helper.numberTo(node, 0, this.win, 600, true);
			node.font = cc.RedT.util.fontCong;
			node.lineHeight = 130;
			node.fontSize   = 25;
			node.node.position = cc.v2(0,40);
			node.node.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function() {
				node.node.destroy();
				this.hieuUng();
				this.offLineWin();
			}, this)));
			this.notice.addChild(node.node);
			this.win = 0;
			this.onLineWin();
		}else{
			if (this.isAuto) {
				this.timeOut = setTimeout(function(){
					this.onGetSpin();
				}.bind(this), 300);
			}else{
				this.offSpin();
			}
		}
	},
	onLineWin: function(){
		this.line_win.forEach(function(obj){
			let TRed = this.line.mainLine[obj.line-1];
			TRed.onhover();
			TRed.node.pauseSystemEvents();
		}.bind(this));
	},
	offLineWin: function(){
		this.line_win.forEach(function(obj){
			let TRed = this.line.mainLine[obj.line-1];
			TRed.offhover();
			TRed.node.resumeSystemEvents();
		}.bind(this));
	},
	random: function(){
		this.reels.forEach(function(reel){
			reel.icons.forEach(function(icon, index){
				if (index > 2 && index < 23) {
					icon.random();
				}
			});
		});
	},
	onGetHu: function(){
		if (void 0 !== cc.RedT.setting.topHu.data && this.node.active) {
			let result = cc.RedT.setting.topHu.data['big_babol'].filter(function(temp){
				return temp.type == this.cuoc;
			}.bind(this));
			let s = helper.getOnlyNumberInString(this.hu.string);
			let bet = result[0].bet;
			if (s-bet != 0){
				helper.numberTo(this.hu, s, bet, 2000, true);
			}
		}
	},
});
