
cc.Class({
    extends: cc.Component,

    properties: {
        header: cc.Node,
        body:   cc.Node,
    },
    onLoad () {
    },
    onSelectType: function(event) {
        let name = event.target.name;
        this.header.children.forEach(function(obj){
            if (obj.name === name) {
                obj.pauseSystemEvents();
                obj.opacity = 255;
            }else{
                obj.resumeSystemEvents();
                obj.opacity = 99;
            }
        });
        this.body.children.forEach(function(obj){
            if (obj.name === name) {
                obj.active = true;
            }else{
                obj.active = false;
            }
        });
    },
});
