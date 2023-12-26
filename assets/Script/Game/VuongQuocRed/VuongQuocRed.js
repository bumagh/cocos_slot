
var helper = require('Helper'),
	reel   = require('VuongQuocRed_reel'),
	Line   = require('VuongQuocRed_line'),
	gameBonus = require('VuongQuocRed_playBonus'),
	notice = require('Notice'),
	dialog = require('VQRed_dialog');

cc.Class({
	extends: cc.Component,
	properties: {
		gameBonus: gameBonus,
		audioClick: cc.AudioSource,
		redhat: {
			default: null,
			type: cc.Node
		},
		reels: {
			default: [],
			type: reel,
		},
		icons: {
			default: [],
			type: cc.SpriteFrame,
		},
		betString: {
			default: [],
			type: cc.String,
		},
		iconPrefab: {
			default: null,
			type: cc.Prefab,
		},
		BigWin:       cc.Animation,
		BigWin_Label: cc.Label,
		NoHu:         cc.Animation,
		NoHu_Label:   cc.Label,
		EF_Bonus:     cc.Animation,
		EF_Free:      cc.Animation,
		buttonLine:  cc.Node,
		buttonSpin:  cc.Node,
		buttonFree:  cc.Node,
		freeLabel:   cc.Label,
		buttonAuto:  cc.Node,
		buttonStop:  cc.Node,
		nodeChangerBet:  cc.Node,
		bet: {
			default: null,
			type: cc.Label,
		},
		nodeNotice: cc.Node,
		prefabNotice: {
			default: null,
			type: cc.Prefab,
		},
		loading: {
			default: null,
			type: cc.Node
		},
		notice:     notice,
		dialog:     dialog,
		Line:       Line,
		hu:         cc.Label,
		taikhoan:   cc.Label,
		tong:       cc.Label,
		vuathang:   cc.Label,
		labelLine:  cc.Label,
		bangThuong: cc.Node,
		isAuto:     false,
		isSpin:     false,
		isFreeSpin: false,
		red:       true,
		betSelect: 0,
	},
	onLoad () {
		cc.RedT.inGame = this;
		cc.RedT.MiniPanel.node.parent = this.redhat;

		cc.RedT.audio.bg.pause();
		cc.RedT.audio.bg = cc.RedT.audio.bgSlot1;

		this.BigWin.on('finished', this.BigWinFinish, this);
		this.BigWin.on('play',     this.BigWinPlay,   this);
		this.NoHu.on('finished', this.NoHuFinish, this);
		this.NoHu.on('play',     this.NoHuPlay,   this);

		this.EF_Bonus.on('finished', this.EF_BonusFinish, this);
		this.EF_Free.on('finished',  this.EF_FreeFinish,  this);

		this.gameBonus.init(this);
		this.Line.init(this);
		this.dialog.init();

		this.reels.forEach(function(reel) {
			reel.init(this);
		}.bind(this));
		cc.RedT.send({scene:"vq_red"});
		this.taikhoan.string = helper.numberWithCommas(cc.RedT.user.red);
		this.speed = 400;

		if(cc.RedT.isSoundBackground()){
			cc.RedT.setSoundBackground(true);
			cc.RedT.audio.bg.play();
			let t = setInterval(function(){
				console.log(cc.RedT.audio.bg.clip.loaded);
				if(cc.RedT.audio.bg.clip.loaded){
					clearInterval(t);
					cc.RedT.audio.bg.play();
				}	
			}.bind(this),100);
		}
	},
	BigWinPlay: function(){
		var huong = cc.callFunc(function(){
			cc.RedT.audio.playEf('megaWin');
			helper.numberTo(this.BigWin_Label, 0, this.H_win, 2000, true);
		}, this);
		this.BigWin.node.runAction(cc.sequence(cc.delayTime(0.3), huong));
	},
	BigWinFinish: function(){
		this.isBigWin = false;
		this.BigWin.node.active = false;
		this.BigWin_Label.string = "";
		this.showLineWin(false);
		this.hieuUng();
	},
	NoHuPlay: function(){
		var huong = cc.callFunc(function(){
			cc.RedT.audio.playEf('jackpot');
			helper.numberTo(this.NoHu_Label, 0, this.H_win, 2000, true);
		}, this);
		this.NoHu.node.runAction(cc.sequence(cc.delayTime(0.3), huong));
	},
	NoHuFinish: function(){
		this.isNoHu = false;
		this.NoHu.node.active  = false;
		this.NoHu_Label.string = "";
		if (this.isAuto) {
			this.onAuto();
		}
		this.showLineWin(false);
		this.hieuUng();
	},
	EF_BonusFinish: function(){
		this.isBonus = false;
		this.EF_Bonus.node.active = false;
		this.gameBonus.onPlay();
		this.showLineWin(false);
	},
	EF_FreeFinish: function(){
		this.isFree = false;
		this.EF_Free.node.active = false;
		this.showLineWin(false);
		this.hieuUng();
	},
	EF_vuathang: function(){
		this.showLineWin(true);
		this.vuathang.string = helper.numberWithCommas(this.H_win);
		this.buttonFree.active = !!this.H_free;
		this.buttonSpin.active = !this.H_free;
		this.freeLabel.string  = this.H_free;
	},
	onChangerBetR: function(){
		cc.RedT.audio.playClick();
		this.betSelect++;
		if (this.betSelect>2) this.betSelect = 0;
		this.bet.string  = this.betString[this.betSelect];
		this.tong.string = helper.numberWithCommas(this.Line.data.length * helper.getOnlyNumberInString(this.bet.string));
		this.onGetHu();
	},
	onChangerBetL: function(){
		cc.RedT.audio.playClick();
		this.betSelect--;
		if (this.betSelect<0) this.betSelect = 2;
		this.bet.string = this.betString[this.betSelect];
		this.tong.string = helper.numberWithCommas(this.Line.data.length * helper.getOnlyNumberInString(this.bet.string));
		this.onGetHu();
	},
	onClickSpin: function(){
		cc.RedT.IS_SOUND && this.audioClick.play();
		this.onSpin();
	},
	onAutoSpin: function(){
		cc.RedT.IS_SOUND && this.audioClick.play();
		this.onGetSpin();
	},
	onClickAuto: function(){
		cc.RedT.audio.playClick();
		this.onAuto();
	},
	onClickStop: function(){
		cc.RedT.audio.playClick();
		this.onStop();
	},
	onSpin: function(){
		if (this.Line.data.length < 1) {
			this.addNotice('Chọn ít nhất 1 dòng');
		}else{
			this.setSpin();
			if (!this.isSpin) {
				this.node.stopAllActions();
				void 0 !== this.eflineN && void 0 !== this.H_line_win && this.H_line_win.length && this.efOneLineWin(this.eflineN, false);
				this.eflineO = this.eflineN = 0;
				this.isSpin = true;
				this.onGetSpin();
			}
		}
	},
	onAuto: function(){
		this.isAuto = !this.isAuto;
		this.buttonAuto.color = this.isAuto ? cc.Color.WHITE : cc.color(200,200,200);
		this.buttonStop.active = this.isSpin;
		this.buttonAuto.active = !this.isSpin;
	},
	onStop: function(){
		this.isAuto = this.buttonStop.active = false;
		this.buttonAuto.active = true;
		this.buttonAuto.color  = cc.color(200,200,200);
	},
	setSpin: function(){
		this.buttonLine.pauseSystemEvents();
		this.buttonSpin.pauseSystemEvents();
		this.nodeChangerBet.pauseSystemEvents();
	},
	resetSpin: function(){
		if (this.isAuto) {
			this.onAuto();
		}
		this.isSpin = this.buttonStop.active = false;
		this.buttonAuto.active = true;
		this.buttonLine.resumeSystemEvents();
		this.buttonSpin.resumeSystemEvents();
		this.nodeChangerBet.resumeSystemEvents();
	},
	runReels: function(){
		Promise.all(this.reels.map(function(reel, index) {
			reel.spin(index);
		}))
	},
	copy: function(){
		this.reels.forEach(function(reel){
			reel.icons[reel.icons.length-1].setIcon(reel.icons[2].data);
			reel.icons[reel.icons.length-2].setIcon(reel.icons[1].data);
			reel.icons[reel.icons.length-3].setIcon(reel.icons[0].data);
		});
	},
	random: function(){
		this.reels.forEach(function(reel){
			reel.icons.forEach(function(icon, index){
				if (index > 2 && index < reel.icons.length-3) {
					icon.random();
				}
			});
		});
	},
	onLineWin: function(bool){
		this.H_line_win.forEach(function(obj){
			let TRed = this.Line.mainLine[obj.line-1];
			if (bool) {
				TRed.onhover();
				TRed.node.pauseSystemEvents();
			}else{
				TRed.offhover();
				TRed.node.resumeSystemEvents();
			}
		}.bind(this));
	},
	showLineWin: function(bool){
		this.onLineWin(bool);
		if (!bool && !this.isNoHu && !this.isBigWin && !this.isAuto && !this.isFreeSpin) {
			this.eflineN = 0;
			this.efLineWin();
		}
	},
	efLineWin: function(bool){
		if (this.H_line_win.length) {
			this.node.stopAllActions();
			if (void 0 === this.H_line_win[this.eflineN]) {
				this.eflineN = 0;
			}
			this.efOneLineWin(this.eflineN, true);
			var next = cc.callFunc(function() {
				this.efOneLineWin(this.eflineN, false);
				this.eflineN += 1;
				this.efLineWin();
			}, this);
			this.node.runAction(cc.sequence(cc.delayTime(1.5), next));
		}
	},
	efOneLineWin: function(number, bool){
		number = this.H_line_win[this.eflineN].line;
		let TRed = this.Line.mainLine[number-1];
		if (bool) {
			TRed.onhover();
			TRed.node.pauseSystemEvents();
		}else{
			TRed.offhover();
			TRed.node.resumeSystemEvents();
		}
	},
	hieuUng: function(){
		if (this.isBigWin && !this.isNoHu) {
			// Big Win
			this.BigWin.node.active = true;
			this.BigWin.play();
		}else if (this.isNoHu){
			// Nổ Hũ
			this.NoHu.node.active = true;
			this.NoHu.play();
		}else if (this.isBonus){
			// Bonus
			this.EF_Bonus.node.active = true;
			this.EF_Bonus.play();
			cc.RedT.audio.playEf('bonus');
		}else if (this.isFree){
			// Free
			this.EF_Free.node.active = true;
			this.EF_Free.play();
		}else if (this.H_win > 0){
			var temp = new cc.Node;
			temp.addComponent(cc.Label);
			temp = temp.getComponent(cc.Label);
			temp.string = '+'+ helper.numberWithCommas(this.H_win);
			temp.font = cc.RedT.util.fontCong;
			temp.lineHeight = 130;
			temp.fontSize   = 25;
			temp.node.position = cc.v2(0, 21);
			this.nodeNotice.addChild(temp.node);
			temp.node.runAction(cc.sequence(cc.moveTo(1.2, cc.v2(0, 105)), cc.callFunc(function(){
				this.speed = 0;
				temp.node.destroy();
				this.hieuUng();
				this.showLineWin(false);
			}, this)));
			this.H_win = 0;
		}else{
			if (this.isAuto || this.isFreeSpin) {
				this.timeOut = setTimeout(function(){
					this.onAutoSpin();
					this.speed = 400;
				}
				.bind(this), this.speed);
			}else{
				this.resetSpin();
			}
		}
	},
	onData: function(data) {
		if (void 0 !== data.user){
			this.userData(data.user);
			cc.RedT.userData(data.user);
		}
		if (void 0 !== data.VuongQuocRed){
			this.VuongQuocRed(data.VuongQuocRed);
		}
		if (void 0 !== data.mini){
			cc.RedT.MiniPanel.onData(data.mini);
		}
		if (void 0 !== data.TopHu){
			cc.RedT.MiniPanel.TopHu.onData(data.TopHu);
		}
		if (void 0 !== data.taixiu){
			cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(data.taixiu);
		}
		if (void 0 !== data.vipp) {
			cc.RedT.MiniPanel.Dialog.VipPoint.onData(data.vipp);
		}
	},
	userData: function(data){
		this.taikhoan.string = helper.numberWithCommas(data.red);
	},
	VuongQuocRed: function(data){
		var self = this;
		if (void 0 !== data.status) {
			if (data.status === 1) {
				this.buttonStop.active = this.isAuto ? true : false;
				this.buttonAuto.active = !this.buttonStop.active;
				Promise.all(data.cel.map(function(cel, cel_index){
					Promise.all(cel.map(function(icon, index){
						self.reels[cel_index].icons[index].setIcon(icon, true);
					}));
				}));
				this.runReels();
				this.H_line_win = data.line_win;
				this.H_win      = data.win;
				this.H_free     = data.free;
				this.isBonus    = data.isBonus;
				this.isNoHu     = data.isNoHu;
				this.isBigWin   = data.isBigWin;
				this.isFree     = data.isFree;
				this.isFreeSpin = !!data.free;
			}else{
				this.resetSpin();
			}
		}
		if (void 0 !== data.bonus) {
			this.gameBonus.onData(data.bonus);
		}
		if (void 0 !== data.log) {
			this.dialog.history.onData(data.log);
		}
		if (void 0 !== data.top) {
			this.dialog.top.onData(data.top);
		}
		if (void 0 !== data.notice) {
			this.addNotice(data.notice);
		}
	},
	onGetSpin: function(){
		cc.RedT.send({g:{vq_red:{spin:{cuoc:helper.getOnlyNumberInString(this.bet.string), line:this.Line.data}}}});
	},
	addNotice:function(text){
		var notice = cc.instantiate(this.prefabNotice)
		var noticeComponent = notice.getComponent('mini_warning')
		noticeComponent.text.string = text;
		this.nodeNotice.addChild(notice);
	},
	backGame: function(){
		cc.RedT.MiniPanel.node.parent = null;
		this.loading.active = true;
		void 0 !== this.timeOut && clearTimeout(this.timeOut);
		cc.director.loadScene('MainGame');
	},
	signOut: function(){
		cc.RedT.MiniPanel.node.parent = null;
		void 0 !== this.timeOut && clearTimeout(this.timeOut);
		cc.director.loadScene('MainGame', function(){
			cc.RedT.inGame.signOut();
		});
	},
	onGetHu: function(){
		if (void 0 !== cc.RedT.setting.topHu.data) {
			var cuoc = helper.getOnlyNumberInString(this.bet.string);
			Promise.all(cc.RedT.setting.topHu.data['vq_red'].filter(function(temp){
				return temp.type == cuoc;
			}))
			.then(result => {
				var s = helper.getOnlyNumberInString(this.hu.string);
				var bet = result[0].bet;
				if (s-bet != 0) 
					helper.numberTo(this.hu, s, bet, 2000, true);
			});
		}
	},
	BangThuongToggle: function(){
		cc.RedT.audio.playClick();
		this.bangThuong.active = !this.bangThuong.active;
	},
});
