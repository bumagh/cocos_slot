
cc.Class({
	extends: cc.Component,
	properties: {
		icon:  cc.Sprite,
		free:  cc.Node,
		bonus: cc.Node,
		hu:    cc.Node,
		wind:  cc.Node,
	},
	init(obj){
		this.RedT = obj;
	},
	random: function(){
		var icon = (Math.random()*11)>>0;
		this.setIcon(icon);
		return icon;
	},
	setIcon: function(icon, data = false){
		if (icon == 10) {
			this.wind.active = true;
			this.icon.node.active = this.free.active = this.bonus.active = this.hu.active = false;
		}else if (icon == 9) {
			this.hu.active = true;
			this.icon.node.active = this.free.active = this.bonus.active = this.wind.active = false;
		}else if (icon == 8) {
			this.bonus.active = true;
			this.icon.node.active = this.free.active = this.wind.active = this.hu.active = false;
		}else if (icon == 7) {
			this.free.active = true;
			this.icon.node.active = this.wind.active = this.bonus.active = this.hu.active = false;
		}else{
			this.icon.node.active = true;
			this.icon.spriteFrame = this.RedT.icons[icon];
			this.free.active = this.wind.active = this.bonus.active = this.hu.active = false;
		}
		if (data) {
			this.data = icon;
		}
	},
});
