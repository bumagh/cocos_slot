
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		content: {
			default: null,
			type:    cc.Node,
		},
	},
	onLoad () {
		Promise.all(this.content.children.map(function(obj){
			return obj.getComponent('LichSuNap_item');
		}))
		.then(resulf => {
			this.content = resulf;
		});
	},
	onEnable: function () {
		this.get_data();
	},
	get_data: function(page = 1){
		cc.RedT.send({user:{history:{mua_xu:{page:page}}}});
	},
	onData: function(data){
		Promise.all(this.content.map(function(obj, index){
			var dataT = data[index];
			if (void 0 !== dataT) {
				obj.node.active    = true;
				obj.GD.string      = !!dataT.id ? dataT.id : '';
				obj.Time.string    = Helper.getStringDateByTime(dataT.time);
				obj.NhaMang.string = Helper.numberWithCommas(dataT.red);
				obj.MenhGia.string = Helper.numberWithCommas(dataT.xu);
			}else{
				obj.node.active = false;
			}
		}));
	},
});
