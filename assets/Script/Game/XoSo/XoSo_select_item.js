
cc.Class({
	extends: cc.Component,

	properties: {
		nodeOn:  cc.Node,
		nodeOff: cc.Node,
		text:    cc.Label,
		select:  false,
	},
	init: function(obj){
		this.RedT = obj;
	},
	onChanger: function(){
		this.select         = !this.select;
		this.nodeOn.active  = this.select;
		this.nodeOff.active = !this.select;
	},
	onClickSelect: function() {
		this.onChanger();
		this.RedT.refreshH(this);
	},
	selectOn: function(){
		this.select         = true;
		this.nodeOn.active  = true;
		this.nodeOff.active = false;
	},
	selectOff: function(){
		this.select         = false;
		this.nodeOn.active  = false;
		this.nodeOff.active = true;
	},
});
