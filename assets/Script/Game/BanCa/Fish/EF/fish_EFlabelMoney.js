
cc.Class({
    extends: cc.Component,
    onLoad () {
    	this.node.runAction(cc.sequence(cc.scaleTo(0.1, 1.5), cc.scaleTo(0.1, 1), cc.delayTime(0.7), cc.fadeTo(0.1, 50), cc.callFunc(function(){
			this.node.destroy();
		}, this)));
    },
});
