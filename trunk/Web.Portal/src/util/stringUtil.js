define(function() {
	
	var formatString = function() {
		if (arguments.length < 1) {
			return null;
		}

		var str = arguments[0];

		for (var i = 1; i < arguments.length; i++) {
			var placeHolder = '{' + (i - 1) + '}';
			str = str.replace(placeHolder, arguments[i]);
		}

		return str;
	};

	return {
		formatString: formatString
	};
});