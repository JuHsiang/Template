//------------------------------------------------------------
// <copyright file="SysFuncRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 10:48:15</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Repository.Repositories.SystemConfig
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Domain.SystemConfig.IRepository;
    using Wikitec.Infrastructure.Data.IQueryable;

    /// <summary>
    /// 系统功能数据储存器
    /// </summary>
    public class SysFuncRepository : RepositoryBase<SysFunc>, ISysFuncRepository
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="context">数据库上下文</param>
        public SysFuncRepository(DataContext context)
            : base(context)
        {
        }
    }
}