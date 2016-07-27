///////////////////////////////////////////////////////////////////////////////////////////////
//avalon 配置
///////////////////////////////////////////////////////////////////////////////////////////////

avalon.config({
    debug: false
});

///////////////////////////////////////////////////////////////////////////////////////////////
// require 配置
///////////////////////////////////////////////////////////////////////////////////////////////

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

        'jquery.select2': 'plugin/select2/select2.min',
        'jquery.select2.cn': 'plugin/select2/select2_locale_zh-CN',

        'jquery.slimscroll': 'plugin/jquery.slimscroll.min',
        'jquery.blockui': 'plugin/jquery.blockui.min',

        'jquery.toastr': 'plugin/toastr/toastr.min',

        'jquery.validate': 'plugin/jquery.validate.min',

        'bootstrap.hover.dropdown': 'plugin/bootstrap-hover-dropdown.min',
        'bootstrap.wizard': 'plugin/bootstrap.wizard.min',

        jstree: "plugin/jstree/jstree.min",

        datetimepicker: "plugin/datetimepicker/bootstrap-datetimepicker",

        icheck1x: 'plugin/icheck-1.x/icheck',

        jqueryui: 'plugin/jquery-ui-custom',
        'jquery.ui.widget': 'plugin/jquery.ui.widget',

        fileload: "plugin/fileload/min",

        fullcalendar: "plugin/fullcalendar/fullcalendar.min",

        ajaxfileupload: "plugin/fileload/ajaxfileupload",

        'load-services': "plugin/fileload/load-services",

        'jquery.ui': "plugin/jquery-ui-custom",

        store: "plugin/store.min",
        xdate: 'plugin/xdate',

        amCharts: 'plugin/amcharts_3.1.1/amcharts/amcharts',
        pie: 'plugin/amcharts_3.1.1/amcharts/pie',
        serial: 'plugin/amcharts_3.1.1/amcharts/serial',

        spectrum: 'plugin/spectrum/js',

        tooltip: 'plugin/tooltip/tooltip',
        datepicker: 'plugin/datepicker/js/datepicker',

        'jquery.fileupload': 'plugin/jquery-file-upload/js/jquery.fileupload',
        'jquery.fileupload.process': 'plugin/jquery-file-upload/js/jquery.fileupload-process',
        'jquery.fileupload.validate': 'plugin/jquery-file-upload/js/jquery.fileupload-validate',

        'moment.cn': 'vendor/moment/moment.cn',

        'jquery.pager': 'util/pager',

        mCustomScrollbar: 'plugin/mCustomScrollbar/jquery.mCustomScrollbar.min',

        //widgets:
        //components: 'http://static.wikitec.com.cn/components/v1.5/main',
        components: 'widget/main',

        lodash: 'vendor/lodash',

        mmState: "vendor/avalon/mmState",
        mmHistory: "vendor/avalon/mmHistory",
        mmRouter: "endor/avalon/mmRouter",
        mmPromise: "vendor/avalon/mmPromise",
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },

        components: ['jquery', 'mCustomScrollbar'],

        amCharts: {
            exports: 'amCharts'
        },
        pie: {
            deps: ['amCharts'],
            exports: 'pie'
        },
        serial: {
            deps: ['amCharts'],
            exports: 'serial'
        },

        store: {
            exports: 'store'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'jquery.select2': ['jquery'],
        'jquery.select2.cn': ['jquery.select2'],

        'jquery.pager': ['jquery'],
        'jquery.slimscroll': ['jquery'],
        'jquery.blockui': ['jquery'],
        'jquery.toastr': ['jquery'],
        'jquery.validate': ['jquery'],

        jstree: ['jquery'],
        'jquery.ui': ['jquery'],

        jqueryui: ['jquery'],
        'jquery.ui.widget': ['jquery'],

        fileload: ['jquery', 'jqueryui'],

        fullcalendar: ['jquery'],

        ajaxfileupload: ['jquery'],

        'load-services': ['fileload'],

        spectrum: ['jquery'],

        datetimepicker: ['jquery'],

        icheck1x: ['jquery'],

        datepicker: ['jquery'],

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
],
    function (metronic, layout, accountService, route) {
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