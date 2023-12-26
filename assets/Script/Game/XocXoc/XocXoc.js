
let helper = require('Helper');
let notice = require('Notice');

let dialog = require('XocXoc_dialog');

cc.Class({
	extends: cc.Component,

	properties: {
		audioMoBat:      cc.AudioSource,
		audioSingleChip: cc.AudioSource,
		audioMultiChip:  cc.AudioSource,
		audioXocDia:     cc.AudioSource,

		audioMultiChip2: cc.AudioSource,
		audioMultiChip3: cc.AudioSource,
		audioMultiChip4: cc.AudioSource,
		audioMultiChip5: cc.AudioSource,

		box_chan:   cc.Node,
		box_le:     cc.Node,
		box_red3:   cc.Node,
		box_red4:   cc.Node,
		box_white3: cc.Node,
		box_white4: cc.Node,

		total_chan:   cc.Label,
		total_le:     cc.Label,
		total_red3:   cc.Label,
		total_red4:   cc.Label,
		total_white3: cc.Label,
		total_white4: cc.Label,

		me_chan:   cc.Label,
		me_le:     cc.Label,
		me_red3:   cc.Label,
		me_red4:   cc.Label,
		me_white3: cc.Label,
		me_white4: cc.Label,

		me_name:   cc.Label,
		me_balans: cc.Label,

		labelTime: cc.Label,
		timeWait:  cc.Label,
		nodeWait:  cc.Node,

		box_chip:    cc.Node,

		users_bg:    cc.Node,
		users_count: cc.Label,

		nodeBat: cc.Node,

		chip_1000:    cc.SpriteFrame,
		chip_10000:   cc.SpriteFrame,
		chip_50000:   cc.SpriteFrame,
		chip_100000:  cc.SpriteFrame,
		chip_1000000: cc.SpriteFrame,

		dot_red:   cc.SpriteFrame,
		dot_white: cc.SpriteFrame,

		dot: {
			default: [],
			type: cc.Sprite,
		},

		log_chan: cc.Label,
		log_le:   cc.Label,
		log_top:  cc.Node,
		logMain:  cc.Node,

		redH:    cc.Node,
		miniNotice: cc.Node,

		Animation: cc.Animation,

		prefabNotice: cc.Prefab,

		bet:     cc.Node,

		loading:   cc.Node,
		notice:    notice,
		dialog:    dialog,
	},
	ctor: function(){
		this.logs = [];
		this.nan  = false;
		this.cuoc = '1000';
		this.actionBatOpen  = cc.moveTo(0.5, cc.v2(121, 222));
		this.actionBatClose = cc.sequence(
			cc.callFunc(function(){
				this.resetData();
			}, this),
			cc.moveTo(0.5, cc.v2(0, 0)),
			cc.delayTime(0.5),
			cc.callFunc(function(){
				this.audioXocDia.play();
				this.Animation.play();
			}, this));
		this.maxDot = {x:39, y:19};

		this.maxBox1_3 = {x:-10, y:0};
		this.maxBox1_1 = {x:-10, y:0};

		this.clients = {
			'red': {
				'chan':   0,
				'le':     0,
				'red3':   0,
				'red4':   0,
				'white3': 0,
				'white4': 0,
			},
		};

		this.users = {
			'red': {
				'chan':   0,
				'le':     0,
				'red3':   0,
				'red4':   0,
				'white3': 0,
				'white4': 0,
			},
		};
	},
	onLoad () {
		cc.RedT.inGame = this;
		cc.RedT.MiniPanel.node.parent = this.redH;

		this.logMain = this.logMain.children.map(function(obj){
			return obj.children[0].getComponent(cc.Sprite);
		});

		this.logMain.reverse();

		this.log_top = this.log_top.children.map(function(obj){
			let data = {'cell':obj};
			let cell = obj.children.map(function(obj){
				return {c:obj.children[0].getComponent(cc.Sprite), t:obj.children[1].getComponent(cc.Label)};
			});
			cell.reverse();
			data.data = cell;
			return data;
		});

		this.log_top.reverse();

		this.me_name.string = cc.RedT.user.name;
		this.me_balans.string = helper.numberWithCommas(cc.RedT.user.red);

		cc.RedT.send({scene:"xocxoc", g:{xocxoc:{ingame:true}}});
	},
	onData: function(data) {
		if (void 0 !== data.user){
			this.userData(data.user);
			cc.RedT.userData(data.user);
		}
		if (void 0 !== data.xocxoc){
			this.xocxoc(data.xocxoc);
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
	backGame: function(){
		cc.RedT.MiniPanel.node.parent = null;
		clearInterval(this.timeInterval);
		cc.RedT.send({g:{xocxoc:{outgame:true}}});
		this.loading.active = true;
		clearTimeout(this.timeOut);
		clearTimeout(this.regTimeOut1);
		clearTimeout(this.regTimeOut2);
		clearTimeout(this.regTimeOut3);
		cc.director.loadScene('MainGame');
	},
	signOut: function(){
		cc.RedT.MiniPanel.node.parent = null;
		clearInterval(this.timeInterval);
		clearTimeout(this.timeOut);
		clearTimeout(this.regTimeOut1);
		clearTimeout(this.regTimeOut2);
		clearTimeout(this.regTimeOut3);
		cc.director.loadScene('MainGame', function(){
			cc.RedT.inGame.signOut();
		});
	},
	userData: function(data){
		this.me_balans.string = helper.numberWithCommas(data.red);
	},
	xocxoc: function(data){
		//console.log(data);
		if (!!data.ingame) {
			this.xocxocIngame(data.ingame);
		}
		if (!!data.finish) {
			this.xocxocFinish(data.finish);
		}
		if (!!data.history) {
			this.dialog.history.onData(data.history);
		}
		if (!!data.top) {
			//top win
		}
		if (!!data.status) {
			this.status(data.status);
		}
		if (!!data.chip) {
			this.clientsChip(data.chip);
		}
		if (!!data.mechip) {
			this.meChip(data.mechip);
		}
		if (!!data.client) {
			this.updateClient(data.client);
		}
		if (!!data.me) {
			this.updateMe(data.me);
		}
		if (void 0 !== data.notice) {
			this.addNotice(data.notice);
		}
	},
	xocxocIngame: function(data){
		if (data.client) {
			this.countClient(data.client);
		}
		if (!!data.chip) {
			this.ingameChip(data.chip);
		}
		if (!!data.time) {
			this.time_remain = data.time-1;
			this.playTime();
			if (this.time_remain > 32 && data.logs.length) {
				this.nodeBat.position = cc.v2(0, 246);
				this.setDot([data.logs[0].red1, data.logs[0].red2, data.logs[0].red3, data.logs[0].red4]);
			}
		}
		if (!!data.data) {
			this.updateData(data.data);
		}
		if (!!data.logs) {
			this.logs = data.logs;
			this.setLogs();
		}
		if (!!data.me) {
			this.updateMe(data.me);
		}
		if (!!data.chats) {
		}
	},
	ingameChip: function(data){
		for (let [key, value] of Object.entries(data)) {
			let max = this.maxBox1_3;
			switch(data.box) {
				case 'chan':
					max = this.maxBox1_1;
				break;

				case 'le':
					max = this.maxBox1_1;
				break;
			}
			for (let [keyT, valueT] of Object.entries(value)) {
				if (valueT > 0) {
					while (valueT) {
						let x = (Math.random()*(max.x+1))>>0;
						let y = (Math.random()*(max.y+1))>>0;

						let newN = new cc.Node;
						newN = newN.addComponent(cc.Sprite);
						newN.spriteFrame = this['chip_'+keyT];
						newN.node.position = cc.v2(x, y);
						newN.node.scale = 0.3;
						this['box_'+key].children[1].addChild(newN.node);
						valueT--;
					}
				}
			}
		}
	},
	xocxocFinish: function(data){
		let dice = {red1:data[0], red2:data[1], red3:data[2], red4:data[3]};
		this.logs.unshift(dice);
		this.logs.length > 48 && this.logs.pop();
		this.setDot(data);
		this.labelTime.node.active = false;
		this.time_remain = 43;
		this.playTime();

		if (!this.nan) {
			this.FinishTT();
		}
	},
	FinishTT: function(){
		this.audioMoBat.play();
		this.nodeBat.runAction(
			cc.sequence(
				this.actionBatOpen,
				cc.callFunc(this.showKQ, this),
				cc.delayTime(1),
				cc.callFunc(this.showKQ2, this),
			)
		);
		this.setLogs();
	},
	showKQ: function(){
		let data = Object.values(this.logs[0]);
		let numb = 0;
		data.forEach(function(dot){
			if (dot) {
				numb++;
			}
		});

		if (!(numb%2)) {
			this.box_chan.children[0].active = true;
		}else{
			this.box_le.children[0].active = true;
		}

		switch(numb) {
			case 0:
				this.box_white4.children[0].active = true;
			break;

			case 1:
				this.box_white3.children[0].active = true;
			break;

			case 3:
				this.box_red3.children[0].active = true;
			break;

			case 4:
				this.box_red4.children[0].active = true;
			break;
		}
	},
	showKQ2: function(){
		let audioLost = 0;
		let audioWin  = 0;
		let node1 = null;
		let node2 = null;
		let data  = Object.values(this.logs[0]);
		let numb  = 0;
		data.forEach(function(dot){
			if (dot) {
				numb++;
			}
		});

		let position = this.box_chip.parent.convertToWorldSpaceAR(this.box_chip.position);
		let centerMid = null;
		let centerLR  = null;

		if (!(numb%2)) {
			node1 = this.box_chan.children[1];
			audioLost += this.box_le.children[1].children.length;
			centerMid = this.box_le.children[1].convertToNodeSpaceAR(position);
			this.box_le.children[1].children.forEach(function(chip){
				chip.runAction(
					cc.spawn(
						cc.scaleTo(0.4, 0.5),
						cc.moveTo(0.4, centerMid)
					),
				);
			});
		}else{
			node1 = this.box_le.children[1];
			audioLost += this.box_chan.children[1].children.length;
			centerMid = this.box_chan.children[1].convertToNodeSpaceAR(position);
			this.box_chan.children[1].children.forEach(function(chip){
				chip.runAction(
					cc.spawn(
						cc.scaleTo(0.4, 0.5),
						cc.moveTo(0.4, centerMid)
					),
				);
			});
		}

		let red3   = this.box_red3.children[1].convertToNodeSpaceAR(position);
		let red4   = this.box_red4.children[1].convertToNodeSpaceAR(position);
		let white3 = this.box_white3.children[1].convertToNodeSpaceAR(position);
		let white4 = this.box_white4.children[1].convertToNodeSpaceAR(position);

		switch(numb) {
			case 0:
				node2 = this.box_white4.children[1];
				audioLost += this.box_red3.children[1].children.length+this.box_red4.children[1].children.length+this.box_white3.children[1].children.length;
				this.box_red3.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, red3)
						),
					);
				});
				this.box_red4.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, red4)
						),
					);
				});
				this.box_white3.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, white3)
						),
					);
				});
			break;

			case 1:
				node2 = this.box_white3.children[1];
				audioLost += this.box_red3.children[1].children.length+this.box_red4.children[1].children.length+this.box_white4.children[1].children.length;
				this.box_red3.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, red3)
						),
					);
				});
				this.box_red4.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, red4)
						),
					);
				});
				this.box_white4.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, white4)
						),
					);
				});
			break;

			case 2:
				audioLost += this.box_red3.children[1].children.length+this.box_red4.children[1].children.length+this.box_white3.children[1].children.length+this.box_white4.children[1].children.length;
				this.box_red3.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, red3)
						),
					);
				});
				this.box_red4.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, red4)
						),
					);
				});
				this.box_white3.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, white4)
						),
					);
				});
				this.box_white4.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, white4)
						),
					);
				});
			break;

			case 3:
				node2 = this.box_red3.children[1];
				audioLost += this.box_white3.children[1].children.length+this.box_red4.children[1].children.length+this.box_white4.children[1].children.length;
				this.box_white3.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, white3)
						),
					);
				});
				this.box_red4.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, red4)
						),
					);
				});
				this.box_white4.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, white4)
						),
					);
				});
			break;

			case 4:
				node2 = this.box_red4.children[1];
				audioLost += this.box_white3.children[1].children.length+this.box_red3.children[1].children.length+this.box_white4.children[1].children.length;
				this.box_white3.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, white3)
						),
					);
				});
				this.box_red3.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, red3)
						),
					);
				});
				this.box_white4.children[1].children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.scaleTo(0.4, 0.5),
							cc.moveTo(0.4, white4)
						),
					);
				});
			break;
		}
		!!audioLost && this.audioMultiChip.play();
		this.regTimeOut1 = setTimeout(function(){
			audioWin += node1.children.length;
			node1.children.forEach(function(chip){
				let copy = cc.instantiate(chip);
				copy.position = centerMid;
				copy.scale    = 0.5;

				let x = (Math.random()*(this.maxBox1_1.x+1))>>0;
				let y = (Math.random()*(this.maxBox1_1.y+1))>>0;

				node1.addChild(copy);
				copy.runAction(
					cc.sequence(
						cc.spawn(
							cc.scaleTo(0.4, 0.3),
							cc.moveTo(0.4, cc.v2(x, y))
						),
						cc.sequence(
							cc.moveTo(0.1, cc.v2(x, y-6)),
							cc.moveTo(0.1, cc.v2(x, y))
						)
					));
			}.bind(this));

			if (node2) {
				audioWin += node2.children.length;
				let node2red = node2.convertToNodeSpaceAR(position);
				node2.children.forEach(function(chip){
					let copy = cc.instantiate(chip);
					copy.position = node2red;
					copy.scale    = 0.5;

					let x = (Math.random()*(this.maxBox1_3.x+1))>>0;
					let y = (Math.random()*(this.maxBox1_3.y+1))>>0;

					node2.addChild(copy);
					copy.runAction(
						cc.sequence(
							cc.spawn(
								cc.scaleTo(0.4, 0.3),
								cc.moveTo(0.4, cc.v2(x, y))
							),
							cc.sequence(
								cc.moveTo(0.1, cc.v2(x, y-6)),
								cc.moveTo(0.1, cc.v2(x, y))
							)
						));
				}.bind(this));
			}
			if (!!audioWin) {
				[1,2,3,4,5].forEach(function(audio){
					if (audio !== 1) {
						this['audioMultiChip'+audio].play();
					}else{
						this.audioMultiChip.play();
					}
				}.bind(this));
			}
			this.regTimeOut2 = setTimeout(function(){
				let positionUser = this.users_bg.parent.convertToWorldSpaceAR(this.users_bg.position);
				let position1_1 = node1.convertToNodeSpaceAR(positionUser);

				node1.children.forEach(function(chip){
					chip.runAction(
						cc.spawn(
							cc.fadeTo(0.4, 0),
							cc.moveTo(0.4, position1_1)
						));
				});
				if (node2) {
					let position1_3 = node2.convertToNodeSpaceAR(positionUser);
					node2.children.forEach(function(chip){
						chip.runAction(
							cc.spawn(
								cc.fadeTo(0.4, 0),
								cc.moveTo(0.4, position1_3)
							));
					});
				}
			}.bind(this), 3000);
		}.bind(this), 1500);
	},
	setDot: function(data){
		let Dot_x = (Math.random()*(this.maxDot.x+1))>>0;
		let Dot_y = (Math.random()*(this.maxDot.y+1))>>0;
		let DotCheck = Dot_y-Dot_x;
		if (DotCheck > 22) {
			Dot_y = Dot_y-Dot_y/1.4;
		}
		this.dot[0].node.position = cc.v2(Dot_x, Dot_y);

		Dot_x = (Math.random()*(this.maxDot.x+1))>>0;
		Dot_y = (Math.random()*(this.maxDot.y+1))>>0;
		DotCheck = Dot_y-Dot_x;
		if (DotCheck > 22) {
			Dot_y = Dot_y-Dot_y/1.4;
		}
		this.dot[1].node.position = cc.v2(Dot_x, Dot_y);

		Dot_x = (Math.random()*(this.maxDot.x+1))>>0;
		Dot_y = (Math.random()*(this.maxDot.y+1))>>0;
		DotCheck = Dot_y-Dot_x;
		if (DotCheck > 22) {
			Dot_y = Dot_y-Dot_y/1.4;
		}
		this.dot[2].node.position = cc.v2(Dot_x, Dot_y);

		Dot_x = (Math.random()*(this.maxDot.x+1))>>0;
		Dot_y = (Math.random()*(this.maxDot.y+1))>>0;
		DotCheck = Dot_y-Dot_x;
		if (DotCheck > 22) {
			Dot_y = Dot_y-Dot_y/1.4;
		}
		this.dot[3].node.position = cc.v2(Dot_x, Dot_y);

		this.dot.forEach(function(dot, index){
			let check = data[index];
			if (check) {
				dot.spriteFrame = this.dot_red;
			}else{
				dot.spriteFrame = this.dot_white;
			}
		}.bind(this));
	},
	playTime: function(){
		void 0 !== this.timeInterval && clearInterval(this.timeInterval);
		this.timeInterval = setInterval(function(){
			if (this.time_remain > 32) {
				var time = helper.numberPad(this.time_remain-33, 2);
				this.timeWait.string = time;
				this.labelTime.node.active = false;
				this.nodeWait.active = true;
			}else if(this.time_remain > 30){
				// Xoc Dia
				this.labelTime.node.active = false;
				this.nodeWait.active = false;
				this.time_remain === 32 && this.nodeBat.runAction(this.actionBatClose);
			}else{
				if (this.time_remain > -1) {
					var time = helper.numberPad(this.time_remain, 2);
					this.labelTime.node.active  = true;
					this.nodeWait.active  = false;
					this.labelTime.string = time;

					if (this.time_remain < 11) {
						this.labelTime.node.color = cc.Color.RED;
					}else{
						this.labelTime.node.color = cc.Color.WHITE
					}
				}else clearInterval(this.timeInterval);
			}
			this.time_remain--;
		}.bind(this), 1000);
	},
	countClient: function(client){
		this.users_count.string = client;
	},
	updateData: function(data){
		this.total_chan.string   = data.red.chan   > 0 ? helper.numberWithCommas(data.red.chan)   : '';
		this.total_le.string     = data.red.le     > 0 ? helper.numberWithCommas(data.red.le)     : '';
		this.total_red3.string   = data.red.red3   > 0 ? helper.numberWithCommas(data.red.red3)   : '';
		this.total_red4.string   = data.red.red4   > 0 ? helper.numberWithCommas(data.red.red4)   : '';
		this.total_white3.string = data.red.white3 > 0 ? helper.numberWithCommas(data.red.white3) : '';
		this.total_white4.string = data.red.white4 > 0 ? helper.numberWithCommas(data.red.white4) : '';
	},
	resetData: function(){
		this.box_chan.children[1].destroyAllChildren();
		this.box_le.children[1].destroyAllChildren();
		this.box_white4.children[1].destroyAllChildren();
		this.box_white3.children[1].destroyAllChildren();
		this.box_red3.children[1].destroyAllChildren();
		this.box_red4.children[1].destroyAllChildren();

		this.box_chan.children[0].active   = false;
		this.box_le.children[0].active     = false;
		this.box_white4.children[0].active = false;
		this.box_white3.children[0].active = false;
		this.box_red3.children[0].active   = false;
		this.box_red4.children[0].active   = false;

		this.total_chan.string   = '';
		this.total_le.string     = '';
		this.total_red3.string   = '';
		this.total_red4.string   = '';
		this.total_white3.string = '';
		this.total_white4.string = '';

		this.me_chan.string   = '';
		this.me_le.string     = '';
		this.me_red3.string   = '';
		this.me_red4.string   = '';
		this.me_white3.string = '';
		this.me_white4.string = '';

		this.users.red.chan   = 0;
		this.users.red.le     = 0;
		this.users.red.red3   = 0;
		this.users.red.red4   = 0;
		this.users.red.white3 = 0;
		this.users.red.white4 = 0;

		this.clients.red.chan   = 0;
		this.clients.red.le     = 0;
		this.clients.red.red3   = 0;
		this.clients.red.red4   = 0;
		this.clients.red.white3 = 0;
		this.clients.red.white4 = 0;
	},
	setLogs: function(){
		let self = this;
		this.logMain.forEach(function(obj, index){
			let data = self.logs[index];
			if (data) {
				obj.node.active = true;
				data = Object.values(data);
				let gameChan = 0;     // Là chẵn
				data.forEach(function(kqH){
					if (kqH) {
						gameChan++;
					}
				});
				if (!(gameChan%2)) {
					obj.spriteFrame = self.dot_white;
				}else{
					obj.spriteFrame = self.dot_red;
				}
			}else{
				obj.node.active = false;
			}
		});

		let tmp_DS = -1;
		let tmp_arrA = [];
		let tmp_arrB = [];
		let c_chan = 0;
		let c_le = 0;

		let newArr = self.logs.slice();
		newArr.reverse();
		newArr.forEach(function(newDS){
			let data = Object.values(newDS);
			let gameChan = 0;
			data.forEach(function(kqH){
				if (kqH) {
					gameChan++;
				}
			});

			let type  = !(gameChan%2);
			if (tmp_DS === -1) {
				tmp_DS = type;
			}
			if (type !== tmp_DS || tmp_arrB.length > 3) {
				tmp_DS = type;
				//tmp_arrB.reverse();
				tmp_arrA.push(tmp_arrB);
				tmp_arrB = [];
			}
			if (type === tmp_DS) {
				tmp_arrB.push(gameChan)
			}
		});

		//tmp_arrB.reverse();
		tmp_arrA.push(tmp_arrB);
		tmp_arrA.reverse();
		tmp_arrA = tmp_arrA.slice(0, 12);

		this.log_top.forEach(function(obj, index){
			let data = tmp_arrA[index];
			if (data) {
				obj.cell.active = true;

				obj.data.forEach(function(cell, j){
					let jD = data[j];
					if (void 0 !== jD) {
						cell.c.node.parent.active = true;
						cell.c.spriteFrame = !(jD%2) ? (jD === 4 ? self.dot_red : self.dot_white) : self.dot_red;
						cell.t.string = jD === 0 ? 4 : jD;

						if (!(jD%2)) {
							c_chan++;
						}else{
							c_le++;
						}
					}else{
						cell.c.node.parent.active = false;
					}
				});
			}else{
				obj.cell.active = false;
			}
		});

		this.log_chan.string = c_chan;
		this.log_le.string   = c_le;
	},
	changerBet: function(event, bet){
		let target = event.target;
		this.cuoc = target.name;
		this.bet.children.forEach(function(obj){
			if (obj == target) {
				obj.children[0].active = false;
				obj.children[1].active = true;
				obj.pauseSystemEvents();
				obj.opacity = 255;
			}else{
				obj.children[0].active = true;
				obj.children[1].active = false;
				obj.resumeSystemEvents();
				obj.opacity = 99;
			}
		})
	},
	onCuoc: function(event, box){
		cc.RedT.send({g:{xocxoc:{cuoc:{cuoc:this.cuoc, box:box}}}});
	},
	addNotice:function(text){
		var notice = cc.instantiate(this.prefabNotice)
		var noticeComponent = notice.getComponent('mini_warning')
		noticeComponent.text.string = text;
		this.miniNotice.addChild(notice);
	},
	clientsChip: function(data){
		let nodeBox = null;
		let max     = this.maxBox1_3;

		switch(data.box) {
			case 'chan':
				nodeBox = this.box_chan;
				max = this.maxBox1_1;
			break;

			case 'le':
				nodeBox = this.box_le;
				max = this.maxBox1_1;
			break;

			case 'red3':
				nodeBox = this.box_red3;
			break;

			case 'red4':
				nodeBox = this.box_red4;
			break;

			case 'white3':
				nodeBox = this.box_white3;
			break;

			case 'white4':
				nodeBox = this.box_white4;
			break;
		}

		let position = this.users_bg.parent.convertToWorldSpaceAR(this.users_bg.position);
		position = nodeBox.children[1].convertToNodeSpaceAR(position);

		let newN = new cc.Node;
		newN = newN.addComponent(cc.Sprite);
		newN.spriteFrame = this['chip_'+data.cuoc];
		newN.node.position = position;
		newN.node.scale    = 0.67;

		let x = (Math.random()*(max.x+1))>>0;
		let y = (Math.random()*(max.y+1))>>0;

		nodeBox.children[1].addChild(newN.node);

		let copy = cc.instantiate(this.audioSingleChip.node);
		newN.node.addChild(copy);
		copy = copy.getComponent(cc.AudioSource);

		newN.node.runAction(
			cc.sequence(
				cc.spawn(
					cc.scaleTo(0.4, 0.3),
					cc.moveTo(0.4, cc.v2(x, y))
				),
				cc.callFunc(function(){this.play()}, copy),
				cc.sequence(
					cc.moveTo(0.1, cc.v2(x, y-6)),
					cc.moveTo(0.1, cc.v2(x, y))
				)
			));
	},
	meChip: function(data){
		let nodeBet = null;
		let nodeBox = null;
		let max     = this.maxBox1_3;

		this.bet.children.forEach(function(bet){
			if (bet.name == data.cuoc) {
				nodeBet = bet;
			}
		});

		switch(data.box) {
			case 'chan':
				nodeBox = this.box_chan;
				max = this.maxBox1_1;
			break;

			case 'le':
				nodeBox = this.box_le;
				max = this.maxBox1_1;
			break;

			case 'red3':
				nodeBox = this.box_red3;
			break;

			case 'red4':
				nodeBox = this.box_red4;
			break;

			case 'white3':
				nodeBox = this.box_white3;
			break;

			case 'white4':
				nodeBox = this.box_white4;
			break;
		}

		let position = nodeBet.parent.convertToWorldSpaceAR(nodeBet.position);
		position = nodeBox.children[1].convertToNodeSpaceAR(position);

		let newN = new cc.Node;
		newN = newN.addComponent(cc.Sprite);
		newN.spriteFrame = this['chip_'+data.cuoc];
		newN.node.position = position;

		let x = (Math.random()*(max.x+1))>>0;
		let y = (Math.random()*(max.y+1))>>0;

		// this.audioSingleChip.node
		nodeBox.children[1].addChild(newN.node);
		let copy = cc.instantiate(this.audioSingleChip.node);
		newN.node.addChild(copy);
		copy = copy.getComponent(cc.AudioSource);
		newN.node.runAction(
			cc.sequence(
				cc.spawn(
					cc.scaleTo(0.3, 0.3),
					cc.moveTo(0.3, cc.v2(x, y))
				),
				cc.callFunc(function(){this.play()}, copy),
				cc.sequence(
					cc.moveTo(0.1, cc.v2(x, y+6)),
					cc.moveTo(0.1, cc.v2(x, y))
				)
			));
	},
	updateMe: function(data){
		!!data.red && this.updateMeRed(data.red);
	},
	updateMeRed: function(data){
		if (data.chan > 0) {
			this.users.red.chan = data.chan;
			this.me_chan.string = helper.numberWithCommas(data.chan);
		}
		if (data.le > 0) {
			this.users.red.le = data.le;
			this.me_le.string = helper.numberWithCommas(data.le);
		}
		if (data.red3 > 0) {
			this.users.red.red3 = data.red3;
			this.me_red3.string = helper.numberWithCommas(data.red3);
		}
		if (data.red4 > 0) {
			this.users.red.red4 = data.red4;
			this.me_red4.string = helper.numberWithCommas(data.red4);
		}
		if (data.white3 > 0) {
			this.users.red.white3 = data.white3;
			this.me_white3.string = helper.numberWithCommas(data.white3);
		}
		if (data.white4 > 0) {
			this.users.red.white4 = data.white4;
			this.me_white4.string = helper.numberWithCommas(data.white4);
		}
	},
	updateClient: function(data){
		!!data.red && this.updateClientRed(data.red);
	},
	updateClientRed: function(data){
		if (data.chan > 0) {
			this.clients.red.chan = data.chan;
			this.total_chan.string = helper.numberWithCommas(data.chan);
		}
		if (data.le > 0) {
			this.clients.red.le = data.le;
			this.total_le.string = helper.numberWithCommas(data.le);
		}
		if (data.red3 > 0) {
			this.clients.red.red3 = data.red3;
			this.total_red3.string = helper.numberWithCommas(data.red3);
		}
		if (data.red4 > 0) {
			this.clients.red.red4 = data.red4;
			this.total_red4.string = helper.numberWithCommas(data.red4);
		}
		if (data.white3 > 0) {
			this.clients.red.white3 = data.white3;
			this.total_white3.string = helper.numberWithCommas(data.white3);
		}
		if (data.white4 > 0) {
			this.clients.red.white4 = data.white4;
			this.total_white4.string = helper.numberWithCommas(data.white4);
		}
	},
	updateMeCoint: function(){
			this.me_chan.string   = this.users.red.chan   > 0 ? helper.numberWithCommas(this.users.red.chan)   : '';
			this.me_le.string     = this.users.red.le     > 0 ? helper.numberWithCommas(this.users.red.le)     : '';
			this.me_red3.string   = this.users.red.red3   > 0 ? helper.numberWithCommas(this.users.red.red3)   : '';
			this.me_red4.string   = this.users.red.red4   > 0 ? helper.numberWithCommas(this.users.red.red4)   : '';
			this.me_white3.string = this.users.red.white3 > 0 ? helper.numberWithCommas(this.users.red.white3) : '';
			this.me_white4.string = this.users.red.white4 > 0 ? helper.numberWithCommas(this.users.red.white4) : '';

			this.total_chan.string   = this.clients.red.chan   > 0 ? helper.numberWithCommas(this.clients.red.chan)   : '';
			this.total_le.string     = this.clients.red.le     > 0 ? helper.numberWithCommas(this.clients.red.le)     : '';
			this.total_red3.string   = this.clients.red.red3   > 0 ? helper.numberWithCommas(this.clients.red.red3)   : '';
			this.total_red4.string   = this.clients.red.red4   > 0 ? helper.numberWithCommas(this.clients.red.red4)   : '';
			this.total_white3.string = this.clients.red.white3 > 0 ? helper.numberWithCommas(this.clients.red.white3) : '';
			this.total_white4.string = this.clients.red.white4 > 0 ? helper.numberWithCommas(this.clients.red.white4) : '';
	},
	status: function(data){
		this.regTimeOut3 = setTimeout(function() {
			var temp = new cc.Node;
			temp.addComponent(cc.Label);
			temp = temp.getComponent(cc.Label);
			temp.string = (data.win ? '+' : '-') + helper.numberWithCommas(data.bet);
			temp.font = data.win ? cc.RedT.util.fontCong : cc.RedT.util.fontTru;
			temp.lineHeight = 130;
			temp.fontSize   = 25;
			temp.node.position = cc.v2(0, 90);
			this.miniNotice.addChild(temp.node);
			temp.node.runAction(cc.sequence(cc.moveTo(4, cc.v2(0, 200)), cc.callFunc(function(){this.node.destroy()}, temp)));
			data.win && cc.RedT.send({user:{updateCoint: true}});
			if(void 0 !== data.thuong && data.thuong > 0){
				var thuong = new cc.Node;
				thuong.addComponent(cc.Label);
				thuong = thuong.getComponent(cc.Label);
				thuong.string = '+' + helper.numberWithCommas(data.thuong);
				thuong.font = cc.RedT.util.fontEffect;
				thuong.lineHeight = 90;
				thuong.fontSize   = 14;
				this.miniNotice.addChild(thuong.node);
				thuong.node.runAction(cc.sequence(cc.moveTo(4, cc.v2(0, 100)), cc.callFunc(function(){this.node.destroy()}, thuong)))
			}
		}
		.bind(this), 4e3)
	},
});
