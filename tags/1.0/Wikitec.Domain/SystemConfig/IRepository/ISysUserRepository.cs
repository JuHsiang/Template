//------------------------------------------------------------
// <copyright file="ISysUserRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 09:40:14</date>
// <summary>
//  员工数据储存器接口
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.SystemConfig.IRepository
{
    using Wikitec.Infrastructure.Data.IQueryable;

    /// <summary>
    /// 员工数据储存器接口
    /// </summary>
    public interface ISysUserRepository : IRepository<SysUser>
    {
    }
}
