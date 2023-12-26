
cc.Class({
    extends: cc.Component,

    properties: {
    },

    init(obj){
        this.RedT = obj;
        this.icons = [];
        var self  = this;
        Promise.all([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(function(obj, index){
            var icon = cc.instantiate(self.RedT.iconRPrefab);
            self.node.addChild(icon);
            icon = icon.getComponent('AngryBirds-itemR');
            icon.init(self.RedT);
            if (index > 2 && index < 20) {
                icon.random();
            }
            return icon;
        }))
        .then(result => {
            this.icons = result;
            this.icons[22].setIcon(this.icons[2].random(!0));
            this.icons[21].setIcon(this.icons[1].random(!0));
            this.icons[20].setIcon(this.icons[0].random(!0));
        });
    },
    copy: function(){
        this.icons[22].setIcon(this.icons[2].data);
        this.icons[21].setIcon(this.icons[1].data);
        this.icons[20].setIcon(this.icons[0].data);
        this.node.y = 0;
    },
    spin: function(index){
        this.node.stopAllActions();
        var self = this;
        var d = cc.moveTo(1.5, cc.v2(this.node.x,-(this.node.height-270))).easing(cc.easeInOut(3));
        var p = cc.callFunc(function() {
            this.copy();
            if (index === 4){
                this.RedT.labelWin.string = 0;
                this.RedT.hieuUng();
            }
        }, this);

        this.node.runAction(cc.sequence(cc.delayTime(index*0.15), d, p));
    },
    stop: function(){
        this.node.stopAllActions();
        this.copy();
    },
});
