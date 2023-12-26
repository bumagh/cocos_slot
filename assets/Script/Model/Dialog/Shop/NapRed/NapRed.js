
var NapThe      = require('NapThe');

cc.Class({
	extends: cc.Component,

	properties: {
		NapThe: NapThe,
		nodeHinhThuc: cc.Node,
		nodeNapThe: cc.Node,
		nodeMoMo: cc.Node,
		nodeBank: cc.Node,
		ChuyenRED: cc.Node,

		momoSTK:  cc.Label,
		momoNAME: cc.Label,
		nickname: cc.Label,

		bankSTK:  cc.Label,
		bankNAME: cc.Label,
		NganHang: cc.Label,
		NoiDung: cc.Label,

		isLoaded: false,
	},
	init(){
		this.NapThe.init();
	},
	onEnable: function () {
		this.onBackHinhThuc();
		if (!this.isLoaded) {
			cc.RedT.send({shop:{info_nap:true}});
		}
	},
	onDisable: function () {
        this.onBackHinhThuc();
    },
	onData: function(data){
		if (void 0 !== data.info && !this.isLoaded){
			this.isLoaded = true;
			if (void 0 !== data.info.nhamang){
				this.NapThe.infoSet(data.info.nhamang, 'nhamangList', 'NhanhMang', true);
			}
			if (void 0 !== data.info.menhgia){
				this.NapThe.infoSet(data.info.menhgia, 'menhgiaList', 'MenhGia');
			}
		}
	},
	onSelecHinhThuc: function(e){
		this.nodeHinhThuc.active = false;
		
		let hinhthuc = e;
		if (hinhthuc == 'Momo') {
			this.nodeNapThe.active = false;
			this.nodeMoMo.active   = true;
			this.nodeBank.active = false;
			this.ChuyenRED.active = false;
			cc.RedT.send({shop:{info_momo:true}});
		}else if(hinhthuc == 'Banking'){
			this.nodeBank.active = true;
			this.nodeNapThe.active = false;
			this.nodeMoMo.active   = false;
			this.ChuyenRED.active = false;
			cc.RedT.send({shop:{info_bank:true}});
		}else if(hinhthuc == 'NapRed'){
			this.nodeNapThe.active = true;
			this.nodeMoMo.active   = false;
			this.nodeBank.active = false;
			this.ChuyenRED.active = false;
			let list = this.NapThe.scrollviewNhaMang.content.children.filter(function(obj){
				let a = obj.getComponent('NapRed_itemOne');
				let text = a.text.string.toLowerCase();
				return hinhthuc == text;
			});
			if (list.length) {
				let objTele = list[0].getComponent('NapRed_itemOne');
				hinhthuc = objTele.text.string;
				this.NapThe.nhamangList.forEach(function(obj){
		    		if (obj === objTele) {
		    			obj.onSelect();
		    		}else{
		    			obj.unSelect();
		    		}
		    	});
			}
		    this.NapThe.NhanhMang.string = hinhthuc;
		}else{
			this.nodeBank.active = false;
			this.nodeNapThe.active = false;
			this.nodeMoMo.active   = false;
			this.ChuyenRED.active = true;
		}
	},
	onBackHinhThuc: function(e){
		this.nodeHinhThuc.active = false;
		this.nodeNapThe.active   = true;
		this.nodeMoMo.active     = false;
		this.nodeBank.active     = false;
	},
	MOMO: function(MOMO){
		if(MOMO){
			this.momoSTK.string = MOMO.phone;
			this.momoNAME.string = MOMO.name;
			this.nickname.string = MOMO.syntax;
		}
		
	},
	BANK: function(BANK){
		if(BANK){
			this.bankSTK.string = BANK.bank_number;
			this.bankNAME.string = BANK.bank_accname;
			this.NganHang.string = BANK.bank_name;
			this.NoiDung.string = BANK.syntax;
		}
		
	},
	onCopyNumber: function(){
		cc.RedT.CopyToClipboard(this.momoSTK.string);
		cc.RedT.inGame.noticeCopy();
	},
	onCopyName: function(){
		cc.RedT.CopyToClipboard(this.nickname.string);
		cc.RedT.inGame.noticeCopy();
	},
	onCopyBankSTK: function(){
		cc.RedT.CopyToClipboard(this.bankSTK.string);
		cc.RedT.inGame.noticeCopy();
	},
	onCopyND: function(){
		cc.RedT.CopyToClipboard(this.NoiDung.string);
		cc.RedT.inGame.noticeCopy();
	},
});
