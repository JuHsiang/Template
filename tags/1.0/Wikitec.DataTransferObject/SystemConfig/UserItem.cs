//------------------------------------------------------------
// <copyright file="UserItem.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 17:35:20</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DataTransferObject.SystemConfig
{
    using System.Collections.Generic;

    /// <summary>
    /// 用户信息
    /// </summary>
    public class UserItem
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 用户名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 用户登录账号
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public string Gender { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 系统角色
        /// </summary>
        public string SysRoleName { get; set; }

        /// <summary>
        /// 部门名称
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// 机构列表
        /// </summary>
        public List<OrgsItem> SysOrgs { get; set; }
    }
}