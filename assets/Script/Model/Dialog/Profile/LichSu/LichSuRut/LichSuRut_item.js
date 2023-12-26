
cc.Class({
    extends: cc.Component,

    properties: {
        Time:    cc.Label,
        NhaMang: cc.Label,
        MenhGia: cc.Label,
        SoLuong: cc.Label,
        Cost:    cc.Label,
        Status:  cc.Label,
    },
    onInfoClick: function() {
        if (this.info) {
            cc.RedT.inGame.dialog.profile.LichSu.lichSuRut.isView = true;
            cc.RedT.inGame.dialog.the_cao.getData(this.idT);
            cc.RedT.audio.playClick();
        }
    },
});
