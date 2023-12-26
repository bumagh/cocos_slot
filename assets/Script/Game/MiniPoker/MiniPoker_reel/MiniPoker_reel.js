
cc.Class({
	extends: cc.Component,
	properties: {
	},
	init: function(obj){
		this.RedT = obj;
		this.card = [];
		var self  = this;
		Promise.all([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(function(obj, index){
			var ooT = cc.instantiate(self.RedT.cardf);
			ooT.width  = 95;
			ooT.height = 138;
			self.node.addChild(ooT);
			ooT = ooT.getComponent(cc.Sprite);
			return ooT
		}))
		.then(result => {
			this.card = result;
			this.random(true);
		});
	},
	random: function(newG = false){
		var self = this;
		this.card.forEach(function(obj, index){
			if (newG) {
				obj.spriteFrame = cc.RedT.util.card.random();
			}else if (index !== 0 && index !== 25){
				obj.spriteFrame = cc.RedT.util.card.random();
			}
		});
	},
	spin: function(index){
		this.node.stopAllActions();
		var self = this;
		var i = index;
		var d = cc.moveTo(this.RedT.speed(), cc.v2(this.node.x, -(this.node.height-138))).easing(cc.easeInOut(3));
		var p = cc.callFunc(function() {
			this.card[25].spriteFrame = this.card[0].spriteFrame;
			this.node.y = 0;
		}, this);

		if (i === 4){
			var onEf = cc.callFunc(function() {
				this.RedT.hieuUng();
			}, this);
			this.node.runAction(cc.sequence(cc.delayTime(i*0.1), d, p, onEf));
		} else
			this.node.runAction(cc.sequence(cc.delayTime(i*0.1), d, p));
	},
	stop: function(){
		this.node.stopAllActions();
		if (void 0 !== this.card &&
			void 0 !== this.card[25] &&
			void 0 !== this.card[25].spriteFrame)
		{
			this.card[25].spriteFrame = this.card[0].spriteFrame;
		}
		this.node.y = 0;
	},
});
