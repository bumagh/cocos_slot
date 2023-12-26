
var helper = require('Helper');
var BrowserUtil = require('BrowserUtil');

cc.Class({
	extends: cc.Component,

	properties: {
		inputSo:     cc.EditBox,
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
	onClickChon: function(){
		let str = this.inputSo.string;
		if (str.length > 4) {
			let arr = [];
			let arrC = str.split(' ');
			arrC.forEach(function(obj){
				let arrC2 = obj.split(',');
				arrC2.forEach(function(obj2){
					let arrC3 = obj2.split('.');
					arrC3.forEach(function(obj3){
						let arrC4 = obj3.split(';');
						arrC4.forEach(function(obj4){
							let arrC5 = obj4.split(':');
							arr = arr.concat(arrC5);
						});
					});
				});
			});
			arr.forEach(function(obj, i){
				arr[i] = obj.trim();
			});
			arr = arr.filter(function(obj){
				if (obj.length === 4) {
					obj = helper.getOnlyNumberInString(obj);
					if (obj.length === 4) {
						return true;
					}
				}
				return false;
			});
			let check = {};
			arr.forEach(function(datac){
				if (void 0 === check[datac]) {
					check[datac] = datac;
				}
			});
			arr = Object.values(check);
			if(arr.length > 0){
				if (arr.length > this.max) {
					cc.RedT.inGame.addNotice('1 Vé cược tối đa ' + this.max + ' số chọn...');
				}else{
					this.countSelect = arr.length;
					this.soCuoc.string = arr.join(', ');
					this.updateTien();
				}
			}else{
				this.countSelect = 0;
				cc.RedT.inGame.addNotice('Số chọn không hợp lệ.');
			}
		}else{
			str = helper.getOnlyNumberInString(str);
			if (str.length === 4) {
				this.countSelect = 1;
				this.soCuoc.string = str;
				this.updateTien();
			}else{
				this.countSelect = 0;
				cc.RedT.inGame.addNotice('Số chọn không hợp lệ.');
			}
		}
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
		let diem = helper.getOnlyNumberInString(this.soDiem.string)*1;
		this.tongTien.string = helper.numberWithCommas(diem*this.giaDiem*this.countSelect);
	},
	onClickHuy: function(){
		this.soCuoc.string      = '';
		this.soDiem.string      = '0';
		this.tongTien.string    = '0';
		this.inputSoDiem.string = '';
		this.countSelect        = 0;
	},
	onClickCuoc: function(){
		if(helper.isEmpty(this.soCuoc.string)) {
			cc.RedT.inGame.addNotice('Vui lòng chọn số muốn cược..');
		} else if(this.soDiem.string === '0'){
			cc.RedT.inGame.addNotice('Vui lòng nhập điểm cược..');
		} else {
			var data = {};
			data[this.game] = {so:this.soCuoc.string, diem:helper.getOnlyNumberInString(this.soDiem.string)};
			cc.RedT.send({g:{xs:{mb:data}}});
		}
	},
});
