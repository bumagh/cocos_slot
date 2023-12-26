
cc.Class({
    extends: cc.Component,

    properties: {
        text100:   cc.Label,
		text1000:  cc.Label,
		text10000: cc.Label,
    },
    onData: function(data) {
		var arb100 = data.filter(function(obj){
			return obj.type == 100 && obj.red == true
		});
		this.text100.string = '* X' + arb100[0].x + ' hũ phòng 100, (sau ' + arb100[0].toX + ' hũ, ' + arb100[0].balans + ' hũ được X' + arb100[0].x + ')';

		var arb1000 = data.filter(function(obj){
			return obj.type == 1000 && obj.red == true
		});
		this.text1000.string = '* X' + arb1000[0].x + ' hũ phòng 1.000, (sau ' + arb1000[0].toX + ' hũ, ' + arb1000[0].balans + ' hũ được X' + arb1000[0].x + ')';

		var arb10000 = data.filter(function(obj){
			return obj.type == 10000 && obj.red == true
		});
		this.text10000.string = '* X' + arb10000[0].x + ' hũ phòng 10.000, (sau ' + arb10000[0].toX + ' hũ, ' + arb10000[0].balans + ' hũ được X' + arb10000[0].x + ')';

	},
});
