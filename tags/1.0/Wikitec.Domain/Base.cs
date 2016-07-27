//------------------------------------------------------------
// <copyright file="Base.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 09:40:14</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Infrastructure.Domain.Entities;
    using Wikitec.Infrastructure.Domain.Entities.Auditing;

    /// <summary>
    /// Domain基类(不包含OrgId)
    /// </summary>
    public abstract class Base : Entity<long>, ICreationAudited<SysUser>, IModificationAudited<SysUser>, ISoftDelete
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