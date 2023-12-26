
cc.Class({
    extends: cc.Component,

    properties: {
        items: {
            default: [],
            type: cc.Node
        },
        body: {
            default: [],
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (var index in this.items) {
            this.items[index] = this.items[index].getComponent('subMenuItem')
        }
    },
    onClickItem: function(event) {
        for (var i of this.items) {
            if (i.node == event.target) {
                i.onSelect()
            }else{
                i.offSelect()
            }
        }
        for (var b of this.body) {
            if (b.name === event.target.name) {
                b.active = true
            }else{
                b.active = false
            }
        }
    }

    // update (dt) {},
});
