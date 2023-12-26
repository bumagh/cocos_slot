
cc.Class({
	extends: cc.Component,

	properties: {
		icon: cc.Sprite,
	},
	init(obj){
		this.RedT = obj;
	},
	random: function(data = false){
		var icon = (Math.random()*6)>>0;
		this.setIcon(icon);
		if (data) {
			this.data = icon;
		}
		return icon;
	},
	setIcon:function(icon, data = false){
		this.icon.spriteFrame = this.RedT.icons[icon];
		if (data) {
			this.data = icon;
		}
	},
});
