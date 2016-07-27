//------------------------------------------------------------
// <copyright file="service.js" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>zhouxialong</author>
// <date>2015/9/24 14:33:21</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------

define(['jquery'], function ($) {

    var service = {
        // 员工信息
        SysUserDto: function () {
            this.Id = 0,
            this.Name = "",
            this.Account = "",
            this.Gender = 0,
            this.GenderStr = "",
            this.SysRoleId = 0,
            this.DepartmentName = "",
            this.SysRole = null;
        },

        // 员工查询条件
        SysUserSearchDto: function () {
            this.Name = "",
             this.IsDeleted = -1,
             this.Account = "",
             this.DepartmentId = -1,
             this.RoleId = -1,
             this.PagerDto = {
                 PageIndex: 1,
                 PageSize: 10
             };
        },

        // 员工查询条件
        getSysUsers: function (searchInput) {
            return $.get('/api/sysusers', {
                "searchInput": searchInput
            });
        },

        //获取性别列表
        getGenderCombobox: function () {
            return $.get('/api/sysusers/gender');
        },

        // 获取角色列表
        getSysRoleCombobox: function () {
            return $.get('/SysRole/GetSysRoleCombobox');
        },

        //根据账号获取用户信息
        getUserByAccount: function (account) {
            return $.get('api/sysusers/account/' + account);
        },

        //保存用户信息
        saveSysUser: function (model) {
            return $.post('api/sysusers', model);
        },
    };

    return service;
});