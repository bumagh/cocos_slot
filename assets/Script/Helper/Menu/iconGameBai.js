
cc.Class({
    extends: cc.Component,

    properties: {
        title: "",
        game:  "",
        table2: true,
    },
    openGame: function(){
        if (cc.RedT.IS_LOGIN){
            cc.RedT.inGame.MenuRoom.openGame(this);
        } else {
            cc.RedT.inGame.dialog.showSignIn();
        }
    },
});
