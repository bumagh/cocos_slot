
cc.Class({
	extends: cc.Component,

	properties: {
		icon: cc.Sprite,
	},
	init(obj){
		this.RedT = obj;
	},
	random: function(data = false){
		var icon = (Math.random()*5)>>0;
		this.setIcon(icon);
		if (data) {
			this.data = icon;
		}
		return icon;
	},
	setIcon:function(icon, data = false){
		if (icon === 0) {
			this.icon.spriteFrame = this.RedT.icons[0];
		}else{
			this.icon.spriteFrame = this.RedT.iconsX[icon-1];
		}
		if (data) {
			this.data = icon;
		}
	},
});
