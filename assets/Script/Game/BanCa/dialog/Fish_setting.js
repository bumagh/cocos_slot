
cc.Class({
	extends: cc.Component,
	properties: {
		touchNhacNen: cc.Node,
		maskNhacNen:  cc.Node,

		touchHieuUng: cc.Node,
		maskHieuUng:  cc.Node,
	},
	init: function() {
		if (cc.RedT.isSoundBackground()) {
			cc.RedT.audio.bg.play();
			let t = setInterval(function(){
				console.log(cc.RedT.audio.bg.clip.loaded);
				if(cc.RedT.audio.bg.clip.loaded){
					clearInterval(t);
					cc.RedT.audio.bg.play();
				}	
			}.bind(this),100);

			this.setNhacNen(294);
		}else{
			this.setNhacNen(0);
		}
		if (cc.RedT.isSoundGame()) {
			this.setHieuUng(294);
		}else{
			this.setHieuUng(0);
		}
	},
	onEnable: function() {
		this.node.runAction(cc.RedT.inGame.dialog.actionShow);
		this.touchNhacNen.on(cc.Node.EventType.TOUCH_START,  this.nhacNenStart, this);
		this.touchNhacNen.on(cc.Node.EventType.TOUCH_MOVE,   this.nhacNenMove,  this);
		this.touchNhacNen.on(cc.Node.EventType.TOUCH_END,    this.nhacNenEnd,   this);
		this.touchNhacNen.on(cc.Node.EventType.TOUCH_CANCEL, this.nhacNenEnd,   this);

		this.touchHieuUng.on(cc.Node.EventType.TOUCH_START,  this.hieuUngStart, this);
		this.touchHieuUng.on(cc.Node.EventType.TOUCH_MOVE,   this.hieuUngMove,  this);
		this.touchHieuUng.on(cc.Node.EventType.TOUCH_END,    this.hieuUngEnd,   this);
		this.touchHieuUng.on(cc.Node.EventType.TOUCH_CANCEL, this.hieuUngEnd,   this);
	},
	onDisable: function() {
		cc.RedT.inGame.dialog.resetSizeDialog(this.node);
		this.touchHieuUng.off(cc.Node.EventType.TOUCH_START,  this.hieuUngStart, this);
		this.touchHieuUng.off(cc.Node.EventType.TOUCH_MOVE,   this.hieuUngMove,  this);
		this.touchHieuUng.off(cc.Node.EventType.TOUCH_END,    this.hieuUngEnd,   this);
		this.touchHieuUng.off(cc.Node.EventType.TOUCH_CANCEL, this.hieuUngEnd,   this);
	},
	nhacNenStart: function(e){
		this.touchNhacNen.runAction(cc.scaleTo(0.1, 1.1));
		this.nhacNenX = {localX:e.touch.getLocationX(), x:this.touchNhacNen.x};
	},
	nhacNenMove: function(e){
		var x = e.touch.getLocationX()-this.nhacNenX.localX+this.nhacNenX.x;
		if (x < 0) {
			x = 0;
		}else if(x > 294){
			x = 294;
		}
		this.setNhacNen(x);
	},
	nhacNenEnd: function(){
		this.touchNhacNen.runAction(cc.scaleTo(0.1, 1));
	},
	setNhacNen: function(point){
		this.maskNhacNen.width = point;
		this.touchNhacNen.x = point;
		let volume = point/294;
		cc.RedT.audio.fishHall.volume = volume;
		cc.RedT.audio.fishBG1.volume = volume;
		cc.RedT.audio.fishBG2.volume = volume;
		cc.RedT.inGame.volumeNhacNen = volume;
		if (volume === 0) {
			cc.RedT.audio.bg.stop();
			cc.RedT.setSoundBackground(false);
		}else{
			cc.RedT.audio.bg.resume();
			cc.RedT.setSoundBackground(true);
			if (cc.RedT.audio.bg.isPlaying === false) {
				cc.RedT.audio.bg.play();
				let t = setInterval(function(){
					console.log(cc.RedT.audio.bg.clip.loaded);
					if(cc.RedT.audio.bg.clip.loaded){
						clearInterval(t);
						cc.RedT.audio.bg.play();
					}	
				}.bind(this),100);
			}
		}
	},

	hieuUngStart: function(e){
		this.touchHieuUng.runAction(cc.scaleTo(0.1, 1.1));
		this.hieuUngX = {localX:e.touch.getLocationX(), x:this.touchHieuUng.x};
	},
	hieuUngMove: function(e){
		var x = e.touch.getLocationX()-this.hieuUngX.localX+this.hieuUngX.x;
		if (x < 0) {
			x = 0;
		}else if(x > 294){
			x = 294;
		}
		this.setHieuUng(x);
	},
	hieuUngEnd: function(){
		this.touchHieuUng.runAction(cc.scaleTo(0.1, 1));
	},
	setHieuUng: function(point){
		this.maskHieuUng.width = point;
		this.touchHieuUng.x = point;
		let volume = point/294;
		cc.RedT.inGame.audioClick.volume = volume;
		cc.RedT.inGame.volumeHieuUng = volume;
		if (volume === 0) {
			cc.RedT.setSoundGame(false);
		}else{
			cc.RedT.setSoundGame(true);
		}
	},
});
