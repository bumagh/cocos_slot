
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
    	header: {
            default: null,
            type:    cc.Node,
        },
        body: {
            default: null,
            type:    cc.Node,
        },
        redHT: {
            default: null,
            type:    cc.Label,
        },
        redKet: {
            default: null,
            type:    cc.Label,
        },
        buttonALL: {
            default: null,
            type:    cc.Label,
        },
        buttonAc: {
            default: null,
            type:    cc.Label,
        },
        inputGui: {
            default: null,
            type:    cc.EditBox,
        },
        inputRut: {
            default: null,
            type:    cc.EditBox,
        },
        inputOTP: {
            default: null,
            type:    cc.EditBox,
        },
        isGui: true,
    },
    init(){
    	this.header = this.header.children.map(function(obj) {
            return obj.getComponent('itemContentMenu');
        });
    },
    onSelectHead: function(event, name){
        this.header.forEach(function(header) {
            if (header.node.name == name) {
                header.select();
            }else{
                header.unselect();
            }
        });
        this.body.children.forEach(function(body) {
            if (body.name == name) {
                body.active = true;
            }else{
                body.active = false;
            }
        });
        this.clear();
        if (this.body.children[0].active) {
        	this.isGui = true;
        	this.buttonALL.string = 'GỬI TOÀN BỘ';
	        this.buttonAc.string = 'GỬI';
        }else{
        	this.isGui = false;
        	this.buttonALL.string = 'RÚT TOÀN BỘ';
	        this.buttonAc.string = 'RÚT';
        }
    },
    onClickHuy: function(){
    	this.clear();
    },
    onClickAC:  function(){
    	var data = {};
    	if (this.isGui) {
    		data.gui = helper.getOnlyNumberInString(this.inputGui.string);
    		if (data.gui < 10000) {
    			cc.RedT.inGame.notice.show({title: 'GỬI RED', text: 'Số tiền gửi phải lớn hơn 10.000'});
    			return void 0;
    		}
    	}else{
    		data.rut = {red: helper.getOnlyNumberInString(this.inputRut.string), otp: this.inputOTP.string};
    		if (data.rut < 10000) {
    			cc.RedT.inGame.notice.show({title: 'RÚT RED', text: 'Số tiền rút phải lớn hơn 10.000'});
    			return void 0;
    		}
    	}
    	cc.RedT.send({user: {ket_sat: data}});
    },
    onClickALL: function(){
    	if (this.isGui) {
    		this.inputGui.string = helper.numberWithCommas(cc.RedT.user.red);
    	}else{
    		this.inputRut.string = this.redKet.string;
    	}
    },
    onClickAdd: function(event, value){
    	if (this.isGui) {
    		this.inputGui.string = helper.numberWithCommas(helper.getOnlyNumberInString(this.inputGui.string)*1 + value*1);
    	}else{
    		this.inputRut.string = helper.numberWithCommas(helper.getOnlyNumberInString(this.inputRut.string)*1 + value*1);
    	}
    },
    onChangerInput: function(value){
    	value = helper.numberWithCommas(helper.getOnlyNumberInString(value));
    	if (this.isGui) {
    		this.inputGui.string = value == '0' ? '' : value;
    	}else{
    		this.inputRut.string = value == '0' ? '' : value;
    	}
    },
    clear: function(){
    	this.inputGui.string = this.inputRut.string = this.inputOTP.string = '';
    },
    onClickOTP: function(){
        cc.RedT.send({otp:true});
    },
});
