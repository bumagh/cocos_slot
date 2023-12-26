
cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: null,
            type:    cc.Label
        },
        tips: {
            default: null,
            type:    cc.Node
        },
    },
    onLoad () {
        this.sprite = this.getComponent(cc.Sprite);
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
        this.tips.active = !0;
    },
    eventOnLEAVE: function(){
        this.tips.active = !1;
    },
});
