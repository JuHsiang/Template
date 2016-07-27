/*********************************************************************
 *                   avalon 配置                                      *
 *********************************************************************/
avalon.config({
    debug: true
});

/*********************************************************************
 *                     require 配置                                   *
 *********************************************************************/
require.config({
    baseUrl: "src/",
    urlArgs: "v=20160226", //防止Js等文件缓存，每次发布修改改参数
    paths: {
        bootstrap: 'vendor/bootstrap',

        jquery: "vendor/jquery",
        moment: 'vendor/moment/moment.min',
        metronic: 'vendor/metronic/metronic',
        layout: 'vendor/metronic/layout/layout',
        'jquery.linq': 'vendor/jquery.linq.min',

        'jquery.slimscroll': 'plugin/jquery.slimscroll.min',
        'jquery.blockui': 'plugin/jquery.blockui.min',

        'jquery.toastr': 'plugin/toastr/toastr.min',

        'jquery.validate': 'plugin/jquery.validate.min',

        'bootstrap.hover.dropdown': 'plugin/bootstrap-hover-dropdown.min',
        'bootstrap.wizard': 'plugin/bootstrap.wizard.min',

        jstree: "plugin/jstree/jstree.min",

        jqueryui: 'plugin/jquery-ui-custom',
        'jquery.ui.widget': 'plugin/jquery.ui.widget',

        fileload: "plugin/fileload/min",

        'jquery.ui': "plugin/jquery-ui-custom",

        store: "plugin/store.min",
        xdate: 'plugin/xdate',

        spectrum: 'plugin/spectrum/js',

        tooltip: 'plugin/tooltip/tooltip',
        datepicker: 'plugin/datepicker/js/datepicker',

        'moment.cn': 'vendor/moment/moment.cn',

        'jquery.pager': 'util/pager',

        mCustomScrollbar: 'plugin/mCustomScrollbar/jquery.mCustomScrollbar.min',

        components: 'http://static.wikitec.com.cn/components/v1.4/main',
        //components: 'widget/main',

        lodash: 'vendor/lodash'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },

        components: ['jquery', 'mCustomScrollbar'],

        store: {
            exports: 'store'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },

        'jquery.slimscroll': ['jquery'],
        'jquery.blockui': ['jquery'],
        'jquery.toastr': ['jquery'],
        'jquery.validate': ['jquery'],

        jstree: ['jquery'],
        'jquery.ui': ['jquery'],

        jqueryui: ['jquery'],
        'jquery.ui.widget': ['jquery'],

        spectrum: ['jquery'],

        'bootstrap.hover.dropdown': ['bootstrap'],

        'bootstrap.wizard': ['bootstrap'],

        metronic: {
            deps: ['jquery', "jquery.slimscroll", 'bootstrap.hover.dropdown', 'jquery.blockui'],
            exports: 'Metronic'
        },

        layout: {
            deps: ['metronic'],
            exports: 'Layout'
        },
        'jquery.linq': ['jquery'],

        mCustomScrollbar: ['jquery', 'jqueryui']
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////
// 初始化页面
///////////////////////////////////////////////////////////////////////////////////////////////

require(['metronic',
    'layout',
    'app/account/service',
    'route',
    'util/ajaxGlobal',
    'components'
], function (metronic, layout, accountService, route) {
    metronic.init();

    layout.init();

    //用户信息，切换机构
    accountService.getUser().done(function (data) {
        global.beginSetOrg(data);

        if (global.isSetOrg()) {
            // 初始化路由
            route.init();
        }
    });
});