
cc.Class({
	extends: cc.Component,

	properties: {
		nodeUnSelect: cc.Node,
		nodeSelect:   cc.Node,
	},
	select: function() {
		this.nodeUnSelect.active = false;
		this.nodeSelect.active   = true;
		this.node.pauseSystemEvents();
	},
	unselect: function() {
		this.nodeUnSelect.active = true;
		this.nodeSelect.active   = false;
		this.node.resumeSystemEvents();
	},
});
