//------------------------------------------------------------
// <copyright file="SysUserRoleItem.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 17:12:12</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DataTransferObject.SystemConfig
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 用户角色关联展示对象
    /// </summary>
    [AutoMapFrom(typeof(SysUserRole))]
    public class SysRolesItem
    {
        public SysRoleDto SysRole { get; set; }
    }
}