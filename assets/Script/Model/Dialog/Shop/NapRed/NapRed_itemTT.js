
cc.Class({
	extends: cc.Component,

	properties: {
		bg: cc.Node,
		menhgia: cc.Label,
		red: cc.Label,
	},

	init: function(menhgia, red) {
		this.menhgia.string   = menhgia;
		this.red.string       = red;
	},
});
