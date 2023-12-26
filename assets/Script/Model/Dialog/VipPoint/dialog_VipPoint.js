
var numberPad   = require('Helper').numberPad;
var numberCoint = require('Helper').numberWithCommas;

cc.Class({
	extends: cc.Component,

	properties: {
		head: cc.Node,
		body: cc.Node,
		time_f: cc.Label,
		time_t: cc.Label,
		time_h: cc.Label,
		member: cc.Label,
		content: cc.Node,
		giai:    cc.Node,
		item:    cc.Prefab,
		isLoad: false,
		distance: false,
	},
	onEnable: function () {
		!this.isLoad && cc.RedT.send({event:{vipp:true}});
	},
	onData: function(data){
		this.isLoad = true;
		if(void 0 !== data.config){
			this.config(data.config);
		}
		if(void 0 !== data.top){
			this.top(data.top);
		}
	},
	top: function(top){
		this.content.destroyAllChildren();
		top.forEach(function(obj, index){
			var item = cc.instantiate(this.item);
			item = item.getComponent('EVipPoint_item');
			item.bg.active   = index%2;
			item.nick.string = obj.name;
			if (index === 0) {
				item.icon1.active = true;
				item.icon_oto.active = true;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.top.node.active = false;
				item.nick.node.color = item.nick.node.color.fromHEX('#FF06E1');
				item.vip.node.color  = item.nick.node.color;
				item.vip.string      =  obj.vip;
			}else if (index === 1) {
				item.icon_oto.active = false;
				item.icon_z800.active = true;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = true;
		        item.icon3.active = false;
				item.top.node.active = false;
				item.nick.node.color = item.nick.node.color.fromHEX('#6BF300');
				item.vip.node.color  = item.nick.node.color;
				item.vip.string      =  obj.vip;
			}else if (index === 2) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = true;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = true;
				item.top.node.active = false;
				item.nick.node.color = item.nick.node.color.fromHEX('#FFA300');
				item.vip.node.color  = item.nick.node.color;
				item.vip.string      =  obj.vip;//'*******';
			}else if (index === 3) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = true;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.top.node.active = true;
				item.top.string = index+1;
				item.nick.node.color = item.nick.node.color.fromHEX('#3399FF');
				item.vip.node.color  = item.nick.node.color;
				item.vip.string      = obj.vip;
			}else if (index === 4) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.giai5.active = true;
				item.icon_coin.active = true;
				item.top.node.active = true;
				item.top.string = index+1;
				item.nick.node.color = cc.Color.WHITE;
				item.vip.node.color  = cc.Color.WHITE;
				item.vip.string  = obj.vip;
			}else if (index === 5) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.giai6.active = true;
				item.icon_coin.active = true;
				item.top.node.active = true;
				item.top.string = index+1;
				item.nick.node.color = cc.Color.WHITE;
				item.vip.node.color  = cc.Color.WHITE;
				item.vip.string  = obj.vip;
			}else if (index === 6) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.giai7.active = true;
				item.icon_coin.active = true;
				item.top.node.active = true;
				item.top.string = index+1;
				item.nick.node.color = cc.Color.WHITE;
				item.vip.node.color  = cc.Color.WHITE;
				item.vip.string  = obj.vip;
			}else if (index === 7) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.giai8.active = true;
				item.icon_coin.active = true;
				item.top.node.active = true;
				item.top.string = index+1;
				item.nick.node.color = cc.Color.WHITE;
				item.vip.node.color  = cc.Color.WHITE;
				item.vip.string  = obj.vip;
			}else if (index === 8) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.giai9.active = true;
				item.icon_coin.active = true;
				item.top.node.active = true;
				item.top.string = index+1;
				item.nick.node.color = cc.Color.WHITE;
				item.vip.node.color  = cc.Color.WHITE;
				item.vip.string  = obj.vip;
			}else if (index <= 19) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.giai10_21.active = true;
				item.icon_coin.active = true;
				item.top.node.active = true;
				item.top.string = index+1;
				item.nick.node.color = cc.Color.WHITE;
				item.vip.node.color  = cc.Color.WHITE;
				item.vip.string  = obj.vip;
			}else if (index <= 49) {
				item.icon_oto.active = false;
				item.icon_z800.active = false;
				item.icon_sh.active = false;
				item.icon_iphone.active = false;
				item.icon1.active = false;
		        item.icon2.active = false;
		        item.icon3.active = false;
				item.giai21_50.active = true;
				item.icon_coin.active = true;
				item.top.node.active = true;
				item.top.string = index+1;
				item.nick.node.color = cc.Color.WHITE;
				item.vip.node.color  = cc.Color.WHITE;
				item.vip.string  = obj.vip;
			}
			this.content.addChild(item.node);
		}.bind(this));
		this.isLoad = false;
	},
	config: function(data){
		if (data.begin_d === 0) {
			this.time_f.string = 'Sự kiện chưa diễn ra';
			this.time_t.string = 'Sự kiện chưa diễn ra';
			this.time_h.string = 'Sự kiện chưa diễn ra';
		}else{
			this.member.string = data.member;
			this.time_f.string = numberPad(data.begin_d, 2) + '/' + numberPad(data.begin_m, 2);
			let time      = new Date();
			let timeEnd   = new Date(data.begin_y, data.begin_m-1, data.begin_d);
			timeEnd.setDate(timeEnd.getDate()+data.day);
			this.time_t.string = numberPad(timeEnd.getDate(), 2) + '/' + numberPad(timeEnd.getMonth()+1, 2);
			this.timeEnd = new Date(data.begin_y, data.begin_m-1, data.begin_d);
			this.timeEnd.setDate(this.timeEnd.getDate()+data.day+1);
			this.timeEnd = this.timeEnd.getTime();
			let now = new Date().getTime();
			let distance = this.timeEnd-now;
			if (distance < 0) {
				this.distance = true;
				this.time_h.string = 'Sự kiện đã kết thúc';
			}else{
				if (!data.status) {
					this.time_h.string = 'Sự kiện sắp diễn ra!';
				}
			}
			if (data.member > 0) {
				let g1 = this.giai.children[0].children[1].getComponent(cc.Label);
				g1.string = numberCoint(data.top1);
			}
			if (data.member > 1) {
				let g2 = this.giai.children[1].children[1].getComponent(cc.Label);
				g2.string = numberCoint(data.top2);
			}
			if (data.member > 2) {
				let g3 = this.giai.children[2].children[1].getComponent(cc.Label);
				g3.string = numberCoint(data.top3);
			}
			if (data.member > 3) {
				let g4 = this.giai.children[3].children[1].getComponent(cc.Label);
				g4.string = numberCoint(data.top4);
			}
			if (data.member > 4) {
				let g5 = this.giai.children[4].children[1].getComponent(cc.Label);
				g5.string = numberCoint(data.top5);
			}
			if (data.member > 5) {
				let g6 = this.giai.children[5].children[1].getComponent(cc.Label);
				g6.string = numberCoint(data.top6_10);
				if (data.member < 11) {
					let t6 = this.giai.children[5].children[0].getComponent(cc.Label);
					t6.string = '6-' + data.member;
					this.giai.children[6].active = false;
					this.giai.children[7].active = false;
					this.giai.children[8].active = false;
				}
			}
			if (data.member > 10) {
				let g11 = this.giai.children[6].children[1].getComponent(cc.Label);
				g11.string = numberCoint(data.top11_20);
				if (data.member < 21) {
					let t6 = this.giai.children[6].children[0].getComponent(cc.Label);
					t6.string = '11-' + data.member;
					this.giai.children[7].active = false;
					this.giai.children[8].active = false;
				}
			}
			if (data.member > 20) {
				let g21 = this.giai.children[7].children[1].getComponent(cc.Label);
				g21.string = numberCoint(data.top21_50);
				if (data.member < 51) {
					let t6 = this.giai.children[7].children[0].getComponent(cc.Label);
					t6.string = '21-' + data.member;
					this.giai.children[8].active = false;
				}
			}
			if (data.member > 50) {
				let g51 = this.giai.children[8].children[1].getComponent(cc.Label);
				g51.string = numberCoint(data.top51_xxx);
			}
		}
	},
	onHeadSelect: function(event){
		let name = event.target.name;
		this.head.children.forEach(function(head){
			if (head.name === name) {
				head.children[0].active = false;
				head.children[1].active = true;
			}else{
				head.children[0].active = true;
				head.children[1].active = false;
			}
		});
		this.body.children.forEach(function(body){
			if (body.name === name) {
				body.active = true;
			}else{
				body.active = false;
			}
		});
	},
	update (dt) {
		if (this.distance === false) {
			let now = new Date().getTime();
			let distance = this.timeEnd-now;
			if (distance < 0) {
				this.time_h.string = 'Sự kiện đã kết thúc';
			}else{
				// Tính toán số ngày, giờ, phút, giây từ thời gian chênh lệch
				let days    = Math.floor(distance / (1000 * 60 * 60 * 24));
				let hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				let seconds = Math.floor((distance % (1000 * 60)) / 1000);
				let txt = '';
				if (days > 0) {
					txt += days + ' ngày' + "\n";
				}
				txt += numberPad(hours, 2) + ':' + numberPad(minutes, 2) + ':' + numberPad(seconds, 2);
				this.time_h.string = txt;
			}
		}
	},
});
