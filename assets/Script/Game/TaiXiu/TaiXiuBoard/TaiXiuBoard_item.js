
cc.Class({
    extends: cc.Component,
    properties: {
    	colorOn:  '',
        colorOff: '',
        bgOn: {
            default: null,
            type:    cc.SpriteFrame
        },
        bgOff: {
            default: null,
            type:    cc.SpriteFrame
        },
        text: {
            default: null,
            type:    cc.Node,
        },
    },
    onLoad: function(obj){
    	this.sprite = this.node.getComponent(cc.Sprite);
    },
    onEnable: function() {
		this.node.on(cc.Node.EventType.MOUSE_ENTER, this.eventOnENTER, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.eventOnLEAVE, this);
	},
	onDisable: function() {
		this.node.off(cc.Node.EventType.MOUSE_ENTER, this.eventOnENTER, this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.eventOnLEAVE, this);
	},
	eventOnENTER: function(){
		this.text.color         = this.text.color.fromHEX(this.colorOn);
		this.sprite.spriteFrame = this.bgOn;
	},
	eventOnLEAVE: function(){
		this.text.color = this.text.color.fromHEX(this.colorOff);
		this.sprite.spriteFrame = this.bgOff;
	},
});
