//------------------------------------------------------------
// <copyright file="SysUser.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>张宇</author>
// <date>2016/3/8 9:12:00</date>
// <summary>
//  主要功能有：
//  系统用户
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Systems
{
    using System;
    using Wikitec.Infrastructure.Domain.Entities;
    using Wikitec.Infrastructure.Domain.Entities.Auditing;

    /// <summary>
    /// 系统用户
    /// </summary>
    public class SysUser : Entity<long>, ICreationAudited<SysUser>, IModificationAudited<SysUser>, ISoftDelete
    {
        /// <summary>
        /// 工号
        /// </summary>
        public string Number { get; set; }

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
        /// 性别
        /// </summary>
        public int Gender { get; set; }

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
