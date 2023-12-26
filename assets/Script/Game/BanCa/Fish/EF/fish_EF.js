
cc.Class({
    extends: cc.Component,

    properties: {
        anim: dragonBones.ArmatureDisplay,
        ef:   cc.String,
    },
    onLoad(){
        this.onDie = function() {
            this.node.destroy();
        }
        this.anim.on(dragonBones.EventObject.COMPLETE, this.onDie, this);
        this.anim.playAnimation(this.ef, 1);
    },
});
