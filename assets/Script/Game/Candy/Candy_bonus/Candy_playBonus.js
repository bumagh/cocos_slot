
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        numberBonus: cc.Label,
        winBonus:    cc.Label,
        listBox:     cc.Node,
        notice:      cc.Node,
        numberWin:   cc.Label,
        iconsOpen:  cc.SpriteFrame,
        iconsClose: cc.SpriteFrame,
    },
    init: function(obj){
        this.RedT = obj;
        this.listBox = this.listBox.children.map(function(box){
            return box.getComponent('Candy_bonus_item');
        });
    },
    onPlay: function(){
        this.reset();
        this.node.active = true;
        this.numberBonus.string = 10;
    },
    onClickBox: function(e) {
        if (!!this.numberBonus.string) {
           cc.RedT.audio.playClick();
            this.onSend(e.target.name);
        }
    },
    closeNotice: function(){
        this.notice.active = this.node.active = false;
        this.RedT.hieuUng();
    },
    onData: function(data){
        if (void 0 !== data.box) {
            let obj = this.listBox[data.box];
            obj.text.string = helper.numberWithCommas(data.bet);
            this.numberBonus.string = data.bonus;
        }
        if (void 0 !== data.win) {
            this.notice.active = true;
            this.numberWin.string = helper.numberWithCommas(data.win);
            this.RedT.vuathang.string = helper.numberWithCommas(helper.getOnlyNumberInString(this.RedT.vuathang.string)*1 + data.win);
        }
    },
    onSend: function(box){
        cc.RedT.send({g:{candy:{bonus:{box:box}}}});
    },
    reset: function(){
        this.listBox.forEach(function(box){
            box.item.spriteFrame = this.iconsClose;
            box.text.string      = "";
        }.bind(this));
    },
});
