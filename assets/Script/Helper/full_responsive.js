
cc.Class({
    extends: cc.Component,
    onEnable: function(){
        this.node.width  = cc.RedT.inGame.node.width;
        this.node.height = cc.RedT.inGame.node.height;
    },
});
