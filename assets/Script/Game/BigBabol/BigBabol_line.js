
cc.Class({
	extends: cc.Component,

	properties: {
		background: cc.Node,
		nodeLine:   cc.Node,
		mainLine:   cc.Node,
	},
	init(obj){
		this.RedT = obj;
		this.mainLineInit(void 0 !== cc.RedT.setting.big_babol.line);

		this.nodeLine.children.forEach(function(line){
			line.isSelect = true;
		});
	},
	onEnable: function() {
		this.background.on(cc.Node.EventType.MOUSE_ENTER,  this.RedT.setTop, this.RedT);
	},
	onDisable: function() {
		this.background.off(cc.Node.EventType.MOUSE_ENTER, this.RedT.setTop, this.RedT);
	},
	toggle: function(){
		if (this.node.active && cc.RedT.setting.big_babol.line.length < 1) {
			this.RedT.addNotice('Chọn ít nhất 1 dòng');
		}else{
			this.node.active = !this.node.active;
		}
	},
	select: function(e) {
		var node = e.target;
		node.isSelect = !node.isSelect;
		if (node.isSelect) {
			node.children[0].color = cc.Color.WHITE;
		}else{
			node.children[0].color = cc.color(155,155,155);
		}
		this.check();
	},
	check: function() {
		var self = this;
		Promise.all(this.nodeLine.children.map(function(line, index){
			if (line.isSelect){
				return index+1;
			}else{
				return void 0;
			}
		}))
		.then(result => {
			Promise.all(result.filter(function(data){
				return void 0 !== data;
			}))
			.then(data => {
				cc.RedT.setting.big_babol.line = data;
				this.RedT.labelLine.string = data.length + ' dòng';
			})
		})
	},
	selectChan: function() {
		var self = this;
		Promise.all(this.nodeLine.children.map(function(line, index){
			var i = index+1;
			if (i%2) {
				line.isSelect = false;
				line.children[0].color = cc.color(155,155,155);
			}else{
				line.isSelect = true;
				line.children[0].color = cc.Color.WHITE;
				return i;
			}
			return void 0;
		}))
		.then(result => {
			Promise.all(result.filter(function(data){
				return void 0 !== data;
			}))
			.then(data => {
				cc.RedT.setting.big_babol.line = data;
				this.RedT.labelLine.string = data.length + ' dòng';
			})
		})
	},
	selectLe: function() {
		var self = this;
		Promise.all(this.nodeLine.children.map(function(line, index){
			var i = index+1;
			if (i%2) {
				line.isSelect = true;
				line.children[0].color = cc.Color.WHITE;
				return i;
			}else{
				line.isSelect = false;
				line.children[0].color = cc.color(155,155,155);
			}
			return void 0;
		}))
		.then(result => {
			Promise.all(result.filter(function(data){
				return void 0 !== data;
			}))
			.then(data => {
				cc.RedT.setting.big_babol.line = data;
				this.RedT.labelLine.string = data.length + ' dòng';
			})
		})
	},
	selectAll: function(e, select) {
		var self = this;
		Promise.all(this.nodeLine.children.map(function(line, index){
			var check = select === "1";
			if (check) {
				line.isSelect = true;
				line.children[0].color = cc.Color.WHITE;
			}else{
				line.isSelect = false;
				line.children[0].color = cc.color(155,155,155);
			}
			return check ? index+1 : void 0;
		}))
		.then(result => {
			Promise.all(result.filter(function(data, index){
				var check = void 0 !== data;
				return check;
			}))
			.then(data => {
				cc.RedT.setting.big_babol.line = data;
				this.RedT.labelLine.string = data.length + ' dòng';
			})
		});
	},

	// Main line
	mainLineInit: function(reInit){
		var self = this;;
		Promise.all(this.mainLine.children.map(function(line){
			return line.getComponent('BigBabol_main_line')
					.init(self.RedT);
		}))
		.then(result => {
			this.mainLine = result;
			if (reInit) {
				this.RedT.labelLine.string = cc.RedT.setting.big_babol.line.length + ' dòng';
				this.nodeLine.children.forEach(function(line, index){
					var check = cc.RedT.setting.big_babol.line.filter(function(a){
						return a == line.name;
					});
					if (check.length) {
						line.isSelect = true;
						line.children[0].color = cc.Color.WHITE;
					}else{
						line.isSelect = false;
						line.children[0].color = cc.color(155,155,155);
					}
				});
			}else{
				this.selectAll(null, "1");
			}
		})
	},
});
