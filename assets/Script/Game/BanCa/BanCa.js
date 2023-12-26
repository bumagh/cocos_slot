
var helper = require('Helper');
var notice = require('Notice');
var dialog = require('BanCa_dialog');

var Player = require('Fish_player');
var Game   = require('Fish_game');

cc.Class({
	extends: cc.Component,

	properties: {
		avatar: cc.Sprite,

		audioClick: cc.AudioSource,
		audioPhao:  cc.AudioSource,
		audioFire:  cc.AudioSource,

		audioJiaqian: cc.AudioSource,
		audioReward1: cc.AudioSource,
		audioReward2: cc.AudioSource,
		audioReward3: cc.AudioSource,

		nodeHome: cc.Node,
		nodeGame: cc.Node,
		nick:     cc.Label,
		balans:   cc.Label,
		loading:  cc.Node,
		notice:   notice,
		dialog:   dialog,
		Game:     Game,
		players: {
			default: [],
			type: Player,
		},
		typeBet1: {
			default: [],
			type: cc.String,
		},
		typeBet2: {
			default: [],
			type: cc.String,
		},
		typeBet3: {
			default: [],
			type: cc.String,
		},

		anim_canh: {
			default: [],
			type: cc.String,
		},
		anim_sung: {
			default: [],
			type: cc.String,
		},
		cointMe:    cc.SpriteFrame,
		cointOther: cc.SpriteFrame,
	},
	onLoad: function(){
		this.volumeNhacNen = 0;
		this.volumeHieuUng = 0;

		cc.RedT.audio.bg.pause();
		cc.RedT.audio.bg = cc.RedT.audio.fishHall;

		cc.RedT.inGame = this;
		cc.RedT.send({scene:'bc'});

		this.nick.string   = cc.RedT.user.name;
		this.balans.string = helper.numberWithCommas(cc.RedT.user.red);
		this.players.forEach(function(obj){
			obj.init(this);
		}.bind(this));
		this.Game.init(this);

		this.PhysicsManager = cc.director.getPhysicsManager();
		this.PhysicsManager.enabled = true;
		this.PhysicsManager.gravity = cc.v2();

		this.CollisionManager = cc.director.getCollisionManager();
		this.CollisionManager.enabled = true;

		this.dialog.init();
		this.room = {1:100,2:500, 3:1000}; // phòng 100 - 500 - 1000

		this.setAvatar(cc.RedT.user.avatar);
	},
	setAvatar: function(data){
		data = data>>0;
		if (cc.RedT.avatars[data] !== void 0) {
			this.avatar.spriteFrame = cc.RedT.avatars[data];
		}else{
			this.avatar.spriteFrame = cc.RedT.avatars[0];
		}
	},
	onRegGame: function(event){
		this.playClick();
		this.regGame = event.target.name;
		this.dialog.showNap();
	},
	onData: function(data) {
		if (void 0 !== data.fish){
			this.fishData(data.fish);
		}
		if (void 0 !== data.fishs){
			this.fishsData(data.fishs);
		}
		if (void 0 !== data.round){
			this.round();
		}
		if (void 0 !== data.scene){
			this.scene(data.scene);
		}
		if (void 0 !== data.meMap){
			this.MeMap = data.meMap;
			this.dataMeMap(data.meMap);
		}
		if (void 0 !== data.infoGhe){
			this.dataInfoGhe(data.infoGhe);
		}
		if (void 0 !== data.ingame){
			this.dataIngame(data.ingame);
		}
		if (void 0 !== data.outgame){
			this.dataOutGame(data.outgame);
		}
		if (void 0 !== data.other){
			this.dataOther(data.other);
		}
		if (void 0 !== data.me){
			this.dataMe(data.me);
		}
		if (void 0 !== data.otherEat){
			this.otherEat(data.otherEat);
		}
		if (void 0 !== data.meEat){
			this.meEat(data.meEat);
		}
		if (void 0 !== data.lock){
			this.fishLock(data.lock);
		}
		if (void 0 !== data.unlock){
			this.fishUnLock(data.unlock);
		}
		if (void 0 !== data.notice){
			this.notice.show(data.notice);
		}
		if (void 0 !== data.log){
			this.dialog.Fish_history.onData(data.log);
		}
		if (void 0 !== data.user){
			cc.RedT.userData(data.user);
		}
		if (!!data.mini){
			cc.RedT.MiniPanel.onData(data.mini);
		}
		if (!!data.TopHu){
			cc.RedT.MiniPanel.TopHu.onData(data.TopHu);
		}
		if (!!data.taixiu){
			cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(data.taixiu);
		}
		if (void 0 !== data.vipp) {
			cc.RedT.MiniPanel.Dialog.VipPoint.onData(data.vipp);
		}
	},
	round: function(){
		this.fish = {};
		this.Game.nodeFish.destroyAllChildren();
		let hailang = cc.instantiate(this.Game.ef_hailang);
		hailang = hailang.getComponent(dragonBones.ArmatureDisplay);
		this.Game.nodeFish.addChild(hailang.node);
		hailang.playAnimation('hailang', 1);
		hailang.on(dragonBones.EventObject.COMPLETE, function(){
			this.node.destroy();
		}, hailang);
	},
	otherEat: function(data){
		let fish = this.Game.fish[data.id];
		if (void 0 !== fish) {
			let position = fish.node.position;
			if (fish.inGroup) {
				let scaleX = fish.node.parent.scaleX;
				let angle  = fish.node.parent.angle;
				position = fish.getPosition();
				this.Game.nodeFish.insertChild(fish.node);
				fish.node.position = position;
				fish.node.scaleX   = scaleX;
				fish.node.angle    = angle;
			}
			fish.PhaHuy();
			let player = this.players[data.map-1];
			let efcoint = this.Game.efcoint[fish.node.fish];
			let ef = Math.floor(Math.random()*(efcoint.max-efcoint.min+1))+efcoint.min;
			for (let i = 0; i < ef; i++) {
				var coint = cc.instantiate(this.Game.cointOther);
				coint = coint.getComponent('fish_EFcoint');
				coint.init(player, position, efcoint);
			}
			var money = cc.instantiate(this.Game.labelOther);
			money = money.getComponent(cc.Label);
			money.string = helper.numberWithCommas(data.money);
			money.node.position = position;
			this.Game.nodeLabel.addChild(money.node);
			player.balans.string = helper.numberWithCommas(data.m);
			fish.node.runAction(cc.sequence(cc.delayTime(0.6), cc.spawn(cc.scaleTo(0.1, fish.node.scaleX*0.3, 0.3), cc.fadeTo(0.1, 50)), cc.callFunc(function(){
				this.onDelete();
			}, fish)));

			// Audio
			let copy = cc.instantiate(this.audioJiaqian.node);
			copy = copy.getComponent(cc.AudioSource);
			copy.volume = this.volumeHieuUng;
			this.Game.nodeAudio.addChild(copy.node);
			copy.play();
			this.EFBom(efcoint.ef, position);
		}
	},
	meEat: function(data){
		let fish = this.Game.fish[data.id];
		if (void 0 !== fish) {
			let position = fish.node.position;
			if (fish.inGroup) {
				let scaleX = fish.node.parent.scaleX;
				let angle  = fish.node.parent.angle;
				position = fish.getPosition();
				this.Game.nodeFish.insertChild(fish.node);
				fish.node.position = position;
				fish.node.scaleX   = scaleX;
				fish.node.angle    = angle;
			}
			fish.PhaHuy();
			let efcoint = this.Game.efcoint[fish.node.fish];
			let ef = Math.floor(Math.random()*(efcoint.max-efcoint.min+1))+efcoint.min;
			for (let i = 0; i < ef; i++) {
				var coint = cc.instantiate(this.Game.cointMe);
				coint = coint.getComponent('fish_EFcoint');
				coint.init(this.Game.player, position, efcoint);
			}
			var money = cc.instantiate(this.Game.labelMe);
			money = money.getComponent(cc.Label);
			money.string = helper.numberWithCommas(data.money);
			money.node.position = position;
			this.Game.nodeLabel.addChild(money.node);
			this.Game.player.money = data.m;
			this.Game.player.balans.string = helper.numberWithCommas(data.m);
			fish.node.runAction(cc.sequence(cc.delayTime(0.7), cc.spawn(cc.scaleTo(0.2, fish.node.scaleX*0.3, 0.3), cc.fadeTo(0.2, 50)), cc.callFunc(function(){
				this.onDelete();
			}, fish)));

			// Audio
			let copy = cc.instantiate(this.audioReward1.node);
			copy = copy.getComponent(cc.AudioSource);
			copy.volume = this.volumeHieuUng;
			this.Game.nodeAudio.addChild(copy.node);
			copy.play();
			this.EFBom(efcoint.ef, position);
		}
	},
	fishData: function(data, fishs = null) {
		if (data) {
			if (void 0 !== data.g) {
				var fish = cc.instantiate(this.Game['x'+data.g]);
				fish = fish.getComponent('Fish_fish_group');
				fish.init(this.Game, data);
				this.Game.nodeFish.addChild(fish.node);
			}else{
				var fish = cc.instantiate(this.Game.fishPrefab[data.f-1]);
				fish = fish.getComponent('Fish_fish');
				fish.init(this.Game, data);
				this.Game.fish[data.id] = fish;
				this.Game.nodeFish.addChild(fish.node);
			}
			if (fishs && fishs.t !== void 0) {
				fish.node.runAction(cc.sequence(cc.delayTime(fishs.t), cc.callFunc(function(){
					fishs.c++;
					if (fishs.c < fishs.f.length) {
						this.fishData(fishs.f[fishs.c], fishs);
					}
				}, this)));
			}
		}
	},
	fishsData: function(data) {
		if(data.t !== void 0){
			this.fishsComp(data);
		} else if(!!data.fs){
			data.fs.forEach(function(fish){
				if(fish.t !== void 0){
					this.fishsComp(fish);
				}else{
					this.fishData(fish);
				}
			}.bind(this));
		}else{
			data.f.forEach(function(fish){
				this.fishData(fish);
			}.bind(this));
		}
	},
	fishsComp: function(data) {
		data.c = 0;
		this.fishData(data.f[0], data);
	},
	EFBom: function(ef, position){
		if (ef === 2) {
			let Audio2 = cc.instantiate(this.audioReward2.node);
			Audio2 = Audio2.getComponent(cc.AudioSource);
			Audio2.volume = this.volumeHieuUng;
			this.Game.nodeAudio.addChild(Audio2.node);
			Audio2.play();
			let EF2 = cc.instantiate(this.Game.ef_bom);
			EF2.position = position;
			this.Game.nodeEF.addChild(EF2);
			///**
			if (!cc.sys.isBrowser) {
				jsb.reflection.callStaticMethod('org/cocos2dx/javascript/Rumble', 'once', '(I)V', 200);
			}
			//*/
			this.Game.boxAnim.play('Rung2');
		}else if (ef === 3) {
			let Audio3 = cc.instantiate(this.audioReward3.node);
			Audio3 = Audio3.getComponent(cc.AudioSource);
			Audio3.volume = this.volumeHieuUng;
			this.Game.nodeAudio.addChild(Audio3.node);
			Audio3.play();
			let EF3 = cc.instantiate(this.Game.ef_gold_bom);
			EF3.position = position;
			this.Game.nodeEF.addChild(EF3);
			///**
			if (!cc.sys.isBrowser) {
				jsb.reflection.callStaticMethod('org/cocos2dx/javascript/Rumble', 'once', '(I)V', 500);
			}
			//*/
			this.Game.boxAnim.play('Rung1');
		}
	},
	otherBullet: function(data){
		this.players[data.map-1].otherBullet(data);
	},
	dataOther: function(data) {
		if (!!data.money) {
			let player = this.players[data.map-1];
			player.balans.string = helper.numberWithCommas(data.money);
		}
		if (!!data.updateType) {
			this.updateType(data.updateType);
		}
		if (!!data.bulllet) {
			this.otherBullet(data.bulllet);
		}
	},
	dataMe: function(data) {
		if (void 0 !== data.money) {
			this.Game.player.money = data.money;
			this.Game.player.balans.string = helper.numberWithCommas(data.money);
		}
		if (!!data.nap) {
			this.loading.active = false;
			this.dialog.onBack();
		}
	},
	updateType: function(data){
		this.players[data.map-1].onChangerTypeBet(data.type);
	},
	dataInfoGhe: function(data) {
		this.loading.active = false;
		this.dialog.onBack();
		this.players.forEach(function(obj, index){
			let dataT = data[index];
			if (void 0 === dataT || dataT.data === null) {
				obj.node.active = false;
			}else{
				if (this.MeMap === dataT.ghe) {
					this.Game.player = obj;
					obj.iconCoint.spriteFrame = this.cointMe;
					obj.nodeChangerbet.active = true;
					obj.isMe = true;
				}
				if (dataT.ghe === 1 || dataT.ghe === 2) {
					obj.sungFix = 1;
				}else{
					obj.sungFix = 2;
				}
				obj.node.active = true;
				obj.onInfo(dataT.data);
			}
		}.bind(this));
		this.volumeHieuUng !== 0 && this.Game.addAudioPhao();
	},
	dataMeMap: function(data) {
		if (data === 1 || data === 2) {
			this.Game.sungFix = 1;
		}else{
			this.Game.sungFix = 2;
		}
		this.nodeHome.active = false;
		this.nodeGame.active = true;
		this.nodeGame.y = 0;
		this.nodeGame.x = 0;
	},
	dataIngame: function(data) {
		let obj = this.players[data.ghe-1];
		obj.iconCoint.spriteFrame = this.cointOther;
		obj.node.active = true;
		obj.onInfo(data.data);
		if (data.ghe === 1 || data.ghe === 2) {
			obj.sungFix = 1;
		}else{
			obj.sungFix = 2;
		}

		let fishs = this.Game.nodeFish.children.map(function(fish){
			let h = {};
			if (fish.g !== void 0) {
				fish = fish.getComponent('Fish_fish_group');
				if (!fish || !fish.animState || !fish.fish) {
					return void 0;
				}
				h.g = fish.g;
				h.a = fish.animState.name;
				h.t = fish.animState.time;
				h.f = fish.fish.map(function(obj){
					if (!!obj.node) {
						return {id:obj.node.id, f:obj.node.fish};
					}
					return void 0;
				});
			}else{
				fish = fish.getComponent('Fish_fish');
				if (!fish || !fish.animState || !fish.node) {
					return void 0;
				}
				h.id = fish.id;
				h.a  = fish.animState.name;
				h.t  = fish.animState.time;
				h.f  = fish.node.fish;
			}
			return h;
		});

		let bullets = this.Game.nodeDan.children.map(function(bulllet){
			bulllet = bulllet.getComponent('Fish_bullet');
			if(!bulllet){
				return void 0;
			}
			return {a:bulllet.node.angle, x:bulllet.node.x, y:bulllet.node.y, type:bulllet.node.name, vx:bulllet.body.linearVelocity.x, vy:bulllet.body.linearVelocity.y};
		});
		cc.RedT.send({g:{fish:{getScene:{f:fishs, b:bullets, g:data.ghe}}}});
	},
	dataOutGame: function(data) {
		this.players[data-1].node.active = false;
	},
	backGame: function(){
		this.playClick();
		this.loading.active = true;
		void 0 !== this.timeOut && clearTimeout(this.timeOut);
		cc.director.loadScene('MainGame');
	},
	fishLock: function(data){
		let fish = this.Game.fish[data.f];
		let player = this.players[data.map-1];
		if (void 0 !== fish) {
			fish['player'+data.map] = player;
			player.fish = fish;
			fish.updateGroup();
		}
	},
	fishUnLock: function(data){
		let player = this.players[data-1];
		if (!!player.fish) {
			player.fish.unLock(data);
		}
	},
	signOut: function(){
		void 0 !== this.timeOut && clearTimeout(this.timeOut);
		cc.director.loadScene('MainGame', function(){
			cc.RedT.inGame.signOut();
		});
	},
	playClick: function(){
		this.volumeHieuUng !== 0 && this.audioClick.play();
	},
	scene: function(data){
		data.f.forEach(function(fish){
			this.fishData(fish);
		}.bind(this));
		data.b.forEach(function(bulllet){
			!!bulllet && this.sceneBullet(bulllet);
		}.bind(this));
	},
	sceneBullet: function(data){
		let a    = data.a>>0;
		let x    = data.x>>0;
		let y    = data.x>>0;
		let type = data.type>>0;
		let vx   = data.vx>>0;
		let vy   = data.vy>>0;

		let bullet = this.Game.bullet[type-1];
		if (void 0 !== bullet) {
			bullet = cc.instantiate(bullet);
			bullet = bullet.getComponent('Fish_bullet');
			bullet.node.x = x;
			bullet.node.y = y;
			bullet.node.angle = a;
			bullet.bullet = type-1;
			bullet.body.linearVelocity = cc.v2(vx, vy);
			bullet.RedT = this.Game.player;
			this.Game.nodeDan.addChild(bullet.node);
		}
	},
});
