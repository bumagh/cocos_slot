
cc.Class({
    extends: cc.Component,

    onLoad () {
        cc.RedT.setting.popupEvent = cc.RedT.setting.popupEvent || {};
        this.ttOffset     = null;
        this.ttOffset2    = null;
        if (void 0 !== cc.RedT.setting.popupEvent.position) {
            this.node.position = cc.RedT.setting.popupEvent.position;
        }
    },
    onEnable: function () {
        this.node.on(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
        this.node.on(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
    //    this.node.on(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
    },
    onDisable: function () {
        this.node.off(cc.Node.EventType.TOUCH_START,  this.eventStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,   this.eventMove,  this);
        this.node.off(cc.Node.EventType.TOUCH_END,    this.eventEnd,   this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd,   this);
    //    this.node.off(cc.Node.EventType.MOUSE_ENTER,  this.setTop,     this);
    },
    eventStart: function(e){
        this.setTop();
        this.ttOffset  = cc.v2(e.touch.getLocationX()-this.node.position.x, e.touch.getLocationY()-this.node.position.y)
        this.ttOffset2 = cc.v2(e.touch.getLocationX()-(e.touch.getLocationX()-this.node.position.x), e.touch.getLocationY()-(e.touch.getLocationY()-this.node.position.y))
    },
    eventMove: function(e){
        let x = e.touch.getLocationX()-this.ttOffset.x;
        let y = e.touch.getLocationY()-this.ttOffset.y;
        if (Math.abs(x) > cc.RedT.inGame.node.width/2-100) {
            x = x < 0 ? (-cc.RedT.inGame.node.width/2)+100 : (cc.RedT.inGame.node.width/2)-100;
        }
        if (Math.abs(y) > cc.RedT.inGame.node.height/2-50) {
            y = y < 0 ? (-cc.RedT.inGame.node.height/2)+50 : (cc.RedT.inGame.node.height/2)-50;
        }
        this.node.position = cc.v2(x, y);
    },
    eventEnd: function(e){
        cc.RedT.setting.popupEvent.position = this.node.position;
        this.xChanger = this.ttOffset2.x-(e.touch.getLocationX()-this.ttOffset.x)
        this.yChanger = this.ttOffset2.y-(e.touch.getLocationY()-this.ttOffset.y)
        if (this.xChanger <  5 &&
            this.xChanger > -5 &&
            this.yChanger <  5 &&
            this.yChanger > -5) {
            this.show();
        }
    },
    setTop: function(){
        this.node.parent.insertChild(this.node);
    },
    show: function(){
        if (cc.RedT.IS_LOGIN){
            cc.RedT.MiniPanel.Dialog.showVipPoint();
        }else{
            cc.RedT.inGame.dialog.showSignIn();
        }
    },
});
