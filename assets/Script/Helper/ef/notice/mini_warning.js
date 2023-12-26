
cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: null,
            type: cc.Label
        }
    },
    onEnable: function () {
        this.node.runAction(cc.sequence(
            cc.spawn(
                cc.scaleTo(0.09, 1),
                cc.fadeTo(0.09, 255)
            ),
            cc.delayTime(2.5),
            cc.spawn(
                cc.scaleTo(0.09, 1.5),
                cc.fadeTo(0.09, 0)
            ),
            cc.callFunc(function(){
                this.node.destroyAllChildren();
                this.node.destroy();
            }, this)
        ));
    },
});
