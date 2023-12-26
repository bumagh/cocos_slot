
cc.Class({
    extends: cc.Component,

    properties: {
        nodeUnSelect: cc.Node,
        nodeSelect: cc.Node,
        text: cc.Node,
    },
    select: function() {
        this.nodeUnSelect.active = false;
        this.nodeSelect.active   = true;
        this.text.color          = cc.color().fromHEX('#FAF578');
        this.node.pauseSystemEvents();
    },
    unselect: function() {
        this.nodeUnSelect.active = true;
        this.nodeSelect.active   = false;
        this.text.color          = cc.Color.BLACK;
        this.node.resumeSystemEvents();
    },
});
