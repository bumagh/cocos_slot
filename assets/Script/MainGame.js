
var helper = require('Helper');
var baseControll = require('BaseControll');
var header       = require('Header'),
	dialog       = require('Dialog'),
	ThongBaoNoHu = require('PushNohu'),
	newsContents = require('NewsContents'),
	bgLoading    = require('bgLoading'),
	MenuRoom     = require('MenuRoom'),
	notice       = require('Notice');

cc.Class({
	extends: cc.Component,
	properties: {
		MenuRoom: MenuRoom,
		avatars: {
			default: [],
			type: cc.SpriteFrame
		},
		PrefabT: {
			default: [],
			type: cc.Prefab
		},
		header: header,
		news: cc.Node,
		newsContents: newsContents,
		bgLoading:    bgLoading,
		iconVQRed:    cc.Node,
		iconVQRedTemp: cc.Node,
		iconCandy:    cc.Node,
		iconCandyTemp: cc.Node,
		iconLongLan:  cc.Node,
		iconLongLanTemp: cc.Node,
		iconZeus: 	  cc.Node,
		iconZeusTemp: 	  cc.Node,
		iconMegaJ:    cc.Node,
		redhat:       cc.Node,
		dialog:       dialog,
		loading:      cc.Node,
		notice:       notice,
		ThongBaoNoHu: ThongBaoNoHu,
		wssCacert: {
			type: cc.Asset,
			default: null
		},
		url:          '',
		fileAPK:      '',
		dataOn: true,
		newsOn: true,
		iconTxtTai:cc.Label,
		iconTxtXiu:cc.Label,
	},
	onLoad: function () {
		cc.view.enableAutoFullScreen(false);
		this.dialog.init();
		this.newsContents.init(this);
		if (void 0 === cc.RedT) {
			cc.RedT = baseControll;
			cc.RedT.sslPem = this.wssCacert;
			cc.RedT.init();
			cc.RedT.inGame = this;
			cc.RedT.audio    = this.PrefabT[0].data.getComponent('MainAudio');
			cc.RedT.audio.bg = cc.RedT.audio.mainBackground;
			cc.RedT.avatars  = this.avatars;
			cc.RedT.MiniPanel = cc.instantiate(this.PrefabT[1]);
			cc.RedT.MiniPanel = cc.RedT.MiniPanel.getComponent('MiniPanel');
		}else{
			cc.RedT.inGame = this;
			cc.RedT.audio.bg.pause();
			 
			cc.RedT.audio.bg = cc.RedT.audio.mainBackground;
		}
		cc.RedT.MiniPanel.node.parent = this.redhat;
		cc.RedT.reconnect();
		this.iconCandy     = this.iconCandy.getComponent('iconGameHu');
		this.iconVQRed     = this.iconVQRed.getComponent('iconGameHu');
		this.iconLongLan   = this.iconLongLan.getComponent('iconGameHu');
		this.iconZeus 	   = this.iconZeus.getComponent('iconGameHu');
		this.iconMegaJ     = this.iconMegaJ.getComponent('iconGameHu');
		this.iconCandyTemp = this.iconCandyTemp.getComponent('iconGameHu');
		this.iconVQRedTemp = this.iconVQRedTemp.getComponent('iconGameHu');
		this.iconLongLanTemp = this.iconLongLanTemp.getComponent('iconGameHu');
		this.iconZeusTemp = this.iconZeusTemp.getComponent('iconGameHu');
		if (cc.RedT.IS_LOGIN){
			cc.RedT.send({scene:'home'});
			this.header.reset();
			this.header.userName.string = cc.RedT.user.name;
			this.dialog.profile.CaNhan.username.string = cc.RedT.user.name;
			this.header.userRed.string = this.dialog.profile.KetSat.redHT.string = helper.numberWithCommas(cc.RedT.user.red);
			this.dialog.profile.KetSat.redKet.string = helper.numberWithCommas(cc.RedT.user.ketSat);
			this.dialog.profile.CaNhan.UID.string = cc.RedT.user.UID;
			this.dialog.profile.CaNhan.joinedOn.string = helper.getStringDateByTime(cc.RedT.user.joinedOn);
			this.dialog.profile.CaNhan.phone.string = cc.RedT.user.phone;
			this.dialog.profile.BaoMat.DangKyOTP.statusOTP(!helper.isEmpty(cc.RedT.user.phone));
			if (!helper.isEmpty(cc.RedT.user.phone)) {
				this.dialog.profile.BaoMat.DangKyOTP.labelPhone.string = cc.RedT.user.phone;
				if (cc.RedT.user.veryphone) {
					this.dialog.profile.CaNhan.phoneStatus.string = 'Đã Xác Thực';
					this.dialog.profile.CaNhan.phoneStatus.node.color  = this.dialog.profile.CaNhan.phoneStatus.node.color.fromHEX('06B30D');
				}else{
					this.dialog.profile.CaNhan.phoneStatus.string = 'Chưa Xác Thực';
					this.dialog.profile.CaNhan.phoneStatus.node.color  = this.dialog.profile.CaNhan.phoneStatus.node.color.fromHEX('FF0000');
				}
			}else{
				this.dialog.profile.CaNhan.phoneStatus.string = '';
			}
			this.setAvatar(cc.RedT.user.avatar);
		}else{
			this.dialog.settings.setMusic();
		}

		var check = localStorage.getItem('SOUND_BACKGROUND');
		if(check == null || cc.RedT.isSoundBackground()){
			cc.RedT.setSoundBackground(true);
			
		//	cc.RedT.audio.current = cc.audioEngine.play(cc.RedT.audio.bg.clip, true, 1);
			cc.RedT.audio.bg.play();
			let t = setInterval(function(){
				console.log(cc.RedT.audio.bg.clip.loaded);
				if(cc.RedT.audio.bg.clip.loaded){
					clearInterval(t);
					cc.RedT.audio.bg.play();
				}	
			}.bind(this),100);
		}

		if (cc.sys.isBrowser) {
			history.pushState(null, null, location.href);
			window.onpopstate = function () {
				history.go(1);
			};
		}
	},
	start: function(){
		if(cc.RedT.IS_LOGIN == false){
			var remember_me = localStorage.getItem("remember_me");
			if(remember_me && remember_me == "true"){
				setTimeout(function(){
					let checkT = localStorage.getItem('TH'); // UID
					let checkH = localStorage.getItem('HT'); // token
					if (!!checkT && !!checkH) {
						var t = setInterval(function(){
							 
							if(cc.RedT._socket != null && cc.RedT._socket.readyState == 1){
								clearInterval(t);
								this.autoAuth({authentication:{id:checkT, token:checkH}});
								t = null;
							}	
						}.bind(this),50)

					}
				}.bind(this), 300);
			}
		}
		
	},
	autoAuth: function(obj) {
		this.loading.active = true;
		if (cc.RedT._socket == null || cc.RedT._socket.readyState != 1) {
			setTimeout(function(){
				cc.RedT.send(obj);
			}, 300);
		}else{
			cc.RedT.send(obj)
		}
	},
	resetAuth: function() {
		localStorage.removeItem('TH');
		localStorage.removeItem('HT');
	},
	auth: function(obj) {
		this.loading.active = true;
		if (cc.RedT._socket == null || cc.RedT._socket.readyState != 1) {
			setTimeout(function(){
				cc.RedT.send(obj);
			}, 300);
		}else{
			cc.RedT.send(obj)
		}
	},
	unAuthorized: function(data){
		this.loading.active = false;
		cc.RedT.inGame.resetAuth();
		if (void 0 !== data['message']) {
			this.notice.show({title: 'ĐĂNG KÝ', text: 'Có lỗi sảy ra, xin vui lòng thử lại...'});
		} else {
			this.notice.show(data);
		}
	},
	Authorized:function(Authorized){
		this.loading.active = false;
		if (!Authorized) {
			this.dialog.showSignName();
		}else{
			this.signIn();
		}
	},
	onData: function(data){
		if (this.dataOn) {
			if (void 0 !== data['unauth']){
				this.unAuthorized(data['unauth']);
			}
			if (void 0 !== data.Authorized){
				this.Authorized(data.Authorized);
			}
			if (void 0 !== data.user){
				cc.RedT.userData(data.user);
				this.dataUser(data.user);
			}
			if (void 0 !== data.mini){
				cc.RedT.MiniPanel.onData(data.mini);
			}
			if (void 0 !== data.TopHu){
				cc.RedT.MiniPanel.TopHu.onData(data.TopHu);
				this.dialog.DEvent.onHU(data.TopHu);
			}
			if (void 0 !== data.taixiu){
			 
				if(this.iconTxtTai && data.taixiu.hasOwnProperty("taixiu") && data.taixiu.taixiu.red_tai){
					helper.numberTo(this.iconTxtTai, helper.getOnlyNumberInString(this.iconTxtTai.string), data.taixiu.taixiu.red_tai, 4900, true);
				}
				if(this.iconTxtXiu && data.taixiu.hasOwnProperty("taixiu") && data.taixiu.taixiu.red_xiu){
					helper.numberTo(this.iconTxtXiu, helper.getOnlyNumberInString(this.iconTxtXiu.string), data.taixiu.taixiu.red_xiu, 4900, true);
				}
				cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(data.taixiu);
			}
			if (void 0 !== data.shop){
				this.dialog.shop.onData(data.shop);
			}
			if (void 0 !== data.profile){
				this.dialog.profile.onData(data.profile);
			}
			if (void 0 !== data.notice){
				this.notice.show(data.notice);
			}
			if (void 0 !== data.news && this.newsOn){
				this.newsContents.onData(data.news);
			}
			if (void 0 !== data.captcha) {
				this.captcha(data.captcha);
			}
			if (void 0 !== data.pushnohu) {
				this.ThongBaoNoHu.onData(data.pushnohu);
			}
			if (void 0 !== data.loading) {
				this.bgLoading.onData(data.loading);
			}
			if (void 0 !== data.event) {
				this.dialog && this.dialog.DEvent.onData(data.event);
			}
			if (void 0 !== data.vipp) {
				cc.RedT.MiniPanel.Dialog.VipPoint.onData(data.vipp);
			}
			if (!!data.toGame) {
				this.MenuRoom.onData(data.toGame);
			}
			if (!!data.message) {
				this.dialog.iMessage.onData(data.message);
			}
		}
	},
	captcha: function(data){
		switch(data.name){
			case 'signUp':
				this.dialog.signUp.initCaptcha(data.data);
				break;

			case 'signIn':
				this.dialog.signIn.initCaptcha(data.data);
				break;

			case 'giftcode':
				this.dialog.GiftCode.initCaptcha(data.data);
				break;

			case 'forgotpass':
				this.dialog.ForGotPass.initCaptcha(data.data);
				break;
				
			case 'signname':
				this.dialog.signName.initCaptcha(data.data);
				break;

			case 'chargeCard':
				this.dialog.shop.NapRed.NapThe.initCaptcha(data.data);
				break;

			case 'regOTP':
				this.dialog.profile.BaoMat.DangKyOTP.initCaptcha(data.data);
				break;
		}
	},
	setAvatar: function(data){
		data = data>>0;
		if (cc.RedT.avatars[data] !== void 0) {
			this.header.avatar.spriteFrame = cc.RedT.avatars[data];
			this.dialog.profile.CaNhan.avatar.spriteFrame = cc.RedT.avatars[data];
		}else{
			this.header.avatar.spriteFrame = cc.RedT.avatars[0];
			this.dialog.profile.CaNhan.avatar.spriteFrame = cc.RedT.avatars[0];
		}
	},
	dataUser: function(data){
		if (void 0 !== data.avatar){
			this.setAvatar(data.avatar);
		}
		if (void 0 !== data.name){
			this.header.userName.string = data.name;
			this.dialog.profile.CaNhan.username.string = data.name;
		}
		if (void 0 !== data.red){
			this.header.userRed.string = this.dialog.profile.KetSat.redHT.string = helper.numberWithCommas(data.red);
		}
		if (void 0 !== data.ketSat){
			this.dialog.profile.KetSat.redKet.string = helper.numberWithCommas(data.ketSat);
		}
		if (void 0 !== data.UID){
			this.dialog.profile.CaNhan.UID.string = data.UID;
		}
		if (void 0 !== data.phone){
			this.dialog.profile.CaNhan.phone.string = data.phone;
			this.dialog.profile.BaoMat.DangKyOTP.statusOTP(!helper.isEmpty(data.phone));
			if (!helper.isEmpty(data.phone)) {
				this.dialog.profile.BaoMat.DangKyOTP.labelPhone.string = data.phone;
				if (cc.RedT.user.veryphone) {
					this.dialog.profile.CaNhan.phoneStatus.string = 'Đã Xác Thực';
					this.dialog.profile.CaNhan.phoneStatus.node.color  = this.dialog.profile.CaNhan.phoneStatus.node.color.fromHEX('06B30D');
				}else{
					this.dialog.profile.CaNhan.phoneStatus.string = 'Chưa Xác Thực';
					this.dialog.profile.CaNhan.phoneStatus.node.color  = this.dialog.profile.CaNhan.phoneStatus.node.color.fromHEX('FF0000');
				}
			}else{
				this.dialog.profile.CaNhan.phoneStatus.string = '';
			}
		}
		if (void 0 !== data.joinedOn){
			this.dialog.profile.CaNhan.joinedOn.string = helper.getStringDateByTime(data.joinedOn);
		}
		if (void 0 !== data.level){
			this.header.level(data.level);
			this.header.updateEXP(data.vipHT, data.vipNext);
		}
	},
	signOut: function(){
		cc.RedT.user     = {};
		cc.RedT.IS_LOGIN = false;
		this.AllReset();
		 
	},
	signIn: function(){
		cc.RedT.IS_LOGIN = true;
		this.header.isSignIn();

	
		this.dialog.onBack();
	 	this.dialog.showEventX2();
		 
		cc.RedT.MiniPanel.signIn();
	},
	AllReset:function(){
		this.loading.active = false;
		this.newsContents.reset();
		this.header.isSignOut();
		this.dialog.onCloseDialog();
		this.MenuRoom.onBack();
		cc.RedT.MiniPanel.newGame();
		this.dialog.iMessage.reset();
	},
	noticeCopy: function(){
		let notice = cc.instantiate(cc.RedT.MiniPanel.prefabMiniNotice);
		let noticeComponent = notice.getComponent('mini_warning');
		noticeComponent.text.string = 'Đã copy nội dung được chọn';
		this.node.addChild(notice);
	},
	audioClick: function(){
		cc.RedT.audio.playClick();
	},
	audioUnClick: function(){
		cc.RedT.audio.playUnClick();
	},
	fanpage: function(){
		cc.sys.openURL('https://muagamebai.com/');
	},
	ios: function(){
		cc.sys.openURL(this.url + 'https://muagamebai.com');
	},
	android: function(){
		cc.sys.openURL(this.url + '/download/android/' + this.fileAPK);
	},
	telegram: function(){
		cc.sys.openURL('https://muagamebai.com');
	},
	onGetHu: function () {
		if (void 0 !== cc.RedT.setting.topHu.data) {
			var self = this;
			// Vương Quốc Red
			Promise.all(cc.RedT.setting.topHu.data['vq_red'].filter(function (temp) {
				return temp.red == true;
			}))
				.then(result => {
					let h100 = result.filter(function (temp) { return temp.type == 100 });
					let h1k = result.filter(function (temp) { return temp.type == 1000 });
					let h10k = result.filter(function (temp) { return temp.type == 10000 });

					let r100 = helper.getOnlyNumberInString(this.iconVQRed.hu100.string);
					let r1k = helper.getOnlyNumberInString(this.iconVQRed.hu1k.string);
					let r10k = helper.getOnlyNumberInString(this.iconVQRed.hu10k.string);

					if (r100 - h100[0].bet != 0) {
						helper.numberTo(this.iconVQRed.hu100, helper.getOnlyNumberInString(this.iconVQRed.hu100.string), h100[0].bet, 4900, true);
						helper.numberTo(this.iconVQRedTemp.hu100, helper.getOnlyNumberInString(this.iconVQRedTemp.hu100.string), h100[0].bet, 4900, true);

					}
					if (r1k - h1k[0].bet != 0) {
						helper.numberTo(this.iconVQRed.hu1k, helper.getOnlyNumberInString(this.iconVQRed.hu1k.string), h1k[0].bet, 4900, true);
						helper.numberTo(this.iconVQRedTemp.hu1k, helper.getOnlyNumberInString(this.iconVQRedTemp.hu1k.string), h1k[0].bet, 4900, true);
					}
					if (r10k - h10k[0].bet != 0) {
						helper.numberTo(this.iconVQRed.hu10k, helper.getOnlyNumberInString(this.iconVQRed.hu10k.string), h10k[0].bet, 4900, true);
						helper.numberTo(this.iconVQRedTemp.hu10k, helper.getOnlyNumberInString(this.iconVQRedTemp.hu10k.string), h10k[0].bet, 4900, true);
					}
				});

			// Candy
			Promise.all(cc.RedT.setting.topHu.data['candy'].filter(function (temp) {
				return temp.red == true;
			}))
				.then(result => {
					let h100 = result.filter(function (temp) { return temp.type == 100 });
					let h1k = result.filter(function (temp) { return temp.type == 1000 });
					let h10k = result.filter(function (temp) { return temp.type == 10000 });

					let r100 = helper.getOnlyNumberInString(this.iconCandy.hu100.string);
					let r1k = helper.getOnlyNumberInString(this.iconCandy.hu1k.string);
					let r10k = helper.getOnlyNumberInString(this.iconCandy.hu10k.string);

					if (r100 - h100[0].bet != 0) {
						helper.numberTo(this.iconCandy.hu100, helper.getOnlyNumberInString(this.iconCandy.hu100.string), h100[0].bet, 4900, true);
						helper.numberTo(this.iconCandyTemp.hu100, helper.getOnlyNumberInString(this.iconCandyTemp.hu100.string), h100[0].bet, 4900, true);
					}
					if (r1k - h1k[0].bet != 0) {
						helper.numberTo(this.iconCandy.hu1k, helper.getOnlyNumberInString(this.iconCandy.hu1k.string), h1k[0].bet, 4900, true);
						helper.numberTo(this.iconCandyTemp.hu1k, helper.getOnlyNumberInString(this.iconCandyTemp.hu1k.string), h1k[0].bet, 4900, true);
					}
					if (r10k - h10k[0].bet != 0) {
						helper.numberTo(this.iconCandy.hu10k, helper.getOnlyNumberInString(this.iconCandy.hu10k.string), h10k[0].bet, 4900, true);
						helper.numberTo(this.iconCandyTemp.hu10k, helper.getOnlyNumberInString(this.iconCandyTemp.hu10k.string), h10k[0].bet, 4900, true);
					}
				});
			//Zeus
			Promise.all(cc.RedT.setting.topHu.data['zeus'].filter(function (temp) {
				return temp.red == true;
			}))
				.then(result => {
					let h100 = result.filter(function (temp) { return temp.type == 100 });
					let h1k = result.filter(function (temp) { return temp.type == 1000 });
					let h10k = result.filter(function (temp) { return temp.type == 10000 });

					let r100 = helper.getOnlyNumberInString(this.iconZeus.hu100.string);
					let r1k = helper.getOnlyNumberInString(this.iconZeus.hu1k.string);
					let r10k = helper.getOnlyNumberInString(this.iconZeus.hu10k.string);

					if (r100 - h100[0].bet != 0) {
						helper.numberTo(this.iconZeus.hu100, helper.getOnlyNumberInString(this.iconZeus.hu100.string), h100[0].bet, 4900, true);
						helper.numberTo(this.iconZeusTemp.hu100, helper.getOnlyNumberInString(this.iconZeusTemp.hu100.string), h100[0].bet, 4900, true);
					}
					if (r1k - h1k[0].bet != 0) {
						helper.numberTo(this.iconZeus.hu1k, helper.getOnlyNumberInString(this.iconZeus.hu1k.string), h1k[0].bet, 4900, true);
						helper.numberTo(this.iconZeusTemp.hu1k, helper.getOnlyNumberInString(this.iconZeusTemp.hu1k.string), h1k[0].bet, 4900, true);
					}
					if (r10k - h10k[0].bet != 0) {
						helper.numberTo(this.iconZeus.hu10k, helper.getOnlyNumberInString(this.iconZeus.hu10k.string), h10k[0].bet, 4900, true);
						helper.numberTo(this.iconZeusTemp.hu10k, helper.getOnlyNumberInString(this.iconZeusTemp.hu10k.string), h10k[0].bet, 4900, true);
					}
				});
			// Long Lan
			Promise.all(cc.RedT.setting.topHu.data['long'].filter(function (temp) {
				return temp.red == true;
			}))
				.then(result => {
					let h100 = result.filter(function (temp) { return temp.type == 100 });
					let h1k = result.filter(function (temp) { return temp.type == 1000 });
					let h10k = result.filter(function (temp) { return temp.type == 10000 });

					let r100 = helper.getOnlyNumberInString(this.iconLongLan.hu100.string);
					let r1k = helper.getOnlyNumberInString(this.iconLongLan.hu1k.string);
					let r10k = helper.getOnlyNumberInString(this.iconLongLan.hu10k.string);

					if (r100 - h100[0].bet != 0) {
						helper.numberTo(this.iconLongLan.hu100, helper.getOnlyNumberInString(this.iconLongLan.hu100.string), h100[0].bet, 4900, true);
						helper.numberTo(this.iconLongLanTemp.hu100, helper.getOnlyNumberInString(this.iconLongLanTemp.hu100.string), h100[0].bet, 4900, true);
					}
					if (r1k - h1k[0].bet != 0) {
						helper.numberTo(this.iconLongLan.hu1k, helper.getOnlyNumberInString(this.iconLongLan.hu1k.string), h1k[0].bet, 4900, true);
						helper.numberTo(this.iconLongLanTemp.hu1k, helper.getOnlyNumberInString(this.iconLongLanTemp.hu1k.string), h1k[0].bet, 4900, true);
					}
					if (r10k - h10k[0].bet != 0) {
						helper.numberTo(this.iconLongLan.hu10k, helper.getOnlyNumberInString(this.iconLongLan.hu10k.string), h10k[0].bet, 4900, true);
						helper.numberTo(this.iconLongLanTemp.hu10k, helper.getOnlyNumberInString(this.iconLongLanTemp.hu10k.string), h10k[0].bet, 4900, true);
					}
				});
		}
	},
});
