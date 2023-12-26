
cc.Class({
    extends: cc.Component,
    init(obj){
        this.RedT = obj;
        this.icons = [];
        var self  = this;
        var data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        Promise.all(data.map(function(obj, index){
            var icon = cc.instantiate(self.RedT.icon);
            self.node.addChild(icon);
            icon = icon.getComponent('CoTrang_item');
            icon.init(self.RedT);
            if (index > 2 && index < data.length-3) {
                icon.random();
            }
            return icon;
        }))
        .then(result => {
            this.icons = result;
            this.icons[this.icons.length-1].setIcon(this.icons[4].random());
            this.icons[this.icons.length-2].setIcon(this.icons[3].random());
            this.icons[this.icons.length-3].setIcon(this.icons[2].random());
            this.icons[this.icons.length-4].setIcon(this.icons[1].random());
            this.icons[this.icons.length-5].setIcon(this.icons[0].random());
        });
    },
    spin: function(index){
        this.node.stopAllActions();
        var self = this;
        var d = cc.moveTo(1, cc.v2(this.node.x,-(this.node.height-396))).easing(cc.easeInOut(3));
        var p2 = cc.callFunc(function() {
            if (index === 0) {
                this.RedT.copy();
            }
            this.node.y = 0;
        }, this);

        if (index === 4){
            var EF = cc.callFunc(function() {
                this.RedT.EF_vuathang();
                this.node.y = 0;
                this.RedT.random();
                this.RedT.hieuUng();
            }, this);
            this.node.runAction(cc.sequence(cc.delayTime(index*0.1), d, EF));
        } else
            this.node.runAction(cc.sequence(cc.delayTime(index*0.1), d, p2));
    },
    stop: function(){
        this.node.stopAllActions();
        this.RedT.copy();
        this.node.y = 0;
    },
});
