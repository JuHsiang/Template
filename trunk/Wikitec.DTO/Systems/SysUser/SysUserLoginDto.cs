//------------------------------------------------------------
// <copyright file="SysUserLoginDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 16:57:02</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.SysUser
{
    using System.Collections.Generic;
    using Wikitec.Domain.Systems;
    using Wikitec.DTO.Systems.SysFunc;
    using Wikitec.DTO.Systems.SysRole;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 用户登录对象
    /// </summary>
    [AutoMapFrom(typeof(SysUser))]
    public class SysUserLoginDto
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public SysUserLoginDto()
        {
            this.SysRoles = new List<SysRoleDto>();
        }

        /// <summary>
        /// 员工Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 登录账号
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Pwd { get; set; }

        /// <summary>
        /// 角色
        /// </summary>
        public List<SysRoleDto> SysRoles { get; set; }

        /// <summary>
        /// 所属机构Id
        /// </summary>
        public int? OrgId { get; set; }

        /// <summary>
        /// 机构名称
        /// </summary>
        public string OrgName { get; set; }

        /// <summary>
        /// 机构
        /// </summary>
        public List<ApiOrgDto> Orgs { get; set; }

        /// <summary>
        /// 功能列表
        /// </summary>
        public List<SysFuncDto> Funcs { get; set; }

        /// <summary>
        /// 三级按钮权限列表
        /// </summary>
        public List<string> Buttons { get; set; }
    }
}