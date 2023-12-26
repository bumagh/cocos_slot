
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		content: cc.Node,
	},
	onLoad () {
		this.content = this.content.children.map(function(obj){
			return obj.getComponent('LichSuNap_item');
		});
	},
	onEnable: function () {
		this.get_data();
	},
	get_data: function(page = 1){
		cc.RedT.send({user:{history:{nap_red:{page:page}}}});
	},
	onData: function(data){
		this.content.forEach(function(obj, index){
			var dataT = data[index];
			if (void 0 !== dataT) {
				obj.node.active = true;
				obj.Time.string    = Helper.getStringDateByTime(dataT.time);
				obj.NhaMang.string = dataT.nhaMang;
				obj.MenhGia.string = Helper.numberWithCommas(dataT.menhGia);
				obj.Nhan.string    = Helper.numberWithCommas(dataT.nhan);
				obj.pin.string     = dataT.maThe;
        		obj.seri.string    = dataT.seri;

				obj.Status.string     = dataT.status == 0 ? "Chờ duyệt" : (dataT.status == 1 ? "Thành công" : (dataT.status == 2 ? "Thẻ sai" : ""));
				obj.Status.node.color = dataT.status == 0 ? cc.color(9, 121, 195, 255) : (dataT.status == 1 ? cc.color(14, 151, 2, 255) : (dataT.status == 2 ? cc.color(195, 9, 9, 255) : cc.color(9, 121, 195, 255)));
			}else{
				obj.node.active = false;
			}
		});
	},
});
