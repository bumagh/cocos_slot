
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		menu:    cc.Node,
		content: cc.Node,

		HQmenu:       cc.Node,
		HQcontent:    cc.Node,
		HQcontentDay: cc.Node,

		item:           cc.Prefab,
		itemDay:        cc.Prefab,
		contentHQLeft:  cc.Node,
		contentHQRight: cc.Node,

		LabelDate:    cc.Label,
		nodeDateMore: cc.Node,
		dataOld:      false,
	},
	onLoad: function () {
		this.dateTop = new Date();
		this.dateTop.setDate(this.dateTop.getDate()-1);
		let stringTime = helper.numberPad(this.dateTop.getDate(), 2) + '/' + helper.numberPad(this.dateTop.getMonth()+1, 2) + '/' + this.dateTop.getFullYear();
		this.LabelDate.string = stringTime;

		for (let i = 0; i <11; i++) {
			let dateH = new Date();
			dateH.setDate(dateH.getDate()-1-i);
			let item = cc.instantiate(this.itemDay);
			item = item.getComponent('EventTaiXiu_itemDay');
			item.RedT         = this;
			item.bg.active    = i%2;
			item.day.string   = helper.numberPad(dateH.getDate(), 2) + '/' + helper.numberPad(dateH.getMonth()+1, 2) + '/' + dateH.getFullYear();
			this.HQcontentDay.addChild(item.node);
		}
	},
	selectEvent: function(event) {
		this.nodeDateMore.active = false;
		if (event.target.name == "top") {
			this.onGetTop();
		}else if (event.target.name == "homqua") {
			this.onGetHomQua();
		}
		this.menu.children.forEach(function(menu){
			if (menu.name === event.target.name) {
				menu.children[0].active = false;
				menu.children[1].active = true;
				menu.children[2].color  = cc.color().fromHEX('FAF578');
				menu.pauseSystemEvents();
			}else{
				menu.children[0].active = true;
				menu.children[1].active = false;
				menu.children[2].color  = cc.Color.BLACK;
				menu.resumeSystemEvents();
			}
		});
		this.content.children.forEach(function(content){
			if (content.name === event.target.name) {
				content.active = true;
			}else{
				content.active = false;
			}
		});
	},
	selectHeadHQ: function(event) {
		this.HQmenu.children.forEach(function(menu){
			if (menu.name === event.target.name) {
				menu.children[0].active = false;
				menu.children[1].active = true;
			}else{
				menu.children[0].active = true;
				menu.children[1].active = false;
			}
		});
		this.HQcontent.children.forEach(function(content){
			if (content.name === event.target.name) {
				content.active = true;
			}else{
				content.active = false;
			}
		});
	},
	onGetTop: function(){
		cc.RedT.send({event:{taixiu:{getTop:true}}});
	},
	onGetHomQua: function(){
		!this.dataOld && cc.RedT.send({event:{taixiu:{getTopHQ:this.LabelDate.string}}});
	},
	dateToggle: function(){
		this.nodeDateMore.active = !this.nodeDateMore.active;
	},
	dateView: function(obj){
		if (obj.string != this.LabelDate.string) {
			this.dataOld = false;
			this.LabelDate.string = obj.string;
			this.onGetHomQua();
		}
		this.nodeDateMore.active = false;
	},
	onData: function(data){
		if (!!data.topHQ) {
			this.dataOld = true;
			this.topHQ(data.topHQ);
		}
	},
	topHQ: function(data){
		this.contentHQLeft.destroyAllChildren();
		this.contentHQRight.destroyAllChildren();

		data.win.reverse();
		data.lost.reverse();

		data.win.forEach(function(user, index){
			let item = cc.instantiate(this.item);
			item = item.getComponent('EventTaiXiu_item');
			item.bg.active    = index%2;
			item.top.string   = user.top;
			item.users.string = user.name;
			item.day.string   = user.line;
			item.date.string  = this.LabelDate.string;
			item.gift.string  = helper.numberWithCommas(user.reward);
			item.node.children[0].active = !(index&1);
			this.contentHQLeft.addChild(item.node);
		}.bind(this));

		data.lost.forEach(function(user, index){
			let item = cc.instantiate(this.item);
			item = item.getComponent('EventTaiXiu_item');
			
			item.bg.active    = index%2;
			item.top.string   = user.top;
			item.users.string = user.name;
			item.day.string   = user.line;
			item.date.string  = this.LabelDate.string;
			item.gift.string  = helper.numberWithCommas(user.reward);
			item.node.children[0].active = !(index&1);
			this.contentHQRight.addChild(item.node);
		}.bind(this));
	},
});
