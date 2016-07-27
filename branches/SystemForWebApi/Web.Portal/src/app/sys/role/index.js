//------------------------------------------------------------
// <copyright file="index.js" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>zhouxialong</author>
// <date>2015/9/24 17:38:35</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------

define(['app/sys/role/service',
    'util/message',
    'util/validator',
    'lodash',
    'jstree',
    'css!plugin/jstree/themes/default/style.min'],
    function (roleService, message, validator, lodash) {
        var rolesGridVm;
        var dialogVm;

        var sysRoleVm = avalon.define({
            $id: "sysRoleVm",
            modalTitle: "",
            roleDto: new roleService.SysRoleDto(),
            searchDto: new roleService.SysRoleSearchDto(),

            $checkForm: {
                roleName: "required"
            },

            //查询用户信息列表插件
            $gridOpt: {
                emptyMessage: '当前系统内还没有任何角色',
                loadData: function (page) {
                    var model = new roleService.SysRoleSearchDto();
                    var dto = lodash.pick(sysRoleVm.searchDto, Object.getOwnPropertyNames(model));
                    dto.PagerDto.PageIndex = page;
                    var searchInput = JSON.stringify(dto);
                    return roleService.getSysRoles(searchInput);
                },
                onInit: function (vm) {
                    rolesGridVm = vm;
                }
            },

            //创建修改角色对话框
            $dialogOpt: {
                onInit: function (vm) {
                    dialogVm = vm;
                },
                onHidden: function () {
                    validator.FormValidator.Reset('create-sysrole-form');
                }
            },

            //新建角色信息
            createSysRole: function () {
                dialogVm.title = "新建角色信息";
                sysRoleVm.roleDto = new roleService.SysRoleDto();
                ajaxInitSysFuncTree(null);
                dialogVm.show();
            },

            //查看编辑角色信息
            edit: function (id) {
                dialogVm.title = "查看编辑角色信息";
                roleService.getSysRole(id).done(function (data) {
                    sysRoleVm.roleDto = new roleService.SysRoleDto();
                    sysRoleVm.roleDto = data;
                    ajaxInitSysFuncTree(data.Id);
                    dialogVm.show();
                });
            },

            //删除角色信息
            remove: function (id) {
                message.confirm("确定删除选中的系统角色么?", function () {
                    roleService.removeSysRole(id).done(function () {
                        message.showSuccess("删除成功");
                        //刷新当前页列表                    
                        rolesGridVm.refreshCurrentPage();
                    });
                });
            },

            // 保存角色信息
            save: function () {
                var res = validator.FormValidator.Check("create-sysrole-form", sysRoleVm.$checkForm);
                if (res) {
                    var ids = "";
                    $.each($("#tree").jstree("get_selected"), function (i, n) {
                        ids += n + ",";
                    });
                    $("#tree").find(".jstree-checked, .jstree-undetermined ").each(function () {
                        var item = $(this).parent().parent();
                        ids += item.attr("id") + ",";
                    });
                    //获取所有选中功能
                    sysRoleVm.roleDto.SelectedIds = ids;

                    var model = lodash.pick(sysRoleVm.roleDto, Object.getOwnPropertyNames(new roleService.SysRoleDto()));
                    var dto = JSON.stringify(model);
                    roleService.saveSysRole(dto).done(function () {
                        message.showSuccess("保存成功");
                        dialogVm.hide();
                        //刷新当前页列表                    
                        rolesGridVm.refreshCurrentPage();
                    });
                }
            },
        });

        //初始化角色功能树
        var ajaxInitSysFuncTree = function (sysRoleId) {
            $.jstree.destroy(); //销毁JsTree，否则会记录选中状态
            $('#tree').jstree({
                'core': {
                    "check_callback": false,
                    'strings': {
                        'Loading ...': '加载中...'
                    },
                    'themes': {
                        'variant': 'large',
                        'dots': false,
                        'icons': false
                    },
                    'data': {
                        'url': '/SysRole/GetFullSysFuncs' + '?sysRoleId=' + sysRoleId,
                        'cache': false
                    }
                },
                "plugins": [
                    "checkbox", "wholerow" //1. 整行选中 2. 保持状态，3， 4 右键菜单
                ]
            });
        };

        return avalon.controller(function ($ctrl) {
            $ctrl.$onEnter = function (param, rs, rj) {

            };

            $ctrl.$onRendered = function () {
            };
        });
    });