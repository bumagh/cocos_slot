
cc.Class({
    extends: cc.Component,

    properties: {
        bg:    cc.Node,
        time:  cc.Label,
        phien: cc.Label,
        bet:   cc.Label,
        win:   cc.Label,
        card: {
            default: [],
            type: cc.Sprite,
        }
    },
});
