
cc.Class({
	extends: cc.Component,

	properties: {
		list: {
			default: null,
			type: cc.Node
		},
		time: {
			default: null,
			type: cc.Label
		},
		nodeTime: {
			default: null,
			type: cc.Node
		},
		panel: {
			default: null,
			type: cc.Node
		},
	},
	onLoad () {
		cc.RedT.setting.popupMini = cc.RedT.setting.popupMini || {};
		this.ttOffset     = null;
		this.ttOffset2    = null;
		this.toggleRuning = false;
		if (void 0 !== cc.RedT.setting.popupMini.position) {
			this.node.position = cc.RedT.setting.popupMini.position;
		}
		if (void 0 !== cc.RedT.setting.popupMini.open) {
			if(cc.RedT.setting.popupMini.open){
				this.list.active = true;
				this.nodeTime.position = cc.v2(-155.7, 43);
				this.list.scale = 1;
			}else{
				this.nodeTime.position = cc.v2(25, 43);
				this.list.scale = 0.2;
				this.list.active = false
			}
		}
	},
	onEnable: function () {
		this.panel.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.panel.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.panel.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.panel.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.panel.on(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	onDisable: function () {
		this.panel.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.panel.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.panel.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.panel.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		// this.panel.off(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	eventStart: function(e){
		this.setTop();
		this.ttOffset  = cc.v2(e.touch.getLocationX() - this.node.position.x, e.touch.getLocationY() - this.node.position.y)
		this.ttOffset2 = cc.v2(e.touch.getLocationX() - (e.touch.getLocationX() - this.node.position.x), e.touch.getLocationY() - (e.touch.getLocationY() - this.node.position.y))
	},
	eventMove: function(e){
		let x = e.touch.getLocationX()-this.ttOffset.x;
		let y = e.touch.getLocationY()-this.ttOffset.y;
		if (Math.abs(x) > cc.RedT.inGame.node.width/2-50) {
			x = x < 0 ? (-cc.RedT.inGame.node.width/2)+50 : (cc.RedT.inGame.node.width/2)-50;
		}
		if (Math.abs(y) > cc.RedT.inGame.node.height/2-50) {
			y = y < 0 ? (-cc.RedT.inGame.node.height/2)+50 : (cc.RedT.inGame.node.height/2)-50;
		}
		this.node.position = cc.v2(x, y);
	},
	eventEnd: function(e){
		cc.RedT.setting.popupMini.position = this.node.position;
		this.xChanger = this.ttOffset2.x - (e.touch.getLocationX() - this.ttOffset.x)
		this.yChanger = this.ttOffset2.y - (e.touch.getLocationY() - this.ttOffset.y)
		if (this.xChanger <  5 &&
			this.xChanger > -5 &&
			this.yChanger <  5 &&
			this.yChanger > -5) {
			this.toggle()
		}
	},
	toggle: function(){
		cc.RedT.audio.playClick();
		if (!this.toggleRuning){
			this.toggleRuning = true;
			this.list.stopAllActions();
			if (this.list.active) {
				cc.RedT.setting.popupMini.open = false;
				if (this.nodeTime.active) {
					this.nodeTime.runAction(cc.moveTo(0.3, cc.v2(25, 43)));
				}else {
					this.nodeTime.position = cc.v2(25, 43);
				}
				this.list.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.3, 0.2).easing(cc.easeBackIn(3.0)), cc.rotateTo(0.3, -720)), cc.callFunc(function(){
					this.toggleRuning = this.list.active = false
				}, this)));
			}else{
				this.list.active = cc.RedT.setting.popupMini.open = true;
				if (this.nodeTime.active) {
					this.nodeTime.runAction(cc.moveTo(0.3, cc.v2(-155.7, 43)));
				}else {
					this.nodeTime.position = cc.v2(-155.7, 43);
				}
				this.list.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.3, 1).easing(cc.easeBackOut(3.0)), cc.rotateTo(0.3, 720)), cc.callFunc(function(){
					this.toggleRuning = false;
				}, this)));
			}
		}
	},
	setTop: function(){
		this.node.parent.insertChild(this.node);
	},
});
