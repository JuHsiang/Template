define(['jquery', 'util/message' ,'metronic'], function ($, message, Metronic) {

    var sessionLost = false; // 暂存是否出现过401错误，防止一个动作有多次ajax请求的情况下，出现多次错误提示的情况

    /*Global ajax event hooker
	 ******************************************************/
    $(document).ajaxError(function (evt, xhr) {
        if (xhr.status == 401) {
            if (sessionLost === false) {
                sessionLost = true;
                message.showCaution('登陆超时，或者您在其系统退出了，5秒后刷新当前页面,如果没有刷新，请手动刷新当前页面。', "登陆超时");
                //当session失效后，等待5秒刷新当前页面
                setTimeout("location.reload();", 5000);
            }
        } else {
            try {
                console.log('ajax error ' + xhr.status);
                var json = JSON.parse(xhr.responseText);
                if(json.ExceptionMessage){
                    message.showError(json.ExceptionMessage, "错误");    
                }else{
                    message.showError(json.errorMessage, "错误");
                }
                
            } catch (e) {
                console.log(e);
                message.showError("系统内部错误ajaxError。", "错误");
            }
        }
    });

	$(document).ajaxStart(function() {
		if (typeof(Metronic) != 'undefined') {
			Metronic.blockUI({
				message: '加载中...',
				animate: true,
				target: '.page-content'
			});
		}
	});

	$(document).ajaxStop(function() {
		if (typeof(Metronic) != 'undefined') {
			Metronic.unblockUI(".page-content");
		}

		$.ajaxSetup({ cache: false });
	});
});