
cc.Class({
    extends: cc.Component,

    properties: {
        Time:         cc.Label,
        uFrom:        cc.Label,
        uTo:          cc.Label,
        Chuyen:       cc.Label,
        Nhan:         cc.Label,
        nodeMesenger: cc.Node,
    },
    onShowMesenger: function() {
        cc.RedT.inGame.notice.show({title: "LỜI NHẮN", text: this.mesenger});
    },
});
