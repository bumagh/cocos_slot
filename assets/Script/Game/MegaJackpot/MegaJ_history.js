
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		page:    cc.Prefab,
		header:  cc.Node,
		body:    cc.Node,
		quay:    cc.Node,
		nhanve:  cc.Node,
		select:  '',
	},
	init: function(obj){
		this.RedT = obj;
	},
	onLoad () {
		this.page = cc.instantiate(this.page);
		this.page.y = -238;
		this.node.addChild(this.page);
		this.page = this.page.getComponent('Pagination');

		this.quay = this.quay.children.map(function(obj){
			return obj.getComponent('MegaJ_history_item');
		});

		this.nhanve = this.nhanve.children.map(function(obj){
			return obj.getComponent('MegaJ_top_item');
		});

		this.header = this.header.children.map(function(obj){
			return obj.getComponent('itemContentMenu');
		});

		this.page.init(this);
	},
	headSelect: function(event) {
		this.select = event.target.name;

		this.header.forEach(function(head){
			if (head.node.name === this.select) {
				head.select();
			}else{
				head.unselect();
			}
		}.bind(this));

		this.body.children.forEach(function(body){
			if (body.name === this.select) {
				body.active = true;
			}else{
				body.active = false;
			}
		}.bind(this));

		this.get_data();
	},
	onEnable: function() {
		this.get_data();
	},
	get_data: function(page = 1){
		if (!this.RedT.isSpin) {
			let data = {};
			data[this.select] = page;
			cc.RedT.send({g:{megaj:{history:data}}});
		}
	},
	onData: function(data){
		if (!!data.quay) {
			this.quayData(data.quay);
		}
		if (!!data.nhanve) {
			this.nhanveData(data.nhanve);
		}
	},
	quayData: function(data){
        this.page.onSet(data.page, data.kmess, data.total);

        this.quay.forEach(function(obj, i){
        	let dataT = data.data[i];
        	if (void 0 !== dataT) {
        		obj.node.active = true;
        		obj.bg.active = i%2;
        		obj.time.string   = Helper.getStringDateByTime(dataT.time);
        		obj.game.string   = dataT.room === 100 ? 'Thanh đồng' : (dataT.room === 100 ? 'Bạch kim' : 'Hoàng kim');
        		obj.kq.string     = dataT.kq === 5 ? 'Thêm lượt' : (dataT.kq === 7 ? '50%' : Helper.numberWithCommas(dataT.win));
        		obj.thuong.string = Helper.numberWithCommas(dataT.win);
        	}else{
        		obj.node.active = false;
        	}
        }.bind(this));
	},
	nhanveData: function(data){
		this.page.onSet(data.page, data.kmess, data.total);

        this.nhanve.forEach(function(obj, i){
        	let dataT = data.data[i];
        	if (void 0 !== dataT) {
        		obj.node.active   = true;
        		obj.bg.active     = i%2;
        		obj.time.string   = Helper.getStringDateByTime(dataT.time);
        		obj.game.string   = this.nameGame(dataT.to);
        		obj.room.string   = dataT.room === 100 ? 'Thanh đồng' : (dataT.room === 100 ? 'Bạch kim' : 'Hoàng kim');
        		obj.sl.string     = dataT.sl;
        		obj.status.string = dataT.status ? 'Đã nhận': 'Chưa nhận';
        		let temp = obj.status.node;
                if (dataT.status) {
                    temp.color = temp.color.fromHEX('#248A0A');
                }else{
                    temp.color = temp.color.fromHEX('#BB0B0B');
                }
        	}else{
        		obj.node.active = false;
        	}
        }.bind(this));
	},
	nameGame: function(data){
		switch(data) {
		  	case 100:
		  		return 'PUBG';
		    	break;
		  	case 101:
		  		return 'Candy';
		    	break;
		  	case 102:
		  		return 'Panda';
		    	break;
		  	case 103:
		  		return 'Đập Hũ';
		    	break;
		  	case 104:
		  		return 'Mini 3Cây';
		    	break;
		  	case 105:
		  		return 'Ngộ Không';
		    	break;
		  	case 106:
		  		return 'Mini Poker';
		    	break;
		}
	},
});
