//------------------------------------------------------------
// <copyright file="SysRole.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 09:40:14</date>
// <summary>
//  员工角色实体类
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Systems
{
    using System.Collections.Generic;

    /// <summary>
    /// 员工角色
    /// </summary>
    public class SysRole : BaseWithOrgId
    {
        /// <summary>
        /// 角色名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Mark { get; set; }

        /// <summary>
        /// 角色权限列表
        /// </summary>
        public virtual ICollection<SysFunc> SysFuncs { get; set; }

        /// <summary>
        /// 用户角色关联表
        /// </summary>
        public virtual ICollection<SysUserRole> SysUserRoles { get; set; }
    }
}
