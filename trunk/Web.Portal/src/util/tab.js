define(function () {
    var resetTab = function () {
        //重置tab页面的状态:
        $('.nav-tabs li').each(function (i, li) {
            if (i === 0) {
                $(li).addClass("active");
            } else {
                $(li).removeClass("active");
            }
        });
        $('.tab-pane').each(function (i, tab) {
            if (i === 0) {
                $(tab).addClass("active");
            } else {
                $(tab).removeClass("active");
            }
        });
    };

    var setTab = function (id) {
        //设置tab页面的状态:
        $('.nav-tabs li').each(function (i, li) {
            if (i === id) {
                $(li).addClass("active");
            } else {
                $(li).removeClass("active");
            }
        });
        $('.tab-pane').each(function (i, tab) {
            if (i === id) {
                $(tab).addClass("active");
            } else {
                $(tab).removeClass("active");
            }
        });
    };

    var setTabOne = function (ids, idf) {
        //设置tab页面的状态:
        $('.nav-tabs li').each(function (i, li) {
            if (i === ids) {
                $(li).addClass("active");
            } else if (i === idf) {
                $(li).removeClass("active");
            }
        });
        $('.tab-pane').each(function (i, tab) {
            if (i === ids-1) {
                $(tab).addClass("active");
            } else if (i === idf-1) {
                $(tab).removeClass("active");
            }
        });
    };

    return {
        resetTab: resetTab,
        setTab: setTab,
        setTabOne: setTabOne
    };
});
