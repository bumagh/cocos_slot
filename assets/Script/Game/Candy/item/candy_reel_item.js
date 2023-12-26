
cc.Class({
	extends: cc.Component,
	properties: {
		icon:   cc.Sprite,
		free:   cc.Node,
		bonus:  cc.Node,
		jacpot: cc.Node,
	},
	init(obj){
		this.RedT = obj;
	},
	random: function(){
		let icon = (Math.random()*11)>>0;
		this.setIcon(icon);
		return icon;
	},
	setIcon: function(icon, data = false){
		if (icon == 10) {
			this.icon.node.active = true;
			this.free.active = this.bonus.active = this.jacpot.active = false;
			this.icon.spriteFrame = this.RedT.icons[7];
		}else if (icon == 9) {
			this.free.active = true;
			this.icon.node.active = this.bonus.active = this.jacpot.active = false;
		}else if (icon == 8) {
			this.bonus.active = true;
			this.icon.node.active = this.free.active = this.jacpot.active = false;
		}else if (icon == 7) {
			this.jacpot.active = true;
			this.icon.node.active = this.free.active = this.bonus.active = false;
		}else{
			this.free.active = this.bonus.active = this.jacpot.active = false;
			this.icon.node.active = true;
			this.icon.spriteFrame = this.RedT.icons[icon];
		}
		if (data) {
			this.data = icon;
		}
	},
});
