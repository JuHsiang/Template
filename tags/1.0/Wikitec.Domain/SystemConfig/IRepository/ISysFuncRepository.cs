//------------------------------------------------------------
// <copyright file="ISysFuncRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 09:40:14</date>
// <summary>
//  系统菜单数据储存器接口
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.SystemConfig.IRepository
{
    using System.Collections.Generic;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Infrastructure.Data.IQueryable;

    /// <summary>
    /// 系统菜单储存器接口
    /// </summary>
    public interface ISysFuncRepository : IRepository<SysFunc>
    {

    }
}
