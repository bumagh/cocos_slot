
var MienBac = require('kq_xsmb');

cc.Class({
    extends: cc.Component,

    properties: {
        MienBac: MienBac,
    },
    onData: function(data) {
        if (void 0 !== data.mb) {
            this.MienBac.onData(data.mb);
        }
    },
});
