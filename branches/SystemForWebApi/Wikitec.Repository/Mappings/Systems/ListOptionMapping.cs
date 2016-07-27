//------------------------------------------------------------
// <copyright file="ListOptionMapping.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:19:05</date>
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
    /// 系统基础数据表的映射
    /// </summary>
    public class ListOptionMapping : EntityTypeConfiguration<ListOption>
    {
        /// <summary>
        /// 系统基础数据表的映射
        /// </summary>
        public ListOptionMapping()
        {
            // 表名
            this.ToTable("Sys_ListOption");

            // 主键
            this.HasKey(p => p.Id).Property(p => p.Id).IsRequired();

            // 字段长度
            this.Property(p => p.Description).HasColumnType("NVarchar").HasMaxLength(100);
            this.Property(p => p.Name).HasColumnType("NVarchar").HasMaxLength(50);
        }
    }
}