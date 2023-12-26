
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		news:    cc.Label,
		text:    cc.Label,
		item:    cc.Prefab,
		content: cc.Node,
		message: '',
	},
	onLoad(){

	},
	onEnable: function () {
		cc.RedT.send({message:{update: true}});
	},
	onData: function(data) {
		if (!!data.list) {
			this.list(data.list);
			this.countNews(data.list);
		}
		if (!!data.text) {
			this.text.string = data.text;
		}
		if (!!data.news) {
			if (data.news > 0) {
				this.news.node.active = true;
				this.news.string = data.news;
			}else{
				this.news.node.active = false;
			}
		}
	},
	list: function(list){
		this.content.destroyAllChildren();
		var self = this;
		Promise.all(list.map(function(mail){
			let item = cc.instantiate(self.item);
			item = item.getComponent('iMessage_item');
			item.init(self);
			item.title.string = mail.title;
			item.time.string  = Helper.getStringDateByTime(mail.time);
			item.bg.active    = !mail.read;
			item.dot.active   = (self.message == mail._id);
			item.message      = mail._id;
			self.content.addChild(item.node);
		}));
	},
	onContentClick: function(obj){
		if (obj.message != this.message) {
			obj.bg.active = false;
			cc.RedT.audio.playClick();
			this.message = obj.message;
			this.getContent();

			obj.dot.active = true;

			Promise.all(this.content.children.filter(function(node){
				if (node != obj.node) {
					node.children[0].active = false;
				}
				return node.children[1].active;
			}))
			.then(result => {
				result = result.length;
				if (result > 0) {
					this.news.node.active = true;
					this.news.string = result;
				}else{
					this.news.node.active = false;
				}
			})
		}
	},
	getContent: function(obj){
		cc.RedT.send({message:{view: this.message}});
	},
	reset: function(){
		this.content.destroyAllChildren();
		this.text.string = this.news.string = "";
		this.news.node.active = false;
	},
	countNews: function(data){
		let count = data.filter(function(obj){
			return !obj.read;
		});
		count = count.length;
		if (count > 0) {
			this.news.node.active = true;
			this.news.string = count;
		}else{
			this.news.node.active = false;
		}
	},
});
