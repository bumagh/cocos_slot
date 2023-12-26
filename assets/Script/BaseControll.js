
module.exports = {
	IS_LOGIN:    false,
	IS_SOUND:    true,
	isConnected: false,
	_socket:     null,
	user:        {},
	prefab:      {},
	setting:     {},
	util:        {},
	sslPem: 	 {},
	connect: function(url, path = '/', port = false, ss = false) {
		if (!this.isConnected) {
			const urlGame           = "ws" + (ss ? "" : "") + "://" + url + (!!port ? ":" + port : "") + path;
			if (cc.sys.isBrowser) {
                this._socket = new WebSocket(urlGame);
			} else {
				if (cc.RedT.sslPem) {
					this._socket = new WebSocket(urlGame, [], cc.RedT.sslPem.url);
					this._socket.binaryType = "arraybuffer";
					//console.log("Ket noi bang chung chi ssl");
					//console.log("Connect with Pem", cc.RedT.sslPem.url);
				} else {
					this._socket = new WebSocket(urlGame);
				}
            }
			this._socket.onopen    = this._onSocketConnect;
			this._socket.onclose   = this._onSocketDisconnect;
			this._socket.onmessage = this._onSocketData;
			this._socket.onerror   = this._onSocketError;
			this.isConnected       = !0;
			//console.log("Bat dau ket noi may chu");
			//console.log("start connect", urlGame);
		}
	},
	disconnect: function() {
		//console.log("Hanh dong ngat ket noi");
		//console.log("Action disconnect");
		this.isConnected = !1;
		this._socket.close();
	},
	send: function (message) {
		try {
			if (this._socket && this._socket.readyState === 1) {
				this._socket.send(this._encodeMessage(message));
			} else {
				console.log("connect send message");
			}
		} catch(err) {
			this.inGame.loading.active = false;
			this.inGame.notice.show({title: '', text: 'KHÔNG thể kết nối tới máy chủ...'});
		}
	},
	_decodeMessage: function(message) {
		return JSON.parse(message)
	},
	_encodeMessage: function(message) {
		return JSON.stringify(message)
	},
	_onSocketConnect: function () {
		//console.log("Da ket noi may chu");
		//console.log("Websocket connected");
		
		cc.RedT.isConnected = true;
	},
	_onSocketDisconnect: function(event) {
		cc.RedT.isConnected = false;
		if (cc.RedT.IS_LOGIN) {
			cc.RedT.inGame.signOut();
		}else{
			cc.RedT.inGame.dialog.onCloseDialog();
		}
		//console.log("Ngat ket noi may chu");
		//console.log("Socket disconnect", JSON.stringify(event));
		cc.RedT.reconnect();
	},
	_onSocketData: function(message) {
		var data = message.data;
		data = cc.RedT._decodeMessage(data);
		cc.RedT.inGame && cc.RedT.inGame.onData(data);
	},
	_onSocketError: function (message) {
		//console.log("Loi ket noi May chu");
		//console.log("Socket error", JSON.stringify(message));
	},
	reconnect: function(){
		this.connect('127.0.0.1','/client');
	},
	init: function(){
		cc.view.setResizeCallback(function(){
			if (!!cc.RedT.inGame && !!cc.RedT.inGame.nodeGame) {
				cc.RedT.inGame.nodeGame.x = 0;
				cc.RedT.inGame.nodeGame.y = 0;
			}
		});
		cc.game.on(cc.game.EVENT_HIDE, function(){
			this.timeHide = new Date().getTime();
			this.inGame.newsOn = false;
		}, this);
		cc.game.on(cc.game.EVENT_SHOW, function(){
			this.inGame.newsOn = true;
			setTimeout(function(){
				let check = new Date().getTime();
				check = (check-this.timeHide)/1000;
				cc.director.getActionManager().update(check);
				cc.director.getAnimationManager().update(check);
			}.bind(this), 100);
		}, this);
		this.initPrototype();
	},
	initPrototype: function() {
		String.format || (String.format = function(t){
			var i = Array.prototype.slice.call(arguments, 1);
			return t.replace(/{(\d+)}/g, function(t, e) {
				return void 0 !== i[e] ? i[e] : t
			})
		});
	},
	// Function localStorage
	setAutoLogin: function(bool){
		localStorage.setItem('AUTO_LOGIN', bool)
	},
	isAutoLogin: function(){
		var check = localStorage.getItem('AUTO_LOGIN');
		return check == "true"
	},
	setSoundGame: function(bool){
		localStorage.setItem('SOUND_GAME', bool)
	},
	isSoundGame: function(){
		var check = localStorage.getItem('SOUND_GAME');
		return check == "true"
	},
	setSoundBackground: function(bool){
		localStorage.setItem('SOUND_BACKGROUND', bool)
	},
	isSoundBackground: function(){
		var check = localStorage.getItem('SOUND_BACKGROUND');
		return check == "true"
	},
	userData: function(data){
		if (void 0 !== data.avatar){
			this.user.avatar = data.avatar;
		}
		if (void 0 !== data.rights){
			this.user.rights = data.rights;
		}
		if (void 0 !== data.name){
			this.user.name = data.name;
		}
		if (void 0 !== data.name){
			this.user.name = data.name;
		}
		if (void 0 !== data.red){
			this.user.red = data.red;
		}
		if (void 0 !== data.ketSat){
			this.user.ketSat = data.ketSat;
		}
		if (void 0 !== data.UID){
			this.user.UID = data.UID;
			localStorage.setItem('TH', data.UID);
		}
		if (void 0 !== data.token){
			localStorage.setItem('HT', data.token);
		}
		if (void 0 !== data.phone){
			this.user.phone = data.phone;
			this.user.veryphone = !!data.veryphone;
		}
		if (void 0 !== data.joinedOn){
			this.user.joinedOn = data.joinedOn;
		}
		if (void 0 !== data.security){
			this.user.security = data.security;
		}

		// Level
		if (void 0 !== data.level){
			this.user.level = data.level;
		}
		if (void 0 !== data.vipHT){
			this.user.vipHT = data.vipHT;
		}
		if (void 0 !== data.vipNext){
			this.user.vipNext = data.vipNext;
		}
	},
	CopyToClipboard: function(text){
		if (cc.sys.isBrowser) {
			let el = document.createElement('input');
			el.value = text;
			document.body.appendChild(el);
			el.select();
			el.setSelectionRange(0, 99999);
			document.execCommand('copy');
			el.remove();
		}else{
			jsb.reflection.callStaticMethod('org/cocos2dx/javascript/AppActivity', 'CopyToClipboard', '(Ljava/lang/String;)V', text);
		}
		/**
			ios:
			char *p = (char*) content.data();
			NSString *nsMessage= [[NSString alloc] initWithCString:p encoding:NSUTF8StringEncoding];
			UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
			pasteboard.string = nsMessage;
		*/
	}
}
