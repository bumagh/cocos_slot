
cc.Class({
	extends: cc.Component,
	properties: {
		messageLabel: cc.Label,
		manifestUrl: {
			default: null,
			type: cc.Asset,
		},
		retryButtonNode:   cc.Node,
		updateProgressBar: cc.Node,
		star:              cc.Node,
		_am: null,
		_updating: !1,
		_canRetry: !1,
		_storagePath: ""
	},
	onLoad: function() {
		this.isLoadScene  = !1;
		this.isLoadConfig = !1;
		this.initOneSign();
		cc.sys.isBrowser ? this.loadAssets() : (this.initHotUpdate(), this.checkUpdate());
		cc.view.enableAutoFullScreen(false);
	},
	initOneSign: function() {
		this.checkPlugin() && (sdkbox.PluginOneSignal.init(),
		sdkbox.PluginOneSignal.setListener({
			onSendTag: function(t, e, i) {},
			onGetTags: function(t) {},
			onIdsAvailable: function(t, e) {},
			onPostNotification: function(t, e) {},
			onNotification: function(t, e, i) {}
		}))
	},
	checkPlugin: function() {
		return "undefined" == typeof sdkbox ? (console.log("sdkbox is undefined"),
		!1) : void 0 !== sdkbox.PluginOneSignal || (console.log("sdkbox.PluginFacebook is undefined"),
		!1)
	},
	loadAssets: function() {
		this.updateProgress(0);
		this.messageLabel.string = "Đang lấy dữ liệu game ...";
		setTimeout(function(){
			this.loadScene();
		}.bind(this), 100);
	},
	loadScene: function() {
		cc.director.preloadScene("MainGame", this.onProgress.bind(this), this.onLoaded.bind(this));
	},
	onProgress: function(completedCount, totalCount){
		// đang tải cảnh
		var RedT = ((completedCount/totalCount)*838)>>0;
		this.updateProgress(RedT);
	},
	onLoaded: function(err, asset){
		// Tải cảnh thành công
		cc.director.loadScene("MainGame");
	},
	onDestroy: function() {
		if (this._updateListener) {
			this._am.setEventCallback(null);
			this._updateListener = null;
		}
	},
	initHotUpdate: function() {
		// this.updateProgress(0);
		// this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "go88-remote-asset";
		// this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
		// this._am.setVerifyCallback(function(t, e) {
		// 	e.compressed;
		// 	return !0
		// }
		// .bind(this));
		// cc.sys.os === cc.sys.OS_ANDROID && this._am.setMaxConcurrentTask(2);
	},
	checkUpdate: function() {
		// if (this._updating) {
		// 	this.messageLabel.string = "Đang kiểm tra phiên bản ...";
		// 	return;
		// }

		// if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
		// 	this._am.loadLocalManifest(this.manifestUrl.nativeUrl);
		// }

		// this._am.setEventCallback(this.checkCb.bind(this));
		// this._am.checkUpdate();
		// this._updating = true;
	},
	hotUpdate: function() {
		// if (this._am && !this._updating) {
		// 	this._am.setEventCallback(this.updateCb.bind(this));

		// 	if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
		// 		this._am.loadLocalManifest(this.manifestUrl.nativeUrl);
		// 	}
		// 	this._failCount = 0;
		// 	this._am.update();
		// 	this._updating = true;
		// }
	},
	retry: function() {
		!this._updating && this._canRetry && (this.retryButtonNode.active = !1,
		this._canRetry = !1,
		this.messageLabel.string = "Thử lại ...",
		this._am.downloadFailedAssets())
	},
	checkCb: function(t) {
		var e = !1
		  , i = !1;
		switch (t.getEventCode()) {
		case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
			this.messageLabel.string = "Không tìm thấy Hot Update ...";
			break;
		case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
		case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
			this.messageLabel.string = "Tải manifest thất bại ...";
			break;
		case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
			this.updateProgress(838);
			this.messageLabel.string = "Phiên bản mới nhất ...";
			e = !0;
			break;
		case jsb.EventAssetsManager.NEW_VERSION_FOUND:
			this.messageLabel.string = "Tìm thấy phiên bản cập nhật ...";
			this.updateProgress(0);
			i = true;
			break;
		default:
			return
		}
		this._am.setEventCallback(null);
		this._checkListener = null;
		this._updating = !1;
		e && this.loadAssets();
		i && (this.hotUpdate());
	},
	updateCb: function(event) {
		var needRestart = false;
		var failed      = false;
		switch (event.getEventCode()) {
		case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
			this.messageLabel.string = "Không tìm thấy Hot Update ...";
			failed = true;
			break;
		case jsb.EventAssetsManager.UPDATE_PROGRESSION:
			var RedT = event.getPercent()*838;
			this.updateProgress(RedT);
			//event.getMessage();
			this.messageLabel.string = "Đang cập nhật ...";
			break;
		case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
		case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
			this.messageLabel.string = "Tải manifest thất bại ...";
			failed = true;
			break;
		case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
			this.updateProgress(838);
			this.messageLabel.string = "Phiên bản mới nhất ...";
			failed = true;
			break;
		case jsb.EventAssetsManager.UPDATE_FINISHED:
			this.messageLabel.string = "Cập nhật thành công";
			needRestart = true;
			break;
		case jsb.EventAssetsManager.UPDATE_FAILED:
			this.messageLabel.string = "Cập nhật thất bại";
			this.retryButtonNode.active = !0;
			this._updating = !1;
			this._canRetry = !0;
			break;
		case jsb.EventAssetsManager.ERROR_UPDATING:
			this.messageLabel.string = "Cập nhật thất bại";
			break;
		case jsb.EventAssetsManager.ERROR_DECOMPRESS:
			this.messageLabel.string = event.getMessage();
		}

		if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
	},
	onRetryClick: function() {
		this.retry()
	},
	versionCompareHandle: function(t, e) {
		console.log("JS Custom Version Compare: version A is " + t + ", version B is " + e),
		console.log("JS Custom Version Compare: version A is " + t + ", version B is " + e);
		for (var i = t.split("."), o = e.split("."), n = 0; n < i.length; ++n) {
			var s = parseInt(i[n])
			  , a = parseInt(o[n] || 0);
			if (s !== a)
				return s - a
		}
		return o.length > i.length ? -1 : 0
	},
	updateProgress: function(progress){
		this.updateProgressBar.width = progress;
		this.star.position           = cc.v2(progress, 0);
	},
});
