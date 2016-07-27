//------------------------------------------------------------
// <copyright file="IListOptionRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:05:50</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Option.IRepository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Wikitec.Infrastructure.Data.IQueryable;

    /// <summary>
    /// 基础数据，选项列表接口
    /// </summary>
    public interface IListOptionRepository : IRepository<ListOption>
    {
        /// <summary>
        /// 复制数据
        /// </summary>
        /// <param name="orgId">机构Id</param>
        /// <param name="loginUserId">用户Id</param>
        void Copy(int orgId, long loginUserId);
    }
}