
cc.Class({
    extends: cc.Component,

    properties: {
        dot:   cc.Node,
        bg:    cc.Node,
        title: cc.Label,
        time:  cc.Label,
    },
    init: function(obj){
        this.RedT = obj;
    },
    onClick: function() {
        this.RedT.onContentClick(this);
    },
});
