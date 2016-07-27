//------------------------------------------------------------
// <copyright file="SysUserRoleRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 13:26:02</date>
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
    /// 用户和角色关联实体数据储存器
    /// </summary>
    public class SysUserRoleRepository : RepositoryBase<SysUserRole>, ISysUserRoleRepository
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="context">数据库上下文</param>
        public SysUserRoleRepository(DataContext context)
            : base(context)
        {
        }
    }
}