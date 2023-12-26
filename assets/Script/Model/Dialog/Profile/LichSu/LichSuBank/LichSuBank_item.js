
cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        time: {
            default: null,
            type:    cc.Label,
        },
        bank: {
            default: null,
            type:    cc.Label,
        },
        act: {
            default: null,
            type:    cc.Label,
        },
        money: {
            default: null,
            type:    cc.Label,
        },
        info: {
            default: null,
            type:    cc.Label,
        },
        status: {
            default: null,
            type:    cc.Label,
        },
    },
});
