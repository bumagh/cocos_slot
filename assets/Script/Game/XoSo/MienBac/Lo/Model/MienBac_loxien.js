
var helper = require('Helper');
var BrowserUtil = require('BrowserUtil');

cc.Class({
	extends: cc.Component,

	properties: {
		node_select: cc.Node,
		item_select: cc.Prefab,
		soCuoc:      cc.Label,
		soDiem:      cc.Label,
		tongTien:    cc.Label,
		inputSoDiem: cc.EditBox,
		max:         10,
		countSelect: 0,
		giaDiem:     22000,
		diemToiDa:   1000000,
		game:        '',
	},
	onLoad() {
		let arr = [];
		for (let i = 0; i < 100; i++) {
			let ooT = cc.instantiate(this.item_select);
			ooT = ooT.getComponent('XoSo_select_item');
			ooT.init(this);
			ooT.text.string = helper.addZero10(i);
			this.node_select.addChild(ooT.node);
			arr[i] = ooT;
		}
		this.node_select = arr;
		arr = null;
	},
	onEnable: function () {
		if (cc.sys.isBrowser) {
			BrowserUtil.inputAddEvent(this.inputSoDiem, 'input', this.onUpdateDiem.bind(this));
		}
	},
	onDisable: function () {
		if (cc.sys.isBrowser) {
			BrowserUtil.inputRemoveEvent(this.inputSoDiem, 'input', this.onUpdateDiem.bind(this));
		}
	},
	refresh: function() {
		let text = '';
		this.node_select.forEach(function(obj){
			if (obj.select) {
				text += obj.text.string + ', ';
			}
		});
		this.soCuoc.string = text;
		this.updateTien();
	},
	refreshH: function(obj) {
		if (obj.select === true) {
			this.countSelect++;
		}else{
			this.countSelect--;
		}
		if (this.countSelect > this.max) {
			obj.onChanger();
			this.countSelect = this.max;
			cc.RedT.inGame.addNotice('1 Vé cược tối đa ' + this.max + ' Số...');
		}
		if (this.countSelect < 0) {
			this.countSelect = 0;
		}
		this.refresh();
	},
	onChangerDiem: function(){
		var value = helper.numberWithCommas(helper.getOnlyNumberInString(this.inputSoDiem.string));
		this.inputSoDiem.string = value == '0' ? '' : value;
	},
	onUpdateDiem: function(e){
		let value = helper.numberWithCommas(helper.getOnlyNumberInString(e.target.value));
		value = value === '0' ? '' : value;
		let valueNumb = helper.getOnlyNumberInString(value)*1;
		if (valueNumb > this.diemToiDa) {
			value = helper.numberWithCommas(this.diemToiDa);
			cc.RedT.inGame.addNotice('Tối đa ' + value + ' điểm cho mỗi Vé.');
		}
		e.target.value = value;
		this.soDiem.string = !!value ? value : '0';
		this.inputSoDiem.string = value;
		this.updateTien();
	},
	updateTien: function(){
		let temp = 0;
		if(this.countSelect === this.max) {
			temp = 1;
		}
		let diem = helper.getOnlyNumberInString(this.soDiem.string)*1;
		this.tongTien.string = helper.numberWithCommas(diem*this.giaDiem*temp);
	},
	onClickHuy: function(){
		this.soCuoc.string      = '';
		this.soDiem.string      = '0';
		this.tongTien.string    = '0';
		this.inputSoDiem.string = '';
		this.countSelect        = 0;
		this.node_select.forEach(function(obj){
			if (obj.select) {
				obj.onChanger();
			}
		});
	},
	onClickCuoc: function(){
		if(this.countSelect !== this.max) {
			cc.RedT.inGame.addNotice('Vui lòng chọn đủ ' + this.max + ' số muốn cược...');
		} else if(this.soDiem.string === '0'){
			cc.RedT.inGame.addNotice('Vui lòng nhập điểm cược..');
		} else {
			var data = {};
			data[this.game] = {so:this.soCuoc.string, diem:helper.getOnlyNumberInString(this.soDiem.string)};
			cc.RedT.send({g:{xs:{mb:data}}});
		}
	},
});
