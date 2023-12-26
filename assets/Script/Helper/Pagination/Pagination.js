
cc.Class({
	extends: cc.Component,

	properties: {
		nodeFirst:    cc.Node,
		nodePrevious: cc.Node,
		nodePage1:    cc.Node,
		nodePage2:    cc.Node,
		nodePage3:    cc.Node,
		nodePage4:    cc.Node,
		nodePage5:    cc.Node,
		nodeNext:     cc.Node,
		nodeLast:     cc.Node,

		page:   1,
		kmess:  10,
		totall: 0,
	},

	// LIFE-CYCLE CALLBACKS:

	init: function(obj) {
		this.controll = obj

		this.objSelect = null

		this.nodePage1 = this.nodePage1.getComponent('Pagination_item')
		this.nodePage2 = this.nodePage2.getComponent('Pagination_item')
		this.nodePage3 = this.nodePage3.getComponent('Pagination_item')
		this.nodePage4 = this.nodePage4.getComponent('Pagination_item')
		this.nodePage5 = this.nodePage5.getComponent('Pagination_item')

		this.arrO = [this.nodePage1, this.nodePage2, this.nodePage3, this.nodePage4, this.nodePage5]
	},

	select: function(obj){
		obj.number.string     = this.page
		obj.number.node.color = cc.Color.BLACK

		obj.bg.active = false
    	obj.bg_select.active = true

    	this.objSelect = obj

    	obj.node.pauseSystemEvents()
    	return void 0;
	},
	unSelect: function(obj, page){
		obj.number.string     = page
		obj.number.node.color = cc.Color.WHITE

		obj.bg.active = true
    	obj.bg_select.active = false
    	obj.node.page = page

    	obj.node.resumeSystemEvents()
	},

	onSet: function(page, kmess, totall){
		var self    = this
		this.page   = page
		this.kmess  = kmess
		this.totall = totall
		this.totalPage = Math.ceil(this.totall/this.kmess)
		this.pageRed   = this.totalPage-this.page;

		if (totall > 0) {
			this.node.active = true
			Promise.all(this.arrO.map(function(obj, i){

				if (self.totalPage > 4) {
					obj.node.active = true
				}else{
					if(i < self.totalPage) {
						obj.node.active = true
					}else{
						obj.node.active = false
					}
				}

				if (self.page > 2) {
					self.nodeFirst.active = true
				}else{
					self.nodeFirst.active = false
				}
				if (self.pageRed > 1) {
					self.nodeLast.active = true
				}else{
					self.nodeLast.active = false
				}

				if (self.page > 1) {
					self.nodePrevious.active = true
				}else{
					self.nodePrevious.active = false
				}
				if (self.pageRed > 0) {
					self.nodeNext.active = true
				}else{
					self.nodeNext.active = false
				}

				if (i == 0 && self.page == 1) {
					return self.select(obj)
				}else if (i == 1 && self.page == 2) {
					return self.select(obj)
				}else if (i == 2 && (self.page == 3 || (self.totalPage > 5 && self.page !== 1 && self.page !== 2 && self.totalPage-2 >= self.page))) {
					return self.select(obj)
				}else if (i == 3 && ((self.totalPage == 4 && self.page == 4) || (self.totalPage > 4 && (self.totalPage-1 == self.page)))) {
					return self.select(obj)
				}else if (i == 4 && self.totalPage > 4 && self.page == self.totalPage) {
					return self.select(obj)
				}
			}))
			.then(va=>{
				Promise.all(this.arrO.map(function(obj, i){
					if (obj !== self.objSelect) {
						if (i == 0) {
							if (self.objSelect.node.name == 'page2') {
								self.unSelect(obj, self.objSelect.number.string-1)
							}else if (self.objSelect.node.name == 'page3') {
								self.unSelect(obj, self.objSelect.number.string-2)
							}else if (self.objSelect.node.name == 'page4') {
								self.unSelect(obj, self.objSelect.number.string-3)
							}else if (self.objSelect.node.name == 'page5') {
								self.unSelect(obj, self.objSelect.number.string-4)
							}
						}else if (i == 1) {
							if (self.objSelect.node.name == 'page1') {
								self.unSelect(obj, self.objSelect.number.string*1+1)
							}else if (self.objSelect.node.name == 'page3') {
								self.unSelect(obj, self.objSelect.number.string-1)
							}else if (self.objSelect.node.name == 'page4') {
								self.unSelect(obj, self.objSelect.number.string-2)
							}else if (self.objSelect.node.name == 'page5') {
								self.unSelect(obj, self.objSelect.number.string-3)
							}
						}else if (i == 2) {
							if (self.objSelect.node.name == 'page1') {
								self.unSelect(obj, self.objSelect.number.string*1+2)
							}else if (self.objSelect.node.name == 'page2') {
								self.unSelect(obj, self.objSelect.number.string*1+1)
							}else if (self.objSelect.node.name == 'page4') {
								self.unSelect(obj, self.objSelect.number.string-1)
							}else if (self.objSelect.node.name == 'page5') {
								self.unSelect(obj, self.objSelect.number.string-2)
							}
						}else if (i == 3) {
							if (self.objSelect.node.name == 'page1') {
								self.unSelect(obj, self.objSelect.number.string*1+3)
							}else if (self.objSelect.node.name == 'page2') {
								self.unSelect(obj, self.objSelect.number.string*1+2)
							}else if (self.objSelect.node.name == 'page3') {
								self.unSelect(obj, self.objSelect.number.string*1+1)
							}else if (self.objSelect.node.name == 'page5') {
								self.unSelect(obj, self.objSelect.number.string-1)
							}
						}else if (i == 4) {
							if (self.objSelect.node.name == 'page1') {
								self.unSelect(obj, self.objSelect.number.string*1+4)
							}else if (self.objSelect.node.name == 'page2') {
								self.unSelect(obj, self.objSelect.number.string*1+3)
							}else if (self.objSelect.node.name == 'page3') {
								self.unSelect(obj, self.objSelect.number.string*1+2)
							}else if (self.objSelect.node.name == 'page4') {
								self.unSelect(obj, self.objSelect.number.string*1+1)
							}
						}
					}
				}))
			})
		}else{
			this.node.active = false
		}
	},

	onClickFirst: function(){
		this.controll.get_data();
		cc.RedT.audio.playClick();
	},
	onClickPrevious: function(){
		var page = this.objSelect.number.string-1;
		page > 0 && this.controll.get_data(page);
		cc.RedT.audio.playClick();
	},
	onClickPage: function(event){
		this.controll.get_data(event.target.page);
		cc.RedT.audio.playClick();
	},
	onClickNext: function(){
		var page   = this.objSelect.number.string*1+1;
		var totall = Math.ceil(this.totall/this.kmess);
		page <= totall && this.controll.get_data(page);
		cc.RedT.audio.playClick();
	},
	onClickLast: function(){
		this.controll.get_data(Math.ceil(this.totall/this.kmess));
		cc.RedT.audio.playClick();
	},

});
