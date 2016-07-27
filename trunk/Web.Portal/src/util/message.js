define(['jquery.toastr', 'css!plugin/toastr/toastr.min'], function(toastr) {

	/* Init toaster options
	 ************************************************************/
	if (typeof(toastr) !== 'undefined') {
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"positionClass": "toast-top-right",
			//"positionClass": "toast-top-center",
			"onclick": null,
			"showDuration": "2000",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		};
	}

	/* Show message box. 
	 *  Example:
	 *  wikitec.showSuccess("done!", "Tip");
	 ************************************************************/
	var showMessage = function(msg, title, type) {
		var messageTitle = title || '提示';
		var messageTypE = type || 'info';

		if (typeof(toastr) !== 'undefined') {
			toastr[messageTypE](msg, messageTitle);
		} else {
			alert(msg);
		}
	};

	var showSuccess = function(msg, title) {
		showMessage(msg, title, "success");
	};

	var showError = function(msg, title) {
		showMessage(msg, title, "error");
	};

	var showInfo = function(msg, title) {
		showMessage(msg, title, "info");
	};

	var showWarning = function(msg, title) {
		showMessage(msg, title, "warning");
	};

	var showCaution = function (msg, title) {
		var messageTitle = title || '提示';

		if (typeof(toastr) !== 'undefined') {
			toastr.error(msg, messageTitle, {
				positionClass: "toast-top-full-width",
				showDuration: "5000",
			});
		} 
	};

	/* Confirm message, TODO: use other method maybe later.
	 *  Example:
	 *  wikitec.confirm("are u sure to delete?", function(){
	 *		service.deleted();
	 *	});
	 ************************************************************/
	var showConfirm = function(msg, yesCbk, noCbk) {
		if (confirm(msg)) {
			yesCbk();
		}else if(noCbk){
			noCbk();
		}
	};

	return {
		showMessage: showMessage,
		showSuccess: showSuccess,
		showError: showError,
		showInfo: showInfo,
		showWarning: showWarning,
		confirm: showConfirm,
		showCaution: showCaution
	};
});