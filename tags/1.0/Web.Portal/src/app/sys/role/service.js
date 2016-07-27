//------------------------------------------------------------
// <copyright file="service.js" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>zhouxialong</author>
// <date>2015/9/24 17:38:51</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------

define(['jquery'], function ($) {
    var service = {
        // 角色数据传输对象
        SysRoleDto: function () {
            this.Id = 0,
            this.Name = "",
            this.Mark = "",
            this.SelectedIds = "",
            this.SysFuncs = [],
            this.OrgId = 0;
        },

        //角色列表查询条件
        SysRoleSearchDto: function () {
            this.PagerDto = {
                PageIndex: 1,
                PageSize: 10
            };
        },

        //查询角色列表
        getSysRoles: function (searchInput) {
            return $.get('/SysRole/GetSysRoleList', {
                "searchInput": searchInput
            });
        },

        //根据Id查看角色信息
        getSysRole: function (id) {
            return $.get('/SysRole/GetSysRole', {
                "id": id
            });
        },

        //保存角色信息
        saveSysRole: function (model) {
            return $.post('/SysRole/AddOrUpdate', {
                "dto": model
            });
        },

        removeSysRole: function (id) {
            return $.post('/SysRole/Delete', {
                "id": id
            });
        },
    };

    return service;
});