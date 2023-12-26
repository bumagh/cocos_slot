
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		page:     cc.Prefab,
		content:  cc.Node,
		red:      true,
	},
	onLoad () {
		var page = cc.instantiate(this.page);
		page.y = -284;
		this.node.addChild(page);
		this.page = page.getComponent('Pagination');
		this.content = this.content.children.map(function(obj){
			return obj.getComponent('VQRed_history_item');
		});
		this.page.init(this);
	},
	onEnable: function() {
		this.get_data();
	},
	get_data: function(page = 1){
		cc.RedT.send({g:{vq_red:{log:{red: this.red, page: page}}}});
	},
	onData: function(data){
		this.page.onSet(data.page, data.kmess, data.total);
		this.content.forEach(function(obj, i){
			var dataT = data.data[i];
			if (void 0 !== dataT) {
				obj.node.active = true;
				obj.bg.active    = i%2;
				obj.time.string  = Helper.getStringDateByTime(dataT.time);
				obj.phien.string = dataT.id;
				obj.cuoc.string  = Helper.numberWithCommas(dataT.bet);
				obj.line.string  = dataT.kq + ' dòng';
				obj.win.string   = Helper.numberWithCommas(dataT.win);
			}else{
				obj.node.active = false;
			}
		});
	},
});
