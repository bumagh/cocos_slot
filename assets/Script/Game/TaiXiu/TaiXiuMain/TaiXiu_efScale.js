
cc.Class({
	extends: cc.Component,
	play() {
		this.node.runAction(
			cc.repeatForever(
				cc.sequence(
					cc.scaleTo(0.4, 0.4),
					cc.scaleTo(0.4, 0.4),
				)
			)
		);
	},
	stop(){
		this.node.stopAllActions();
		this.node.scale = 0.4;
	},
});
