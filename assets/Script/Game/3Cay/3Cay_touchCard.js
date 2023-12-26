
cc.Class({
    extends: cc.Component,
    onEnable: function () {
        this.node.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
        this.node.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
    },
    onDisable: function () {
        this.node.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
        this.node.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
    },
    eventStart: function(e){
        this.ttOffset = cc.v2(e.touch.getLocationX()-this.node.position.x, e.touch.getLocationY()-this.node.position.y);
    },
    eventMove: function(e){
        let x = e.touch.getLocationX()-this.ttOffset.x;
        let y = e.touch.getLocationY()-this.ttOffset.y;
        this.node.position = cc.v2(x, y);
    },
    eventEnd: function(){},
});
