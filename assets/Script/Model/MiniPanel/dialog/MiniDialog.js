
var TaiXiuLichSuPhien = require('TaiXiuLichSuPhien'),
	TaiXiuLichSu      = require('TaiXiuLichSu'),
	MiniPoker_LichSu  = require('MiniPoker_LichSu'),
	MiniPoker_Top     = require('MiniPoker_Top'),
	BigBabol_LichSu   = require('BigBabol_LichSu'),
	BigBabol_Top      = require('BigBabol_Top'),
	BauCua_LichSu     = require('BauCua_LichSu'),
	BauCua_top        = require('BauCua_top'),
	Mini3Cay_history  = require('Mini3Cay_history'),
	Mini3Cay_top      = require('Mini3Cay_top'),
	CaoThap_history   = require('CaoThap_history'),
	CaoThap_top       = require('CaoThap_top'),

	AngryBird_history = require('AngryBird_history'),
	AngryBird_top     = require('AngryBird_top'),

	HuongDan          = require('dialogHuongDan');

var MegaJ_history     = require('MegaJ_history');
var MegaJ_top         = require('MegaJ_top');
var TaiXiuTop         = require('TaiXiuTop');

var VipPoint          = require('dialog_VipPoint');

cc.Class({
	extends: cc.Component,

	properties: {
		TaiXiuLichSuPhien: TaiXiuLichSuPhien,
		TaiXiuLichSu:      TaiXiuLichSu,
		TaiXiuTop:         TaiXiuTop,
		MiniPoker_LichSu:  MiniPoker_LichSu,
		MiniPoker_Top:     MiniPoker_Top,
		BigBabol_LichSu:   BigBabol_LichSu,
		BigBabol_Top:      BigBabol_Top,
		BauCua_LichSu:     BauCua_LichSu,
		BauCua_top:        BauCua_top,
		Mini3Cay_history:  Mini3Cay_history,
		Mini3Cay_top:      Mini3Cay_top,
		CaoThap_history:   CaoThap_history,
		CaoThap_top:       CaoThap_top,
		AngryBird_history: AngryBird_history,
		AngryBird_top:     AngryBird_top,

		MegaJ_history:     MegaJ_history,
		MegaJ_top:         MegaJ_top,

		HuongDan:          HuongDan,
		VipPoint:          VipPoint,
	},

	init: function(obj) {
		this.objShow    = null;
		this.objTmp     = null;
		this.TaiXiuLichSuPhien.init(obj.TaiXiu);
		this.BauCua_LichSu.init(obj.BauCua);
		this.HuongDan.init();
	},

	onClickBack: function(){
		cc.RedT.audio.playUnClick();
		this.onBack();
	},
	onBack: function(){
		if(this.objShow != null){
			if(void 0 == this.objShow.previous || null == this.objShow.previous){
				this.objShow.active = false;
				this.node.active    = false;
				this.objShow        = null;
			}else{
				this.objTmp              = this.objShow;
				this.objShow             = this.objShow.previous;
				this.objTmp.previous     = null;
				this.objTmp.active       = false;
				this.objShow.active      = true;
				this.objTmp              = null;
			}
		}else{
			this.node.active = false;
		}
	},
	onClosePrevious: function(obj){
		if(void 0 !== obj.previous && null !== obj.previous){
			this.onClosePrevious(obj.previous)
			obj.previous = null
		}
		obj.active = false
	},
	onCloseDialog: function(){
		if(this.objShow != null ){
			if(void 0 == this.objShow.previous || null == this.objShow.previous){
				this.objShow.active = this.node.active = false
				this.objShow        = null
			}else{
				this.onClosePrevious(this.objShow.previous)
				this.objShow.active          = this.node.active = false
				this.objShow.previous        = null
				this.objShow                 = null
			}
		}else{
			this.node.active = false
		}
	},

	// Show
	showTaiXiuLichSuPhien: function(){
		this.node.active = this.TaiXiuLichSuPhien.node.active = true;
		this.objShow     = this.TaiXiuLichSuPhien.node;
	},
	showTaiXiuLichSu: function(){
		this.node.active = this.TaiXiuLichSu.node.active = true;
		this.objShow     = this.TaiXiuLichSu.node;
	},
	showTaiXiuTop: function(){
		this.node.active = this.TaiXiuTop.node.active = true;
		this.objShow     = this.TaiXiuTop.node;
	},
	showMiniPokerLichSu: function(){
		this.node.active = this.MiniPoker_LichSu.node.active = true;
		this.objShow     = this.MiniPoker_LichSu.node;
	},
	showMiniPokerTop: function(){
		this.node.active = this.MiniPoker_Top.node.active = true;
		this.objShow     = this.MiniPoker_Top.node;
	},
	showBigBabolLichSu: function(){
		this.node.active = this.BigBabol_LichSu.node.active = true;
		this.objShow     = this.BigBabol_LichSu.node;
	},
	showBigBabolTop: function(){
		this.node.active = this.BigBabol_Top.node.active = true;
		this.objShow     = this.BigBabol_Top.node;
	},
	showBauCuaLichSu: function(){
		this.node.active = this.BauCua_LichSu.node.active = true;
		this.objShow     = this.BauCua_LichSu.node;
	},
	showBauCuaTop: function(){
		this.node.active = this.BauCua_top.node.active = true;
		this.objShow     = this.BauCua_top.node;
	},
	showMini3Cay_history: function(){
		this.node.active = this.Mini3Cay_history.node.active = true;
		this.objShow     = this.Mini3Cay_history.node;
	},
	showMini3Cay_top: function(){
		this.node.active = this.Mini3Cay_top.node.active = true;
		this.objShow     = this.Mini3Cay_top.node;
	},

	showCaoThap_history: function(){
		this.node.active = this.CaoThap_history.node.active = true;
		this.objShow     = this.CaoThap_history.node;
	},
	showCaoThap_top: function(){
		this.node.active = this.CaoThap_top.node.active = true;
		this.objShow     = this.CaoThap_top.node;
	},

	showAngryBird_history: function(){
		this.node.active = this.AngryBird_history.node.active = true;
		this.objShow     = this.AngryBird_history.node;
	},
	showAngryBird_top: function(){
		this.node.active = this.AngryBird_top.node.active = true;
		this.objShow     = this.AngryBird_top.node;
	},

	showMegaJ_history: function(){
		this.node.active = this.MegaJ_history.node.active = true;
		this.objShow     = this.MegaJ_history.node;
	},

	showMegaJ_top: function(){
		this.node.active = this.MegaJ_top.node.active = true;
		this.objShow     = this.MegaJ_top.node;
	},
	showHuongDan: function(e, name){
		this.node.active = this.HuongDan.node.active = true;
		this.objShow     = this.HuongDan.node;
		this.HuongDan.select(name);
	},
	showVipPoint: function(e){
		this.node.active = this.VipPoint.node.active = true;
		this.objShow     = this.VipPoint.node;
	},
});
