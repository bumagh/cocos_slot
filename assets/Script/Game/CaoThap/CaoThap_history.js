
var helper = require('Helper');

cc.Class({
    extends: cc.Component,
    properties: {
        page:     cc.Prefab,
        content:  cc.Node,
        red:      true,
    },
    init(obj){
        this.RedT = obj;
    },
    onLoad () {
        this.page = cc.instantiate(this.page);
        this.page.y = -272;
        this.node.addChild(this.page);
        this.page = this.page.getComponent('Pagination');
        this.content = this.content.children.map(function(obj){
            return obj.getComponent('CaoThap_history_item');
        });
        this.page.init(this);
    },
    onEnable: function() {
        this.get_data();
    },
    get_data: function(page = 1){
        cc.RedT.send({g:{caothap:{history:{red:this.red, page:page}}}});
    },
    onData: function(data){
        var self = this;
        this.page.onSet(data.page, data.kmess, data.total);
        this.content.forEach(function(obj, i){
            var dataT = data.data[i];
            if (void 0 !== dataT) {
                obj.node.active  = true;
                obj.bg.active    = i%2;
                obj.time.string  = helper.getStringDateByTime(dataT.time);
                obj.phien.string = dataT.id;
                obj.buoc.string  = dataT.buoc;
                obj.cuoc.string  = helper.numberWithCommas(dataT.cuoc);
                obj.win.string   = helper.numberWithCommas(dataT.bet);
                obj.card1.spriteFrame = cc.RedT.util.card.getCard(dataT.card1.card, dataT.card1.type);
                if (!!dataT.chon) {
                    obj.select.active = true;
                    if (dataT.chon == 2) {
                        obj.select.scaleY  = -1; // Chọn Up
                    }else{
                        obj.select.scaleY = 1;  // Chọn Down
                    }
                }else{
                    obj.select.active = false;
                }
                if (void 0 !== dataT.card2 && void 0 !== dataT.card2.card) {
                    obj.card2.node.active = true;
                    obj.card2.spriteFrame = cc.RedT.util.card.getCard(dataT.card2.card, dataT.card2.type);
                }else{
                    obj.card2.node.active = false;
                }
            }else{
                obj.node.active = false;
            }
        });
    },
});
