//-----------------------------------------------------------------------
// <copyright file="DataContext.cs" company="Tiki Tec">
//     Tiki Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:27:48</date>
// <summary>
//  
// </summary>
//-----------------------------------------------------------------------

namespace Wikitec.Repository
{
    using System;
    using System.Data.Entity;
    using Wikitec.Infrastructure.Data;
    using Wikitec.Repository.Mappings.Systems;

    /// <summary>
    /// EntityFramework 数据服务的上下文信息
    /// </summary>
    public class DataContext : AppDataContext, IDisposable
    {
        /// <summary>
        /// Entity Framework 数据访问上下文
        /// </summary>
        static DataContext()
        {
            // 不检查数据的映射
            Database.SetInitializer<DataContext>(null);

            // 当数据库有变化时，才删除数据库重新创建
            // Database.SetInitializer<DataContext>(new DropCreateDatabaseIfModelChanges<DataContext>());

            // 每次都删除数据库重新创建
            // Database.SetInitializer<DataContext>(new DropCreateDatabaseAlways<DataContext>());
        }

        /// <summary>
        /// 制定链接字符串名称的构造函数
        /// </summary>
        /// <param name="nameOrConnectionString">连接字符串</param>
        public DataContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {
            this.Configuration.LazyLoadingEnabled = true;
        }

        /// <summary>
        /// 空构造函数，使用默认的连接字符串
        /// </summary>
        public DataContext()
            : this("dbConStr")
        {
        }

        /// <summary>
        /// 添加数据库与实体的映射
        /// </summary>
        /// <param name="modelBuilder">将CLR类型映射到数据库</param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new SysUserMapping());
            modelBuilder.Configurations.Add(new SysRoleMapping());
            modelBuilder.Configurations.Add(new SysFuncMapping());
            modelBuilder.Configurations.Add(new SysUserRoleMapping());
            modelBuilder.Configurations.Add(new ListOptionMapping());
        }
    }
}
