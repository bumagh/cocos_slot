
let numberTo = require('Helper').numberTo;
cc.Class({
    extends: cc.Component,
    properties: {
    	bet: cc.Label,
    },
    onLoad () {
    	this.bet.font = cc.RedT.util.fontCong;
    	this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
            cc.RedT.audio.playEf('moneywin');
			numberTo(this.bet, 0, this.node.bet, 1000, true);
		}, this)));
    },
});
