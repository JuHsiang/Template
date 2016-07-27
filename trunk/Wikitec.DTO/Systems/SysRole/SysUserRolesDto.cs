//------------------------------------------------------------
// <copyright file="SysUserRolesDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 17:12:12</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.SysRole
{
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 用户角色关联展示对象
    /// </summary>
    [AutoMapFrom(typeof(SysUserRole))]
    public class SysUserRolesDto
    {
        /// <summary>
        /// 角色Dto
        /// </summary>
        public SysRoleDto SysRole { get; set; }
    }
}