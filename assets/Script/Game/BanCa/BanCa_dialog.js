
var Fish_nap     = require('Fish_nap');
var Fish_history = require('Fish_history');
var Fish_setting = require('Fish_setting');

cc.Class({
	extends: cc.Component,
	properties: {
		Fish_nap:     Fish_nap,
		Fish_history: Fish_history,
		Fish_fish:    cc.Node,
		Fish_setting: Fish_setting,
	},
	init: function() {
		this.actionShow = cc.spawn(cc.scaleTo(0.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(0.5, 255));
		this.objShow    = null;
		this.objTmp     = null;
		this.Fish_setting.init();
	},

	onClickBack: function(){
		cc.RedT.inGame.playClick();
		this.onBack();
	},
	onBack: function(){
		if(this.objShow != null){
			if(void 0 == this.objShow.previous || null == this.objShow.previous){
				this.objShow.active = false;
				this.node.active    = false;
				this.objShow        = null;
			}else{
				this.objTmp              = this.objShow;
				this.objShow             = this.objShow.previous;
				this.objTmp.previous     = null;
				this.objTmp.active       = false;
				this.objShow.active      = true;
				this.objTmp              = null;
			}
		}else{
			this.node.active = false;
		}
	},
	onClosePrevious: function(obj){
		if(void 0 !== obj.previous && null !== obj.previous){
			this.onClosePrevious(obj.previous);
			delete obj.previous;
			//obj.previous = null;
		}
		obj.active = false;
	},
	onCloseDialog: function(){
		if(this.objShow != null){
			if(void 0 == this.objShow.previous || null == this.objShow.previous){
				this.objShow.active = this.node.active = false;
				this.objShow        = null;
			}else{
				this.onClosePrevious(this.objShow.previous);
				this.objShow.active          = this.node.active = false;
				delete this.objShow.previous;
				//this.objShow.previous        = null;
				this.objShow                 = null;
			}
		}else{
			this.node.active = false
		}
	},

	resetSizeDialog: function(node){
		node.stopAllActions();
		node.scale   = 0.5;
		node.opacity = 0;
	},

	/**
	 * Function Show Dialog
	*/
	showNap: function(back = false){
		this.node.active = this.Fish_nap.node.active = true;
		this.objShow     = this.Fish_nap.node;
		if (back === true) {
			this.Fish_nap.outGame = true;
		}
	},
	showHistory: function(){
		this.node.active = this.Fish_history.node.active = true;
		this.objShow     = this.Fish_history.node;
	},
	showFish: function(){
		this.node.active = this.Fish_fish.active = true;
		this.objShow     = this.Fish_fish;
	},
	showSetting: function(){
		this.node.active = this.Fish_setting.node.active = true;
		this.objShow     = this.Fish_setting.node;
	},
});
