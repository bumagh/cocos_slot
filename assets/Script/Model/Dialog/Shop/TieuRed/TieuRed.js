
cc.Class({
    extends: cc.Component,

    properties: {
        header: {
            default: null,
            type: cc.Node,
        },
        MuaTheCao: {
            default: null,
            type: cc.Node,
        },
    },
    init(){
        this.MuaTheCao = this.MuaTheCao.getComponent('shopMuaTheCao');
        this.MuaTheCao.init();
        this.body = [this.MuaTheCao];
        Promise.all(this.header.children.map(function(obj) {
            return obj.getComponent('itemContentMenu');
        }))
        .then(result => {
            this.header = result;
        });
    },
    onSelectHead: function(event, name){
        Promise.all(this.header.map(function(header) {
            if (header.node.name == name) {
                header.select();
            }else{
                header.unselect();
            }
        }));
        Promise.all(this.body.map(function(body) {
            if (body.node.name == name) {
                body.node.active = true;
            }else{
                body.node.active = false;
            }
        }));
    },
});
