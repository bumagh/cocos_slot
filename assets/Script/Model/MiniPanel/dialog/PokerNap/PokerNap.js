
var Helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
    	touch:    cc.Node,
    	mask:     cc.Node,
    	toggle:   cc.Toggle,
        labelBet: cc.Label,
        labelMin: cc.Label,
        labelMax: cc.Label,
        min: '',
        max: '',
    },
    init: function(obj){
    	this.RedT   = obj;
    	this.betMin = obj.bet*this.min;
    	this.betMax = obj.bet*this.max;
    	this.h      = this.betMin < 1000000 ? 1000 : 1000000;

    	this.labelMin.string = this.labelBet.string = Helper.numberWithCommas(this.betMin);
    	this.labelMax.string = Helper.numberWithCommas(this.betMax);
    	this.betMin = this.betMin/this.h;
    	this.betMax = this.betMax/this.h;

    	this.toggle.isChecked = true;
    },
    onEnable: function() {
        this.node.runAction(cc.RedT.inGame.dialog.actionShow);
		this.touch.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.touch.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.touch.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
	},
	onDisable: function() {
        cc.RedT.inGame.dialog.resetSizeDialog(this.node);
		this.touch.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.touch.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.touch.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.touch.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);

		this.mask.width     = 0;
		this.touch.position = cc.v2(0, 0);
	},
	eventStart: function(e){
		this.touch.runAction(cc.scaleTo(0.1, 0.7));
		this.offsetX = {localX: e.touch.getLocationX(), x: this.touch.position.x};
	},
	eventMove: function(e){
		var x = e.touch.getLocationX()-this.offsetX.localX+this.offsetX.x;
		if (x < 0) {
			x = 0;
		}else if(x > 401){
			x = 401;
		}
		this.mask.width = x;
		this.touch.position = cc.v2(x, 0);
		var bet = (((x/401)*(this.betMax-this.betMin))+this.betMin)>>0;
		this.labelBet.string = Helper.numberWithCommas(bet*this.h);
	},
	eventEnd: function(){
		this.touch.runAction(cc.scaleTo(0.1, 0.6));
	},
	onOkClick: function(){
		cc.RedT.inGame.loading.active = true;
		cc.RedT.send({g:{poker:{reg:{
			room: this.RedT.bet,
			balans: Helper.getOnlyNumberInString(this.labelBet.string),
			auto: this.toggle.isChecked,
		}}}});
	},
	onCancelClick: function(){
		cc.RedT.inGame.dialog.onClickBack();
	},
});
