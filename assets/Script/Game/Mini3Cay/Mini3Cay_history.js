
var helper = require('Helper');

cc.Class({
    extends: cc.Component,
    properties: {
        page:     cc.Prefab,
        content:  cc.Node,
        cointRed: cc.Node,
        cointXu:  cc.Node,
        red:      true,
    },
    init(obj){
        this.RedT = obj;
    },
    onLoad () {
        this.page = cc.instantiate(this.page);
        this.page.y = -307;
        this.node.addChild(this.page);
        this.page = this.page.getComponent('Pagination');
        Promise.all(this.content.children.map(function(obj){
            return obj.getComponent('Mini3Cay_ihistory');
        }))
        .then(result => {
            this.content = result;
        })
        this.page.init(this);
    },
    onEnable: function() {
        this.get_data();
    },
    //onDisable: function() {
    //},
    get_data: function(page = 1){
        cc.RedT.send({g:{mini3cay:{logs:{red: this.red, page: page}}}});
    },
    changerCoint: function(){
        this.red             = !this.red;
        this.cointRed.active = !this.cointRed.active;
        this.cointXu.active  = !this.cointXu.active;
        this.get_data();
    },
    onData: function(data){
        var self = this;
        this.page.onSet(data.page, data.kmess, data.total);
        Promise.all(this.content.map(function(obj, i){
            var dataT = data.data[i]
            if (void 0 !== dataT) {
                obj.node.active  = true;
                obj.time.string  = helper.getStringDateByTime(dataT.time);
                obj.phien.string = dataT.id;
                obj.cuoc.string  = helper.numberWithCommas(dataT.bet);
                obj.win.string   = helper.numberWithCommas(dataT.win);
                Promise.all(obj.kq.map(function(kq, index){
                    kq.spriteFrame = cc.RedT.util.card.getCard(dataT.kq[index].card, dataT.kq[index].type)
                }))
            }else{
                obj.node.active = false;
            }
        }))
    },
    /**
    reset: function(){
        Promise.all(this.content.children.map(function(obj){
            obj.node.active = false;
        }))
    },
    */
});
