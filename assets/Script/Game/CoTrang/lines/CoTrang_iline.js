
cc.Class({
    extends: cc.Component,

    properties: {
        line: cc.Node,
        ef:   false,
    },
    onEnable: function() {
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onShow, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this);
    },
    onDisable: function() {
        this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onShow, this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this);
    },
    onShow: function(){
        this.line.active = true;
    },
    onHidden: function(){
        !this.ef && (this.line.active = false);
    },
});
