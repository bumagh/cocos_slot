
var helper = require('Helper');

cc.Class({
    extends: cc.Component,
    properties: {
        item:     cc.Prefab,
        content:  cc.Node,
    },
    init(obj){
        this.RedT = obj;
    },
    onEnable: function() {
        this.get_data();
    },
    get_data: function(page = 1){
        cc.RedT.send({g:{baucua:{tops:true}}});
    },
    onData: function(data){
        this.content.destroyAllChildren();
        data.forEach(function(obj, index){
            let item = cc.instantiate(this.item);
            item = item.getComponent('BauCua_top_item');
            item.stt.string  = index+1;
            item.nick.string = obj.name;
            item.win.string  = helper.numberWithCommas(obj.bet);
            item.node.children[0].active = index%2;
            this.content.addChild(item.node);
        }.bind(this));
    },
});
