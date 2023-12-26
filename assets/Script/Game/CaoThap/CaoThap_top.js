
var helper = require('Helper');

cc.Class({
    extends: cc.Component,
    properties: {
        item:     cc.Prefab,
        content:  cc.Node,
        red:      true,
    },
    init(obj){
        this.RedT = obj;
    },
    onEnable: function() {
        this.get_data();
    },
    get_data: function(page = 1){
        cc.RedT.send({g:{caothap:{tops:this.red}}});
    },
    onData: function(data){
        this.content.destroyAllChildren();
        data.forEach(function(obj, index){
            let item = cc.instantiate(this.item);
            item = item.getComponent('VQRed_history_item');
            item.time.string  = helper.getStringDateByTime(obj.time);
            item.phien.string = obj.name;
            item.cuoc.string  = helper.numberWithCommas(obj.goc);
            item.line.string  = helper.numberWithCommas(obj.bet);
            item.win.string   = obj.a ? "NỔ HŨ" : "THẮNG LỚN";
            item.node.children[0].active = !(index&1);
            this.content.addChild(item.node);
        }.bind(this));
    },
});
