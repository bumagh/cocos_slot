
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		page:   cc.Prefab,
		content: cc.Node,
	},
	onLoad: function(){
		let page = cc.instantiate(this.page);
		page.y = -324;
		this.node.addChild(page);
		this.page = page.getComponent('Pagination');
		this.page.init(this);

		Promise.all(this.content.children.map(function(obj){
			return obj.getComponent('XoSo_MBHistory_item');
		}))
		.then(tab => {
			this.content = tab;
		})
		this.get_data();
	},
	get_data: function(page = 1){
		cc.RedT.send({g:{xs:{mb:{history:page}}}});
	},
	onData: function(data) {
		var self = this;
		this.page.onSet(data.page, data.kmess, data.total);
		this.content.forEach(function(obj, i){
			let dataT = data.data[i];
			if (void 0 !== dataT) {
				obj.node.active   = true;
				obj.bg.active     = i%2;
				obj.time.string   = Helper.getStringDateByTime(dataT.time);
				obj.loai.string   = self.getLoai(dataT.type);
				obj.so.string     = dataT.so.join(', ');
				obj.diem.string   = Helper.numberWithCommas(dataT.diem);
				obj.cuoc.string   = Helper.numberWithCommas(dataT.cuoc)
				obj.win.string    = Helper.numberWithCommas(dataT.win)
				obj.status.string = dataT.thanhtoan ? 'Đã Sổ' : 'Chờ Sổ';
				obj.status.node.color = dataT.thanhtoan ? cc.color(0, 255, 0, 255) : cc.color(255, 214, 0, 255);
			}else{
				obj.node.active = false;
			}
		});
	},
	getLoai: function(data){
		switch(data){
			case 'lo2':
				return 'Lô 2 Số'
				break;
			case 'lo21k':
				return 'Lô 2 Số 1k'
				break;
			case 'lo3':
				return 'Lô 3 Số'
				break;
			case 'lo4':
				return 'Lô 4 Số'
				break;
			case 'xien2':
				return 'Xiên 2'
				break;
			case 'xien3':
				return 'Xiên 3'
				break;
			case 'xien4':
				return 'Xiên 4'
				break;
			case 'de':
				return 'Đề'
				break;
			case 'daude':
				return 'Đầu Đề'
				break;
			case 'degiai7':
				return 'Đề Giải 7'
				break;
			case 'degiai1':
				return 'Đề Giải Nhất'
				break;
			case '3cang':
				return '3 Càng'
				break;
			case '4cang':
				return '4 Càng'
				break;
			case 'dau':
				return 'Đầu'
				break;
			case 'duoi':
				return 'Đuôi'
				break;
			case 'truot4':
				return 'Trượt 4'
				break;
			case 'truot8':
				return 'Trượt 8'
				break;
			case 'truot10':
				return 'Trượt 10'
				break;
		}
	},
});
