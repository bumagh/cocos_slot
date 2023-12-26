
cc.Class({
	extends: cc.Component,
	properties: {
		pressedScale: 1,
		transDuration: 0
	},
	onLoad () {
		this.initScale = this.node.scale;
		this.scaleOnAction  = cc.scaleTo(this.transDuration, this.pressedScale);
		this.scaleOffAction = cc.scaleTo(this.transDuration, this.initScale);
	},
	onEnable: function() {
		this.node.on(cc.Node.EventType.MOUSE_ENTER, this.eventOnHover,  this);
		this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.eventOffHover, this);
	},
	onDisable: function() {
		this.node.off(cc.Node.EventType.MOUSE_ENTER, this.eventOnHover,  this);
		this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.eventOffHover, this);
	},
	eventOnHover: function(e){
		this.node.stopAllActions();
		this.node.runAction(this.scaleOnAction);
	},
	eventOffHover: function(e){
		this.node.stopAllActions();
		this.node.runAction(this.scaleOffAction);
	},
});
