
cc.Class({
	extends: cc.Component,

	properties: {
		item: cc.Sprite,
	},
	init(obj){
		this.RedT = obj;
	},
	stop: function() {
		this.node.children.forEach(function(node){
			let animation = node.getComponents(cc.Animation);
			animation.forEach(function(k){
				node.removeComponent(k);
			});
		});
	},
	random: function(){
		let icon = ~~(Math.random()*6);
		this.setIcon(icon);
		return icon;
	},
	setIcon:function(icon, data = false){
		this.item.spriteFrame = this.RedT.icons[icon];
		if (data) {
			this.data = icon;
		}
	},
});
