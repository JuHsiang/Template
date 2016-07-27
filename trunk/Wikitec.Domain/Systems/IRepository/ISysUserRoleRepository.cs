//------------------------------------------------------------
// <copyright file="ISysUserRoleRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 13:23:40</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Systems.IRepository
{
    using Wikitec.Infrastructure.Data.IQueryable;

    /// <summary>
    /// 用户和角色关联实体数据储存器接口
    /// </summary>
    public interface ISysUserRoleRepository : IRepository<SysUserRole>
    {
    }
}