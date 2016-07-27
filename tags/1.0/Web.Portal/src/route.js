define(["jquery", "domReady!", "mmState"], function ($) {
    var rootPath = '/src/';

    //一个顶层VM
    var stateVm = avalon.define({
        $id: "stateVm"
    });

    //路由配置
    avalon.state.config({
        // 全局的onBeforeUnload
        // A=>B触发，全局，只跳转前触发一次，用以展示提示信息
        onBeforeUnload: function (from, to) {
        },
        //取消跳转
        onAbort: function (from, to) { },
        //开始跳转
        onBegin: function (from, to) {
            var loading = avalon.vmodels.loading;

            if (loading) {
                loading.toggle = true;
            }
        },
        //跳转成功
        onLoad: function (from, to) {
            var loading = avalon.vmodels.loading;

            if (loading) {
                loading.toggle = false;
            }

            //显示切换动画
            $('#msview').removeClass().addClass('fadeInUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass();
            });
        },
        //出错
        onError: function (keyname, state) {
            //模版无法加载跳转404
            avalon.router.navigate("404");
        },
        onViewEnter: function (newNode, oldNode) {
            mmState.oldNodes.push(oldNode);
            oldNode.parentNode && oldNode.parentNode.removeChild(oldNode);
        }
    });

    //这里只针对通用的只有一个ms-view的情况
    //如果有特殊配置，需要单独在main中配置
    var routes = [

        // 主页
        {
            stateName: 'home',
            url: '/home',
            templateUrl: 'app/home/index.html',
            controllerUrl: 'app/home/index'
        },

           // 系统设置-角色管理
        {
            stateName: 'sys-role',
            url: '/sys/role',
            templateUrl: 'app/sys/role/index.html',
            controllerUrl: 'app/sys/role/index'
        },

         // 系统设置-员工管理
        {
            stateName: 'sys-user',
            url: '/sys/user',
            templateUrl: 'app/sys/user/index.html',
            controllerUrl: 'app/sys/user/index'
        }
    ];

    var init = function () {

        //403
        avalon.state("403", {
            controller: "stateVm",
            url: "/403",
            views: {
                "": {
                    templateUrl: rootPath + 'static/403.html'
                }
            }
        });

        //404
        avalon.state("404", {
            controller: "stateVm",
            url: "/404",
            views: {
                "": {
                    templateUrl: rootPath + 'static/404.html'
                }
            }
        });


        //拿到路由列表，逐个配置
        $(routes).each(function (i, item) {
            avalon.state(item.stateName, {
                controller: "stateVm",
                url: item.url,
                // state级别的数据准备
                onEnter: function () {
                    if (item.active) {
                        avalon.vmodels.global.active = item.active;
                    } else {
                        avalon.vmodels.global.active = item.url;
                    }
                    avalon.vmodels.global.url = item.url;
                },
                views: {
                    "": {
                        templateUrl: rootPath + item.templateUrl,
                        controllerUrl: [item.controllerUrl],
                        ignoreChange: function (changeType) {
                            if (changeType) return true;
                        }
                    }
                }
            });
        });


        // 启动路由
        avalon.history.start({
            basepath: "/",
            fireAnchor: false
        });

        // 扫描
        avalon.scan();
    };

    //找不到的页面跳转到404
    avalon.router.error(function () {
        avalon.log("404!!");
        avalon.router.navigate('home');
    });

    return {
        init: init
    };
});