
let helper      = require('Helper');
let BrowserUtil = require('BrowserUtil');
let shubiao     = require('Fish_shubiao');

cc.Class({
	extends: cc.Component,

	properties: {
		nodeFish:  cc.Node,
		nodeDan:   cc.Node,
		nodeTouch: cc.Node,
		nodeMenu:  cc.Node,
		boxAnim:   cc.Animation,

		nodeCoint: cc.Node,
		nodeLabel: cc.Node,
		nodeEF:    cc.Node,
		nodeEVENT: cc.Node,
		nodeAudio: cc.Node,

		spriteAuto: cc.Sprite,
		spriteLock: cc.Sprite,
		nodeAuto:   cc.Node,
		nodeLock:   cc.Node,

		shubiao:  shubiao,
		isAuto:   false,
		isFire:   false,
		isLock:   false,
		setPoint: false,

		autoNap: false,

		bulletVelocity: 2000,
		bulletSpeed:    100,
		red:            0,
		bulletID:       0,

		cointMe:    cc.Prefab,
		cointOther: cc.Prefab,

		labelMe:    cc.Prefab,
		labelOther: cc.Prefab,

		bullet: {
			default: [],
			type: cc.Prefab,
		},
		ef_bullet: {
			default: [],
			type: cc.Prefab,
		},
		ef_bom:      cc.Prefab,
		ef_gold_bom: cc.Prefab,
		ef_hailang:  cc.Prefab,
		fishPrefab: {
			default: [],
			type: cc.Prefab,
		},
		x2_2g6: cc.Prefab,
		xr1:    cc.Prefab,
		xr2:    cc.Prefab,
		xr3:    cc.Prefab,
		xr4:    cc.Prefab,
		xr5:    cc.Prefab,
		xr6:    cc.Prefab,
	},
	init: function(obj){
		this.RedT      = obj;
		this.sungFixD  = {1:{x:-1,y:1}, 2:{x:1,y:-1}};
		this.sungFix   = 1;
		this.shubiao.init(this);
		this.fish = {};
		this.ponit = null;

		this.efcoint = {
			1: {'x':55,  'y':55,  'max':4,  'min':2, 'ef':1},
			2: {'x':55,  'y':55,  'max':4,  'min':2, 'ef':1},
			3: {'x':80,  'y':80,  'max':4,  'min':2, 'ef':1},
			4: {'x':80,  'y':80,  'max':5,  'min':3, 'ef':1},
			5: {'x':80,  'y':80,  'max':5,  'min':3, 'ef':1},
			6: {'x':80,  'y':80,  'max':5,  'min':3, 'ef':1},
			7: {'x':80,  'y':80,  'max':6,  'min':3, 'ef':1},
			8: {'x':80,  'y':80,  'max':6,  'min':3, 'ef':1},
			9: {'x':80,  'y':80,  'max':6,  'min':3, 'ef':1},
			10:{'x':100, 'y':80,  'max':6,  'min':3, 'ef':1},
			11:{'x':100, 'y':80,  'max':6,  'min':3, 'ef':2},
			12:{'x':100, 'y':80,  'max':7,  'min':3, 'ef':2},
			13:{'x':100, 'y':80,  'max':7,  'min':3, 'ef':2},
			14:{'x':100, 'y':80,  'max':7,  'min':4, 'ef':2},
			15:{'x':100, 'y':80,  'max':8,  'min':4, 'ef':2},
			16:{'x':100, 'y':80,  'max':8,  'min':4, 'ef':2},
			17:{'x':100, 'y':80,  'max':8,  'min':4, 'ef':2},
			18:{'x':100, 'y':80,  'max':8,  'min':4, 'ef':2},
			19:{'x':100, 'y':80,  'max':8,  'min':4, 'ef':2},
			20:{'x':100, 'y':80,  'max':9,  'min':5, 'ef':3},
			21:{'x':100, 'y':80,  'max':9,  'min':5, 'ef':3},
			22:{'x':150, 'y':80,  'max':9,  'min':5, 'ef':3},
			23:{'x':150, 'y':130, 'max':9,  'min':6, 'ef':3},
			24:{'x':150, 'y':130, 'max':10, 'min':6, 'ef':3},
			25:{'x':150, 'y':130, 'max':10, 'min':6, 'ef':3},
			26:{'x':150, 'y':130, 'max':12, 'min':6, 'ef':3},
			27:{'x':200, 'y':130, 'max':12, 'min':7, 'ef':3},
			28:{'x':250, 'y':150, 'max':15, 'min':8, 'ef':3},
		};
	},
	onEnable: function() {
		this.node.y = 0;
		this.node.x = 0;
		this.nodeTouch.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.nodeTouch.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.nodeTouch.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.nodeTouch.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		BrowserUtil.showCursorFish();
		cc.RedT.audio.bg.stop();
		cc.RedT.audio.bg = cc.RedT.audio.fishBG1;
		cc.RedT.audio.bg.volume = this.RedT.volumeNhacNen;
		if(this.RedT.volumeNhacNen !== 0) {
			cc.RedT.audio.bg.play();
			let t = setInterval(function(){
				console.log(cc.RedT.audio.bg.clip.loaded);
				if(cc.RedT.audio.bg.clip.loaded){
					clearInterval(t);
					cc.RedT.audio.bg.play();
				}	
			}.bind(this),100);
		}
	},
	onDisable: function() {
		cc.RedT.audio.bg.stop();
		cc.RedT.audio.bg = cc.RedT.audio.fishHall;
		cc.RedT.audio.bg.volume = this.RedT.volumeNhacNen;
		if(this.RedT.volumeNhacNen !== 0){
			cc.RedT.audio.bg.play();
			let t = setInterval(function(){
				console.log(cc.RedT.audio.bg.clip.loaded);
				if(cc.RedT.audio.bg.clip.loaded){
					clearInterval(t);
					cc.RedT.audio.bg.play();
				}	
			}.bind(this),100);
		}
		BrowserUtil.showCursorAutoForce();
		this.nodeTouch.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.nodeTouch.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.nodeTouch.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.nodeTouch.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);

		this.nodeMenu.active = false;
		this.RedT.players.forEach(function(obj){
			obj.iconCoint.spriteFrame = this.RedT.cointOther;
			obj.nodeChangerbet.active = false;
			obj.isMe   = false;
			obj.isFire = false;
			obj.isLock = false;
			obj.nodeSung.angle = 0;
			obj.nodeCanh.angle = 0;
			obj.bullet = {};
			obj.fish = null;
		}.bind(this));

		this.fish = {};

		this.nodeFish.destroyAllChildren();
		this.nodeDan.destroyAllChildren();
		this.nodeCoint.destroyAllChildren();
		this.nodeLabel.destroyAllChildren();
		this.nodeEF.destroyAllChildren();
		this.nodeEVENT.destroyAllChildren();
		this.nodeAudio.destroyAllChildren();

		this.setPoint = false;
		this.bulletID = 0;

		this.isAuto = false;
		this.isFire = false;
		this.isLock = false;
		this.autoNap = false;
		this.reset();
	},
	eventStart: function(e){
		if (!this.player.isLock) {
			this.isFire = true;
		}
		this.setPoint = true;
		this.ponit = this.shubiao.node.position = this.node.convertToNodeSpaceAR(e.touch.getLocation());
		this.shubiao.fire(this.shubiao.node.position);
	},
	eventMove: function(e){
		if (!this.player.isLock) {
			this.ponit = this.shubiao.node.position = this.node.convertToNodeSpaceAR(e.touch.getLocation());
			this.angleSung(this.shubiao.node.position);
		}
	},
	eventEnd: function(){
		this.isFire = false;
	},
	angleSung: function(ponit, ef = false){
		if (ef) {
			this.shubiao.dragonBones.playAnimation('newAnimation', 1);
			this.player.onFire(this.shubiao.node.position);
		}
		let positionUser = this.shubiao.node.parent.convertToWorldSpaceAR(this.shubiao.node.position);
		let position1_1 = this.player.node.convertToNodeSpaceAR(positionUser);
		position1_1 = cc.misc.radiansToDegrees(Math.atan2(position1_1.x*this.sungFixD[this.sungFix].x, position1_1.y*this.sungFixD[this.sungFix].y));
		this.player.nodeSung.angle = position1_1;
		this.player.nodeCanh.angle = this.player.nodeSung.angle;
	},
	menuToggle: function() {
		this.nodeMenu.active = !this.nodeMenu.active;
	},
	onClickOutGame: function() {
		cc.RedT.send({g:{fish:{outgame:true}}});
		this.RedT.nodeHome.active = true;
		this.RedT.nodeGame.active = false;
	},
	betPlus: function(){
		this.player.typeBet++;
		if (this.player.typeBet>5) {
			this.player.typeBet = 0;
		}
		this.player.onChangerTypeBet(this.player.typeBet);
		this.sendChangerTypeBet(this.player.typeBet);
		this.RedT.volumeHieuUng !== 0 && this.addAudioPhao();
	},
	betMinus: function(){
		this.player.typeBet--;
		if (this.player.typeBet<0) {
			this.player.typeBet = 5;
		}
		this.player.onChangerTypeBet(this.player.typeBet);
		this.sendChangerTypeBet(this.player.typeBet);
		this.RedT.volumeHieuUng !== 0 && this.addAudioPhao();
	},
	addAudioPhao: function(){
		let copy = cc.instantiate(this.RedT.audioPhao.node);
		copy = copy.getComponent(cc.AudioSource);
		copy.volume = this.RedT.volumeHieuUng;
		this.nodeAuto.addChild(copy.node);
		copy.play();
	},
	sendChangerTypeBet:function(bet){
		cc.RedT.send({g:{fish:{typeBet:bet}}});
	},
	onClickAuto: function(){
		if (this.isLock && !!this.player.fish) {
			this.player.fish.suoMe.active = false;
			this.player.fish.unLock(this.player.map);
		}
		this.ponit && (this.shubiao.node.position = this.ponit);
		this.isAuto = !this.isAuto;
		this.player.isLock = this.isLock = false;
		this.spriteAuto.enable = !this.isAuto;
		this.nodeAuto.active   = this.isAuto;
		this.spriteLock.enable = true;
		this.nodeLock.active   = false;
		this.setPoint && this.player.onFire();
	},
	onClickLock: function(){
		if (!!this.player.fish) {
			this.player.fish.suoMe.active = false;
			this.player.fish.unLock(this.player.map);
		}
		this.isLock = !this.isLock;
		this.isAuto = this.player.isLock = false;
		this.spriteLock.enable = !this.isLock;
		this.nodeLock.active   = this.isLock;
		this.spriteAuto.enable = true;
		this.nodeAuto.active   = false;
	},
	reset: function(){
		this.spriteAuto.enable = true;
		this.nodeAuto.active   = false;
		this.spriteLock.enable = true;
		this.nodeLock.active   = false;
	},
});
