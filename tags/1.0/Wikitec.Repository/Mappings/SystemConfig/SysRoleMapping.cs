//------------------------------------------------------------
// <copyright file="SysRoleMapping.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 11:09:56</date>
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
    /// 角色对应的据库映射
    /// </summary>
    public class SysRoleMapping : EntityTypeConfiguration<SysRole>
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public SysRoleMapping()
        {
            // 表名
            this.ToTable("Sys_Role");

            // 主键
            this.HasKey(p => p.Id).Property(p => p.Id).IsRequired();

            // 属性
            this.Property(p => p.Name).HasColumnType("NVarchar").HasMaxLength(50);
            this.Property(p => p.Mark).HasColumnType("NVarchar").HasMaxLength(500);

            this.HasMany(p => p.SysFuncs).WithMany().Map(p => p.ToTable("Sys_Role_Func"));
        }
    }
}