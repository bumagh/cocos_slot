
var Bank = require('Bank');

cc.Class({
	extends: cc.Component,

	properties: {
		header:    cc.Node,
		NapRed:    cc.Node,
		TieuRed:   cc.Node,
		ChuyenRed: cc.Node,
		DaiLy:     cc.Node,
		Bank:      Bank,
	},
	init(){
		this.NapRed    = this.NapRed.getComponent('NapRed');
		this.TieuRed   = this.TieuRed.getComponent('TieuRed');
		this.ChuyenRed = this.ChuyenRed.getComponent('ChuyenRed');
		this.DaiLy     = this.DaiLy.getComponent('DaiLy');

		this.NapRed.init();
		this.TieuRed.init();
		this.ChuyenRed.init(this);
		this.Bank.init();
		this.DaiLy.init(this);

		this.body = [this.NapRed, this.TieuRed, this.ChuyenRed, this.DaiLy, this.Bank];
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
	onSelectHead2: function(event, name){
		this.header.forEach(function(header) {
			if (header.node.name === name) {
				header.select();
			}else{
				header.unselect();
			}
		});
		this.NapRed.onSelecHinhThuc(name);
	},
	superView:function(name){
		//if(name == 'NapRed' || name == 'ThongTinNapRed' || name == 'QuyDinhNapRed'){
		if(name == 'NapRed'){
			this.onSelectHead(null, 'NapRed');
			//if (name != 'NapRed') this.NapRed.onSelectHead(null, name);
		}else if(name == 'TieuRed' || name == 'MuaTheNap'){
			this.onSelectHead(null, 'TieuRed');
			if (name != 'TieuRed') this.TieuRed.onSelectHead(null, name);
		}else if(name == 'ChuyenRed'){
			this.onSelectHead(null, 'ChuyenRed');
		}else if(name == 'DaiLy'){
			this.onSelectHead(null, 'DaiLy');
		}
	},
	onData: function(data){
		if (void 0 !== data.nap_red){
			this.NapRed.onData(data.nap_red);
		}
		if (void 0 !== data.momo){
			this.NapRed.MOMO(data.momo);
		}
		if (void 0 !== data.bank){
			this.NapRed.BANK(data.bank);
		}
		if (void 0 !== data.mua_the_nap){
			this.TieuRed.MuaTheCao.onData(data.mua_the_nap);
		}
		if (void 0 !== data.daily){
			this.DaiLy.onData(data.daily);
		}
		if (!!data.bank){
			this.Bank.onData(data.bank);
		}
	},
});
