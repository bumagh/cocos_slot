
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		date_count: 0,
		date:     cc.Label,
		datePre:  cc.Label,
		dateNext: cc.Label,

		gdb:      cc.Label,
		g1:       cc.Label,
		g2: {
			default: [],
			type: cc.Label,
		},
		g3: {
			default: [],
			type: cc.Label,
		},
		g4: {
			default: [],
			type: cc.Label,
		},
		g5: {
			default: [],
			type: cc.Label,
		},
		g6: {
			default: [],
			type: cc.Label,
		},
		g7: {
			default: [],
			type: cc.Label,
		},

		tk0: cc.Label,
		tk1: cc.Label,
		tk2: cc.Label,
		tk3: cc.Label,
		tk4: cc.Label,
		tk5: cc.Label,
		tk6: cc.Label,
		tk7: cc.Label,
		tk8: cc.Label,
		tk9: cc.Label,
	},

	// LIFE-CYCLE CALLBACKS:
	onLoad () {
		let date = new Date();
		this.date.string = Helper.numberPad(date.getDate(), 2) + '/' + Helper.numberPad(date.getMonth()+1, 2) + '/' + date.getFullYear();
		this.get_data();

		date = new Date();
		date.setDate(date.getDate()+1);
		this.dateNext.string = Helper.numberPad(date.getDate(), 2) + '/' + Helper.numberPad(date.getMonth()+1, 2) + '/' + date.getFullYear();

		date = new Date();
		date.setDate(date.getDate()-1);
		this.datePre.string = Helper.numberPad(date.getDate(), 2) + '/' + Helper.numberPad(date.getMonth()+1, 2) + '/' + date.getFullYear();
	},
	get_data: function(){
		cc.RedT.send({g:{xs:{mb:{kq:this.date.string}}}});
	},
	onDatePre:function(){
		this.date_count--;
		this.onDateChanget();
	},
	onDateNext:function(){
		this.date_count++;
		this.onDateChanget();
	},
	onDateChanget:function(){
		this.reset();
		let date = new Date();
		date.setDate(date.getDate()+this.date_count);
		this.date.string = Helper.numberPad(date.getDate(), 2) + '/' + Helper.numberPad(date.getMonth()+1, 2) + '/' + date.getFullYear();
		this.get_data();

		date = new Date();
		date.setDate(date.getDate()+this.date_count+1);
		this.dateNext.string = Helper.numberPad(date.getDate(), 2) + '/' + Helper.numberPad(date.getMonth()+1, 2) + '/' + date.getFullYear();

		date = new Date();
		date.setDate(date.getDate()+this.date_count-1);
		this.datePre.string = Helper.numberPad(date.getDate(), 2) + '/' + Helper.numberPad(date.getMonth()+1, 2) + '/' + date.getFullYear();
	},
	reset: function(){
		this.gdb.string = '-----';
		this.g1.string = '-----';
		this.g2.forEach(function(obj){
			obj.string = '-----';
		});
		this.g3.forEach(function(obj){
			obj.string = '-----';
		});
		this.g4.forEach(function(obj){
			obj.string = '----';
		});
		this.g5.forEach(function(obj){
			obj.string = '----';
		});
		this.g6.forEach(function(obj){
			obj.string = '---';
		});
		this.g7.forEach(function(obj){
			obj.string = '--';
		});
		this.tk0.string = '-';
		this.tk1.string = '-';
		this.tk2.string = '-';
		this.tk3.string = '-';
		this.tk4.string = '-';
		this.tk5.string = '-';
		this.tk6.string = '-';
		this.tk7.string = '-';
		this.tk8.string = '-';
		this.tk9.string = '-';
	},
	onData: function(data) {
		console.log(data);
		// Ket Qua
		if (!!data.gdb) {
			this.gdb.string = data.gdb;
		}
		if (!!data.g1) {
			this.g1.string = data.g1;
		}
		// this.g2.forEach(function(obj, i){
		// 	if (data.g2[i]) {
		// 		obj.string = data.g2[i];
		// 	}
		// });
		// this.g3.forEach(function(obj, i){
		// 	if (data.g3[i]) {
		// 		obj.string = data.g3[i];
		// 	}
		// });
		// this.g4.forEach(function(obj, i){
		// 	if (data.g4[i]) {
		// 		obj.string = data.g4[i];
		// 	}
		// });
		// this.g5.forEach(function(obj, i){
		// 	if (data.g5[i]) {
		// 		obj.string = data.g5[i];
		// 	}
		// });
		// this.g6.forEach(function(obj, i){
		// 	if (data.g6[i]) {
		// 		obj.string = data.g6[i];
		// 	}
		// });
		// this.g7.forEach(function(obj, i){
		// 	if (data.g7[i]) {
		// 		obj.string = data.g7[i];
		// 	}
		// });
		var _data = {
			g2:[],
			g3:[],
			g4:[],
			g5:[],
			g6:[],
			g7:[],
		};

		if(!!data.g2){
			console.log(data.g2);
			 
			var _g2 = [data.g2[0].substring(0,5),data.g2[0].substring(5,10)];
			this.g2.forEach(function(obj, i){
				if (_g2[i]) {
					obj.string = _g2[i];
				}
			});
			_data.g2 = _g2;
			var g3i = 0;
			var g3n = 5;

			this.g3.forEach(function(obj, i){
				var val = data.g2[1].substring(g3i++*g3n,g3i*g3n);
				_data.g3.push(val);
				if (val) {
					obj.string = val;
				}
			});

		}
	
		if(!!data.g3){
			var g4i = 0;
			var g4n = 4;
			this.g4.forEach(function(obj, i){
				var val = data.g3[0].substring(g4i++*g4n,g4i*g4n);
				_data.g4.push(val);
				if (val) {
					obj.string = val;
				}
			});
			var g5i = 0;
			var g5n = 4;
			this.g5.forEach(function(obj, i){
				var val = data.g3[1].substring(g5i++*g5n,g5i*g5n);
				_data.g5.push(val);
				if (val) {
					obj.string = val;
				}
			});
			var g6i = 0;
			var g6n = 3;
			this.g6.forEach(function(obj, i){
				var val = data.g3[2].substring(g6i++*g6n,g6i*g6n);
				_data.g6.push(val);
				if (val) {
					obj.string = val;
				}
			});
			var g7i = 0;
			var g7n = 2;
			this.g7.forEach(function(obj, i){
				var val = data.g3[3].substring(g7i++*g7n,g7i*g7n);
				_data.g7.push(val);
				if (val) {
					obj.string = val;
				}
			});
		}
		// Thong ke
		// var lo2so = [data.g1.substring(data.g1.length-2), data.gdb.substring(data.gdb.length-2)].concat(
		// 	data.g2.map(function(obj){
		// 		return obj.substring(obj.length-2);
		// 	}),
		// 	data.g3.map(function(obj){
		// 		return obj.substring(obj.length-2);
		// 	}),
		// 	data.g4.map(function(obj){
		// 		return obj.substring(obj.length-2);
		// 	}),
		// 	data.g5.map(function(obj){
		// 		return obj.substring(obj.length-2);
		// 	}),
		// 	data.g6.map(function(obj){
		// 		return obj.substring(obj.length-2);
		// 	}),
		// 	data.g7.map(function(obj){
		// 		return obj.substring(obj.length-2);
		// 	}),
		// );
		var lo2so = [data.g1.substring(data.g1.length-2), data.gdb.substring(data.gdb.length-2)].concat(
			_data.g2.map(function(obj){
				return obj.substring(obj.length-2);
			}),
			_data.g3.map(function(obj){
				return obj.substring(obj.length-2);
			}),
			_data.g4.map(function(obj){
				return obj.substring(obj.length-2);
			}),
			_data.g5.map(function(obj){
				return obj.substring(obj.length-2);
			}),
			_data.g6.map(function(obj){
				return obj.substring(obj.length-2);
			}),
			_data.g7.map(function(obj){
				return obj.substring(obj.length-2);
			}),
		);
		var d0 = lo2so.filter(function(obj){
			return (obj.charAt() === '0')
		});
		var d1 = lo2so.filter(function(obj){
			return (obj.charAt() === '1')
		});
		var d2 = lo2so.filter(function(obj){
			return (obj.charAt() === '2')
		});
		var d3 = lo2so.filter(function(obj){
			return (obj.charAt() === '3')
		});
		var d4 = lo2so.filter(function(obj){
			return (obj.charAt() === '4')
		});
		var d5 = lo2so.filter(function(obj){
			return (obj.charAt() === '5')
		});
		var d6 = lo2so.filter(function(obj){
			return (obj.charAt() === '6')
		});
		var d7 = lo2so.filter(function(obj){
			return (obj.charAt() === '7')
		});
		var d8 = lo2so.filter(function(obj){
			return (obj.charAt() === '8')
		});
		var d9 = lo2so.filter(function(obj){
			return (obj.charAt() === '9')
		});

		if (d0.length > 0) {
			this.tk0.string = d0.join(', ');
		}
		if (d1.length > 0) {
			this.tk1.string = d1.join(', ');
		}
		if (d2.length > 0) {
			this.tk2.string = d2.join(', ');
		}
		if (d3.length > 0) {
			this.tk3.string = d3.join(', ');
		}
		if (d4.length > 0) {
			this.tk4.string = d4.join(', ');
		}
		if (d5.length > 0) {
			this.tk5.string = d5.join(', ');
		}
		if (d6.length > 0) {
			this.tk6.string = d6.join(', ');
		}
		if (d7.length > 0) {
			this.tk7.string = d7.join(', ');
		}
		if (d8.length > 0) {
			this.tk8.string = d8.join(', ');
		}
		if (d9.length > 0) {
			this.tk9.string = d9.join(', ');
		}
	},
});
