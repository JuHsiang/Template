//------------------------------------------------------------
// <copyright file="SysUserRoleMapping.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 13:26:16</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Repository.Mappings.SystemConfig
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.ModelConfiguration;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Wikitec.Domain.SystemConfig;

    /// <summary>
    /// 用户和角色关联实体对应的据库映射
    /// </summary>
    public class SysUserRoleMapping : EntityTypeConfiguration<SysUserRole>
    {
        /// <summary>
        /// 映射构造函数
        /// </summary>
        public SysUserRoleMapping()
        {
            // 表名
            this.ToTable("Sys_User_Role");

            // 主键
            this.HasKey(p => p.Id).Property(p => p.Id).IsRequired();
        }
    }
}