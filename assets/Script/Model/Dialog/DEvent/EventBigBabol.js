
cc.Class({
    extends: cc.Component,

    properties: {
        text100:   cc.Label,
		text1000:  cc.Label,
		text10000: cc.Label,
    },
    onData: function(data) {
		var bigbb100 = data.filter(function(obj){
			return obj.type == 100 && obj.red == true
		});
		this.text100.string = '* X' + bigbb100[0].x + ' hũ phòng 100, (sau ' + bigbb100[0].toX + ' hũ, ' + bigbb100[0].balans + ' hũ được X' + bigbb100[0].x + ')';

		var bigbb1000 = data.filter(function(obj){
			return obj.type == 1000 && obj.red == true
		});
		this.text1000.string = '* X' + bigbb1000[0].x + ' hũ phòng 1.000, (sau ' + bigbb1000[0].toX + ' hũ, ' + bigbb1000[0].balans + ' hũ được X' + bigbb1000[0].x + ')';

		var bigbb10000 = data.filter(function(obj){
			return obj.type == 10000 && obj.red == true
		});
		this.text10000.string = '* X' + bigbb10000[0].x + ' hũ phòng 10.000, (sau ' + bigbb10000[0].toX + ' hũ, ' + bigbb10000[0].balans + ' hũ được X' + bigbb10000[0].x + ')';

	},
});
