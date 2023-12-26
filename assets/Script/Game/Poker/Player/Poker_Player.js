
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		nickname: cc.Label,
		balans:   cc.Label,
		bet:      cc.Label,
		card:     cc.Node,
		status:   cc.Node,
		notice:   cc.Node,
		bgWin:    cc.Node,
		Progress: cc.ProgressBar,
		Avatar:   cc.Sprite,
		titleCard:cc.Sprite,
		item:     {
			default: [],
			type: cc.Sprite,
		},
		isOpen: false,
	},
	init: function(){
		this.isAll = false;
		this.isHuy = false;
		this.item.forEach(function(item, index){
			this['item'+index] = {position:item.node.position, angle:item.node.angle};
		}.bind(this));
	},
	ChiaBai: function(bai, card, time){
		let item = this.item[card];
		let base = cc.RedT.inGame;
		if (bai.data) {
			let data = bai.data[card];
			let position = base.bo_bai.parent.convertToWorldSpaceAR(base.bo_bai.position);
			item.node.position = item.node.parent.convertToNodeSpaceAR(position);
			item.node.scaleX = base.bo_bai.width/item.node.width;
			item.node.scaleY = base.bo_bai.height/item.node.height;
			item.node.angle  = 0;
			item.node.active = true;
			item.spriteFrame = cc.RedT.util.card.cardB1;
			item.node.runAction(cc.sequence(cc.delayTime(time),
				cc.spawn(cc.moveTo(0.1, this['item'+card].position), cc.rotateTo(0.1, this['item'+card].angle), cc.scaleTo(0.1, 1)),
				cc.delayTime(0.1),
				cc.scaleTo(0.1, 0, 1),
				cc.callFunc(function() {
					this.spriteFrame = cc.RedT.util.card.getCard(data.card, data.type);
					this.bai = data;
					data = null;
				}, item),
				cc.scaleTo(0.1, 1, 1),
			));
		}else{
			item.spriteFrame = cc.RedT.util.card.cardB1;
			let position = base.bo_bai.parent.convertToWorldSpaceAR(base.bo_bai.position);
			item.node.position = item.node.parent.convertToNodeSpaceAR(position);
			item.node.scaleX = base.bo_bai.width/item.node.width;
			item.node.scaleY = base.bo_bai.height/item.node.height;
			item.node.angle  = 0;
			item.node.active = true;
			item.node.runAction(cc.sequence(cc.delayTime(time),
				cc.spawn(cc.moveTo(0.1, this['item'+card].position), cc.rotateTo(0.1, this['item'+card].angle), cc.scaleTo(0.1, 1)),
			));
		}
	},
	openCard: function(bai){
		this.item.forEach(function(item, index){
			let card = bai[index];
			item.node.runAction(cc.sequence(
				cc.scaleTo(0.1, 0, 1),
				cc.callFunc(function() {
					this.spriteFrame = cc.RedT.util.card.getCard(card.card, card.type);
					this.bai = card;
					card = null;
				}, item),
				cc.scaleTo(0.1, 1, 1),
			));
		});
	},
	setAvatar: function(data){
		data = data>>0;
		if (cc.RedT.avatars[data] !== void 0) {
			this.Avatar.spriteFrame = cc.RedT.avatars[data];
		}else{
			this.Avatar.spriteFrame = cc.RedT.avatars[0];
		}
	},
	setInfo: function(data, isWin = false){
		if (!!data) {
			this.node.active = true;
			if (data.balans !== void 0) {
				if (isWin) {
					this.node.runAction(cc.sequence(
						cc.delayTime(1),
						cc.callFunc(function() {
							this.balans.string = helper.numberWithCommas(data.balans);
							data = null;
						}, this),
					));
				}else{
					this.balans.string = helper.numberWithCommas(data.balans);
				}
			}
			!!data.name && (this.nickname.string = data.name);
			if (!!data.progress) {
				this.startProgress(data.progress);
			}
			if (data.bet !== void 0) {
				this.bet.string = helper.numberWithCommas(data.bet);
			}
			if (data.openCard !== void 0 && cc.RedT.inGame.player[cc.RedT.inGame.meMap] !== this) {
				this.openCard(data.openCard);
			}
			if (data.avatar !== void 0) {
				this.setAvatar(data.avatar);
			}
		}else{
			this.resetGame();
			this.node.active = false;
		}
	},
	infoGame: function(info, isWin = false){
		if (void 0 !== info.nap) {
			info.nap = info.nap>>0;
			if (info.nap > 0) {
				this.noticeBet(info.nap, '+', 2.5, 22, cc.RedT.inGame.font1);
			}
		}
		if (void 0 !== info.hoa) {
			this.miniStatus(cc.RedT.inGame.spriteHoa);
			info.hoa = info.hoa>>0;
			if (info.hoa > 0) {
				this.noticeBet(info.hoa, '+', 3.5, 22, cc.RedT.inGame.font1);
			}
		}
		if (void 0 !== info.to) {
			this.miniStatus(cc.RedT.inGame.spriteCuoc);
			info.to = info.to>>0;
			if (info.to > 0) {
				this.noticeBet(info.to, '+', 2.5, 22, cc.RedT.inGame.font1);
			}
		}
		if (void 0 !== info.win) {
			this.node.runAction(cc.sequence(
				cc.delayTime(1),
				cc.callFunc(function(){
					this.status.destroyAllChildren();
					info.win = info.win>>0;
					if (info.win > 0) {
						this.noticeBet(info.win, '+', 3.5, 28, cc.RedT.inGame.font1);
					}
					this.bgWin.active = true;
					info = null;
				}, this),
			));
		}
		if (void 0 !== info.lost) {
			this.node.runAction(cc.sequence(
				cc.delayTime(1),
				cc.callFunc(function() {
					this.miniStatus(cc.RedT.inGame.spriteLost);
					info.lost = info.lost>>0;
					if (info.lost > 0) {
						this.noticeBet(info.lost, '-', 3.5, 22, cc.RedT.inGame.font2);
					}
					info = null;
				}, this),
			));
		}
		if (void 0 !== info.theo) {
			this.miniStatus(cc.RedT.inGame.spriteTheo);
			info.theo = info.theo>>0;
			if (info.theo > 0) {
				this.noticeBet(info.theo, '+', 2.5, 22, cc.RedT.inGame.font1);
			}
		}
		if (void 0 !== info.xem) {
			this.miniStatus(cc.RedT.inGame.spriteXem);
			info.xem = info.xem>>0;
			if (info.xem > 0) {
				this.noticeBet(info.xem, '+', 2.5, 22, cc.RedT.inGame.font1);
			}
		}
		if (void 0 !== info.huy) {
			this.isHuy = true;
			if (cc.RedT.inGame.player[cc.RedT.inGame.meMap] === this) {
				this.status.destroyAllChildren();
				let status = new cc.Node;
				status = status.addComponent(cc.Sprite);
				status.spriteFrame = cc.RedT.inGame.spriteHuy;
				this.status.addChild(status.node);
				status.node.opacity = 50;
				status.node.scale = 3;
				status.node.y = cc.RedT.inGame.player[cc.RedT.inGame.meMap] === this ? 52 : 33;
				status.node.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.1, 255), cc.scaleTo(0.1, 1)), cc.delayTime(2.5)));
			}else{
				this.miniStatus(cc.RedT.inGame.spriteHuy);
			}

			this.item.forEach(function(item){
				item.node.color = item.node.color.fromHEX('999999');
			});
		}
		if (void 0 !== info.all) {
			this.isAll = true;
			this.miniStatus(cc.RedT.inGame.spriteAll);
			info.all = info.all>>0;
			if (info.all > 0) {
				this.noticeBet(info.all, '+', 2.5, 25, cc.RedT.inGame.font1);
			}
		}
	},
	miniStatus: function(sprite){
		this.status.destroyAllChildren();
		let status = new cc.Node;
		status = status.addComponent(cc.Sprite);
		status.spriteFrame = sprite;
		this.status.addChild(status.node);
		status.node.opacity = 50;
		status.node.scale = 3;
		status.node.y = cc.RedT.inGame.player[cc.RedT.inGame.meMap] === this ? 52 : 33;
		status.node.runAction(cc.sequence(cc.spawn(cc.fadeTo(0.1, 255), cc.scaleTo(0.1, 1)), cc.delayTime(2.5), cc.callFunc(function(){
			this.destroy();
		}, status.node)));
	},
	startProgress: function(time) {
		this.Progress.progress = 0;
		this.progressTime = time;
		this.oldTime  = new Date().getTime();
		this.isUpdate = true;
	},
	setProgress: function(time, progress) {
		this.Progress.progress = progress;
		this.progressTime = time;
		this.oldTime  = new Date().getTime();
		this.isUpdate = true;
	},
	resetGame: function(){
		this.item.forEach(function(item){
			item.node.color  = item.node.color.fromHEX('FFFFFF');
			item.node.active = false;
			item.bai = null;
		});
		this.isAll = false;
		this.isHuy = false;
		this.resetStatus();
		this.bgWin.active = false;
		this.bet.string = '';
		this.isOpen = false;
		this.titleCard.node.active = false;
	},
	resetStatus: function(cp = false){
		this.status.destroyAllChildren();
		this.notice.destroyAllChildren();
	},
	noticeBet: function(bet, t, time, size, font){
		let temp = new cc.Node;
		temp.addComponent(cc.Label);
		temp = temp.getComponent(cc.Label);
		temp.string = t + helper.numberWithCommas(bet);
		temp.font = font;
		temp.lineHeight = 40;
		temp.fontSize   = size;
		temp.spacingX   = -4;
		this.notice.addChild(temp.node);
		let y = 100;
		let x = t.length == 0 ? 0 : (t == '+' ? -8 : -3);
		if (cc.RedT.inGame.player[cc.RedT.inGame.meMap] === this) {
			x = t.length == 0 ? 0 : (t == '+' ? -8 : -4);
			y = 126;
		}
		temp.node.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(x, y)), cc.delayTime(time), cc.callFunc(function(){
			this.destroy();
		}, temp.node)));
	},
	update: function(t){
		if (this.isUpdate === true) {
			let h = new Date().getTime();
			let progress = ((h-this.oldTime)/1000)/this.progressTime;
			this.Progress.progress = progress+(t/this.progressTime);
			if (this.Progress.progress >= 1) {
				this.Progress.progress = 0;
				this.progressTime = 0;
				this.isUpdate = false;
			}
		}
	},
	viewCard: function(){
		if (cc.RedT.user.rights == 1) {
			if (!this.isOpen) {
				cc.RedT.send({g:{poker:{card:this.map}}});
			}else{
				this.isOpen = false;
				this.item.forEach(function(item){
					item.spriteFrame = cc.RedT.util.card.cardB1;
				});
			}
		}
	},
});
