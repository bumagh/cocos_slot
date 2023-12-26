
cc.Class({
	extends: cc.Component,

	properties: {
		text100:   cc.Label,
		text1000:  cc.Label,
		text10000: cc.Label,
	},
	onData: function(data) {
		var miniPoker100 = data.filter(function(obj){
			return obj.type == 100 && obj.red == true
		});
		this.text100.string = '* X' + miniPoker100[0].x + ' hũ phòng 100, (sau ' + miniPoker100[0].toX + ' hũ, ' + miniPoker100[0].balans + ' hũ được X' + miniPoker100[0].x + ')';

		var miniPoker1000 = data.filter(function(obj){
			return obj.type == 1000 && obj.red == true
		});
		this.text1000.string = '* X' + miniPoker1000[0].x + ' hũ phòng 1.000, (sau ' + miniPoker1000[0].toX + ' hũ, ' + miniPoker1000[0].balans + ' hũ được X' + miniPoker1000[0].x + ')';

		var miniPoker10000 = data.filter(function(obj){
			return obj.type == 10000 && obj.red == true
		});
		this.text10000.string = '* X' + miniPoker10000[0].x + ' hũ phòng 10.000, (sau ' + miniPoker10000[0].toX + ' hũ, ' + miniPoker10000[0].balans + ' hũ được X' + miniPoker10000[0].x + ')';

	},
});
