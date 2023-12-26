
cc.Class({
    extends: cc.Component,

    properties: {
        bg:    cc.Node,
        time:  cc.Label,
        phien: cc.Label,
        thang: cc.Label,
        kq: {
            default: [],
            type: cc.Sprite,
        },
        datLabel: {
            default: [],
            type: cc.Label,
        },
    },
});
