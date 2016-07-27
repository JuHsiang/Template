//------------------------------------------------------------
// <copyright file="index.js" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>zhouxialong</author>
// <date>2015/9/24 14:32:44</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------
define(['app/sys/user/service',
    'util/message',
    'util/validator',
    'lodash'
], function (userService, message, validator, lodash) {
    var usersGridVm;
    var rolesSelectVm, rolesSelectAddVm;
    var dialogVm;

    var sysUserVm = avalon.define({
        $id: "sysUserVm",
        modalTitle: "",
        searchDto: new userService.SysUserSearchDto(),
        userDto: new userService.SysUserDto(),

        $checkForm:
         {
             userRole: "required",
         },

        //加载查询条件角色列表
        $selectOptRoles: {
            url: "/SysRole/GetSysRoleCombobox",
            onInit: function (vm) {
                rolesSelectVm = vm;
            },
            onChanged: function (res) {
                if (res == "") {
                    sysUserVm.searchDto.RoleId = -1;
                } else {
                    sysUserVm.searchDto.RoleId = res;
                }
            }
        },

        //查询用户信息列表插件
        $gridOpt: {
            emptyMessage: '当前系统内还没有任何用户',
            loadData: function (page) {
                var model = new userService.SysUserSearchDto();
                var dto = lodash.pick(sysUserVm.searchDto, Object.getOwnPropertyNames(model));
                dto.PagerDto.PageIndex = page;
                return userService.getSysUsers(dto);
            },
            onInit: function (vm) {
                usersGridVm = vm;
            }
        },

        //查询用户信息列表
        searchUsers: function () {
            usersGridVm.emptyMessage = '抱歉，当前搜索条件下没有查找到任何数据';
            usersGridVm.refreshAll();
        },

        $selectOptRoleAdd: {
            url: "/SysRole/GetSysRoleCombobox",
            onInit: function (vm) {
                rolesSelectAddVm = vm;
            },
            onChanged: function (res) {
                sysUserVm.userDto.SysRoleId = res;
            }
        },

        //创建修改角色对话框
        $dialogOpt: {
            onInit: function (vm) {
                dialogVm = vm;
            },
            onHidden: function () {
                validator.FormValidator.Reset('create-sysuser-form');
            }
        },

        //查看编辑用户信息
        editUser: function (account) {
            dialogVm.title = "查看编辑用户信息";
            userService.getUserByAccount(account).done(function (data) {
                sysUserVm.userDto = new userService.SysUserDto();
                sysUserVm.userDto = data;
                rolesSelectAddVm.init(data.SysRoleId);
                dialogVm.show();
            });
        },

        //保存用户信息
        save: function () {
            var res = validator.FormValidator.Check("create-sysuser-form", sysUserVm.$checkForm);
            if (res) {
                var model = lodash.pick(sysUserVm.userDto, Object.getOwnPropertyNames(new userService.SysUserDto()));
                var dto = JSON.stringify(model);
                userService.saveSysUser(dto).done(function () {
                    message.showSuccess("保存成功");
                    dialogVm.hide();
                    //刷新当前页列表                    
                    usersGridVm.refreshCurrentPage();
                });
            }
        }
    });

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param, rs, rj) {

        };

        $ctrl.$onRendered = function () {

        };
    });
});