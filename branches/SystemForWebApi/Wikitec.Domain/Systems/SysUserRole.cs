//------------------------------------------------------------
// <copyright file="SysUserRole.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 13:04:14</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Systems
{
    /// <summary>
    /// 用户和角色关联实体
    /// </summary>
    public class SysUserRole
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 用户Id
        /// </summary>
        public long? SysUserId { get; set; }

        /// <summary>
        /// 用户
        /// </summary>
        public virtual SysUser SysUser { get; set; }

        /// <summary>
        /// 角色Id
        /// </summary>
        public int? SysRoleId { get; set; }

        /// <summary>
        /// 角色
        /// </summary>
        public virtual SysRole SysRole { get; set; }
    }
}