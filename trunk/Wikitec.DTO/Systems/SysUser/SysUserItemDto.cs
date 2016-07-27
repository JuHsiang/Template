//------------------------------------------------------------
// <copyright file="SysUserItemDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 15:36:20</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.SysUser
{
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 用户信息数据展示对象
    /// </summary>
    [AutoMapFrom(typeof(SysUser))]
    public class SysUserItemDto
    {
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
        /// 创建时间
        /// </summary>
        public string CreationTime { get; set; }

        /// <summary>
        /// 创建人信息
        /// </summary>
        public string CreatorUserName { get; set; }

        /// <summary>
        /// 角色名称
        /// </summary>
        public string SysRoleName { get; set; }
    }
}