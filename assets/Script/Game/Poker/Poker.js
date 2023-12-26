
var helper        = require('Helper'),
	notice        = require('Notice'),
	module_player = require('Poker_Player');
var player_nap    = require('PokerNapGame');

cc.Class({
	extends: cc.Component,

	properties: {
		player_nap:player_nap,
		font1: cc.BitmapFont,
		font2: cc.BitmapFont,
		nodeNotice: cc.Node,
		prefabNotice: cc.Prefab,
		loading:   cc.Node,
		redhat:    cc.Node,
		bo_bai:    cc.Node,
		nodeout:   cc.Node,
		notice:    notice,
		player: {
			default: [],
			type: module_player,
		},
		labelRoom:  cc.Label,
		mainBet:    cc.Label,
		labelTimeStart: cc.Label,
		roomCard:   cc.Node,
		prefabCard: cc.Node,

		botton:   cc.Node,
		btm_bo:   cc.Node,
		btm_xem:  cc.Node,
		btm_theo: cc.Node,
		btm_to:   cc.Node,
		btm_all:  cc.Node,

		nodePanelCardMain: cc.Node,
		nodeBTNPane:       cc.Node,

		nodeTo:   cc.Node,

		spriteAll:  cc.SpriteFrame,
		spriteHuy:  cc.SpriteFrame,
		spriteTheo: cc.SpriteFrame,
		spriteXem:  cc.SpriteFrame,
		spriteCuoc: cc.SpriteFrame,
		spriteWin:  cc.SpriteFrame,
		spriteMeWin:cc.SpriteFrame,
		spriteLost: cc.SpriteFrame,
		spriteHoa:  cc.SpriteFrame,

		titleCard: {
			default: [],
			type: cc.SpriteFrame,
		},

		panel: false,
		dataOn: true,
	},
	onLoad(){
		cc.RedT.inGame = this;
		cc.RedT.MiniPanel.node.parent = this.redhat;

		this.game_player = null;

		cc.RedT.audio.bg.pause();
		//cc.RedT.audio.bg = cc.RedT.audio.bgSlot1;

		//this.dialog.init();
		this.player.forEach(function(player){
			player.init();
		});

		this.redTcard = this.nodePanelCardMain.children.map(function(item){
			return item.getComponent(cc.Sprite);
		});

		cc.RedT.send({scene:'poker', g:{poker:{ingame:true}}});
		/**
		if(cc.RedT.isSoundBackground()){
			this.playMusic();
		}
		*/
		this.timeStop = 0;

		if (cc.RedT.user.rights == 1) {
			this.nodeBTNPane.active = true;
		}
	},
	onData: function(data) {
		if (!!data.mini){
			cc.RedT.MiniPanel.onData(data.mini);
		}
		if (!!data.TopHu){
			cc.RedT.MiniPanel.TopHu.onData(data.TopHu);
		}
		if (!!data.taixiu){
			cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(data.taixiu);
		}
		if (void 0 !== data.vipp) {
			cc.RedT.MiniPanel.Dialog.VipPoint.onData(data.vipp);
		}
		if (void 0 !== data.user){
			cc.RedT.userData(data.user);
		}
		if (this.dataOn) {
			if (!!data.viewCard) {
				this.viewCard(data.viewCard);
			}
			if (!!data.mainCard) {
				this.viewMainCard(data.mainCard);
			}
			if (!!data.meMap) {
				this.meMap = data.meMap;
			}
			if (!!data.infoGhe) {  // thông tin các ghế
				this.infoGhe(data.infoGhe);
			}
			if (!!data.infoRoom) { // thông tin phòng
				this.infoRoom(data.infoRoom);
			}
			if (!!data.ingame) {  // có người vào phòng
				this.ingame(data.ingame);
			}
			if (!!data.outgame) {  // có người ra khỏi phòng
				this.outgame(data.outgame);
			}
			if (!!data.game) {
				this.game(data.game);
			}
			if (!!data.kick) {
				this.kick();
			}
			if (void 0 !== data.notice){
				this.notice.show(data.notice);
			}
			if (void 0 !== data.load){
				this.loading.active = data.load;
			}
			if (void 0 !== data.nap){
				this.player_nap.node.active = data.nap;
			}
		}
	},
	gameStart: function(data){
		data.forEach(function(player){
			this.player[player.ghe].setInfo(player.data);
		}.bind(this));
	},
	gamePlayer: function(data){
		let player = this.player[data.ghe];
		if (data.data !== void 0) {
			player.setInfo(data.data);
		}
		if (data.info !== void 0) {
			player.infoGame(data.info);
		}
	},
	resetGame: function(){
		this.timeStop = 0;
		//if (!!this.mainBet) {
			this.mainBet.string = '';
			this.roomCard.destroyAllChildren();
			this.nodeNotice.destroyAllChildren();
			Object.values(this.player).forEach(function(player){
				player.resetGame();
			});
		//}
	},
	gameInfo: function(data){
		data.data.forEach(function(player){
			let obj = this.player[player.ghe];
			if (player.data !== void 0) {
				obj.setInfo(player.data, !!data.win);
			}
			if (player.info !== void 0) {
				obj.infoGame(player.info);
			}
		}.bind(this));
		if(!!data.win){
			this.node.runAction(cc.sequence(
				cc.delayTime(1),
				cc.callFunc(function() {
					Object.values(this.player).forEach(function(player){
						player.item.forEach(function(item){
							item.node.color = item.node.color.fromHEX('999999');
						});
					});
					this.roomCard.children.forEach(function(item){
						item.children[0].color = item.children[0].color.fromHEX('999999');
						data.win.bo.forEach(function(bo){
							if (item.card.card == bo.card && item.card.type == bo.type) {
								item.children[0].color = item.children[0].color.fromHEX('FFFFFF');
							}
						});
					});
					let player = this.player[data.win.ghe];
					player.item.forEach(function(item){
						if (!!item.bai) {
							data.win.bo.forEach(function(bo){
								if (item.bai.card == bo.card && item.bai.type == bo.type) {
									item.node.color = item.node.color.fromHEX('FFFFFF');
								}
							});
						}
					});
					if (data.win.code == 2) {
						// Đôi
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[0];
					}else if (data.win.code == 3) {
						// 2 đôi (Thú)
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[1];
					}else if (data.win.code == 4) {
						// Sám
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[2];
					}else if (data.win.code == 5) {
						// Sảnh
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[3];
					}else if (data.win.code == 6) {
						// Thùng
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[4];
					}else if (data.win.code == 7) {
						// Cù Lũ
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[5];
					}else if (data.win.code == 8) {
						// Tứ Quý
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[6];
					}else if (data.win.code == 9) {
						// Sảnh Thùng
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[7];
					}else if (data.win.code == 10) {
						// Thùng Phá Sảnh
						player.titleCard.node.active = true;
						player.titleCard.spriteFrame = this.titleCard[8];
					}
				}, this),
			));
		}
	},
	gameStop: function(){
		this.offSelect();
		this.labelTimeStart.string = '';
		this.labelTimeStart.node.active = false;
		clearInterval(this.regTime1);
		this.timeStop = new Date().getTime();
	},
	offSelect: function(){
		if (!!this.game_player) {
			this.game_player.isUpdate = false;
			this.game_player.progressTime = 0;
			this.game_player.Progress.progress = 0;
		}
		this.botton.active = false;
		this.nodeTo.active = false;
	},
	game: function(data){
		if (!!data.start) {
			this.gameStart(data.start);
		}
		if (!!data.stop) {
			this.gameStop();
		}
		if (!!data.finish) {
			this.gameStop();
		}
		if (!!data.chia_bai) {
			this.ChiaBai(data.chia_bai);
		}
		if (!!data.turn) {
			this.LuotChoi(data.turn);
		}
		if (!!data.info) {
			this.gameInfo(data.info);
		}
		if (!!data.player) {
			this.gamePlayer(data.player);
		}
		if (!!data.offD) {
		}
		if (data.offSelect !== void 0) {
			this.offSelect();
		}
		if (!!data.card) {
			// thẻ bài trên bàn
			this.mainCard(data.card);
		}
	},
	LuotChoi: function(data){
		let player = this.player[data.ghe];
		if (!!this.game_player) {
			this.game_player.isUpdate = false;
			this.game_player.progressTime = 0;
			this.game_player.Progress.progress = 0;
		}
		this.game_player = player;
		player.startProgress(data.progress);
		if (data.select !== void 0) {
			this.botton.active = true;
			if (data.select.xem) {
				this.btm_xem.active = true;
			}else{
				this.btm_xem.active = false;
			}
			if (data.select.theo) {
				this.btm_theo.active = true;
			}else{
				this.btm_theo.active = false;
			}
			if (data.select.to) {
				this.btm_to.active = true;
			}else{
				this.btm_to.active = false;
			}
			if (data.select.all) {
				this.btm_all.active = true;
			}else{
				this.btm_all.active = false;
			}
		}else{
			this.botton.active = false;
			this.nodeTo.active = false;
		}
	},
	mainCard: function(data){
		let time = 0.1;
		let position = this.bo_bai.parent.convertToWorldSpaceAR(this.bo_bai.position);
		data.forEach(function(card){
			let node = cc.instantiate(this.prefabCard);
			this.roomCard.addChild(node);
			let component = node.children[0].getComponent(cc.Sprite);
			component.node.runAction(
				cc.sequence(
					cc.delayTime(time),
					cc.callFunc(function(){
						component.node.position = component.node.parent.convertToNodeSpaceAR(position);
						component.node.scaleX = this.bo_bai.width/component.node.width;
						component.node.scaleY = this.bo_bai.height/component.node.height;
						component.spriteFrame = cc.RedT.util.card.cardB1;
					}, this),
					cc.spawn(cc.moveTo(0.1, cc.v2(0,0)), cc.scaleTo(0.1, 1)),
					cc.delayTime(0.1),
					cc.scaleTo(0.1, 0, 1),
					cc.callFunc(function(){
						component.spriteFrame = cc.RedT.util.card.getCard(card.card, card.type);
						node.card = card;
						component = null;
						card = null;
						node = null;
					}, this),
					cc.scaleTo(0.1, 1, 1)
				)
			);
			time += 0.1;
		}.bind(this));
	},
	ChiaBai: function(data){
		let time = 0;
		for (let card = 0; card < 2; card++) {
			data.forEach(function(bai){
				this.player[bai.id].ChiaBai(bai, card, time);
				time += 0.05;
			}.bind(this));
		}
	},
	infoGhe: function(info){
		let player = {};
		let newGhe = [];
		if (this.meMap != 1) {
			let map = this.meMap-1;
			newGhe = newGhe.concat(info.slice(map),info.slice(0, map));
		}else{
			newGhe = info;
		}
		newGhe.forEach(function(obj, index){
			let item = this.player[index];
			item.map = obj.ghe;
			player[obj.ghe] = item;
			item.setInfo(obj.data);
			return void 0;
		}.bind(this));
		this.player = player;
		player = null;
		newGhe = null;
	},
	infoRoom: function(data){
		if (data.game !== void 0) {
			this.labelRoom.string = helper.numberWithCommas(data.game);
			this.player_nap.init(data.game);
		}
		if (data.bet !== void 0) {
			this.mainBet.string = helper.numberWithCommas(data.bet);
		}
		if (data.isStop !== void 0) {
			this.labelTimeStart.node.active = false;
			clearInterval(this.regTime1);
		}
		if (data.isPlay == true && data.time_start !== void 0) {
			this.resetGame();
			this.time_start = data.time_start>>0;
			this.labelTimeStart.node.active = true;
			this.labelTimeStart.string = '';
			this.regTime1 = setInterval(function(){
				this.labelTimeStart.string = helper.numberPad(this.time_start, 2);
				if (this.time_start < 0) {
					this.labelTimeStart.node.active = false;
					clearInterval(this.regTime1);
				}
				this.time_start--;
			}.bind(this), 1000);
		}
		if (data.first !== void 0) {
			data.first.forEach(function(player){
				let get_player = this.player[player.id];
				get_player.noticeBet(player.bet, '', 2, 22, cc.RedT.inGame.font1);
				get_player.bet.string = helper.numberWithCommas(player.bet);
			}.bind(this));
		}
		if (data.card !== void 0) {
			data.card.forEach(function(obj){
				let player = this.player[obj.ghe];
				if (cc.RedT.inGame.player[cc.RedT.inGame.meMap] !== player) {
					player.item.forEach(function(item){
						item.node.active = true;
						item.spriteFrame = cc.RedT.util.card.cardB1;
					});
				}
			}.bind(this));
		}
	},
	ingame: function(data){
		this.player[data.ghe].setInfo(data.data);
	},
	outgame: function(data){
		this.player[data].setInfo(null);
	},
	kick: function(){
		cc.RedT.MiniPanel.node.parent = null;
		this.dataOn = false;
		this.loading.active = true;
		clearInterval(this.regTime1);
		cc.director.loadScene('MainGame');
	},
	backGame: function(){
		cc.RedT.MiniPanel.node.parent = null;
		this.dataOn = false;
		cc.RedT.send({g:{poker:{outgame:true}}});
		this.loading.active = true;
		clearInterval(this.regTime1);
		cc.director.loadScene('MainGame');
	},
	signOut: function(){
		cc.RedT.MiniPanel.node.parent = null;
		this.dataOn = false;
		clearInterval(this.regTime1);
		cc.director.loadScene('MainGame', function(){
			cc.RedT.inGame.signOut();
		});
	},
	onSelect: function(event, select){
		cc.RedT.send({g:{poker:{select:select}}});
	},
	toggleTo: function(){
		this.nodeTo.active = !this.nodeTo.active;
	},
	toggleNap: function(){
		this.player_nap.node.active = !this.player_nap.node.active;
	},
	toggleOut: function(){
		this.nodeout.active = !this.nodeout.active;
	},
	togglePanel: function(){
		if (this.panel) {
			this.panel = false;
			this.nodePanelCardMain.active = false;
		}else{
			cc.RedT.send({g:{poker:{maincard:true}}});
			this.nodePanelCardMain.active = true;
			this.panel = true;
		}
	},
	viewCard: function(data) {
		let player = this.player[data.map];
		if (!!player && !!data.card && data.card.length == 2) {
			player.isOpen = true;
			player.item.forEach(function(item, index){
				let card = data.card[index];
				item.spriteFrame = cc.RedT.util.card.getCard(card.card, card.type);
			});
		}
	},
	viewMainCard: function(data){
		this.redTcard.forEach(function(item, index) {
			let card = data[index];
			if (!!card){
				item.spriteFrame = cc.RedT.util.card.getCard(card.card, card.type);
			}
		});
	},
	update: function() {
		if (this.timeStop != 0) {
			let date = new Date().getTime();
			date = date-this.timeStop;
			if (date >= 8000) {
				this.timeStop = 0;
				this.resetGame();
			}
		}
	}
});
