
cc.Class({
	extends: cc.Component,
	properties: {
		//icon:  cc.Node,
		icons: {
			default: [],
			type: cc.Prefab,
		},
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
		// if (icon == 10) {
		// 	this.wind.active = true;
		// 	this.icon.node.active = this.free.active = this.bonus.active = this.hu.active = false;
		// }else if (icon == 9) {
		// 	this.hu.active = true;
		// 	this.icon.node.active = this.free.active = this.bonus.active = this.wind.active = false;
		// }else if (icon == 8) {
		// 	this.bonus.active = true;
		// 	this.icon.node.active = this.free.active = this.wind.active = this.hu.active = false;
		// }else if (icon == 7) {
		// 	this.free.active = true;
		// 	this.icon.node.active = this.wind.active = this.bonus.active = this.hu.active = false;
		// }else{
		// 	this.icon.node.active = true;
		// 	this.icon.spriteFrame = this.RedT.icons[icon];
		// 	this.free.active = this.wind.active = this.bonus.active = this.hu.active = false;
		// }
		this.node.removeAllChildren();
		var child = cc.instantiate(this.icons[icon]);
		child.setScale(cc.v2(0.9, 0.9));
		this.node.addChild(child);
		if (data) {
			this.data = icon;
		}
	},
});
