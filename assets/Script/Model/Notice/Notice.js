
cc.Class({
	extends: cc.Component,

	properties: {
		nodeButton: {
			default: null,
			type: cc.Node,
		},
		title: {
			default: null,
			type: cc.Label,
		},
		text: {
			default: null,
			type: cc.Label,
		},
		button: {
			default: null,
			type: cc.Label,
		},
	},
	onDisable: function () {
		this.clean();
	},
	show: function(data) {
		this.node.active = true;
		if (void 0 !== data.load) {
			cc.RedT.inGame.loading.active = !1;
		}
		if (void 0 !== data.title) {
			this.title.string = data.title;
		}
		if (void 0 !== data.text) {
			this.text.string = data.text;
		}
		if (void 0 !== data.button) {
			this.text.node.y   = 8;
			this.type          = data.button.type;
			this.button.string = data.button.text;
			this.nodeButton.active = true;
		}else{
			this.nodeButton.active = false;
			this.text.node.y = -14;
		}
	},
	close: function(){
		cc.RedT.audio.playUnClick();
		this.node.active = false;
	},
	onClickButton: function(){
		cc.RedT.audio.playClick();
		switch(this.type) {
			case 'sign_out':
				this.node.active = false;
				cc.RedT.send({user:{signOut:true}});
				cc.RedT.inGame.resetAuth();
				setTimeout(function(){
					cc.RedT._socket.close();
				}, 100);
			break;
			case 'reg_otp':
				this.node.active = false;
				if (cc.RedT.inGame.dialog.objShow != null) {
					cc.RedT.inGame.dialog.profile.node.previous = cc.RedT.inGame.dialog.objShow;
					cc.RedT.inGame.dialog.objShow.active = false;
				}
				cc.RedT.inGame.dialog.showProfile(null, 'BaoMat');
				cc.RedT.inGame.dialog.profile.BaoMat.onSelectHead(null, 'DangKyOTP');
			break;
		}
	},
	clean: function(){
		this.title.string = this.text.string = this.button.string = '';
	},
});
