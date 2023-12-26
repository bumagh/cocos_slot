

cc.Class({
    extends: cc.Component,

    properties: {
        close: cc.Node,
    },
    onCloseClick: function(){
        this.node.active = false;
    },
});
