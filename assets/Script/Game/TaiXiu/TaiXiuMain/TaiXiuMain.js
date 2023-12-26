
var TX_Board    = require('TaiXiuBoard'),
	TX_Chat     = require('TaiXiuChat'),
	BrowserUtil = require('BrowserUtil'),
	helper      = require('Helper'),
	TaiXiu_efScale = require('TaiXiu_efScale');

cc.Class({
	extends: cc.Component,
	properties: {
		background: cc.Node,
		bg_Dice:   cc.Animation,
		bg_efDice: cc.Node,
		inputL: cc.Node,
		inputR: cc.Node,
		inputLTxt: cc.Label,
		inputRTxt: cc.Label,
		inputLeft: cc.EditBox,
		inputRight: cc.EditBox,
		totalLeft: cc.Label,
		totalRight: cc.Label,
		myLeft: cc.Label,
		myRight: cc.Label,
		playerLeft: cc.Label,
		playerRight: cc.Label,
		nodeKetQua: cc.Node,
		labelKetQua: cc.Label,
		timeWait: cc.Label,
		nodeTimeWait: cc.Node,
		timeCuoc: cc.Label,
		timePopup: cc.Label,
		nodeTimePopup: cc.Node,
		labelPhien: cc.Label,
		diaNan: cc.Node,
		dice: {
			default: [],
			type:    cc.Sprite
		},
		diceSF: {
			default: [],
			type:    cc.SpriteFrame
		},
		dotLogs: cc.Node,
		diceAnimation: cc.Animation,
		efTai: TaiXiu_efScale,
		efXiu: TaiXiu_efScale,
		efTaiColor: TaiXiu_efScale,
		efXiuColor: TaiXiu_efScale,
		frameNan: {
			default: [],
			type:    cc.SpriteFrame
		},
		spriteNan: cc.Sprite,
		dot_black: cc.SpriteFrame,
		dot_white: cc.SpriteFrame,
		dot_yellow: cc.SpriteFrame,
		notice: cc.Node,
		fontCong: cc.BitmapFont,
		fontTru: cc.BitmapFont,
		WIN_HT: cc.Label,
		WIN_DN: cc.Label,
		LOST_HT: cc.Label,
		LOST_DN: cc.Label,
		TX_Chat: TX_Chat,
		TX_Board: TX_Board,
		taixiu: true,
		btnLTxt: cc.Node,
		btnRTxt: cc.Node,
		audioWin:cc.AudioSource
	},
	DiaNan:function(){
		this.dataLogs();
		
		this.nodeKetQua.active = true;
		if (this.diemSo > 10) {
			this.efTaiColor.node.active = true;
			this.efTai.node.active = false;
	
			this.efTaiColor.play();
		}else{
			this.efXiuColor.node.active = true;
			this.efXiu.node.active = false;
			this.efXiuColor.play();
		}

		if(void 0 !== this._results.win && this._results.win){
			this.audioWin.play();
			if (this.isNan) {
				this.status();
			}
		}
		
	},
	init: function(obj) {
		this.RedT = obj;
		cc.RedT.setting.taixiu.data = cc.RedT.setting.taixiu.data || {taixiu:{},du_day:{}};
		this.isNan = false;
		if (void 0 === cc.RedT.util.fontCong) {
			cc.RedT.util.fontCong = this.fontCong;
			cc.RedT.util.fontTru  = this.fontTru;
		}
		if (void 0 === cc.RedT.setting.taixiu.getLogs) {
			cc.RedT.setting.taixiu.getLogs = false;
		}
		if (void 0 === cc.RedT.setting.taixiu.isNan) {
			cc.RedT.setting.taixiu.isNan = false;
		}

		this.dotLogs = this.dotLogs.children.map(function(dot){
			let temp = dot.getComponent(cc.Sprite);
			temp.mod = dot.getComponent('TaiXiuMain_logTips');
			return temp;
		});
		this.dotLogs.reverse();

		this.onDiceAnimationFinish = function(event){
			this.setDice(true);

			if (this.isNan) {
				console.log("onDiceAnimationFinish")	;
				
			}else{
				this.DiaNan();
				// this.dataLogs();
				// this.nodeKetQua.active = true;
				// if (this.diemSo > 10) {
				// 	this.efTaiColor.play()
				// }else{
				// 	this.efXiuColor.play()
				// }
			}
			this.diceAnimation.node.active = false;
		}
		if (void 0 !== cc.RedT.setting.taixiu.position) {
			this.node.position = cc.RedT.setting.taixiu.position;
		}
		if (cc.RedT.setting.taixiu.getLogs) {
			if (void 0 !== cc.RedT.setting.taixiu.time_remain) {
				cc.RedT.setting.taixiu.time_remain++;
				this.nextRealTime();
			}
			this.reLoadGame();
		}
	},
	onLoad () {
		let self      = this;
		this.ttOffset = null;
		this.editboxs = [this.inputLeft, this.inputRight];
		this.TX_Board.init(this);
		this.TX_Chat.init(this);
		this._results = {};
		this.diaNan.getComponent('TaiXiu_DiaNan').init(this);

		this.keyHandle = function(t) {
			return t.keyCode === cc.macro.KEY.tab ? (this.changeNextFocusEditBox(),
				t.preventDefault && t.preventDefault(),
				!1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), this.onCuocClick(),
				t.preventDefault && t.preventDefault(),
				!1) : void 0
		}

		this.diceAnimation.on('finished', this.onDiceAnimationFinish, this);
		this.onCuocClick = function(){
			let bet = helper.getOnlyNumberInString(this.input.string);
			bet = parseInt(bet);
			if (this.RedT.board) {
				this.input.string = '';
			}else{
				this.input.string = '0';
			}
			this.TX_Board.node.active = false;
			if (isNaN(bet) || bet < 1000) {
				let notice = cc.instantiate(this.RedT.RedT.prefabMiniNotice);
				let noticeComponent = notice.getComponent('mini_warning');
				noticeComponent.text.string = 'Tiền cược phải lớn hơn 1.000 Vinh';
				this.notice.addChild(notice);
			}else{
				cc.RedT.send({taixiu:{cuoc:{select:(this.inputOld == 'left'), bet:bet}}});
			}
		};
		if (this.RedT.board) {
			this.inputL.active = this.inputR.active = false;
			this.inputLeft.node.active = this.inputRight.node.active = true;
		}
	},
	onEnable: function () {
		this.background.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.background.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.background.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
		//this.background.on(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);

		this.RedT.board && cc.sys.isBrowser && this.addEvent();
		this.nodeTimePopup.active = false;

		if (this.RedT.board) {
			BrowserUtil.inputAddEvent(this.inputLeft, 'input', this.updateValue);
			BrowserUtil.inputAddEvent(this.inputRight, 'input', this.updateValue);
		}
	},
	onDisable: function () {
		this.background.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
		this.background.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
		this.background.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
		this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
	//	this.background.off(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);

		this.RedT.board && cc.sys.isBrowser && this.removeEvent();
		this.clean();
		!!cc.RedT.IS_LOGIN && (this.nodeTimePopup.active = true);

		if (this.RedT.board) {
			BrowserUtil.inputRemoveEvent(this.inputLeft, 'input', this.updateValue);
			BrowserUtil.inputRemoveEvent(this.inputRight, 'input', this.updateValue);
		}
	},
	updateValue: function(e){
		let value = helper.numberWithCommas(helper.getOnlyNumberInString(this.value));
		this.value = value == '0' ? '' : value;
	},
	addEvent: function() {
		for (let t in this.editboxs) {
			BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener('keydown', this.keyHandle.bind(this), !1);
		}
	},
	removeEvent: function() {
		for (let t in this.editboxs) {
			BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener('keydown', this.keyHandle.bind(this), !1);
		}
	},
	changeNextFocusEditBox: function() {
		for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++){
			if (BrowserUtil.checkEditBoxFocus(this.editboxs[e])) {
				BrowserUtil.focusEditBox(this.editboxs[e]);
				t = !0;
				break
			}
		}
		!t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[1]);
	},
	clean: function(){
		this.inputLeft.string = this.inputRight.string = '';
	},
	onChangerNan: function(){
		cc.RedT.setting.taixiu.isNan = this.isNan = !this.isNan;
		this.spriteNan.spriteFrame   = this.isNan ? this.frameNan[1] : this.frameNan[0];
	},
	reLoadGame: function(){
		this.regTimeOut2 = setTimeout(function(){
			this.dataLogs();
			if (cc.RedT.setting.taixiu.isNan != this.isNan) {
				this.onChangerNan();
			}
			this.onDuDay(cc.RedT.setting.taixiu.data.du_day);
			this.onDataTaiXiu(cc.RedT.setting.taixiu.data.taixiu);
		}
		.bind(this), 50);
		this.setPhien();
	},
	eventStart: function(e){
		this.setTop();
		this.ttOffset  = cc.v2(e.touch.getLocationX() - this.node.position.x, e.touch.getLocationY() - this.node.position.y);
	},
	eventMove: function(e){
		this.node.position = cc.v2(e.touch.getLocationX() - this.ttOffset.x, e.touch.getLocationY() - this.ttOffset.y);
	},
	eventEnd: function(){
		cc.RedT.setting.taixiu.position = this.node.position;
	},
	setTop: function(){
		this.node.parent.insertChild(this.node);
		this.RedT.setTop();
	},
	onSelectInput: function(event, select){
		this.TX_Board.node.active = true;
		this.inputOld = select;
		switch(select) {
			case 'right':
				this.input = this.RedT.board ? this.inputRight : this.inputRTxt;
				this.btnRTxt.active = false;
				this.btnLTxt.active = true;
			break;

			case 'left':
				this.input = this.RedT.board ? this.inputLeft : this.inputLTxt;
				this.btnLTxt.active = false;
				this.btnRTxt.active = true;
			break;
		}
	},
	onChangerInput: function(){
		var value = helper.numberWithCommas(helper.getOnlyNumberInString(this.input.string));
		this.input.string = value == '0' ? '' : value;
	},
	setPhien:function(){
		var phien = cc.RedT.setting.taixiu.logs[0].phien+1;
		this.labelPhien.string = '#' + phien;
	},
	setDice: function(bool = false, sprite = true){
		var self = this;
		this.dice.forEach(function(dice, index){
			sprite && (dice.spriteFrame = self.diceSF[cc.RedT.setting.taixiu.logs[0].dice[index]-1]);
			dice.node.active = bool;
		});
	},
	onData: function(data){
	 
		if (void 0 !== data.get_phien) {
			this.RedT.TX_LichSuPhien.onData(data.get_phien);
		}
		if(void 0 !== data.err){
			var notice = cc.instantiate(this.RedT.RedT.prefabMiniNotice)
			var noticeComponent = notice.getComponent('mini_warning')
			noticeComponent.text.string = data.err;
			this.notice.addChild(notice);
		}
		if (void 0 !== data.du_day) {
			Object.assign(cc.RedT.setting.taixiu.data.du_day, data.du_day);
			this.onDuDay(data.du_day);
		}
		if (void 0 !== data.taixiu) {
			Object.assign(cc.RedT.setting.taixiu.data.taixiu, data.taixiu);
			this.onDataTaiXiu(data.taixiu);
		}
		if(void 0 !== data.get_top){
			this.RedT.TX_Top.onData(data.get_top);
		}
		if(void 0 !== data.chat){
			this.TX_Chat.onData(data.chat);
		}
		if(void 0 !== data.status){
			this.status(data.status)
		}
		if(void 0 !== data.get_log){
			this.RedT.TX_LichSu.onData(data.get_log);
		}
		if(void 0 !== data.logs){
			cc.RedT.setting.taixiu.logs   = data.logs;
			this.dataLogs();
			this.setPhien();
			if(cc.RedT.setting.taixiu.time_remain > 60){//60
				this.setDice(!0);
				this.nodeTimeWait.active  = true;
				this.timeCuoc.node.active = false;
			}
			cc.RedT.setting.taixiu.getLogs = true;
		}
		if(void 0 !== data.time_remain){
			cc.RedT.setting.taixiu.time_remain = data.time_remain;
			this.playTime();
		}
		if(void 0 !== data.finish){
			if (cc.RedT.setting.taixiu.getLogs) {
				// Huỷ đếm
				void 0 !== this.timeInterval && clearInterval(this.timeInterval);
				// Thêm kết quả
				cc.RedT.setting.taixiu.logs.unshift({dice: [data.finish.dices[0], data.finish.dices[1], data.finish.dices[2]], phien: data.finish.phien});
				cc.RedT.setting.taixiu.logs.length > 120 && cc.RedT.setting.taixiu.logs.pop();
				// Đặt dữ liệu
				this.diemSo = data.finish.dices[0]+data.finish.dices[1]+data.finish.dices[2];
				this.labelKetQua.string = this.diemSo;
				if(this.isNan){
					this.diaNan.active         = true;
					this.diaNan.position       = cc.v2(0,-8);
					this.spriteNan.node.active = false;
					this.onDiceAnimationFinish();
				} else {
					this.diceAnimation.node.active = true;
					if (this.node.activeInHierarchy) {
						this.diceAnimation.play();
					}else{
						this.onDiceAnimationFinish();
					}
				}
				this.nodeTimeWait.active  = true;
				this.timeCuoc.node.active = false;
			}
			cc.RedT.setting.taixiu.time_remain = 77;
		//	cc.RedT.setting.taixiu.time_remain = 77;
			//cc.RedT.setting.taixiu.time_remain = 82;
			this.playTime();
		}
	},
	efStop: function(){
		 
		this.efTaiColor.stop();
		this.efXiuColor.stop();

		this.efTai.node.active = true;
		this.efXiu.node.active = true;
	},
	playTime: function(){
		void 0 !== this.timeInterval && clearInterval(this.timeInterval);

		this.audioWin.stop();
		this._results = {};

		this.timeInterval = setInterval(function() {
			if (cc.RedT.setting.taixiu.time_remain > 61) {//61
				if (this.bg_Dice._animator !== null && this.bg_Dice._animator.isPlaying) {
					this.bg_Dice.stop();
				}
				this.bg_efDice.active = false;
				var time = helper.numberPad(cc.RedT.setting.taixiu.time_remain-62, 2);//62
				this.timePopup.node.active && (this.timePopup.string = time) && (this.timePopup.node.color = cc.color(255, 0, 0, 255));
				this.timeWait.string = '00:' + helper.numberPad(time, 2);
				if (cc.RedT.setting.taixiu.time_remain < 71) {//71 51
					this.efStop();
				}
				if (cc.RedT.setting.taixiu.time_remain < 66) {//66 46 
					this.nodeKetQua.active = false;
					this.isNan && (this.diaNan.active = false);
					
				}
			}else{
				if (this.bg_Dice._animator !== null && !this.bg_Dice._animator.isPlaying) {
					let state = this.bg_Dice.getAnimationState(this.bg_Dice._defaultClip.name);
					state.speed = 1;
					this.bg_Dice._animator.playState(state);
				}
				if (this.bg_Dice._animator !== null && this.bg_Dice._animator.isPlaying) {
					if (cc.RedT.setting.taixiu.time_remain < 7) {
						this.bg_Dice._animator._anims.array[0].speed = 10;
					}else if (cc.RedT.setting.taixiu.time_remain < 23) {
						this.bg_Dice._animator._anims.array[0].speed = 6;
					}else if (cc.RedT.setting.taixiu.time_remain < 33) {
						this.bg_Dice._animator._anims.array[0].speed = 3;
					}
				}

				this.bg_efDice.active = true;
				if (!!this.dice[0].node.active) {
					this.setDice(false, false);
					this.reset();
				}
				this.efStop();
				this.nodeTimeWait.active  = this.nodeKetQua.active     = this.diaNan.active = false;
				this.timeCuoc.node.active = this.spriteNan.node.active = true;
				if (cc.RedT.setting.taixiu.time_remain > 0) {
					var time = helper.numberPad(cc.RedT.setting.taixiu.time_remain-1, 2);
					if(cc.RedT.setting.taixiu.getLogs){
						this.timeCuoc.string = + time;
					}
					this.timePopup.node.active && (this.timePopup.string = time) && (this.timePopup.node.color = cc.color(155, 75, 2, 255))
					if (cc.RedT.setting.taixiu.time_remain <= 10)
						this.timeCuoc.node.color = cc.color(255, 69, 69, 255)
					else
						this.timeCuoc.node.color = cc.Color.WHITE
				}else clearInterval(this.timeInterval);
			}
			cc.RedT.setting.taixiu.time_remain--;
		}
		.bind(this), 1000)
	},
	nextRealTime: function(){
		if (cc.RedT.setting.taixiu.time_remain > 61) {//61
			this.setDice(true);
			this.nodeTimeWait.active  = true;
			this.timeCuoc.node.active = false;
			var time = helper.numberPad(cc.RedT.setting.taixiu.time_remain-62, 2);//62 42
			this.timePopup.node.color = cc.color(255, 0, 0, 255);
			this.timePopup.string     = time;
			this.timeWait.string       = '00:' + helper.numberPad(time, 2);
		}else{
			this.nodeTimeWait.active  = false;
			this.timeCuoc.node.active = true;
			if (cc.RedT.setting.taixiu.time_remain > 0) {
				var time = helper.numberPad(cc.RedT.setting.taixiu.time_remain-1, 2);
				if(cc.RedT.setting.taixiu.getLogs){
					this.timeCuoc.string = '00:' + time;
				}
				this.timePopup.node.color = cc.color(155, 75, 2, 255)
				this.timePopup.string     = time;
				if (cc.RedT.setting.taixiu.time_remain <= 10)
					this.timeCuoc.node.color = cc.color(255, 69, 69, 255)
				else
					this.timeCuoc.node.color = cc.Color.WHITE
			}
		}
	},
	onDataTaiXiu: function(data){
		void 0 !== data.red_tai        && (this.totalLeft.string   = helper.numberWithCommas(data.red_tai));
		void 0 !== data.red_xiu        && (this.totalRight.string  = helper.numberWithCommas(data.red_xiu));
		void 0 !== data.red_me_tai     && (this.myLeft.string      = helper.numberWithCommas(data.red_me_tai));
		void 0 !== data.red_me_xiu     && (this.myRight.string     = helper.numberWithCommas(data.red_me_xiu));
		void 0 !== data.red_player_tai && (this.playerLeft.string  = helper.numberWithCommas(data.red_player_tai));
		void 0 !== data.red_player_xiu && (this.playerRight.string = helper.numberWithCommas(data.red_player_xiu));
	},
	onDuDay: function(data){
		this.WIN_HT.string  = data.tLineWinRedH;
		this.WIN_DN.string  = data.tLineWinRed;
		this.LOST_HT.string = data.tLineLostRedH;
		this.LOST_DN.string = data.tLineLostRed;
	},
	dataLogs: function(){
		if (!!cc.RedT.setting.taixiu.logs.length) {
			var self = this;
			//Main log
			this.dotLogs.forEach(function(dot, index){
				let data = cc.RedT.setting.taixiu.logs[index];
				if (void 0 !== data) {
					let point = data.dice[0] + data.dice[1] + data.dice[2];
					dot.node.active = true;
					dot.node.phien = data.phien;
					dot.mod.text.string = data.dice[0] + '-' + data.dice[1] + '-' + data.dice[2];
					dot.spriteFrame = point < 11 ? self.dot_white : self.dot_black;
				}else{
					dot.node.active = false;
				}
			});

			var line_dice1 = [];
			var line_dice2 = [];
			var line_dice3 = [];
			var line_tong  = [];

			var tmp_DS = -1;
			var tmp_arrA = [];
			var tmp_arrB = [];
			var c_tai = 0;
			var c_xiu = 0;

			var sliced = cc.RedT.setting.taixiu.logs.slice(0, 19);
			sliced.reverse();
			// Line paint
			//var Paint = new Promise(function(resolve, reject){
				for (var i = 0; i < sliced.length; i++) {
					var data = sliced[i];
					if (void 0 !== data) {
						self.RedT.TX_ThongKe.lineAc(i, true);
						var dice1 = sliced[i].dice[0];
						var dice2 = sliced[i].dice[1];
						var dice3 = sliced[i].dice[2];
						var tong = dice1+dice2+dice3;

						line_dice1[i] = {x:i*28, y:dice1*28-28, dice: dice1};
						line_dice2[i] = {x:i*28, y:dice2*28-28, dice: dice2};
						line_dice3[i] = {x:i*28, y:dice3*28-28, dice: dice3};
						line_tong[i]  = {x:i*27.7, y:tong*9.233-27.7, tong: tong}
					}else{
						self.RedT.TX_ThongKe.lineAc(i, false);
					}
				}
				self.RedT.TX_ThongKe.draw(self.RedT.TX_ThongKe.dice1_line, self.RedT.TX_ThongKe.dice1_dots, line_dice1);
				self.RedT.TX_ThongKe.draw(self.RedT.TX_ThongKe.dice2_line, self.RedT.TX_ThongKe.dice2_dots, line_dice2);
				self.RedT.TX_ThongKe.draw(self.RedT.TX_ThongKe.dice3_line, self.RedT.TX_ThongKe.dice3_dots, line_dice3);
				self.RedT.TX_ThongKe.draw_Tong(self.RedT.TX_ThongKe.tong_line, line_tong);
			//});

			// Ket Qua
			var KetQua = Promise.all(this.RedT.TX_ThongKe.KetQuaDot.map(function(dot, index){
				var data = cc.RedT.setting.taixiu.logs[index];
				if (void 0 !== data) {
					dot.node.active = true;
					var point = data.dice[0] + data.dice[1] +data.dice[2];
					dot.spriteFrame = point < 11 ? self.dot_white : self.dot_black;
					return (point > 10 ? 1 : 0);
				}else{
					dot.node.active = false;
					return -1;
				}
			}));

			// Diem So
			var diemSo = new Promise((resolve, reject) => {
				var newArr = cc.RedT.setting.taixiu.logs.slice();
				newArr.reverse();
				for (var newDS of newArr) {
					var point = newDS.dice[0]+newDS.dice[1]+newDS.dice[2];
					var type  = point > 10 ? 1 : 0;
					if (tmp_DS === -1) {
						tmp_DS = type;
					}
					if (type != tmp_DS || tmp_arrB.length > 4) {
						tmp_DS = type;
						tmp_arrA.push(tmp_arrB);
						tmp_arrB = [];
					}
					if (type == tmp_DS) {
						tmp_arrB.push(point)
					}
				}
				tmp_arrA.push(tmp_arrB);
				resolve(tmp_arrA);
			});

			Promise.all([KetQua, diemSo]).then(values => {
				var newData = values[1];
				newData.reverse();
				newData = newData.slice(0, 20);
				newData.reverse();
				self.RedT.TX_ThongKe.KetQuaLeft.string  = values[0].filter(i => i == 1).length;
				self.RedT.TX_ThongKe.KetQuaRight.string = values[0].filter(i => i == 0).length;
				Promise.all(self.RedT.TX_ThongKe.DiemSoCel.map(function(obj, i){
					var data = newData[i];
					if (void 0 !== data) {
						obj.active = true;
						return Promise.all(obj.RedT.map(function(current, index){
							var data_Cel = data[index];
							if (void 0 !== data_Cel) {
								var type = data_Cel > 10 ? true : false;
								c_tai = type  ? c_tai+1 : c_tai;
								c_xiu = !type ? c_xiu+1 : c_xiu;
								current.node.active = true;
								current.node.color = type ? cc.color().fromHEX('#B3A1A1') : cc.Color.WHITE;
								current.text.string = data_Cel;
								current.text.node.color = type ? cc.Color.WHITE : cc.Color.BLACK;
								current.spriteFrame = type ? self.dot_black : self.dot_white;
							}else{
								current.node.active = false;
							}
							return void 0;
						}))
					}else{
						obj.active = false;
					}
					return void 0;
				})).then(varT => {
					self.RedT.TX_ThongKe.DiemSoLeft.string  = c_tai;
					self.RedT.TX_ThongKe.DiemSoRight.string = c_xiu;
				})
			});
		}
	},
	reset: function(){
		this.efTaiColor.node.active = false;
		this.efXiuColor.node.active = false;
		this.setPhien();
		this.isNan && this.dataLogs();
		cc.RedT.setting.taixiu.data.taixiu.red_me_tai = cc.RedT.setting.taixiu.data.taixiu.red_me_xiu = cc.RedT.setting.taixiu.data.taixiu.red_player_tai = cc.RedT.setting.taixiu.data.taixiu.red_player_xiu = cc.RedT.setting.taixiu.data.taixiu.red_tai = cc.RedT.setting.taixiu.data.taixiu.red_xiu = this.totalLeft.string = this.totalRight.string = this.myLeft.string = this.myRight.string = this.playerLeft.string = this.playerRight.string = 0;
	},
	setDefautl: function(){
		cc.RedT.setting.taixiu.getLogs = this.nodeTimePopup.active = false;
		void 0 !== this.timeInterval && clearInterval(this.timeInterval);
		clearTimeout(this.regTimeOut);
		clearTimeout(this.regTimeOut2);
		this.TX_Chat.reset();
	},
	status: function(data){
		var time = 10;
		var isNan = this.isNan;
		var send = true;
		if(void 0 !== data){
			this._results = data;
			time = 2e3;
			 
		}else{
			data = this._results;
			time = 10;
			isNan = false;send = false;
		}
	
		this.regTimeOut = setTimeout(function() {
			if(!isNan){
				var temp = new cc.Node;
				temp.addComponent(cc.Label);
				temp = temp.getComponent(cc.Label);
				temp.string = (data.win ? '+' : '-') + helper.numberWithCommas(data.bet);
				temp.font = data.win ? this.fontCong : this.fontTru;
				temp.lineHeight = 130;
				temp.fontSize   = 22;
				temp.node.position = cc.v2(data.select ? -252 : 252, -50);
				this.notice.addChild(temp.node);
				temp.node.runAction(cc.sequence(cc.moveTo(3, cc.v2(data.select ? -252 : 252, 130)), cc.callFunc(function(){this.node.destroy()}, temp)));
				if(void 0 !== data.thuong && data.thuong > 0){
					var thuong = new cc.Node;
					thuong.addComponent(cc.Label);
					thuong = thuong.getComponent(cc.Label);
					thuong.string = (data.win ? '+' : '-') + helper.numberWithCommas(data.thuong);
					thuong.font = cc.RedT.util.fontEffect;
					thuong.lineHeight = 90;
					thuong.fontSize   = 14;
					this.notice.addChild(thuong.node);
					thuong.node.runAction(cc.sequence(cc.moveTo(3, cc.v2(0, 100)), cc.callFunc(function(){this.node.destroy()}, thuong)))
				}
			}
			if(send) cc.RedT.send({taixiu:{get_new: true}})
		}
		.bind(this), time)
	},
});
