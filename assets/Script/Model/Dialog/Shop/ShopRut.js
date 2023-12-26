
var Bank = require('Bank');

cc.Class({
	extends: cc.Component,

	properties: {
		header:    cc.Node,
		Bank:      Bank,
	},
	init(){
	 
		this.Bank.init();
		this.body = [this.Bank];
		this.header = this.header.children.map(function(obj) {
			return obj.getComponent('itemHeadMenu');
		});
	},
	onSelectHead: function(event, name){
		this.header.forEach(function(header) {
			if (header.node.name === name) {
				header.select();
			}else{
				header.unselect();
			}
		});
		this.body.forEach(function(body) {
			if (body.node.name === name) {
				body.node.active = true;
			}else{
				body.node.active = false;
			}
		});
	},
	superView:function(name){
		 
	},
	onData: function(data){
		if (!!data.bank){
			this.Bank.onData(data.bank);
		}
	},
});
