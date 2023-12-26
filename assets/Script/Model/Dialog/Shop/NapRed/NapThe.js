
var BrowserUtil = require('BrowserUtil');
var helper      = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        header: cc.Node,
        body: cc.Node,
        NhanhMang: {
            default: null,
            type: cc.Label,
        },
        MenhGia: {
            default: null,
            type: cc.Label,
        },
        SoThe: {
            default: null,
            type: cc.EditBox,
        },
        SoSeri: {
            default: null,
            type: cc.EditBox,
        },
        moreNhaMang: cc.Node,
        moreMenhGia: cc.Node,
        scrollviewNhaMang: {
            default: null,
            type: cc.ScrollView,
        },
        scrollviewMenhGia: {
            default: null,
            type: cc.ScrollView,
        },
        bangGia: {
            default: null,
            type: cc.ScrollView,
        },
        prefabLeft: {
            default: null,
            type: cc.Prefab,
        },
        prefabRight: {
            default: null,
            type: cc.Prefab,
        },
        captcha: {
            default: null,
            type: cc.EditBox,
        },
        capchaSprite: cc.Sprite,
    },
    init(){
        this.editboxs = [this.SoThe, this.SoSeri, this.captcha];
        this.keyHandle = function(t) {
            return t.keyCode === cc.macro.KEY.tab ? (this.isTop() && this.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), this.onNapClick(),
                t.preventDefault && t.preventDefault(),
                !1) : void 0
        }.bind(this);
        this.header = this.header.children.map(function(obj) {
            return obj.getComponent('itemContentMenu');
        });
    },
    onEnable: function () {
        cc.sys.isBrowser && this.addEvent();
        this.reCaptcha();
    },
    onDisable: function () {
        this.moreNhaMang.active = this.moreMenhGia.active = false;
        cc.sys.isBrowser && this.removeEvent();
        this.clean();
    },
    addEvent: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1)
        }
    },
    removeEvent: function() {
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1)
        }
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
            case cc.macro.KEY.enter:
                this.isTop() && this.onNapClick();
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
        !t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[0]);
    },
    isTop: function() {
        return !this.moreNhaMang.active && !this.moreMenhGia.active && !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active;
    },
    clean: function(){
        this.SoThe.string = this.SoSeri.string = this.captcha.string = '';
    },
    onNapClick: function(){
        if (this.SoThe.string.length < 11 || this.SoSeri.string.length < 11) {
            cc.RedT.inGame.notice.show({title: "", text: "Thông Tin không hợp lệ..."})
        }else if(helper.isEmpty(this.captcha.string)){
            cc.RedT.inGame.notice.show({title: "", text: "Vui lòng nhập chính xác mã xác nhận."})
        }else{
            cc.RedT.inGame.bgLoading.onData({active: true, text: 'Đang gửi dữ liệu...'});
            cc.RedT.send({shop:{nap_the:{nhamang: this.NhanhMang.string, menhgia: helper.getOnlyNumberInString(this.MenhGia.string), mathe: this.SoThe.string, seri:this.SoSeri.string, captcha: this.captcha.string}}});
        }
    },
    onSelectHead: function(event, name){
        this.header.forEach(function(header) {
            if (header.node.name === name) {
                header.select();
            }else{
                header.unselect();
            }
        });
        this.body.children.forEach(function(body) {
            if (body.name === name) {
                body.active = true;
            }else{
                body.active = false;
            }
        });
    },
    toggleMoreNhaMang: function(){
        this.moreNhaMang.active = !this.moreNhaMang.active;
        this.moreMenhGia.active = !1;
    },
    toggleMoreMenhGia: function(){
        this.moreMenhGia.active = !this.moreMenhGia.active;
    },
    infoSet: function(data, i_arg, i_text, nhamang = false){
        if (data.length > 0) {
            this[i_arg] = data.map(function(obj, index){
                let item = cc.instantiate(this.prefabLeft);
                let componentLeft = item.getComponent('NapRed_itemOne');
                componentLeft.init(this, i_arg, i_text,nhamang?'toggleMoreNhaMang':'toggleMoreMenhGia')
                if (nhamang) {
                    if (index == 0) {
                        componentLeft.background.active = true;
                        this.NhanhMang.string = obj.name
                    }
                    componentLeft.text.string = obj.name;
                    this.scrollviewNhaMang.content.addChild(item);
                }else{
                    let name  = helper.numberWithCommas(obj.name);
                    let value = helper.numberWithCommas(obj.values);
                    if (index == 0) {
                        componentLeft.background.active = true;
                        this.MenhGia.string = name;
                    }
                    componentLeft.text.string = name;
                    this.scrollviewMenhGia.content.addChild(item);
                    let itemR = cc.instantiate(this.prefabRight);
                    itemR = itemR.getComponent('NapRed_itemTT');
                    itemR.init(name, value);
                    itemR.bg.active = index%2;
                    this.bangGia.content.addChild(itemR.node);
                }
                return componentLeft;
            }.bind(this));
        }
    },
    initCaptcha: function(t) {
        var i = this
          , o = new Image;
        o.src = t,
        o.width = 150,
        o.height = 50,
        setTimeout(function() {
            var t = new cc.Texture2D;
            t.initWithElement(o),
            t.handleLoadedTexture();
            var e = new cc.SpriteFrame(t);
            i.capchaSprite.spriteFrame = e
        }, 10)
    },
    reCaptcha: function(){
        cc.RedT.send({captcha:'chargeCard'});
    },
});
