//------------------------------------------------------------
// <copyright file="SysUserMapping.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 11:03:19</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Repository.Mappings.Systems
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;
    using Wikitec.Domain.Systems;

    /// <summary>
    /// 用户实体类对应的据库映射
    /// </summary>
    public class SysUserMapping : EntityTypeConfiguration<SysUser>
    {
        /// <summary>
        /// 指定映射关系
        /// </summary>
        public SysUserMapping()
        {
            // 表名
            this.ToTable("Sys_User");

            // 主键
            this.HasKey(u => u.Id).Property(u => u.Id).IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // 属性
            this.Property(p => p.Account).HasColumnType("NVarchar").HasMaxLength(50);
            this.Property(p => p.Pwd).HasColumnType("NVarchar").HasMaxLength(50);
            this.Property(p => p.Number).HasColumnType("NVarchar").HasMaxLength(50);
            this.Property(p => p.Name).HasColumnType("NVarchar").HasMaxLength(20);

            // 关系
            this.HasOptional(p => p.CreatorUser).WithMany().HasForeignKey(p => p.CreatorUserId);
            this.HasOptional(p => p.LastModifierUser).WithMany().HasForeignKey(p => p.LastModifierUserId);
        }
    }
}