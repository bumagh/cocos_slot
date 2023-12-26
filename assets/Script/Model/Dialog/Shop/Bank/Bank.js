
cc.Class({
	extends: cc.Component,

	properties: {
		header: cc.Node,
		nap:    cc.Node,
		atm:    cc.Node,
		rut:    cc.Node,
	},
	init(){
		this.body   = [];
		if(this.nap){
			this.nap = this.nap.getComponent('bankNap');
			this.body.push(this.nap);
		}
		if(this.atm){
			this.atm = this.atm.getComponent('bankATM');
			this.body.push(this.atm);
		}
		
		if(this.rut){
			this.rut = this.rut.getComponent('bankRut');
			this.rut.init();
			this.body.push(this.rut);
		}
		console.log(this.body);

		
		this.header = this.header.children.map(function(obj) {
			return obj.getComponent('itemContentMenu');
		});
	},
	onSelectHead: function(event, name){
		this.header.map(function(header) {
			if (header.node.name == name) {
				header.select();
			}else{
				header.unselect();
			}
		});
		this.body.map(function(body) {
			if (body.node.name == name) {
				body.node.active = true;
			}else{
				body.node.active = false;
			}
		});
	},
	onData: function(data){
		if (!!data.list && this.nap) {
			this.nap.onData(data.list);
		}
		if (void 0 !== data.atm && this.atm) {
			this.atm.onData(data.atm);
		}
	},
});
