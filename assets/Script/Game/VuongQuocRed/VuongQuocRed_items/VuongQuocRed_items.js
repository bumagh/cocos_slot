
cc.Class({
	extends: cc.Component,
	properties: {
		icon:  cc.Sprite,
		icon4: cc.Node,
		icon5: cc.Node,
		icon6: cc.Node,
	},
	init(obj){
		this.RedT = obj;
	},
	/**
	stop: function() {
		this.node.children.forEach(function(node){
			let animation = node.getComponents(cc.Animation);
			animation.forEach(function(k){
				node.removeComponent(k);
			});
		});
	},
	*/
	random: function(){
		let icon = (Math.random()*7)>>0;
		this.setIcon(icon);
		return icon;
	},
	setIcon: function(icon, data = false){
		if (icon === 4) {
			this.icon4.active = true;
			this.icon.node.active = this.icon5.active = this.icon6.active = false;
		}else if (icon === 5) {
			this.icon5.active = true;
			this.icon.node.active = this.icon4.active = this.icon6.active = false;
		}else if (icon === 6) {
			this.icon6.active = true;
			this.icon.node.active = this.icon4.active = this.icon5.active = false;
		} else {
			this.icon.node.active = true;
			this.icon4.active = this.icon5.active = this.icon6.active = false;
			this.icon.spriteFrame = this.RedT.icons[icon];
		}
		if (data) {
			this.data = icon;
		}
	},
});
