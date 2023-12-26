
cc.Class({
	extends: cc.Component,

	properties: {
		NhaMang: {
			default: null,
			type:    cc.Label,
		},
		MenhGia: {
			default: null,
			type:    cc.Label,
		},
		SoThe: {
			default: null,
			type:    cc.Label,
		},
		Seri: {
			default: null,
			type:    cc.Label,
		},
		HetHan: {
			default: null,
			type:    cc.Label,
		},
	},
	CopyToClipboard: function(){
		cc.RedT.CopyToClipboard(this.NhaMang.string+' - Mã thẻ: '+this.SoThe.string+' - Seri: '+this.Seri.string+'');
		cc.RedT.inGame.noticeCopy();
	},
});
