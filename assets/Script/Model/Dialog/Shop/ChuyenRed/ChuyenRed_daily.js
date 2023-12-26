
cc.Class({
	extends: cc.Component,

	properties: {
        bg: cc.Node,
        STT: cc.Label,
		DaiLy: cc.Label,
		NICKNAME: cc.Label,
		Phone: cc.Label,
        Location: cc.Label,
		FB: "",
	},
	init: function(obj, data, index) {
        this.controll = obj;
		this.STT.string      = index+1;
		this.DaiLy.string = data.name;
		this.NICKNAME.string = data.nickname;
        this.Phone.string = data.phone;
        this.Location.string = data.location;
		this.FB = "https://facebook.com/" + data.fb;
	},
	onChuyenClick: function(){
		cc.RedT.audio.playClick();
		this.controll.selectDaiLy(this);
	},
	onFBClick: function(){
		if(cc.sys.isBrowser ){
			window.open(this.FB, '_blank');
		}else{
			cc.sys.openURL(this.FB)
		}
		
	},
});
