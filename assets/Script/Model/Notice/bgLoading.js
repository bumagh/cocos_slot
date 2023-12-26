
cc.Class({
    extends: cc.Component,
    properties: {
        text: cc.Label,
    },
    onDisable: function () {
        this.text.string = '';
    },
    onData: function(data){
        if (void 0 !== data.active) {
            this.node.active = data.active;
        }
        if (void 0 !== data.text) {
            this.text.string = data.text;
        }
    },
});
