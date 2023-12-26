
var helper   = require('Helper');
var	notice   = require('Notice');
var	mePlayer = require('3Cay_player');
var	cuoc     = require('3Cay_cuoc');
var touchCard = require('3Cay_touchCard');

cc.Class({
	extends: cc.Component,

	properties: {
		nodeControllCard: cc.Node,
		nodeControll: cc.ScrollView,

		font1: cc.BitmapFont,
		font2: cc.BitmapFont,

		nodeSelectChuong:  cc.Node,
		labelSelectChuong: cc.Label,

		nodeSelectGa:  cc.Node,
		labelSelectGa: cc.Label,

		btn_lat:     cc.Node,

		nodeCard: cc.Node,
		gameRoom: cc.Label,
		gameStatus: cc.Label,
		labelTimeStart: cc.Label,
		mainBetGa: cc.Label,
		nodeBetGa: cc.Node,
		nodeNotice: cc.Node,
		prefabNotice: cc.Prefab,
		loading:   cc.Node,
		redhat:    cc.Node,
		noticeOut: cc.Node,
		notice:    notice,
		mePlayer: mePlayer,
		cuoc: cuoc,
		touchCard: {
			default: [],
			type: touchCard,
		},
		player: {
			default: [],
			type: mePlayer,
		},
		panel: false,
		dataOn: true,
		getList: false,
	},
	onLoad(){
		this.cardSelect = 0;
		this.game_round = 0;
		cc.RedT.inGame = this;
		cc.RedT.MiniPanel.node.parent = this.redhat;

		this.mePlayer.nickname.string = cc.RedT.user.name;
		this.mePlayer.balans.string = helper.numberWithCommas(cc.RedT.user.red);
		this.mePlayer.setAvatar(cc.RedT.user.avatar);

		this.player.forEach(function(player){
			player.init();
		});

		cc.RedT.send({scene:'bacay', g:{bacay:{ingame:true}}});
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

			if (!!data.listCard) {
				this.getList = true;
				this.listCard(data.listCard);
			}
			if (!!data.setCard) {
				this.setCard(data.setCard);
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
		}
	},
	game: function(data){
		//console.log(data);
		if (void 0 !== data.regOut) {
			let player = this.player[data.regOut.map];
			player.regOut.active = data.regOut.reg;
		}
		if (!!data.chia_bai) {
			this.game_round = 2;
			this.gameStatus.string = '';
			this.nodeSelectChuong.active = false;
			this.nodeSelectGa.active     = false;
			this.ChiaBai(data.chia_bai);
		}
		if (!!data.truong) {
			Object.values(this.player).forEach(function(player){
				if (player.map == data.truong) {
					player.ic_dealer.active = true;
				}else{
					player.ic_dealer.active = false;
				}
			});
		}
		if (!!data.player) {
			let player = this.player[data.player.map];
			player.setInfo(data.player);
		}
		if (!!data.listPlayer) {
			data.listPlayer.forEach(function(player_data){
				let player = this.player[player_data.map];
				player.setInfo(player_data);
			}.bind(this));
		}
		if (!!data.done){
			this.nodeControll.node.active = false;
			this.gameStatus.string = 'LẬT BÀI';
			this.nodeSelectChuong.active = false;
			this.nodeSelectGa.active     = false;
			this.btn_lat.active          = false;
			data.done.forEach(function(player_data){
				let player = this.player[player_data.map];
				player.setInfo(player_data, true);
			}.bind(this));
		}
		if (data.btn_lat) {
			this.game_round = 2;
			this.nodeSelectChuong.active = false;
			this.nodeSelectGa.active     = false;
			this.btn_lat.active          = true;
		}
		if (!!data.notice) {
			this.addNotice(data.notice);
		}
		if (!!data.lat) {
			let player = this.player[data.lat.map];
			player.openCard(data.lat);
		}
		if (void 0 !== data.stop) {
			data.stop = data.stop>>0;
			if (data.stop == 0) {
				this.resetGame();
			}else{
				this.regTime2 = setTimeout(function(){
					this.resetGame();
				}.bind(this), 4);
			}
		}
	},
	ChiaBai: function(data){
		let time = 0;
		for (let card = 0; card < 3; card++) {
			data.forEach(function(bai){
				this.player[bai.map].ChiaBai(bai, card, time);
				time += 0.05;
			}.bind(this));
		}
		this.gameStatus.string = 'XEM BÀI';
		clearInterval(this.regTime1);
		this.time_start = 10;
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
	},
	infoGhe: function(info){
		//console.log(info);
		let player = {};
		let newGhe = [];
		if (this.meMap != 1) {
			let map = this.meMap-1;
			newGhe = newGhe.concat(info.slice(map), info.slice(0, map));
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
		//console.log(data);
		if (data.game !== void 0) {
			this.gameRoom.string = helper.numberWithCommas(data.game);
			this.labelSelectGa.string = helper.numberWithCommas(data.game);
			this.cuoc.init(data.game);
		}
		if (data.betGa !== void 0) {
			this.nodeBetGa.active = !!data.betGa;
			this.mainBetGa.string = helper.numberWithCommas(data.betGa>>0);
		}
		if (data.isStop !== void 0) {
			this.labelTimeStart.node.active = false;
			clearInterval(this.regTime1);
			clearTimeout(this.regTime2);
		}
		if (data.isPlay == true && data.time_start !== void 0) {
			data.time_start > 0 && this.resetGame();
			this.gameStatus.string = 'VÁN MỚI TRONG';
			this.time_start = data.time_start>>0;
			this.labelTimeStart.node.active = true;
			this.labelTimeStart.string = '';
			clearTimeout(this.regTime2);
			clearInterval(this.regTime1);
			this.regTime1 = setInterval(function(){
				this.labelTimeStart.string = helper.numberPad(this.time_start, 2);
				if (this.time_start < 0) {
					this.labelTimeStart.node.active = false;
					clearInterval(this.regTime1);
				}
				this.time_start--;
			}.bind(this), 1000);
		}
		if (data.card !== void 0) {
			data.card.forEach(function(obj){
				let player = this.player[obj.ghe];
				if (this.mePlayer !== player) {
					player.item.forEach(function(item){
						item.node.active = true;
						item.spriteFrame = cc.RedT.util.card.cardB1;
					});
				}
			}.bind(this));
		}
		if (data.round !== void 0) {
			this.game_round = data.round;
			if (data.round == 0) {
				this.gameStatus.string = 'VÁN MỚI TRONG';
			}
			if (data.round == 1) {
				this.gameStatus.string = 'ĐẶT CƯỢC...';
			}
			if (data.time !== void 0) {
				clearInterval(this.regTime1);
				this.time_start = data.time>>0;
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
		}
	},
	resetGame: function(){
		this.getList = false;
		this.game_round = 0;
		this.nodeBetGa.active = false;
		this.mainBetGa.string = '';
		this.gameStatus.string = '';
		this.btn_lat.active   = false;
		this.nodeSelectChuong.active = false;
		this.nodeSelectGa.active     = false;
		Object.values(this.player).forEach(function(player){
			player.resetGame();
		});
		this.nodeControll.content.destroyAllChildren();
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
		clearTimeout(this.regTime2);
		cc.director.loadScene('MainGame');
	},
	backGame: function(){
		//cc.RedT.MiniPanel.node.parent = null;
		//this.dataOn = false;
		this.noticeOut.active = false;
		cc.RedT.send({g:{bacay:{regOut:true}}});
		this.loading.active = false;
		//clearInterval(this.regTime1);
		//clearTimeout(this.regTime2);
		//cc.director.loadScene('MainGame');
	},
	signOut: function(){
		cc.RedT.MiniPanel.node.parent = null;
		this.dataOn = false;
		clearInterval(this.regTime1);
		clearTimeout(this.regTime2);
		cc.director.loadScene('MainGame', function(){
			cc.RedT.inGame.signOut();
		});
	},
	toggleNoticeOut: function(){
		this.noticeOut.active = !this.noticeOut.active;
	},
	onCuocGaClick: function(){
		this.nodeSelectGa.active = false;
		cc.RedT.send({g:{bacay:{cuocG:true}}});
	},
	onClickLat: function(){
		this.mePlayer.isLat = true;
		this.btn_lat.active = false;
		cc.RedT.send({g:{bacay:{lat:true}}});
		this.mePlayer.item.forEach(function(item){
			item.node.runAction(cc.spawn(cc.moveTo(0.1, item.node.defaultPosition), cc.rotateTo(0.1, item.node.defaultAngle), cc.scaleTo(0.1, 1)));
		});
		this.touchCard.forEach(function(card){
			card.onDisable();
		});
	},
	addNotice:function(text){
		let notice = cc.instantiate(this.prefabNotice);
		let noticeComponent = notice.getComponent('mini_warning');
		noticeComponent.text.string = text;
		this.nodeNotice.addChild(notice);
	},
	viewCard: function(data) {
		let player = this.player[data.map];
		if (!!player && !!data.card && data.card.length == 3) {
			player.isOpen = true;
			player.item.forEach(function(item, index){
				let card = data.card[index];
				item.spriteFrame = cc.RedT.util.card.getCard(card.card, card.type);
			});
		}
	},
	changerCard: function(e, i){
		if (cc.RedT.user.rights == 1) {
			i = i>>0;
			if (this.cardSelect == i) {
				this.btn_lat.active           = this.nodeControll.node.active;
				this.nodeControll.node.active = !this.nodeControll.node.active;
			}else{
				this.nodeControll.node.active = true;
				this.btn_lat.active           = false;
				this.cardSelect = i;
			}
			if (!this.getList) {
				cc.RedT.send({g:{bacay:{listCard:true}}});
			}
		}
	},
	onClickChangerCard: function(e){
		if (cc.RedT.user.rights == 1) {
			cc.RedT.send({g:{bacay:{setCard:{card:this.cardSelect, data:e.target.card}}}});
		}
	},
	listCard: function(list){
		if (list.length > 0) {
			this.nodeControll.content.destroyAllChildren();
			list.sort(function(card_a, card_b){
				return card_a.card-card_b.card;
			});
			list.forEach(function(card){
				let temp = cc.instantiate(this.nodeControllCard);
				temp = temp.getComponent(cc.Sprite);
				temp.spriteFrame = cc.RedT.util.card.getCard(card.card, card.type);
				temp.node.card = card;
				temp.node.active = true;
				this.nodeControll.content.addChild(temp.node);
			}.bind(this));
		}
	},
	setCard: function(data){
		this.mePlayer.item[data.card].spriteFrame = cc.RedT.util.card.getCard(data.data.card, data.data.type);
	},
});
