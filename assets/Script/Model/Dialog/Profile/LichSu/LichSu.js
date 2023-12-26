
cc.Class({
	extends: cc.Component,

	properties: {
		page:         cc.Prefab,
		header:       cc.Node,
		lichSuNap:    cc.Node,
		lichSuRut:    cc.Node,
		lichSuChuyen: cc.Node,
		lichSuBank:   cc.Node,
	},
	onLoad(){
		this.page = cc.instantiate(this.page);
        this.page.y = -279;
        this.page.active = false;
        this.node.addChild(this.page);
        this.page = this.page.getComponent('Pagination');
        this.page.init(this);

		this.history      = "LichSuNap";
		this.lichSuNap    = this.lichSuNap.getComponent('LichSuNap');
		this.lichSuRut    = this.lichSuRut.getComponent('LichSuRut');
		this.lichSuChuyen = this.lichSuChuyen.getComponent('LichSuChuyen');
		this.lichSuBank   = this.lichSuBank.getComponent('LichSuBank');

		this.body = [this.lichSuNap.node, this.lichSuRut.node, this.lichSuChuyen.node, this.lichSuBank.node];

		this.header = this.header.children.map(function(obj) {
			return obj.getComponent('itemContentMenu');
		});
	},
	onSelectHead: function(event, name){
		this.history = name;
		this.header.forEach(function(header) {
			if (header.node.name == name) {
				header.select();
			}else{
				header.unselect();
			}
		});
		this.body.forEach(function(body) {
			if (body.name == name) {
				body.active = true;
			}else{
				body.active = false;
			}
		});
	},
	get_data: function(page = 1){
		switch(this.history) {
		  case "LichSuNap":
				this.lichSuNap.get_data(page);
			break;

			case "LichSuRut":
				this.lichSuRut.get_data(page);
			break;

			case "LichSuChuyen":
				this.lichSuChuyen.get_data(page);
			break;

			case "LichSuBank":
				this.lichSuChuyen.get_data(page);
			break;
		}
	},
	onData: function(data){
		this.page.onSet(data.page, data.kmess, data.total);

		if (void 0 !== data.nap_red){
			this.lichSuNap.onData(data.nap_red);
		}
		if (void 0 !== data.mua_the){
			this.lichSuRut.onData(data.mua_the);
		}
		if (void 0 !== data.chuyen_red){
			this.lichSuChuyen.onData(data.chuyen_red);
		}
		if (void 0 !== data.bank){
			this.lichSuBank.onData(data.bank);
		}
	},
});
