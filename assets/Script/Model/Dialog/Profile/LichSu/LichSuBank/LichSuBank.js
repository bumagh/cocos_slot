
var Helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
    },
    onLoad () {
        this.content = this.content.children.map(function(obj){
            return obj.getComponent('LichSuBank_item');
        });
    },
    onEnable: function () {
        this.get_data();
    },
    get_data: function(page = 1){
        cc.RedT.send({user:{history:{bank:{page:page}}}});
    },
    onData: function(data){
        this.content.forEach(function(obj, index){
            var dataT = data[index];
            if (void 0 !== dataT) {
                obj.node.active  = true;
                obj.bg.active    = index%2;
                obj.time.string  = Helper.getStringDateByTime(dataT.time);
                obj.bank.string  = dataT.bank.toUpperCase();
                obj.act.string   = dataT.type == 0 ? 'NẠP' : 'RÚT';

                obj.money.string = Helper.numberWithCommas(dataT.money);
                obj.money.node.color = dataT.type == 0 ? cc.color(199, 39, 39, 255) : cc.color(201, 16, 178, 255);

                obj.info.string  = !!dataT.info ? dataT.info : '';
                obj.status.string     = dataT.status == 0 ? "Chờ Duyệt" : (dataT.status == 1 ? "Thành Công" : (dataT.status == 2 ? "Thất Bại" : ""));
                obj.status.node.color = dataT.status == 0 ? cc.color(195, 130, 14, 255) : (dataT.status == 1 ? cc.color(0, 129, 6, 255) : (dataT.status == 2 ? cc.color(236, 6, 6, 255) : cc.color(45, 171, 255, 255)));
            }else{
                obj.node.active = false;
            }
        });
    },
});
