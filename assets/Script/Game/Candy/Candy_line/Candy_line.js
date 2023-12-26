
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        lines:     cc.Node,
        mainLines: cc.Node,
    },
    init: function(obj){
        this.RedT = obj;
        var self = this;;
        Promise.all(this.mainLines.children.map(function(line){
            return line.getComponent('Candy_iLine');
        }))
        .then(result => {
            this.mainLines = result;
        });
        this.selectAll(null, "1");
    },
    onOpen: function(){
        cc.RedT.audio.playClick();
        this.node.active = true;
    },
    onClose: function(){
        cc.RedT.audio.playUnClick();
        if (this.node.active && this.data.length < 1) {
            this.RedT.notice.show({title:'CẢNH BÁO', text:'Chọn ít nhất 1 dòng'});
        }else{
            this.node.active = false;
        }
    },
    select: function(e) {
        var node = e.target;
        if (node.children[0].active) {
            node.children[0].active = false;
            node.children[1].active = true;
        }else{
            node.children[0].active = true;
            node.children[1].active = false;
        }
        this.check();
    },
    check: function() {
        var self = this;
        Promise.all(this.lines.children.map(function(line, index){
            return line.children[1].active ? index+1 : void 0;
        }))
        .then(result => {
            Promise.all(result.filter(function(data){
                return void 0 !== data;
            }))
            .then(data => {
                this.data = data;
                this.RedT.labelLine.string = data.length;
                this.RedT.tong.string = helper.numberWithCommas(data.length * helper.getOnlyNumberInString(this.RedT.bet.string));
            })
        })
    },
    selectChan: function() {
        var self = this;
        Promise.all(this.lines.children.map(function(line, index){
            var i = index+1;
            if (i%2) {
                line.children[0].active = true;
                line.children[1].active = false;
            }else{
                line.children[0].active = false;
                line.children[1].active = true;
                return i;
            }
            return void 0;
        }))
        .then(result => {
            Promise.all(result.filter(function(data){
                return void 0 !== data;
            }))
            .then(data => {
                this.data = data;
                this.RedT.labelLine.string = data.length;
                this.RedT.tong.string = helper.numberWithCommas(data.length * helper.getOnlyNumberInString(this.RedT.bet.string));
            })
        })
    },
    selectLe: function() {
        var self = this;
        Promise.all(this.lines.children.map(function(line, index){
            var i = index+1;
            if (i%2) {
                line.children[0].active = false;
                line.children[1].active = true;
                return i;
            }else{
                line.children[0].active = true;
                line.children[1].active = false;
            }
            return void 0;
        }))
        .then(result => {
            Promise.all(result.filter(function(data){
                return void 0 !== data;
            }))
            .then(data => {
                this.data = data;
                this.RedT.labelLine.string = data.length;
                this.RedT.tong.string = helper.numberWithCommas(data.length * helper.getOnlyNumberInString(this.RedT.bet.string));
            })
        })
    },
    selectAll: function(e, select) {
        var self = this;
        Promise.all(this.lines.children.map(function(line, index){
            var check = select == "1";
            line.children[1].active = check;
            line.children[0].active = !check;
            return check ? index+1 : void 0;
        }))
        .then(result => {
            Promise.all(result.filter(function(data, index){
                return void 0 !== data;
            }))
            .then(data => {
                this.data = data;
                this.RedT.labelLine.string = data.length;
                this.RedT.tong.string = helper.numberWithCommas(data.length * helper.getOnlyNumberInString(this.RedT.bet.string));
            })
        });
    },
});
