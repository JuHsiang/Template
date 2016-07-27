define(function () {

    /**
    * 获取URL参数的值
    * name:参数名称
    */
    var queryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var href = window.location.href;
        if (href.indexOf('?') >= 0) {
            var list = href.split('?');
            if (list.length > 2) {
                var paramaterUrl = href.split('?')[2];
                var r = paramaterUrl.match(reg);
                if (r != null) return (r[2]);
                return null;
            }
            return null;
        }
        else {
            return null;
        }
    };

    /**
    * 删除url指定名称的参数
    * url :url路径
    * name:参数名称
    */
    var delUrlParam = function (url, name) {
        var reg = new RegExp("\\\? | &" + name + "= ([^&]+)(&|&)", "i");
        return url.replace(reg, "");

    };

    /**
    * 删除url指定名称的参数
    * url :url路径
    * name:参数名称
    */
    var clearUrlParam = function (url) {

        var regexp = new RegExp("(\\\?|#)[^\"]*", "i");
        return url.replace(regexp, "");
    };

    return {
        queryString: queryString,
        delUrlParam: delUrlParam,
        clearUrlParam: clearUrlParam
    };
});