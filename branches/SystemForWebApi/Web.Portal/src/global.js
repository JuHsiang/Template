var global = avalon.define({

    $id: 'global',

    // 控制菜单的选中状态
    active: '',

    url: '',

    // 判断一级菜单是否被选中
    isActive: function (flag) {
        var flags = flag.split('/');
        //暂时处理没有二级菜单选中
        if (flags.length > 1) {
            flag = flags[1];
        }
        var temp = global.active.split('/');
        var active = flag == temp[1];
        //暂时处理没有二级菜单选中后，其他一级菜单样式
        if (flags.length > 1 && active) {
            $(".sub-menu").css("display", "none");
            $(".open").removeClass("open");
        }
        return active;
    },

    // 是否选择机构
    isSetOrg: function () {
        return (global.user.OrgId || 0) > 0;
    },

    user: {},

    hasRight: function (right) { //是否有某个操作的权限
        return global.user.rights.indexOf(right) == 0;
    },

    /* 是否具有指定code按钮权限
       @param code：按钮权限code
       */
    hasButton: function (code) {
        return global.user.Buttons.indexOf(code) != -1;
    },

    // 开始切换机构
    beginSetOrg: function (user) {
        global.user = user;

        if (!global.isSetOrg()) {

            if (global.user.Orgs.length > 1) {
                $("#layoutOrg").modal("toggle");
            }
            else {
                global.endSetOrg(global.user.Orgs[0]);
            }
        } else {
        }
    },

    // 切换机构
    endSetOrg: function (org) {
        $.ajax({
            url: '/Home/SelectOrg',
            data: {
                orgId: org.Id,
                orgName: org.Name
            },
            success: function () {
                $("#layoutOrg").modal('hide');
                window.location.href = '/#!/home';
                window.location.reload(true);
            },
            type: "POST"
        });
    },

    // 初始化
    init: function () {
        $("#layoutOrg").modal('toggle');

        window.location.reload(true);
    },
});

var loading = avalon.define({
    $id: 'loading',
    toggle: false
});

loading.$watch('toggle', function (val, oldVal) {
    if (val) {
        if (typeof (Metronic) != 'undefined') {
            Metronic.blockUI({
                message: '加载中...',
                animate: true,
                target: '.page-content'
            });
        }
    } else {
        if (typeof (Metronic) != 'undefined') {
            Metronic.unblockUI(".page-content");
        }
    }
});