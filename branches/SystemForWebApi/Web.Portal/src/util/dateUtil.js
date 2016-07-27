define([], function() {
	var get_current_time = function() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;

		var d = date.getDate();
		var day = date.getDay();
		var days = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
		var h = date.getHours();

		if (d < 10) {
			d = "0" + d;
		}

		if (month < 10) {
			month = "0" + month;
		}

		if (h < 10) {
			h = "0" + h;
		}

		var m = date.getMinutes();

		if (m < 10) {
			m = "0" + m;
		}

		var s = date.getSeconds();

		if (s < 10) {
			s = "0" + s;
		}

		var result = {};
		result.dateDisplay = year + '年' + month + '月' + d + '日';
		result.timeDisplay = days[day] + ' ' + h + ':' + m + ':' + s;
		result.day = date.getDate();
		result.weekDay = days[day];
		result.month = date.getMonth() + 1;

		return result;
	};

	return {
		getCurrentTime: get_current_time
	};
});