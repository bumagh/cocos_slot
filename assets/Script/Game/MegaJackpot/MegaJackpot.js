
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		background:  sp.Skeleton,
		bg_move:     cc.Node,
		menuGame:    cc.Node,

		bgVQ:        cc.Node,
		imgVQ:       cc.Sprite,

		vqthanhdong: cc.SpriteFrame,
		vqbachkim:   cc.SpriteFrame,
		vqhoangkim:  cc.SpriteFrame,

		hu:          cc.Label,
		luot:        cc.Label,

		notice:       cc.Node,

		spinNode:     cc.Node,
		spinSprite:   cc.Sprite,
		spinOn:       cc.SpriteFrame,
		spinOff:      cc.SpriteFrame,
		isSpin:       false,
	},
	init: function(obj){
		this.RedT = obj;
		cc.RedT.setting.MegaJackpot = cc.RedT.setting.MegaJackpot || {scale:1, users:{100:0, 1000:0, 10000:0}};
		this.game = 100;
		this.bgAnim = {100:"thanhdong", 1000:"bachkim", 10000:"hoangkim"};

		let check = localStorage.getItem('MegaJackpot');
		if (check == "true") {
			this.node.active = true;
		}

		if (void 0 !== cc.RedT.setting.MegaJackpot.game) {
			if (cc.RedT.setting.MegaJackpot.game !== this.game) {
				this.changerGame(null, cc.RedT.setting.MegaJackpot.game);
			}
		}else{
			cc.RedT.setting.MegaJackpot.game = this.game = '100';
		}
		if (void 0 !== cc.RedT.setting.MegaJackpot.position) {
			this.node.position = cc.RedT.setting.MegaJackpot.position;
		}
	},
	onLoad () {
		this.RedT.Dialog.MegaJ_history.init(this);
		this.RedT.Dialog.MegaJ_top.init(this);
	},
	onEnable: function() {
		this.onGetHu();
		this.regUpdate();
		this.bg_move.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.bg_move.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.bg_move.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.bg_move.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.bg_move.on(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	onDisable: function() {
		this.bg_move.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.bg_move.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.bg_move.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.bg_move.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.bg_move.off(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	eventStart: function(e){
		this.setTop();
		this.ttOffset = cc.v2(e.touch.getLocationX() - this.node.position.x, e.touch.getLocationY() - this.node.position.y);
	},
	eventMove: function(e){
		this.node.position = cc.v2(e.touch.getLocationX() - this.ttOffset.x, e.touch.getLocationY() - this.ttOffset.y);
	},
	eventEnd: function(){
		cc.RedT.setting.MegaJackpot.position = this.node.position;
	},
	setTop:function(){
		cc.RedT.setting.MegaJackpot.scale = 1;
		this.node.parent.insertChild(this.node);
		this.RedT.setTop(this.node);
	},
	changerGame:function(e, game){
		cc.RedT.setting.MegaJackpot.game = this.game = game;
		if (this.bgAnim[game]) {
			this.background.setAnimation(0, this.bgAnim[game], true);
			this.imgVQ.spriteFrame = this['vq'+this.bgAnim[game]];
		}
		this.luot.string = cc.RedT.setting.MegaJackpot.users[game] + ' Lượt';
		this.menuGame.children.forEach(function(item){
			if (item.name === game) {
				item.pauseSystemEvents();
				item.children[0].active = false;
				item.children[1].active = true;
			}else{
				item.resumeSystemEvents();
				item.children[0].active = true;
				item.children[1].active = false;
			}
		});
		this.onGetHu();
	},
	openGame: function (game = null) {
		cc.RedT.audio.playClick();
		if (cc.RedT.IS_LOGIN){
			this.node.active = !0;
			localStorage.setItem('MegaJackpot', true);
			this.setTop();
			if (!!game) {
				this.changerGame(null, game);
			}
		} else cc.RedT.inGame.dialog.showSignIn();
	},
	closeGame:function(){
		this.node.active = !1;
		localStorage.setItem('MegaJackpot', false);
	},
	spin: function(){
		this.spinNode.pauseSystemEvents();
		this.spinSprite.spriteFrame = this.spinOff;
		if (!this.isSpin) {
			cc.RedT.send({g:{megaj:{spin:this.game}}});
		}
	},
	onData: function(data){
		if (!!data.status) {
			this.updateStatus(data.status);
		}
		if (!!data.notice) {
			this.addNotice(data.notice);
		}
		if (!!data.info) {
			this.info(data.info);
		}
		if (!!data.history) {
			this.RedT.Dialog.MegaJ_history.onData(data.history);
		}
		if (!!data.top) {
			this.RedT.Dialog.MegaJ_top.onData(data.top);
		}
	},
	info: function(data){
		cc.RedT.setting.MegaJackpot.users[100]   = data[100];
		cc.RedT.setting.MegaJackpot.users[1000]  = data[1000];
		cc.RedT.setting.MegaJackpot.users[10000] = data[10000];
		this.luot.string = data[this.game] + ' Lượt';
	},
	updateStatus: function(data){
		if (data.status === true) {
			this.isSpin = true;
			this.oldData = data;
			let action = cc.rotateTo(10,  -((360*7)+data.data.position)).easing(cc.easeQuinticActionOut());
			let action2 = cc.rotateTo(10, -((360*7)+data.data.position)).easing(cc.easeQuinticActionOut());

			var p2 = cc.callFunc(function() {
				this.bgVQ.angle       = -this.oldData.data.position;
				this.imgVQ.node.angle = -this.oldData.data.position;

				this.isSpin = false;
				this.spinNode.resumeSystemEvents();
				this.spinSprite.spriteFrame = this.spinOn;

				this.bgVQ.stopAllActions();
				this.imgVQ.node.stopAllActions();
				this.updateKQ();
			}, this);

			this.bgVQ.runAction(action);
			this.imgVQ.node.runAction(cc.sequence(action2, p2));

		}else{
			this.isSpin = false;
			this.spinNode.resumeSystemEvents();
			this.spinSprite.spriteFrame = this.spinOn;
		}
	},
	updateKQ: function(){
		if (this.oldData.kq === 5) {
			// Thêm lượt
		}else if (this.oldData.kq === 12) {
			// Nổ hũ
		}else{
			/**
			if (this.oldData.data.thuong >= this.oldData.game*1000) {
				// Thắng lớn
			}else{
				// Thắng thường
			}
			*/

			var temp = new cc.Node;
			temp.addComponent(cc.Label);
			temp = temp.getComponent(cc.Label);
			temp.string = helper.numberWithCommas(this.oldData.data.thuong);
			temp.font = cc.RedT.util.fontCong;
			temp.lineHeight = 130;
			temp.fontSize   = 20;
			temp.node.position = cc.v2(0, 30);
			this.notice.addChild(temp.node);
			temp.node.runAction(cc.sequence(cc.moveTo(2.5, cc.v2(0, 150)), cc.callFunc(function(){
				temp.node.destroy();
			}, this)));
		}
	},
	regUpdate: function(){
		cc.RedT.send({g:{megaj:{update:true}}});
	},
	addNotice:function(text){
		var notice = cc.instantiate(this.RedT.prefabMiniNotice);
		var noticeComponent = notice.getComponent('mini_warning');
		noticeComponent.text.string = text;
		this.notice.addChild(notice);
	},
	onGetHu: function(){
		if (void 0 !== cc.RedT.setting.topHu.data && this.node.active) {
			var self = this;
			let data = cc.RedT.setting.topHu.data['megaj'].filter(function(temp){
				return temp.type == self.game;
			});
			var s = helper.getOnlyNumberInString(this.hu.string);
			var bet = data[0].bet;
			if (s-bet !== 0){
				helper.numberTo(this.hu, s, bet, 2000, true);
			}
		}
	},
});
