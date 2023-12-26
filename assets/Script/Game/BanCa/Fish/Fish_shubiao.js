
cc.Class({
	extends: cc.Component,

	properties: {
		collider:    cc.CircleCollider,
		dragonBones: dragonBones.ArmatureDisplay,
		isSelect:    false,
	},
	init:function(obj){
		this.RedT = obj;
	},
	offLock: function(){
		this.collider.enabled = false;
	},
	onCollisionEnter: function (other) {
		if (other.node.group !== 'tuong') {
			if (this.isSelect === false) {
				this.isSelect = true;
				if (this.RedT.player.fish) {
					this.RedT.player.fish.suoMe.active = false;
					this.RedT.player.fish.unLock(this.RedT.player.map);
					cc.RedT.send({g:{fish:{unlock:true}}});
				}
				let fish = this.RedT.fish[other.node.id];
				if (fish !== void 0) {
					fish['player'+this.RedT.player.map] = this.RedT.player;
					this.RedT.player.fish = fish;
					this.RedT.player.isLock = true;
					this.RedT.player.fish.updateGroup();
					this.RedT.player.fish.suoMe.active = true;
					this.RedT.player.onFire();
					cc.RedT.send({g:{fish:{lock:fish.id}}});
				}
			}
		}else{
			this.isSelect = false;
			if (this.RedT.player.fish) {
				this.RedT.player.fish.suoMe.active = false;
				this.RedT.player.fish.unLock(this.RedT.player.map);
				cc.RedT.send({g:{fish:{unlock:true}}});
			}
		}
		this.offLock();
	},
	fire: function(position){
		if (this.RedT.isLock) {
			this.collider.enabled = true;
			this.RedT.angleSung(position);
			this.RedT.shubiao.dragonBones.playAnimation('newAnimation', 1);
		}else{
			this.RedT.angleSung(position, true);
		}
	},
});
