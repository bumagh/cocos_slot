
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
    },
    onLoad () {
        this.content = this.content.children.map(function(obj){
            return obj.getComponent('TaiXiu_topItem');
        });
		this.get_data();
	},
    get_data: function(){
    	cc.RedT.send({taixiu:{get_top:{red:true,taixiu:true}}});
    },
    onEnable: function () {
		if(!!this.content){
			this.get_data();
		}
        console.log("0/,load ");
	},
    onData: function(data){
		this.content.forEach(function(obj, index){
            let dataH = data[index];
            if (void 0 !== dataH) {
                obj.node.active = true;
                if (index > 2) {
                    obj.top.node.active = true;
                    obj.top.string      = index+1;
                }else{
                    obj.top.node.active = false;
                }
                obj.nick.string = dataH.name;
                obj.win.string  = helper.numberWithCommas(dataH.bet);
            }else{
                obj.node.active = false;
            }
        }.bind(this));
    },
});
