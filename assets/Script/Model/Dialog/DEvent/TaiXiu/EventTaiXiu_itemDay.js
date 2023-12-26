
cc.Class({
    extends: cc.Component,
    properties: {
        bg:  cc.Node,
        day: cc.Label,
    },
    onClickSelect: function() {
    	this.RedT.dateView(this.day);
    },
});
