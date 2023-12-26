
let fish = require('Fish_fish');

cc.Class({
	extends: cc.Component,

	properties: {
		anim: cc.Animation,
		fish: {
			default: [],
			type: fish,
		},
	},
	init: function(RedT, data){
		this.g           = data.g;
		this.node.g      = data.g;
		if (data.z !== void 0) {
			this.node.zIndex = data.z;
		}

		this.anim.on('finished', this.onFinish, this);
		if (void 0 !== data.r) {
			let clip = this.anim.getClips()[data.r].name;
			this.anim.play(clip);
			this.animState = this.anim.getAnimationState(clip);
		}
		if (void 0 !== data.a) {
			this.anim.play(data.a);
			this.animState = this.anim.getAnimationState(data.a);
		}

		if (void 0 !== data.t) {
			this.animState.time = data.t;
		}

		this.fish = this.node.children.map(function(obj, i){
			obj = obj.getComponent(fish);
			let check = data.f[i];
			if (!!check && check.id !== void 0) {
				RedT.fish[check.id] = obj;
				obj.init(RedT, check);
				obj.inGroup = true;
			}else{
				obj.node.active = false;
			}
			return obj;
		});
	},
	onFinish: function(){
		this.fish.forEach(function(obj){
			obj.onFinish();
		});
		delete this.fish;
		this.node.destroy();
	},
});
