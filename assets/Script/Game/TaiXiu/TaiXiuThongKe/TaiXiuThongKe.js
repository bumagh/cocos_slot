
cc.Class({
	extends: cc.Component,

	properties: {
		background: cc.Node,
		header: cc.Node,
		body: cc.Node,
		KetQuaLeft: cc.Label,
		KetQuaRight: cc.Label,
		KetQuaDot: cc.Node,
		DiemSoCel: cc.Node,
		DiemSoLeft: cc.Label,
		DiemSoRight: cc.Label,
		node1: cc.Node,
		node2: cc.Node,
		dice1_line: cc.Graphics,
		dice2_line: cc.Graphics,
		dice3_line: cc.Graphics,
		tong_line: cc.Graphics,
		dice1_dot: cc.Node,
		dice2_dot: cc.Node,
		dice3_dot: cc.Node,
		tong_dot:  cc.Node,
		line_dotT: cc.Node,
		line_dot1: cc.Node,
		line_dot2: cc.Node,
		line_dot3: cc.Node,
	},
	init(obj){
		this.RedT  = obj;

		if (void 0 !== cc.RedT.setting.taixiu.tk_position) {
			this.node.position = cc.RedT.setting.taixiu.tk_position;
		}

		if (void 0 !== cc.RedT.setting.taixiu.tk_active) {
			this.node.active = cc.RedT.setting.taixiu.tk_active;
		}

		//KetQuaDot
		this.KetQuaDot = this.KetQuaDot.children.map(function(obj){
			return obj.getComponent(cc.Sprite);
		});

		//DiemSoCel
		this.DiemSoCel = this.DiemSoCel.children.map(function(cel){
			cel.RedT = cel.children.map(function(obj){
				obj = obj.getComponent(cc.Sprite);
				obj.text = obj.node.children[0].getComponent(cc.Label);
				return obj;
			});
			return cel;
		});

		//dice1_dot
		this.dice1_dots = this.dice1_dot.children.map(function(dot){
			dot.text = dot.children[0].getComponent(cc.Label);
			return dot;
		});

		//dice2_dot
		this.dice2_dots = this.dice2_dot.children.map(function(dot){
			dot.text = dot.children[0].getComponent(cc.Label);
			return dot;
		});

		//dice3_dot
		this.dice3_dots = this.dice3_dot.children.map(function(dot){
			dot.text = dot.children[0].getComponent(cc.Label);
			return dot;
		});

		//tong_dot
		this.tong_dots = this.tong_dot.children.map(function(dot){
			dot = dot.getComponent(cc.Sprite);
			dot.text = dot.node.children[0].getComponent(cc.Label);
			return dot;
		});
	},
	onLoad () {
		this.ttOffset = null;
		this.header = this.header.children.map(function(obj) {
			return obj.getComponent('itemContentMenu');
		});
	},
	onEnable: function () {
		this.background.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.background.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.background.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.background.on(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	onDisable: function () {
		this.background.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.background.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.background.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.background.off(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	eventStart: function(e){
		this.setTop();
		this.ttOffset = cc.v2(e.touch.getLocationX() - this.node.position.x, e.touch.getLocationY() - this.node.position.y)
	},
	eventMove: function(e){
		this.node.position = cc.v2(e.touch.getLocationX() - this.ttOffset.x, e.touch.getLocationY() - this.ttOffset.y);
	},
	eventEnd: function(){
		cc.RedT.setting.taixiu.tk_position = this.node.position;
	},
	setTop: function(){
		this.node.parent.insertChild(this.node);
		this.RedT.setTop();
	},
	onSelectHeader: function(event, name) {
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
	},
	onToggleClick: function() {
		cc.RedT.audio.playClick();
		this.setTop();
		this.node.active = cc.RedT.setting.taixiu.tk_active = !this.node.active;
	},
	onChangerClick: function() {
		this.node1.active = !this.node1.active;
		this.node2.active = !this.node2.active;
	},
	draw: function(line, node, data) {
		line.clear();
		var o = data.length;
		for (var n = 0; n < o; n++){
			var nodeT = node[n],
				point = data[n];
			nodeT.text.string = point.dice;
			nodeT.position = cc.v2(nodeT.position.x, point.y);
			0 === n ? line.moveTo(point.x, point.y) : (line.lineTo(point.x, point.y));
		}
		line.stroke();
	},
	draw_Tong: function(obj, data) {
		obj.clear();
		for (let n = 0, o = data.length; n < o; n++){
			let temp = data[n],
				line = this.tong_dots[n];
			0 === n ? obj.moveTo(temp.x, temp.y) : (obj.lineTo(temp.x, temp.y));
			line.text.string = temp.tong;
			line.text.node.color = this.RedT.TX_Main.taixiu ? (temp.tong > 10 ? cc.Color.WHITE : cc.Color.BLACK) : (temp.tong%2 ? cc.Color.WHITE : cc.Color.BLACK);
			line.node.position = cc.v2(line.node.position.x, temp.y);
			line.node.color    = this.RedT.TX_Main.taixiu ? (temp.tong > 10 ? cc.color().fromHEX('#B3A1A1') : cc.Color.WHITE) : (temp.tong%2 ? cc.Color.BLACK : cc.Color.YELLOW);
			line.spriteFrame = temp.tong > 10 ? this.RedT.TX_Main.dot_black : this.RedT.TX_Main.dot_white;
		}
		obj.stroke();
	},
	lineAc: function(index, bool) {
		this.dice1_dots[index].active = bool;
		this.dice2_dots[index].active = bool;
		this.dice3_dots[index].active = bool;
		this.tong_dots[index].node.active  = bool;
	},
	showLineTong: function() {
		cc.RedT.audio.playClick();
		this.tong_dot.active = !this.tong_dot.active;
		this.tong_line.node.active = !this.tong_line.node.active;
		this.line_dotT.active = !this.line_dotT.active;
	},
	showLineDice1: function() {
		cc.RedT.audio.playClick();
		this.dice1_dot.active = !this.dice1_dot.active;
		this.dice1_line.node.active = !this.dice1_line.node.active;
		this.line_dot1.active = !this.line_dot1.active;
	},
	showLineDice2: function() {
		cc.RedT.audio.playClick();
		this.dice2_dot.active = !this.dice2_dot.active;
		this.dice2_line.node.active = !this.dice2_line.node.active;
		this.line_dot2.active = !this.line_dot2.active;
	},
	showLineDice3: function() {
		cc.RedT.audio.playClick();
		this.dice3_dot.active = !this.dice3_dot.active;
		this.dice3_line.node.active = !this.dice3_line.node.active;
		this.line_dot3.active = !this.line_dot3.active;
	},
});
