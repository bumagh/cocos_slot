
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		content: {
			default: null,
			type: cc.Node
		},
		body: {
			default: null,
			type: cc.Node
		},
		header: {
			default: null,
			type: cc.Node
		},
		panel: {
			default: null,
			type: cc.Node
		},
		x: {
			default: [],
			type: cc.SpriteFrame,
		},
		bet: "",
	},
	init: function(obj){
		this.RedT = obj;
	},
	onLoad () {
		this.ttOffset     = null;
		this.ttOffset2    = null;
		this.toggleRuning = false;
		this.content.children.forEach(function(obj){
			obj.hu  = obj.children[3].getComponent(cc.Label);
			obj.xHu = obj.children[0].getComponent(cc.Sprite);
		});
		this.header = this.header.children.map(function(obj){
			return obj.children[0].getComponent(cc.Label);
		});

		cc.RedT.setting.topHu = cc.RedT.setting.topHu || {};
		if (void 0 !== cc.RedT.setting.topHu.position) {
			this.node.position = cc.RedT.setting.topHu.position;
		}
		if (void 0 !== cc.RedT.setting.topHu.open) {
			this.body.active = cc.RedT.setting.topHu.open;
		}
		if (void 0 !== cc.RedT.setting.topHu.data) {
			this.onData(cc.RedT.setting.topHu.data);
		}
	},
	onEnable: function () {
		this.panel.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.panel.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.panel.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.panel.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.panel.on(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	onDisable: function () {
		this.panel.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.panel.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.panel.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.panel.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.panel.off(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	eventStart: function(e){
		this.setTop();
		this.ttOffset  = cc.v2(e.touch.getLocationX() - this.node.position.x, e.touch.getLocationY() - this.node.position.y)
		this.ttOffset2 = cc.v2(e.touch.getLocationX() - (e.touch.getLocationX() - this.node.position.x), e.touch.getLocationY() - (e.touch.getLocationY() - this.node.position.y))
	},
	eventMove: function(e){
		let x = e.touch.getLocationX()-this.ttOffset.x;
		let y = e.touch.getLocationY()-this.ttOffset.y;
		if (Math.abs(x) > cc.RedT.inGame.node.width/2-50) {
			x = x < 0 ? (-cc.RedT.inGame.node.width/2)+50 : (cc.RedT.inGame.node.width/2)-50;
		}
		if (Math.abs(y) > cc.RedT.inGame.node.height/2-50) {
			y = y < 0 ? (-cc.RedT.inGame.node.height/2)+50 : (cc.RedT.inGame.node.height/2)-50;
		}
		this.node.position = cc.v2(x, y);
	},
	eventEnd: function(e){
		cc.RedT.setting.topHu.position = this.node.position;
		this.xChanger = this.ttOffset2.x - (e.touch.getLocationX() - this.ttOffset.x)
		this.yChanger = this.ttOffset2.y - (e.touch.getLocationY() - this.ttOffset.y)
		if (this.xChanger < 5 &&
			this.xChanger > -5 &&
			this.yChanger < 5 &&
			this.yChanger > -5)
		{
			this.toggle();
		}
	},
	toggle: function(){
		cc.RedT.audio.playClick();
		this.body.active = cc.RedT.setting.topHu.open = !this.body.active;
		this.onChangerData();
	},
	onChangerBet: function(e, value){
		this.bet = value;
		this.header.forEach(function(obj){
			if (e.target !== obj.node.parent) {
				obj.font = cc.RedT.MiniPanel.TaiXiu.TX_Main.fontTru;
			}else{
				obj.font = cc.RedT.MiniPanel.TaiXiu.TX_Main.fontCong;
			}
		});
		this.onChangerData();
	},
	onData: function(data){
		cc.RedT.setting.topHu.data = data;
		if (this.body.active) {
			this.onChangerData();
		}
		this.onChangerGame();
	},
	onChangerData: function(){
		if (void 0 !== cc.RedT.setting.topHu.data) {
			let self = this;
			let dataName = [];
			let result = this.content.children.map(function(obj){
				let name = obj.name;
				let T = cc.RedT.setting.topHu.data[name].filter(function(temp){
					return temp.type == this.bet;
				}.bind(this));
				dataName[name] = obj;
				if (!T.length) {
					T[0] = {name: name, bet: 0};
				}else{
					T[0].name = name;
				}
				return T[0];
			}.bind(this));
			result = result.sort(function(a, b){
				return b.bet - a.bet;
			});
			result.forEach(function(obj, index){
				let temp = dataName[obj.name];
					temp.stopAllActions();
				let y = -(75*(index+1)-37.5);
					temp.runAction(cc.moveTo(0.2, cc.v2(0, y)));
				if (helper.getOnlyNumberInString(temp.hu.string) - obj.bet !== 0) {
					helper.numberTo(temp.hu, helper.getOnlyNumberInString(temp.hu.string), obj.bet, 2000, true);
				}
				if (obj.balans > 0 && !!this.x[obj.x-2]) {
					temp.xHu.node.active = true;
					temp.xHu.spriteFrame = this.x[obj.x-2];
				}else{
					temp.xHu.node.active = false;
				}
			}.bind(this));
		}
	},
	onChangerGame: function(){
		this.RedT.MiniPoker.onGetHu();
        //this.RedT.BaCay.onGetHu();
        this.RedT.BigBabol.onGetHu();
        this.RedT.CaoThap.onGetHu();
        this.RedT.AngryBirds.onGetHu();
        this.RedT.MegaJackpot.onGetHu();
        ///**
        if (void 0 !== cc.RedT.inGame.onGetHu) {
        	cc.RedT.inGame.onGetHu();
        }
        //*/
	},
	setTop: function(){
		this.node.parent.insertChild(this.node);
	},
});
