
var Helper = require('Helper')

cc.Class({
    extends: cc.Component,

    properties: {
        page:     cc.Prefab,
        content:  cc.Node,
        red:      true,
        isLoad:   false,
    },
    onLoad () {
        var page = cc.instantiate(this.page);
        page.y = -294;
        this.node.addChild(page);
        this.page = page.getComponent('Pagination');
        this.content = this.content.children.map(function(obj){
            return obj.getComponent('MiniPoker_LichSu_item');
        });
        this.page.init(this);
    },
    onEnable: function() {
        !this.isLoad && this.get_data();
    },
    get_data: function(page = 1){
        this.isLoad = true;
        cc.RedT.send({g:{mini_poker:{log:{red:this.red, page:page}}}});
    },
    onData: function(data){
        this.page.onSet(data.page, data.kmess, data.total)
        this.content.forEach(function(obj, i){
            var dataT = data.data[i];
            if (void 0 !== dataT) {
                obj.node.active = true;
                obj.bg.active = i%2;
                obj.time.string = Helper.getStringDateByTime(dataT.time);
                obj.phien.string = dataT.id;
                obj.bet.string = Helper.numberWithCommas(dataT.bet);
                obj.card.forEach(function(card, index){
                    card.spriteFrame = cc.RedT.util.card.getCard(dataT.kq[index].card, dataT.kq[index].type);
                });
                obj.win.string = Helper.numberWithCommas(dataT.win);
            }else{
                obj.node.active = false;
            }
        }.bind(this));
    },
    reset: function(){
        this.isLoad    = false;
        Promise.all(this.content.children.map(function(obj){
            obj.active = false
        }))
    },
});
