
cc.Class({
	extends: cc.Component,
	init: function(obj){
		this.RedT = obj;
		this.card = [];
		var self  = this;
		Promise.all([0,0,0,0,0,0,0,0,0,0,0,0,0].map(function(obj, index){
			var ooT = cc.instantiate(self.RedT.cardf);
			ooT.width  = 99.44;
			ooT.height = 141.68;
			self.node.addChild(ooT);
			return ooT.getComponent(cc.Sprite);
		}))
		.then(result => {
			this.card = result;
			this.random(true);
		});
	},
	random: function(newG = false){
		this.card.forEach(function(obj, index){
			if (newG) {
				if (index == 12) {
					obj.spriteFrame = cc.RedT.util.card.cardB1;
				}else{
					obj.spriteFrame = cc.RedT.util.card.random();
				}
			}else if (index !== 0 && index !== 12){
				obj.spriteFrame = cc.RedT.util.card.random();
			}
		});
	},
	spin: function(){
		this.node.stopAllActions();
		var self = this;
		var d = cc.moveTo(1, cc.v2(0, -(this.node.height-141.68))).easing(cc.easeInOut(3));
		var p = cc.callFunc(function() {
			this.card[12].spriteFrame = this.card[0].spriteFrame;
			this.node.y = 0;
		}, this);
		var EF = cc.callFunc(function() {
			this.RedT.resumeGame();
			this.RedT.addMainLog();
		}, this);
		this.node.runAction(cc.sequence(d, p, cc.delayTime(0.1), EF));
	},
	stop: function(){
		this.node.stopAllActions();
		/**
		if (void 0 !== this.card &&
			void 0 !== this.card[12] &&
			void 0 !== this.card[12].spriteFrame)
		{
			this.card[12].spriteFrame = this.card[0].spriteFrame;
		}
		*/
		this.node.y = 0;
	},
});
