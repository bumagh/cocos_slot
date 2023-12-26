
cc.Class({
	extends: cc.Component,

	properties: {
		anim: dragonBones.ArmatureDisplay,
		typeBet: 0,
	},
	onLoad(){
		this.onDie = function() {
			this.node.destroy();
		}
		this.anim.on(dragonBones.EventObject.COMPLETE, this.onDie, this);
		this.anim.playAnimation('kyby_zidan' + this.typeBet + '-hit', 1);
	},
});
