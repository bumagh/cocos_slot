
let numberPad = require('Helper').numberPad;

cc.Class({
	extends: cc.Component,

	properties: {
		time_mb: cc.Label,
	},

	update (dt) {
		// Đích đến
		let countDownDate = new Date();
			countDownDate.setHours(18, 0, 0, 0, 0);
		countDownDate = countDownDate.getTime();
		// Lấy thời gian hiện tại
		let now = new Date().getTime();
	 
		// Lấy số thời gian chênh lệch
		let distance = countDownDate - now;
	 
		// HIển thị chuỗi thời gian trong thẻ p
		if (distance < 0) {
			this.time_mb.string = '';
		}else{
			// Tính toán số ngày, giờ, phút, giây từ thời gian chênh lệch
			let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((distance % (1000 * 60)) / 1000);
			this.time_mb.string = numberPad(hours, 2) + ':' + numberPad(minutes, 2) + ':' + numberPad(seconds, 2);
		}
	},
});
