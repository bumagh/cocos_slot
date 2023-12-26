
cc.Class({
    extends: cc.Component,
    properties: {
        background:  cc.Node,
        background2: cc.Node,
        text:        cc.Node,
    },
    onSelect: function(){
    	this.background.active  = false
    	this.background2.active = true
    	this.text.color = cc.Color.BLACK
    },
    offSelect: function(){
    	this.background.active  = true
    	this.background2.active = false
    	this.text.color = cc.Color.WHITE
    },
});
