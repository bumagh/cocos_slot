
var helper         = require('Helper');
var BauCua_linhVat = require('BauCua_linhVat');

cc.Class({
    extends: cc.Component,

    properties: {
    	background: cc.Node,
    	linhVat: {
    		default: [],
    		type: BauCua_linhVat
    	},

    	iconMini: {
    		default: [],
    		type: cc.SpriteFrame,
    	},

    	iconLV: {
    		default: [],
    		type: cc.SpriteFrame,
    	},

    	dices: {
    		default: [],
    		type: cc.Sprite,
    	},

        logHuou:    cc.Label,
        logBau:     cc.Label,
        logGa:      cc.Label,
        logCa:      cc.Label,
        logCua:     cc.Label,
        logTom:     cc.Label,
        titleTime:  cc.Label,
        labelTime: cc.Label,

        Animation:  cc.Animation,
		bet:     cc.Node,
		logs:    cc.Node,
		prefabLogs: cc.Prefab,

		notice: cc.Node,
        cuoc:  "",
    },
    init(obj){
		this.RedT = obj;
		this.Top    = obj.Dialog.BauCua_top;
		this.LichSu = obj.Dialog.BauCua_LichSu;
		cc.RedT.setting.baucua = cc.RedT.setting.baucua || {scale:1, regOpen: false, data:{meRedBau: 0, meRedCa: 0, meRedCua: 0, meRedGa: 0, meRedHuou: 0, meRedTom: 0, redBau: 0, redCa: 0, redCua: 0, redGa: 0, redHuou: 0, redTom: 0}, logLV:{}, bet: "1000"};

		var check = localStorage.getItem('bauCua');
		if (check == "true") {
			this.node.active = true;
		}

		if (void 0 !== cc.RedT.setting.baucua.position) {
			this.node.position = cc.RedT.setting.baucua.position;
		}
		if (void 0 !== cc.RedT.setting.baucua.time_remain) {
			cc.RedT.setting.baucua.time_remain++;
			this.nextRealTime();
		}
		if (cc.RedT.IS_LOGIN) {
			this.logLVHandling(cc.RedT.setting.baucua.logLV);
			this.DataHandling(cc.RedT.setting.baucua.data);
			if (void 0 !== cc.RedT.setting.baucua.logLV) {
				this.logLVHandling(cc.RedT.setting.baucua.logLV);
			}
			if (void 0 !== cc.RedT.setting.baucua.logs) {
				this.addLogs();
			}
			this.intChangerBet();
		}

		this.Animation.on('finished', this.AnimationFinish, this);
	},
	onLoad () {
		this.ttOffset = null;
	},
	onEnable: function() {
		//this.onGetHu();
		this.regEvent(true);
		this.background.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.background.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.background.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		//this.background.on(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
	},
	onDisable: function() {
		this.regEvent(false);
		this.background.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.background.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.background.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		//this.background.off(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
		//this.onCloseGame();
	},
	regEvent: function(bool){
		cc.RedT.send({g:{baucua: !cc.RedT.setting.baucua.regOpen ? {view: bool, regOpen: true} : {view: bool}}});
	},
	eventStart: function(e){
		this.setTop();
		this.ttOffset = cc.v2(e.touch.getLocationX() - this.node.position.x, e.touch.getLocationY() - this.node.position.y)
	},
	eventMove: function(e){
		this.node.position = cc.v2(e.touch.getLocationX() - this.ttOffset.x, e.touch.getLocationY() - this.ttOffset.y)
	},
	eventEnd: function(){
		cc.RedT.setting.baucua.position = this.node.position;
	},
    openGame:function(){
		cc.RedT.audio.playClick();
		if (cc.RedT.IS_LOGIN){
			this.node.active = !0;
			localStorage.setItem('bauCua', true);
			this.setTop();
		}
		else
			cc.RedT.inGame.dialog.showSignIn();
	},
	closeGame:function(){
		cc.RedT.audio.playUnClick();
		this.node.active = !1;
		localStorage.setItem('bauCua', false);
	},
	setTop:function(){
		cc.RedT.setting.baucua.scale = 1;
		this.node.parent.insertChild(this.node);
		this.RedT.setTop(this.node);
	},
	intChangerBet: function(){
		this.bet.children.forEach(function(obj){
			if (obj.name == cc.RedT.setting.baucua.bet) {
				this.cuoc = obj.name;
				obj.children[0].active = false;
				obj.children[1].active = true;
				obj.pauseSystemEvents();
			}else{
				obj.children[0].active = true;
				obj.children[1].active = false;
				obj.resumeSystemEvents();
			}
		}.bind(this));
	},
	changerBet: function(event, bet){
		this.cuoc = bet;
		var target = event.target;
		this.bet.children.forEach(function(obj){
			if (obj == target) {
				obj.children[0].active = false;
				obj.children[1].active = true;
				obj.pauseSystemEvents();
			}else{
				obj.children[0].active = true;
				obj.children[1].active = false;
				obj.resumeSystemEvents();
			}
		});
		cc.RedT.setting.baucua.bet = target.name;
	},
	AnimationFinish: function(){
		this.addLogs();
		var dice = cc.RedT.setting.baucua.logs[0];
		var heSo   = {};
		for (var i = 0; i < 3; i++) {
			var dataT = dice[i];
			cc.RedT.setting.baucua.logLV[dataT] += 1;
			if (void 0 === heSo[dataT]) {
				heSo[dataT] = 1;
			}else{
				heSo[dataT] += 1;
			}
		}
		for (var j = 0; j < 6; j++) {
			if (void 0 !== heSo[j]) {
				this.linhVat[j].Select(heSo[j]);
			}
		}
		this.logLVHandling(cc.RedT.setting.baucua.logLV);
	},
	datCuoc: function(e, linhVat){
		if (this.cuoc < 1000) {
			this.addNotice('Vui lòng chọn mức cược...');
		}else{
			cc.RedT.send({g:{baucua:{cuoc:{cuoc:this.cuoc, linhVat:linhVat}}}});
		}
	},
	addNotice:function(text){
		var notice = cc.instantiate(this.RedT.prefabMiniNotice)
		var noticeComponent = notice.getComponent('mini_warning')
		noticeComponent.text.string = text;
		this.notice.addChild(notice);
	},
	setDice: function(dices){
		dices.forEach(function(dice, index){
			this.dices[index].spriteFrame = this.iconLV[dice];
		}.bind(this));
	},
	addLogs: function(){
		this.logs.destroyAllChildren();
		cc.RedT.setting.baucua.logs.forEach(function(log, index){
			var node = cc.instantiate(this.prefabLogs)
			var nodeComponent = node.getComponent('BauCua_logMini');
			nodeComponent.icon.map(function(sp, i){
				sp.spriteFrame = this.iconMini[log[i]];
			}.bind(this));
			if(index == 0){
				node.children[0].children[0].active = true;
				node.children[1].children[0].active = true;
				node.children[2].children[0].active = true;
			}
			this.logs.addChild(node);
		}.bind(this));
	},
	onData: function(data){
		if (void 0 !== data.data) {
			var a = Object.assign(cc.RedT.setting.baucua.data, data.data);
			this.DataHandling(data.data);
		}
		if (void 0 !== data.logLV) {
			Object.assign(cc.RedT.setting.baucua.logLV, data.logLV);
			this.logLVHandling(data.logLV);
		}
		if(void 0 !== data.status){
			this.status(data.status)
		}
		if (void 0 !== data.logs) {
			cc.RedT.setting.baucua.logs = data.logs;
			this.addLogs();
		}
		if (void 0 !== data.tops) {
			this.Top.onData(data.tops);
		}
		if (void 0 !== data.viewlogs) {
			this.LichSu.onData(data.viewlogs);
		}
		if (void 0 !== data.regOpen) {
			cc.RedT.setting.baucua.regOpen = true;
		}
		if (void 0 !== data.time_remain) {
			cc.RedT.setting.baucua.time_remain = data.time_remain;
			this.playTime();
		}
		if(void 0 !== data.finish){
			if (cc.RedT.setting.baucua.regOpen) {
				this.unSelect();
				// Huỷ đếm
				void 0 !== this.timeInterval && clearInterval(this.timeInterval);
				// Thêm kết quả
				cc.RedT.setting.baucua.logs.unshift([data.finish.dices[0], data.finish.dices[1], data.finish.dices[2]]);
				cc.RedT.setting.baucua.logs.length > 15 && cc.RedT.setting.baucua.logs.pop();
				this.setDice(data.finish.dices);
				// Play
				this.Animation.node.active = true;
				this.Animation.play();
			}

			cc.RedT.setting.baucua.time_remain = 72;
			this.playTime();
        }
		if (void 0 !== data.notice) {
			this.addNotice(data.notice);
		}
	},
	playTime: function(){
		void 0 !== this.timeInterval && clearInterval(this.timeInterval);
		this.timeInterval = setInterval(function() {
			if (cc.RedT.setting.baucua.time_remain > 61) {
				let time = helper.numberPad(cc.RedT.setting.baucua.time_remain-62, 2);
				this.labelTime.node.color = cc.Color.RED;
				this.labelTime.string = time;
				this.titleTime.string = "Trả thưởng";
				if (cc.RedT.setting.baucua.time_remain < 66) {
					this.Animation.node.active = false;
				}
			}else{
				this.Animation.node.active = false;
				if (cc.RedT.setting.baucua.regOpen && cc.RedT.setting.baucua.time_remain == 61) {
					this.resetData();
				}
				this.titleTime.string = "Đặt cược"
				if (cc.RedT.setting.baucua.time_remain > 0) {
					let time = helper.numberPad(cc.RedT.setting.baucua.time_remain-1, 2);
					this.labelTime.string = time;
					this.labelTime.node.color = cc.Color.WHITE
				}else clearInterval(this.timeInterval);
			}
			cc.RedT.setting.baucua.time_remain--;
		}
		.bind(this), 1000)
	},
	nextRealTime: function(){
		if (cc.RedT.setting.baucua.time_remain > 61) {
			var time = helper.numberPad(cc.RedT.setting.baucua.time_remain-62, 2);
			this.labelTime.node.color = cc.Color.RED;
			this.labelTime.string = helper.numberPad(time, 2);
			this.titleTime.string = "Trả thưởng";
		}else{
			this.titleTime.string = "Đặt cược"
			if (cc.RedT.setting.baucua.time_remain > 0) {
				var time = helper.numberPad(cc.RedT.setting.baucua.time_remain-1, 2);
				this.labelTime.string = time;
				this.labelTime.node.color = cc.Color.WHITE
			}
		}
	},
	logLVHandling: function(data){
		this.logHuou.string = helper.numberWithCommas(data[0]);
        this.logBau.string  = helper.numberWithCommas(data[1]);
        this.logGa.string   = helper.numberWithCommas(data[2]);
        this.logCa.string   = helper.numberWithCommas(data[3]);
        this.logCua.string  = helper.numberWithCommas(data[4]);
        this.logTom.string  = helper.numberWithCommas(data[5]);
	},
	DataHandling: function(data){
		if (void 0 !== data.redHuou) {
			this.linhVat[0].totallCuoc(data.redHuou);
		}
		if (void 0 !== data.redBau) {
			this.linhVat[1].totallCuoc(data.redBau);
		}
		if (void 0 !== data.redGa) {
			this.linhVat[2].totallCuoc(data.redGa);
		}
		if (void 0 !== data.redCa) {
			this.linhVat[3].totallCuoc(data.redCa);
		}
		if (void 0 !== data.redCua) {
			this.linhVat[4].totallCuoc(data.redCua);
		}
		if (void 0 !== data.redTom) {
			this.linhVat[5].totallCuoc(data.redTom);
		}
		if (void 0 !== data.meRedHuou) {
			this.linhVat[0].meCuoc(data.meRedHuou);
		}
		if (void 0 !== data.meRedBau) {
			this.linhVat[1].meCuoc(data.meRedBau);
		}
		if (void 0 !== data.meRedGa) {
			this.linhVat[2].meCuoc(data.meRedGa);
		}
		if (void 0 !== data.meRedCa) {
			this.linhVat[3].meCuoc(data.meRedCa);
		}
		if (void 0 !== data.meRedCua) {
			this.linhVat[4].meCuoc(data.meRedCua);
		}
		if (void 0 !== data.meRedTom) {
			this.linhVat[5].meCuoc(data.meRedTom);
		}
	},
	unSelect: function(){
		this.linhVat.forEach(function(linhVat){
			linhVat.unSelect();
		});
	},
	resetData: function(){
		let data = Object.keys(cc.RedT.setting.baucua.data);
		data.forEach(function(key){
			cc.RedT.setting.baucua.data[key] = 0;
		});
		this.DataHandling(cc.RedT.setting.baucua.data);
		this.unSelect();
	},
	newGame: function(){
		cc.RedT.setting.baucua.regOpen = false;
		void 0 !== this.timeInterval && clearInterval(this.timeInterval);
		clearTimeout(this.regTimeOut);
		//this.resetData.resetData();
	},
	status: function(data){
		this.regTimeOut = setTimeout(function() {
			var temp = new cc.Node;
			temp.addComponent(cc.Label);
			temp = temp.getComponent(cc.Label);
			temp.string = (data.win ? '+' : '-') + helper.numberWithCommas(data.bet);
			temp.font = data.win ? cc.RedT.util.fontCong : cc.RedT.util.fontTru;
			temp.lineHeight = 130;
			temp.fontSize   = 30;
			temp.node.position = cc.v2(0, 90);
			this.notice.addChild(temp.node);
			temp.node.runAction(cc.sequence(cc.moveTo(3.5, cc.v2(0, 200)), cc.callFunc(function(){this.node.destroy()}, temp)));
			data.win && cc.RedT.send({user:{updateCoint: true}});
			if(void 0 !== data.thuong && data.thuong > 0){
				var thuong = new cc.Node;
				thuong.addComponent(cc.Label);
				thuong = thuong.getComponent(cc.Label);
				thuong.string = '+' + helper.numberWithCommas(data.thuong);
				thuong.font = cc.RedT.util.fontEffect;
				thuong.lineHeight = 90;
				thuong.fontSize   = 14;
				this.notice.addChild(thuong.node);
				thuong.node.runAction(cc.sequence(cc.moveTo(3, cc.v2(0, 100)), cc.callFunc(function(){this.node.destroy()}, thuong)))
			}
		}
		.bind(this), 2e3)
	},
});
