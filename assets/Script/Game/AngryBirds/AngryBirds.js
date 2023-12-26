
var helper = require('Helper');

var reelL = require('AngryBirds_reelsL');
var reelR = require('AngryBirds_reelsR');

cc.Class({
	extends: cc.Component,

	properties: {
		background: cc.Node,
		line: cc.Node,
		reelsL: {
			default: [],
			type: reelL,
		},
		reelsR: {
			default: [],
			type: reelR,
		},
		icons: {
			default: [],
			type: cc.SpriteFrame,
		},
		iconsX: {
			default: [],
			type: cc.SpriteFrame,
		},

		iconLPrefab: cc.Prefab,
		iconRPrefab: cc.Prefab,

		buttonSpin:  cc.Node,
		buttonAuto:  cc.Node,
		buttonStop:  cc.Node,

		labelWin:    cc.Label,
		//labelBet:    cc.Label,
		bet: cc.Node,
		notice:  cc.Node,
		hu:      cc.Label,
		cuoc:     "",
		isAuto:  false,
		isSpin:  false,
		red:     true,
		/*room:    0,
		rooms: {
			default: [],
			type: cc.String,
		},*/
	},
	init(obj){
		this.RedT = obj;
		cc.RedT.setting.angrybird = cc.RedT.setting.angrybird || {scale:1};

		var check = localStorage.getItem('angrybird');
		if (check == "true") {
			this.node.active = true;
		}
		if (void 0 !== cc.RedT.setting.angrybird.position) {
			this.node.position = cc.RedT.setting.angrybird.position;
		}
		if (void 0 !== cc.RedT.setting.angrybird.bet && cc.RedT.setting.angrybird.bet != this.cuoc) {
			this.intChangerBet();
		}
		if (void 0 !== cc.RedT.setting.angrybird.isAuto && this.isAuto != cc.RedT.setting.angrybird.isAuto) {
			this.onClickAuto();
		}
	},
	onLoad () {
		var self = this;
		this.ttOffset = null;

		this.reelsL.forEach(function(reel) {
			reel.init(self);
		});
		this.reelsR.forEach(function(reelR) {
			reelR.init(self);
		});
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
		cc.RedT.setting.angrybird.position = this.node.position;
	},
	setTop:function(){
		cc.RedT.setting.angrybird.scale = 1;
		this.node.parent.insertChild(this.node);
		this.RedT.setTop(this.node);
	},
	openGame: function () {
		cc.RedT.audio.playClick();
		if (cc.RedT.IS_LOGIN){
			this.node.active = !0;
			localStorage.setItem('angrybird', true);
			this.setTop();
		}
		else
			cc.RedT.inGame.dialog.showSignIn();
	},
	closeGame:function(){
		this.node.active = !1;
		localStorage.setItem('angrybird', false);
	},
	intChangerBet: function(){
		var self = this;
		Promise.all(this.bet.children.map(function(obj){
			if (obj.name == cc.RedT.setting.angrybird.bet) {
				self.cuoc = obj.name;
				obj.children[0].active = true;
				obj.pauseSystemEvents();
			}else{
				obj.children[0].active = false;
				obj.resumeSystemEvents();
			}
		}))
	},
	changerBet: function(event, bet){
		this.cuoc = cc.RedT.setting.angrybird.bet = bet;
		var target = event.target;
		Promise.all(this.bet.children.map(function(obj){
			if (obj == target) {
				obj.children[0].active = true;
				obj.pauseSystemEvents();
			}else{
				obj.children[0].active = false;
				obj.resumeSystemEvents();
			}
		}))
		this.onGetHu();
	},
	/*intChangerBet: function(){
		this.cuoc = cc.RedT.setting.angrybird.bet;
		this.rooms.forEach(function(room, index){
			if (room === this.cuoc) {
				this.room = index;
				this.labelBet.string = helper.numberWithCommas(this.rooms[this.room]);
			}
		}.bind(this));
	},
	betPlus: function(){
		this.room++;
		let data = this.rooms[this.room];
		if (void 0 !== data) {
			this.cuoc = data;
		}else{
			this.room = 0;
			this.cuoc = this.rooms[this.room];
		}
		this.labelBet.string = helper.numberWithCommas(this.rooms[this.room]);
	},
	betTru: function(){
		this.room--;
		let data = this.rooms[this.room];
		if (void 0 !== data) {
			this.cuoc = data;
		}else{
			this.room = this.rooms.length-1;
			this.cuoc = this.rooms[this.room];
		}
		this.labelBet.string = helper.numberWithCommas(this.rooms[this.room]);
	},*/
	autoSpin: function(){
		this.random();
		var self = this;
		[0,1,2,3,4].forEach(function(i) {
			if (i < 3) {
				self.reelsL[i].spin(i);
			}else{
				self.reelsR[i-3].spin(i);
			}
		});
	},
	onSpin: function(){
		this.buttonSpin.pauseSystemEvents();
	},
	offSpin: function(){
		this.isSpin = this.buttonStop.active = this.isAuto = false;
		this.buttonAuto.color  = cc.color(155,155,155);
		this.buttonAuto.active = this.buttonSpin.active = true;
		this.buttonSpin.resumeSystemEvents();
	},
	onClickSpin: function(){
		if (!this.isSpin) {
			this.isSpin = true;
			this.onSpin();
			this.onGetSpin();
		}
	},
	onClickAuto: function(){
		this.isAuto            = cc.RedT.setting.angrybird.isAuto = !this.isAuto;
		this.buttonAuto.color  = this.isAuto ? cc.Color.WHITE : cc.color(155,155,155);
		this.buttonStop.active = this.isSpin ? (this.isAuto ? true : false) : false;
		this.buttonAuto.active = !this.buttonStop.active;
		this.buttonSpin.active = this.isSpin ? false : true;
	},
	onClickStop: function(){
		this.onClickAuto();
		this.buttonStop.active = false;
	},
	onGetInfo: function(){
		cc.RedT.send({g:{angrybird:{info:{cuoc:this.cuoc}}}});
	},
	onGetSpin: function(){
		cc.RedT.send({g:{angrybird:{spin:{cuoc:this.cuoc}}}});
	},
	onCloseGame: function(){
		this.isSpin = false;
		this.reelsL.forEach(function(reel) {
			reel.stop();
		});
		this.reelsR.forEach(function(reel) {
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
		var self = this;
		if (void 0 !== data.status) {
			if (data.status === 1) {
				this.notice.destroyAllChildren();
				this.win      = data.win;
				this.nohu     = data.nohu;
				this.isBigWin = data.isBigWin;
				this.buttonStop.active = this.isAuto ? true : false;
				this.buttonAuto.active = this.buttonSpin.active = !this.buttonStop.active;

				data.celR.forEach(function(cel, cel_index){
					cel.forEach(function(icon, index){
						self.reelsR[cel_index].icons[index].setIcon(icon, true);
					});
				});

				Promise.all(data.cel.map(function(cel, cel_index){
					return Promise.all(cel.map(function(icon, index){
						self.reelsL[cel_index].icons[index].setIcon(icon, true);
					}))
					.then(result => {
						return result;
					})
				}))
				.then(result => {
					this.autoSpin();
				});
			}else{
				this.offSpin();
			}
		}

		if (void 0 !== data.line_win) {
			this.line_win = data.line_win;
		}

		if (void 0 !== data.log) {
			this.RedT.Dialog.AngryBird_history.onData(data.log);
		}
		if (void 0 !== data.top) {
			this.RedT.Dialog.AngryBird_top.onData(data.top);
		}
		if (void 0 !== data.notice) {
			this.addNotice(data.notice);
		}
	},
	copy: function(){
		this.reelsL.forEach(function(reel){
			if (void 0 !== reel.icons &&
				void 0 !== reel.icons[19] &&
				void 0 !== reel.icons[19].setIcon)
			{
				reel.icons[19].setIcon(reel.icons[2].data);
				reel.icons[18].setIcon(reel.icons[1].data);
				reel.icons[17].setIcon(reel.icons[0].data);
			}
			//reel.node.y = 0;
		});

		this.reelsR.forEach(function(reel){
			if (void 0 !== reel.icons &&
				void 0 !== reel.icons[22] &&
				void 0 !== reel.icons[22].setIcon)
			{
				reel.icons[22].setIcon(reel.icons[2].data);
				reel.icons[21].setIcon(reel.icons[1].data);
				reel.icons[20].setIcon(reel.icons[0].data);
			}
			//reel.node.y = 0;
		});
	},
	random: function(){
		this.reelsL.forEach(function(reel){
			reel.icons.forEach(function(icon, index){
				if (index > 2 && index < 17) {
					icon.random();
				}
			});
		});
		this.reelsR.forEach(function(reel){
			reel.icons.forEach(function(icon, index){
				if (index > 2 && index < 20) {
					icon.random();
				}
			});
		});
	},
	onGetHu: function(){
		if (void 0 !== cc.RedT.setting.topHu.data && this.node.active) {
			let result = cc.RedT.setting.topHu.data['arb'].filter(function(temp){
				return temp.type == this.cuoc;
			}.bind(this));
			let s = helper.getOnlyNumberInString(this.hu.string);
			let bet = result[0].bet;
			if (s-bet != 0){
				helper.numberTo(this.hu, s, bet, 1500, true);
			}
		}
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
				this.labelWin.string = helper.numberWithCommas(this.win);
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
				this.labelWin.string = helper.numberWithCommas(BigWin.node.bet);
				BigWin.node.destroy();
				if (this.isAuto) {
					this.onGetSpin();
		    	}else{
		    		this.offSpin();
		    	}
			}
			BigWin.on('finished', BigWinFinish, this);
			BigWin.node.bet = this.win;
			BigWin.node.position = cc.v2(0, 98);
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
			node.win = this.win;
			node.font = this.red ? cc.RedT.util.fontCong : cc.RedT.util.fontTru;
			node.lineHeight = 130;
			node.fontSize   = 25;
			node.node.position = cc.v2(0, 98);
			node.node.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function() {
				this.labelWin.string = helper.numberWithCommas(node.win);
				node.node.destroy();
				this.hieuUng();
				this.offLineWin();
			}, this)));
			this.win = 0;
			this.notice.addChild(node.node);
			this.onLineWin();
		}else{
			if (this.isAuto) {
    			this.timeOut = setTimeout(function(){
					this.onGetSpin();
				}
				.bind(this), 300);
    		}else{
    			this.offSpin();
    		}
		}
	},
	onLineWin: function(){
		var self = this;
		this.line_win.forEach(function(obj){
			self.line.children[obj.line-1].active = true;
		});
	},
	offLineWin: function(){
		this.line.children.forEach(function(obj){
			obj.active = false;
		});
	},
});
