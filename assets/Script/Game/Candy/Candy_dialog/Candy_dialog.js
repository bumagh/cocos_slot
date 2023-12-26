
var history = require('Candy_history'),
    top     = require('Candy_top');

cc.Class({
    extends: cc.Component,
    properties: {
        history: history,
        top:     top,
        help:    cc.Node,
    },
    init: function() {
        this.actionShow = cc.spawn(cc.scaleTo(0.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(0.5, 255));
        this.objShow    = null;
        this.objTmp     = null;
    },

    onClickBack: function(){
        cc.RedT.audio.playUnClick();
        this.onBack();
    },
    onBack: function(){
        if(this.objShow != null){
            if(void 0 == this.objShow.previous || null == this.objShow.previous){
                this.objShow.active = false;
                this.node.active    = false;
                this.objShow        = null;
            }else{
                this.objTmp              = this.objShow;
                this.objShow             = this.objShow.previous;
                this.objTmp.previous     = null;
                this.objTmp.active       = false;
                this.objShow.active      = true;
                this.objTmp              = null;
            }
        }else{
            this.node.active = false;
        }
    },
    onClosePrevious: function(obj){
        if(void 0 !== obj.previous && null !== obj.previous){
            this.onClosePrevious(obj.previous);
            delete obj.previous;
            //obj.previous = null;
        }
        obj.active = false;
    },
    onCloseDialog: function(){
        if(this.objShow != null){
            if(void 0 == this.objShow.previous || null == this.objShow.previous){
                this.objShow.active = this.node.active = false;
                this.objShow        = null;
            }else{
                this.onClosePrevious(this.objShow.previous);
                this.objShow.active          = this.node.active = false;
                delete this.objShow.previous;
                //this.objShow.previous        = null;
                this.objShow                 = null;
            }
        }else{
            this.node.active = false
        }
    },

    resetSizeDialog: function(node){
        node.stopAllActions();
        node.scale   = 0.5;
        node.opacity = 0;
    },

    /**
     * Function Show Dialog
    */
    showHistory: function(){
        this.node.active    = this.history.node.active = true;
        this.objShow        = this.history.node;
    },
    showTop: function(){
        this.node.active = this.top.node.active = true;
        this.objShow     = this.top.node;
    },
    showHelp: function(){
        this.node.active = this.help.active = true;
        this.objShow     = this.help;
    },
});
