
var helper = require('Helper');

cc.Class({
    extends: cc.Component,
    properties: {
        item:     cc.Prefab,
        content:  cc.Node,
        red:      true,
    },
    onEnable: function() {
        this.get_data();
    },
    get_data: function(page = 1){
        cc.RedT.send({g:{vq_red:{top:this.red}}});
    },
    onData: function(data){
        this.content.destroyAllChildren();
        data.forEach(function(obj, index){
            var item = cc.instantiate(this.item);
            item = item.getComponent('VQRed_history_item');
            item.time.string  = helper.getStringDateByTime(obj.time);
            item.phien.string = obj.name;
            item.cuoc.string  = helper.numberWithCommas(obj.bet);
            item.line.string  = helper.numberWithCommas(obj.win);
            item.win.string   = obj.type === 2 ? "Nổ Hũ" : "Thắng lớn";
            item.node.children[0].active = index%2;
            this.content.addChild(item.node);
        }.bind(this));
    },
});
