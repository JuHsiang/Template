//------------------------------------------------------------
// <copyright file="ISysUserRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>张宇</author>
// <date>2016/3/8 9:14:30</date>
// <summary>
//  主要功能有：
//  用户数据存储接口
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Systems.IRepository
{
    using Wikitec.Infrastructure.Data.IQueryable;

    /// <summary>
    /// 用户数据存储接口
    /// </summary>
    public interface ISysUserRepository : IRepository<SysUser>
    {
    }
}
