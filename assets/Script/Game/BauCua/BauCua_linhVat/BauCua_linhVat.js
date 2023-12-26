
var helper = require('Helper');

cc.Class({
    extends: cc.Component,
    properties: {
        xLabel:     cc.Label,
        totall:     cc.Label,
        me:         cc.Label,
        nodeMe:     cc.Node,
        nodeSelect: cc.Node,
    },
    meCuoc: function(cuoc) {
        if (!!cuoc) {
            this.nodeMe.active = true;
            this.me.string = helper.nFormatter(cuoc, 1);
        }else{
            this.nodeMe.active = false;
        }
    },
    totallCuoc: function(cuoc) {
        if (!!cuoc) {
            this.totall.string = helper.nFormatter(cuoc, 1);
        }else{
            this.totall.string = 0;
        }
    },
    Select: function(x){
        this.nodeSelect.active = true;
        if (x > 1) {
            this.xLabel.node.active = true;
            this.xLabel.string = 'x' + x;
        }else
            this.xLabel.node.active = false;
    },
    unSelect: function(){
        this.nodeSelect.active = this.xLabel.node.active = false;
    },
});
