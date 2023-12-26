
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
	},

	init() {
		this.TheCao = this.node.children.map(function(obj){
			return obj.getComponent('TheCao_item');
		});
	},
	onEnable: function () {
		this.node.runAction(cc.RedT.inGame.dialog.actionShow);
	},
	onDisable: function () {
		cc.RedT.inGame.dialog.resetSizeDialog(this.node);
	},
	onData: function(data){
		this.setData(data);
		cc.RedT.inGame.loading.active = false;
		if (cc.RedT.inGame.dialog.objShow) {
			cc.RedT.inGame.dialog.objShow.active = false;
			this.node.previous = cc.RedT.inGame.dialog.objShow;
		}
		this.node.active = cc.RedT.inGame.dialog.node.active = true;
		cc.RedT.inGame.dialog.objShow = this.node;
	},
	getData: function(id){
		cc.RedT.inGame.loading.active = true;
		cc.RedT.send({user:{history:{the_cao: id}}});
	},
	setData: function(data){
		this.TheCao.forEach(function(TheCao, index){
			var info = data[index];
			if (void 0 !== info){
				TheCao.node.active = true;
				TheCao.NhaMang.string = info.nhaMang;
				TheCao.MenhGia.string = Helper.numberWithCommas(info.menhGia);
				TheCao.SoThe.string   = info.maThe;
				TheCao.Seri.string    = info.seri;
				TheCao.HetHan.string  = info.time;
			}else{
				TheCao.node.active = false;
			}
		});
	},
});
