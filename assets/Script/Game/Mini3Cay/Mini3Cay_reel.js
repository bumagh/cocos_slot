
cc.Class({
    extends: cc.Component,
    init: function(obj){
        this.RedT = obj;
        this.card = [];
        var self  = this;
        Promise.all([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(function(obj, index){
            var ooT = cc.instantiate(self.RedT.cardf);
            ooT.width  = 73.45;
            ooT.height = 104.65;
            self.node.addChild(ooT);
            return ooT.getComponent(cc.Sprite);
        }))
        .then(result => {
            this.card = result;
            this.random(true);
        });
    },
    random: function(newG = false){
        var self = this;
        Promise.all(this.card.map(function(obj, index){
            if (newG) {
                obj.spriteFrame = cc.RedT.util.card.random(9);
            }else if (index !== 0 && index !== 20){
                obj.spriteFrame = cc.RedT.util.card.random(9);
            }
        }))
    },
    spin: function(index){
        this.node.stopAllActions();
        var self = this;
        var d = cc.moveTo(this.RedT.speed(), cc.v2(this.node.x, -(this.node.height-104.65))).easing(cc.easeInOut(3));
        var p = cc.callFunc(function() {
            this.card[20].spriteFrame = this.card[0].spriteFrame;
            this.node.y = 0;
        }, this);

        if (index === 2){
            var e = cc.callFunc(function() {
                if (this.RedT.isAuto)
                    this.RedT.sendSpin()
                else
                    this.RedT.offSpin()
            }, this);

            var EF = cc.callFunc(function() {
                this.RedT.hieuUng();
            }, this);
            this.node.runAction(cc.sequence(cc.delayTime(index*0.1), d, p, cc.delayTime(0.1), EF));
        } else
            this.node.runAction(cc.sequence(cc.delayTime(index*0.1), d, p));
    },
    stop: function(){
        this.node.stopAllActions();
        if (void 0 !== this.card &&
            void 0 !== this.card[20] &&
            void 0 !== this.card[20].spriteFrame)
        {
            this.card[20].spriteFrame = this.card[0].spriteFrame;
        }
        this.node.y = 0;
    },
});
