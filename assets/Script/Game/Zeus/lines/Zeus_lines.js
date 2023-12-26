
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		lines:     cc.Node,
		mainLines: cc.Node,
	},
	init: function(obj){
		this.RedT = obj;
		var self = this;;
		Promise.all(this.mainLines.children.map(function(line){
			return line.getComponent('Zeus_iline');
		}))
		.then(result => {
			this.mainLines = result;
		});
		this.selectAll(null, "1");
	},
	onOpen: function(){
		this.node.active = true;
	},
	onClose: function(){
		this.RedT.playClick();
		if (this.node.active && this.data.length < 1) {
			this.RedT.notice.show({title:'CẢNH BÁO', text:'Chọn ít nhất 1 dòng'});
		}else{
			this.node.active = false;
		}
	},
	select: function(e) {
		this.RedT.playClick();
		var node = e.target;
		if (node.color._val != cc.Color.WHITE._val) {
			node.color = cc.Color.WHITE;
		}else{
			node.color = node.color.fromHEX('#8A8A8A');
		}
		this.check();
	},
	check: function() {
		var self = this;
		Promise.all(this.lines.children.map(function(line, index){
			return line.color._val == cc.Color.WHITE._val ? index+1 : void 0;
		}))
		.then(result => {
			Promise.all(result.filter(function(data){
				return void 0 !== data;
			}))
			.then(data => {
				this.data = data;
				this.RedT.labelLine.string = data.length;
				this.RedT.tong.string = helper.numberWithCommas(data.length * helper.getOnlyNumberInString(this.RedT.bet.string));
			})
		})
	},
	selectChan: function() {
		var self = this;
		Promise.all(this.lines.children.map(function(line, index){
			var i = index+1;
			if (i%2) {
				line.color = line.color.fromHEX('#8A8A8A');
			}else{
				line.color = cc.Color.WHITE;
				return i;
			}
			return void 0;
		}))
		.then(result => {
			Promise.all(result.filter(function(data){
				return void 0 !== data;
			}))
			.then(data => {
				this.data = data;
				this.RedT.labelLine.string = data.length;
				this.RedT.tong.string = helper.numberWithCommas(data.length * helper.getOnlyNumberInString(this.RedT.bet.string));
			})
		})
	},
	selectLe: function() {
		var self = this;
		Promise.all(this.lines.children.map(function(line, index){
			var i = index+1;
			if (i%2) {
				line.color = cc.Color.WHITE;
				return i;
			}else{
				line.color = line.color.fromHEX('#8A8A8A');
			}
			return void 0;
		}))
		.then(result => {
			Promise.all(result.filter(function(data){
				return void 0 !== data;
			}))
			.then(data => {
				this.data = data;
				this.RedT.labelLine.string = data.length;
				this.RedT.tong.string = helper.numberWithCommas(data.length * helper.getOnlyNumberInString(this.RedT.bet.string));
			})
		})
	},
	selectAll: function(e, select) {
		var self = this;
		Promise.all(this.lines.children.map(function(line, index){
			var check = select == "1";
			line.color = check ? cc.Color.WHITE : line.color.fromHEX('#8A8A8A');
			return check ? index+1 : void 0;
		}))
		.then(result => {
			Promise.all(result.filter(function(data, index){
				return void 0 !== data;
			}))
			.then(data => {
				this.data = data;
				this.RedT.labelLine.string = data.length;
				this.RedT.tong.string = helper.numberWithCommas(data.length * helper.getOnlyNumberInString(this.RedT.bet.string));
			})
		});
	},
});
