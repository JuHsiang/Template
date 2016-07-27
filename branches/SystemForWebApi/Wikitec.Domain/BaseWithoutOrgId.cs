//------------------------------------------------------------
// <copyright file="BaseWithoutOrgId.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>张宇</author>
// <date>2016/3/8 9:05:05</date>
// <summary>
//  主要功能有：
//  不包含机构Id的基类
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain
{
    using System;
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.Domain.Entities;
    using Wikitec.Infrastructure.Domain.Entities.Auditing;

    /// <summary>
    /// 不包含机构Id的基类
    /// </summary>
    public class BaseWithoutOrgId : Entity<int>, ICreationAudited<SysUser>, IModificationAudited<SysUser>, ISoftDelete
    {
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreationTime { get; set; }

        /// <summary>
        /// 创建人Id
        /// </summary>
        public long? CreatorUserId { get; set; }

        /// <summary>
        /// 创建人信息
        /// </summary>
        public virtual SysUser CreatorUser { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime? LastModificationTime { get; set; }

        /// <summary>
        /// 修改人Id
        /// </summary>
        public long? LastModifierUserId { get; set; }

        /// <summary>
        /// 修改人信息
        /// </summary>
        public virtual SysUser LastModifierUser { get; set; }

        /// <summary>
        /// 是否被删除
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}
