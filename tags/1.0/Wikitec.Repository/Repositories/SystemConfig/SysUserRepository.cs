//------------------------------------------------------------
// <copyright file="SysUserRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 10:40:18</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

using System.Data.Entity;

namespace Wikitec.Repository.Repositories.SystemConfig
{
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Domain.SystemConfig.IRepository;
    using Wikitec.Infrastructure.Data.IQueryable;

    /// <summary>
    /// 员工数据储存器
    /// </summary>
    public class SysUserRepository : RepositoryBase<SysUser>, ISysUserRepository
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="context">数据库上下文</param>
        public SysUserRepository(DataContext context)
            : base(context)
        {
        }
    }
}