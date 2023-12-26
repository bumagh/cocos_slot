
cc.Class({
    extends: cc.Component,
    onEnable: function(){
        this.node.on('touchstart', function(event){
            event.stopPropagation()
        })
        this.node.on('touchend', function(event){
            event.stopPropagation()
        })
    },

    onDisable: function(){
        this.node.off('touchstart', function(event){
            event.stopPropagation();
        })
        this.node.off('touchend', function(event){
            event.stopPropagation();
        })
    }
});
