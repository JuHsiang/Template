//------------------------------------------------------------
// <copyright file="SysRoleDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 14:56:06</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DataTransferObject.SystemConfig
{
    using System.Collections.Generic;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 角色数据传输对象
    /// </summary>
    [AutoMap(typeof(SysRole))]
    public class SysRoleDto
    {
        /// <summary>
        /// 角色Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 角色名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Mark { get; set; }

        /// <summary>
        /// 选中的功能点字符串
        /// </summary>
        public string SelectedIds { get; set; }

        /// <summary>
        /// 角色功能列表
        /// </summary>
        public List<SysFuncDadItem> SysFuncs { get; set; }

        /// <summary>
        /// 机构Id
        /// </summary>
        public int? OrgId { get; set; }
    }
}