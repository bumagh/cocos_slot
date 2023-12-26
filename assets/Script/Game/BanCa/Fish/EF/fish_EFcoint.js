
cc.Class({
	extends: cc.Component,

	properties: {
		coint: dragonBones.ArmatureDisplay,
	},
	init: function(player, fish, data) {
		this.coint.on(dragonBones.EventObject.LOOP_COMPLETE, this.COMPLETE, this);

		this.node.x = fish.x + Math.floor(Math.random()*(data.x*2+1))-data.x;
		this.node.y = fish.y + Math.floor(Math.random()*(data.y*2+1))-data.y;

		player.RedT.Game.nodeCoint.addChild(this.node);
		data = null;

		let position = player.iconCoint.node.parent.convertToWorldSpaceAR(player.iconCoint.node.position);
		this.position = this.node.parent.convertToNodeSpaceAR(position);
		this.changer = false;
	},
	COMPLETE:function(){
		if (this.changer === false) {
			this.coint.playAnimation('rotation', 0);
			let dist = this.node.position.sub(this.position).mag();
			dist = dist/800;
			this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(dist, 0.4), cc.moveTo(dist, this.position)), cc.callFunc(function(){
				this.node.destroy();
			}, this)));
		}
		this.changer = true;
	},
});
