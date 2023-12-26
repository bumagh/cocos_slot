
var helper = require('Helper');

cc.Class({
    extends: cc.Component,
    properties: {
        item:     cc.Prefab,
        content:  cc.Node,
    },
    onEnable: function() {
        this.get_data();
    },
    get_data: function(page = 1){
        cc.RedT.send({g:{candy:{top:true}}});
    },
    onData: function(data){
        this.content.destroyAllChildren();
        data.forEach(function(obj, index){
            let item = cc.instantiate(this.item);
            let itemComponent = item.getComponent('VQRed_history_item');
            itemComponent.time.string  = helper.getStringDateByTime(obj.time);
            itemComponent.phien.string = obj.name;
            itemComponent.cuoc.string  = helper.numberWithCommas(obj.bet);
            itemComponent.line.string  = helper.numberWithCommas(obj.win);
            itemComponent.win.string   = obj.type == 2 ? "Nổ Hũ" : "Thắng lớn";
            item.children[0].active    = !(index&1);
            this.content.addChild(item);
        }.bind(this));
    },
});
