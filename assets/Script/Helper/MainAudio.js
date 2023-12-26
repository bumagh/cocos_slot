
cc.Class({
    extends: cc.Component,
    properties: {
    	audioClick: {
            default: null,
            type: cc.AudioClip
        },
        audioClick2: {
            default: null,
            type: cc.AudioClip
        },
        thongbao_jackpot: {
            default: null,
            type: cc.AudioClip
        },
    	jackpot:  {
            default: null,
            type: cc.AudioClip
        },
        bigWin:   {
            default: null,
            type: cc.AudioClip
        },
        moneywin:   {
            default: null,
            type: cc.AudioClip
        },
        bonus:   {
            default: null,
            type: cc.AudioClip
        },
        megaWin:   {
            default: null,
            type: cc.AudioClip
        },
        winHu:   {
            default: null,
            type: cc.AudioClip
        },

        mainBackground:   {
            default: null,
            type: cc.AudioSource
        },
        fishHall:   {
            default: null,
            type: cc.AudioSource
        },
        fishBG1:   {
            default: null,
            type: cc.AudioSource
        },
        fishBG2:   {
            default: null,
            type: cc.AudioSource
        },

        bgSlot1:   {
            default: null,
            type: cc.AudioSource
        },
        bgSlot2:   {
            default: null,
            type: cc.AudioSource
        },
    },
    _playSFX: function(clip) {
        if (cc.RedT.IS_SOUND){
            cc.audioEngine.playEffect(clip, false);
        }
    },
    // Audio Effect
    playClick: function(){
    	this._playSFX(this.audioClick);
    },
    playUnClick: function(){
        this._playSFX(this.audioClick2);
    },
    playNoticeJackP: function(){
        this._playSFX(this.thongbao_jackpot);
    },
    playEf: function(audio){
        this._playSFX(this[audio]);
    },
});
