//------------------------------------------------------------
// <copyright file="SysFuncMapping.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 13:21:51</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Repository.Mappings.Systems
{
    using System.Data.Entity.ModelConfiguration;
    using Wikitec.Domain.Systems;

    /// <summary>
    /// 系统功能对应的据库映射
    /// </summary>
    public class SysFuncMapping : EntityTypeConfiguration<SysFunc>
    {
        /// <summary>
        /// 映射构造函数
        /// </summary>
        public SysFuncMapping()
        {
            // 表名
            this.ToTable("Sys_Func");

            // 主键
            this.HasKey(p => p.Id).Property(p => p.Id).IsRequired();

            // 属性
            this.Property(p => p.Name).HasColumnType("NVarchar").HasMaxLength(50);
            this.Property(p => p.OrderNumber);
            this.Property(p => p.IsDeleted);
            this.Property(p => p.Url).HasColumnType("NVarchar").HasMaxLength(50);
            this.Property(p => p.Code).HasColumnType("NVarchar").HasMaxLength(50);
            this.Property(p => p.Icon).HasColumnType("NVarchar").HasMaxLength(100);
        }
    }
}