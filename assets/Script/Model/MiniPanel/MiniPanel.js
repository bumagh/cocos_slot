
cc.Class({
	extends: cc.Component,

	properties: {
		minigame:    cc.Node,
		Dialog:      cc.Node,
		TaiXiu:      cc.Node,
		MiniPoker:   cc.Node,
		BigBabol:    cc.Node,
		BauCua:      cc.Node,
		BaCay:       cc.Node,
		CaoThap:     cc.Node,
		AngryBirds:  cc.Node,
		MegaJackpot: cc.Node,

		TopHu:       cc.Node,

		nodeEfect:   cc.Node,
		// Prefab
		PrefabNoHu:   cc.Prefab,
		prefabBigWin: cc.Prefab,
		prefabMiniNotice: cc.Prefab
		
	},
	onLoad () {
		var self = this;
		this.node._onPreDestroy = function(){
			self.onDestroy();
		}

		this.TaiXiu     = this.TaiXiu.getComponent('TaiXiu');
		this.MiniPoker  = this.MiniPoker.getComponent('MiniPoker');
		this.BigBabol   = this.BigBabol.getComponent('BigBabol');
		this.BauCua     = this.BauCua.getComponent('BauCua');
		this.BaCay      = this.BaCay.getComponent('Mini3Cay');
		this.CaoThap    = this.CaoThap.getComponent('CaoThap');
		this.AngryBirds = this.AngryBirds.getComponent('AngryBirds');
		this.TopHu  = this.TopHu.getComponent('popupTopHu');
		this.Dialog = this.Dialog.getComponent('MiniDialog');
		this.MegaJackpot = this.MegaJackpot.getComponent('MegaJackpot');
		this.Dialog.init(this);
		this.TaiXiu.init(this);
		this.MiniPoker.init(this);
		this.BigBabol.init(this);
		this.BauCua.init(this);
		this.BaCay.init(this);
		this.CaoThap.init(this);
		this.AngryBirds.init(this);
		this.MegaJackpot.init(this);
		this.TopHu.init(this);

		if (cc.RedT.IS_LOGIN){
			this.signIn();
		}
	},
	signIn:function(){
		this.minigame.active = true;
		this.TaiXiu.signIn();
	},
	newGame: function() {
		this.minigame.active = false;
		this.Dialog.onCloseDialog();
		this.TaiXiu.newGame();
		this.BauCua.newGame();
		this.CaoThap.newGame();
	},
	onData: function(data){
		if (void 0 !== data.poker){
			this.MiniPoker.onData(data.poker);
		}
		if (void 0 !== data.big_babol){
			this.BigBabol.onData(data.big_babol);
		}
		if (void 0 !== data.baucua){
			this.BauCua.onData(data.baucua);
		}
		if (void 0 !== data.bacay){
			this.BaCay.onData(data.bacay);
		}
		if (void 0 !== data.caothap){
			this.CaoThap.onData(data.caothap);
		}
		if (void 0 !== data.arb){
			this.AngryBirds.onData(data.arb);
		}
		if (void 0 !== data.megaj){
			this.MegaJackpot.onData(data.megaj);
		}
	},
	onDestroy: function(){
		clearInterval(this.TaiXiu.TX_Main.timeInterval);
		clearTimeout(this.TaiXiu.regTimeOut);
		clearTimeout(this.TaiXiu.regTimeOut2);

		clearInterval(this.BauCua.timeInterval);
		clearTimeout(this.BauCua.regTimeOut);
		void 0 !== this.CaoThap.timeInterval && clearInterval(this.CaoThap.timeInterval);
	},
	playClick: function(){
		cc.RedT.audio.playClick();
	},
	playUnClick: function(){
		cc.RedT.audio.playUnClick();
	},
	setTop: function(obj){
		if (obj.runScale === false) {
			obj.stopAllActions();
			obj.runScale = true;
			let actionOn = cc.scaleTo(0.1, 1);//
			obj.runAction(cc.sequence(actionOn, cc.callFunc(function() {
				this.runScale = false;
			}, obj)));
		}
		this.minigame.children.forEach(function(game){
			if (game.active && game !== obj) {
				game.stopAllActions();
				let actionUn = cc.scaleTo(0.1, 0.7);
				game.runAction(cc.sequence(actionUn, cc.callFunc(function() {
					this.runScale = false;
				}, game)));
			}
		});
	},
});
