
cc.Class({
	extends: cc.Component,

	properties: {
		fish:     dragonBones.ArmatureDisplay,
		shadow:   dragonBones.ArmatureDisplay,
		collider: cc.PolygonCollider,
		anim:     cc.Animation,
		head:     cc.Node,
		end:      cc.Node,
		suoMe:    cc.Node,
		suoOther: cc.Node,
		speed:    1,
		define:   false,
	},
	init: function(obj, data){
		this.define      = true;
		this.RedT        = obj;
		this.id          = data.id;
		this.node.id     = data.id;
		this.node.fish   = data.f;
		this.node.zIndex = data.f;
		this.player1 = false;
		this.player2 = false;
		this.player3 = false;
		this.player4 = false;
		this.bullet1 = {};
		this.bullet2 = {};
		this.bullet3 = {};
		this.bullet4 = {};
		if (!!this.anim) {
			this.anim.on('finished', this.onFinish, this);
			if (void 0 !== data.r) {
				let clip = this.anim.getClips()[data.r].name;
				this.anim.play(clip);
				this.animState = this.anim.getAnimationState(clip);
			}
			if (void 0 !== data.a) {
				this.anim.play(data.a);
				this.animState = this.anim.getAnimationState(data.a);
			}
			this.animState.speed = this.speed;
			if (void 0 !== data.t) {
				this.animState.time = data.t;
			}
		}
	},
	onFinish: function(){
		if (this.node) {
			this.clear();
			this.node.destroy();
		}
	},
	onDelete: function(){
		this.node.destroy();
	},
	updateGroup: function() {
		let group = 'fish';
		if (!!this.player1) {
			group += '1';
		}
		if (!!this.player2) {
			group += '2';
		}
		if (!!this.player3) {
			group += '3';
		}
		if (!!this.player4) {
			group += '4';
		}
		if (this.node) {
			this.node.group = group;
		}
		this.updateSuoOther();
	},
	unLock: function(map){
		let player = this['player'+map];
		if (!!player) {
			player.isLock = false;
			player.fish   = null;
		}
		Object.entries(this['bullet'+map]).forEach(function(bullet){
			bullet[1].isLock = false;
			bullet[1].updateGroup();
			delete this['bullet'+map][bullet[0]];
		}.bind(this));
		this['player'+map] = false;
		this.updateGroup();
	},
	updateSuoOther: function(){
		let suoding = false;
		if (!!this.player1 && this.player1 !== this.RedT.player) {
			suoding = true;
		}
		if (!!this.player2 && this.player2 !== this.RedT.player) {
			suoding = true;
		}
		if (!!this.player3 && this.player3 !== this.RedT.player) {
			suoding = true;
		}
		if (!!this.player4 && this.player4 !== this.RedT.player) {
			suoding = true;
		}
		this.suoOther.active = suoding;
	},
	getPosition: function(){
		let point = this.node.parent.convertToWorldSpaceAR(this.node.position);
		return this.RedT.node.convertToNodeSpaceAR(point);
	},
	getPoint: function(){
		let width  = (this.RedT.node.width/2)-15;
		let height = (this.RedT.node.height/2)-15;

		let headPoint = this.head.parent.convertToWorldSpaceAR(this.head.position);
		let position  = this.RedT.node.convertToNodeSpaceAR(headPoint);

		let headX = Math.abs(position.x);
		let headY = Math.abs(position.y);

		//console.log(width, headX);
		if (width < headX || height < headY) {
			if (this.end) {
				let endPoint    = this.end.parent.convertToWorldSpaceAR(this.end.position);
				let positionEnd = this.RedT.node.convertToNodeSpaceAR(endPoint);
				let endX = Math.abs(positionEnd.x);
				let endY = Math.abs(positionEnd.y);

				let check = this.node.scaleX*this.node.parent.scaleX;

				if (width < headX){
					let headXcheck = headX-(headX-width);
					if (endX > headXcheck) {
						return {position:positionEnd, stop:true};
					}
					if (check === 1) {
						position.x = position.x+(headX-width);
					}else{
						position.x = position.x-(headX-width);
					}
				}
				if (height < headY){
					let headYcheck = headY-(headY-height);
					if (endY > headYcheck) {
						return {position:positionEnd, stop:true};
					}
					if (check === 1) {
						position.y = position.y+(headY-height);
					}else{
						position.y = position.y-(headY-height);
					}
				}
			}
		}
		return {position:position};
	},
	PhaHuy: function(ngam = true){
		this.collider.enabled = false;
		!!this.anim && ngam === true && this.anim.stop();
		this.clear();

		this.suoMe.active    = false;
		this.suoOther.active = false;

		ngam === true && (this.fish.timeScale = this.fish.timeScale/0.4);
		ngam === true && (this.shadow.timeScale = this.fish.timeScale/0.4);
	},
	clear: function(){
		if (this.define) {
			if (this.RedT !== void 0) {
				delete this.RedT.fish[this.node.id];
			}
			if (!!this.player1) {
				this.player1.isLock = false;
				this.player1.fish   = null;
				delete this.player1;
			}
			Object.entries(this.bullet1).forEach(function(bullet){
				bullet[1].isLock = false;
				bullet[1].updateGroup();
				delete this.bullet1[bullet[0]];
			}.bind(this));
			if (!!this.player2) {
				this.player2.isLock = false;
				this.player2.fish   = null;
				delete this.player2;
			}
			Object.entries(this.bullet2).forEach(function(bullet){
				bullet[1].isLock = false;
				bullet[1].updateGroup();
				delete this.bullet2[bullet[0]];
			}.bind(this));
			if (!!this.player3) {
				this.player3.isLock = false;
				this.player3.fish   = null;
				delete this.player3;
			}
			Object.entries(this.bullet3).forEach(function(bullet){
				bullet[1].isLock = false;
				bullet[1].updateGroup();
				delete this.bullet3[bullet[0]];
			}.bind(this));
			if (!!this.player4) {
				this.player4.isLock = false;
				this.player4.fish   = null;
				delete this.player4;
			}
			Object.entries(this.bullet4).forEach(function(bullet){
				bullet[1].isLock = false;
				bullet[1].updateGroup();
				delete this.bullet4[bullet[0]];
			}.bind(this));
		}
	},
	onDestroy:function(){
		this.onFinish();
		delete this.RedT;
	},
});
