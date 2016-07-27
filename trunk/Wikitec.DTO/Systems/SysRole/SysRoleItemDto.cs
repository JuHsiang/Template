//------------------------------------------------------------
// <copyright file="SysRoleItemDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 15:29:44</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.SysRole
{
    using System;
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 角色展示数据展示对象
    /// </summary>
    [AutoMapFrom(typeof(SysRole))]
    public class SysRoleItemDto
    {
        /// <summary>
        /// 角色Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 角色名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreationTime { get; set; }

        /// <summary>
        /// 创建人
        /// </summary>
        public string CreatorUserName { get; set; }

        /// <summary>
        /// 当前角色下用户数
        /// </summary>
        public int SysUserRolesCount { get; set; }

        /// <summary>
        /// 当前角色下用户数
        /// </summary>
        public int RoleUsersCount
        {
            get
            {
                if (this.Name.Contains("系统管理员"))
                {
                    return this.SysUserRolesCount - 1;
                }

                return this.SysUserRolesCount;
            }
        }
    }
}