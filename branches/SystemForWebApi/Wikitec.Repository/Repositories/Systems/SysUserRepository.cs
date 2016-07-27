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

namespace Wikitec.Repository.Repositories.Systems
{
    using Wikitec.Domain.Systems;
    using Wikitec.Domain.Systems.IRepository;
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