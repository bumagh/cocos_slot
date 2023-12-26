
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		nick:           cc.Label,
		balans:         cc.Label,
		bet:            cc.Label,
		iconCoint:      cc.Sprite,
		typeBet:        0,
		nodeChangerbet: cc.Node,
		canhs: {
			default: [],
			type: dragonBones.ArmatureDisplay,
		},
		canh: dragonBones.ArmatureDisplay,

		sungs: {
			default: [],
			type: dragonBones.ArmatureDisplay,
		},
		sung: dragonBones.ArmatureDisplay,

		nodeCanh:  cc.Node,
		nodeSung:  cc.Node,
		isFire: false,
		isLock: false,
		sungFix: 2,
		map: 0,
		money: 0,
	},
	init: function(obj) {
		this.RedT = obj;
		this.fish = null;
		this.bullet = {};
	},
	onInfo: function(data){
		this.nick.string   = data.name;
		this.balans.string = helper.numberWithCommas(data.balans);
		this.money         = data.balans;
		this.bet.string    = helper.numberWithCommas(this.RedT['typeBet'+this.RedT.regGame][data.typeBet]);
		this.typeBet       = data.typeBet;
		this.onTypeBet(data.typeBet);
	},
	onTypeBet: function(type){
		this.canhs.forEach(function(canh, index){
			if (type === index) {
				canh.node.active = true;
			}else{
				canh.node.active = false;
			}
		});
		this.sungs.forEach(function(sung, index){
			if (type === index) {
				sung.node.active = true;
			}else{
				sung.node.active = false;
			}
		});
		this.canh = this.canhs[type];
		this.sung = this.sungs[type];
		this.sung.node.insertChild(this.bet.node);

		let funcCanhEvent1 = function(){
			this.canh.playAnimation(this.RedT.anim_canh[1], 0);
			this.canh.off(dragonBones.EventObject.LOOP_COMPLETE, funcCanhEvent1, this);
		};
		this.canh.on(dragonBones.EventObject.LOOP_COMPLETE, funcCanhEvent1, this);
		this.canh.playAnimation(this.RedT.anim_canh[0], 1);

		let funcSungEvent1 = function(){
			this.sung.off(dragonBones.EventObject.LOOP_COMPLETE, funcSungEvent1, this);
		};
		this.sung.on(dragonBones.EventObject.LOOP_COMPLETE, funcSungEvent1, this);
		this.sung.playAnimation(this.RedT.anim_sung[1], 1);
	},
	onChangerTypeBet: function(type){
		let self = this;
		let funcCanhEvent1 = function(){
			this.canh.playAnimation(this.RedT.anim_canh[1], 0);
			this.canh.off(dragonBones.EventObject.LOOP_COMPLETE, funcCanhEvent1, this);
		};

		let funcCanhEvent2 = function(){
			this.off(dragonBones.EventObject.LOOP_COMPLETE, funcCanhEvent2, this);

			self.canh.node.active = true;
			self.canh.on(dragonBones.EventObject.LOOP_COMPLETE, funcCanhEvent1, self);
			self.canh.playAnimation(self.RedT.anim_canh[0], 1);
		};
		this.canh.on(dragonBones.EventObject.LOOP_COMPLETE, funcCanhEvent2, this.canh);
		this.canh.playAnimation(this.RedT.anim_canh[2], 1);

		this.canh = this.canhs[type];

		let funcSungEvent1 = function(){
			this.sung.off(dragonBones.EventObject.LOOP_COMPLETE, funcSungEvent1, this);
		};

		let funcSungEvent2 = function(){
			this.off(dragonBones.EventObject.LOOP_COMPLETE, funcSungEvent2, this);

			self.sung.node.active = true;
			self.sung.on(dragonBones.EventObject.LOOP_COMPLETE, funcSungEvent1, self);
			self.sung.playAnimation(self.RedT.anim_sung[1], 1);
		};
		this.sung.on(dragonBones.EventObject.LOOP_COMPLETE, funcSungEvent2, this.sung);
		this.sung.playAnimation(this.RedT.anim_sung[2], 1);

		this.sung = this.sungs[type];
		this.sung.node.insertChild(this.bet.node);

		this.bet.string = helper.numberWithCommas(this.RedT['typeBet'+this.RedT.regGame][type]);
		this.typeBet    = type;
	},
	onFire: function(point = null){
		let checkBet = this.RedT['typeBet'+this.RedT.regGame][this.typeBet];
		checkBet = this.money-checkBet;
		if (checkBet < 0) {
			this.RedT.dialog.showNap(true);
			if (this.RedT.Game.isAuto) {
				this.RedT.Game.onClickAuto();
			}
			this.RedT.Game.isFire = false;
			this.isLock = false;
		}else{
			if ((this.RedT.Game.isAuto || this.RedT.Game.isFire || this.isLock) && !this.isFire) {
				this.money = checkBet;
				this.balans.string = helper.numberWithCommas(checkBet);
				this.isFire = true;
				let bullet = cc.instantiate(this.RedT.Game.bullet[this.typeBet]);
				bullet = bullet.getComponent('Fish_bullet');
				let position = null;
				let lock     = false;
				let ID = this.RedT.Game.bulletID++;

				this.bullet[ID] = bullet;
				if (!!point && !this.isLock) {
					position = point;
				}else{
					if (this.isLock && !!this.fish) {
						lock = true;
						let getPoint = this.fish.getPoint();
						position = getPoint.position;
						this.changerAngle(position);
						bullet.isLock = true;
						this.fish['bullet'+this.map][ID] = bullet;
						this.RedT.Game.ponit = position;
						cc.RedT.send({g:{fish:{bullet:{id:ID, f:this.fish.id}}}});
						if (getPoint.stop === true) {
							this.fish.PhaHuy(false);
						}
					}else{
						position = this.RedT.Game.shubiao.node.position;
					}
				}
				!lock && cc.RedT.send({g:{fish:{bullet:{id:ID, x:position.x, y:position.y}}}});
				bullet.id = ID;
				bullet.isMe = true;
				bullet.bullet = this.typeBet;
				bullet.init(this, position);

				// Audio
				let copy = cc.instantiate(this.RedT.audioFire.node);
				copy = copy.getComponent(cc.AudioSource);
				copy.volume = this.RedT.volumeHieuUng;
				this.RedT.Game.nodeAudio.addChild(copy.node);
				copy.play();

				this.RedT.Game.nodeDan.addChild(bullet.node);
				this.sung.playAnimation('fire', 1);
				setTimeout(function(){
					this.isFire = false;
					this.onFire();
				}.bind(this), this.RedT.Game.bulletSpeed);
			}
		}
	},
	otherBullet: function(data){
		this.balans.string = helper.numberWithCommas(data.money);
		let position = null;
		let ID = this.RedT.Game.bulletID++;
		let bullet = cc.instantiate(this.RedT.Game.bullet[this.typeBet]);
		bullet = bullet.getComponent('Fish_bullet');

		if (void 0 !== data.f) {
			let fish = this.RedT.Game.fish[data.f];
			if (void 0 === fish) {
				return void 0;
			}
			let getPoint = fish.getPoint();
			position = getPoint.position;
			bullet.isLock = true;
			fish['bullet'+this.map][ID] = bullet;
			if (getPoint.stop === true) {
				fish.PhaHuy(false);
			}
		}else{
			position = cc.v2(data.x, data.y);
		}

		bullet.init(this, position);
		bullet.bullet = this.typeBet;

		this.changerAngle(position);

		this.RedT.Game.nodeDan.addChild(bullet.node);
		this.sung.playAnimation('fire', 1);
	},
	changerAngle: function(angle){
		let positionUser = this.RedT.Game.node.convertToWorldSpaceAR(angle);
		let position1_1 = this.node.convertToNodeSpaceAR(positionUser);
		position1_1 = cc.misc.radiansToDegrees(Math.atan2(position1_1.x*this.RedT.Game.sungFixD[this.sungFix].x, position1_1.y*this.RedT.Game.sungFixD[this.sungFix].y));
		///**
		if(position1_1 > 90){
			//position1_1 = 90;
			this.isLock = this.isFire = false;
		}
		if(position1_1 < -90){
			//position1_1 = -90;
			this.isLock = this.isFire = false;
		}
		this.nodeSung.angle = position1_1;
		this.nodeCanh.angle = this.nodeSung.angle;
	},
	reset: function(){

	},
});
