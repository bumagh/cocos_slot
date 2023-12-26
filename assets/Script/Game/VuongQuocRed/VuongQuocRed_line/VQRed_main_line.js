
cc.Class({
	extends: cc.Component,

	init(obj){
		this.RedT = obj;
		return this;
	},
	onEnable: function() {
		this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onhover, this);
		this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.offhover, this);
	},
	onDisable: function() {
		this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onhover, this);
		this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.offhover, this);
	},
	onhover: function(){
		this.node.children[1].active = true;
	},
	offhover: function(){
		this.node.children[1].active = false;
	},
	onEf: function(){
		this.onhover();
		this.node.pauseSystemEvents();
	},
	offEf: function(){
		this.offhover();
		this.node.resumeSystemEvents();
	},
});
