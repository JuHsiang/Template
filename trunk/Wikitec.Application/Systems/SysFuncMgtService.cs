//------------------------------------------------------------
// <copyright file="SysFuncMgtService.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 14:38:48</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Application.Systems
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Wikitec.Domain.Systems;
    using Wikitec.Domain.Systems.IRepository;
    using Wikitec.DTO.Systems.SysFunc;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Unity.Aop;

    /// <summary>
    /// 系统功能业务逻辑
    /// </summary>
    public class SysFuncMgtService : InterceptiveObject
    {
        /// <summary>
        /// 系统功能数据容器
        /// </summary>
        private readonly ISysFuncRepository sysFuncRepository;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="sysFuncRepository">系统功能数据容器</param>
        public SysFuncMgtService(ISysFuncRepository sysFuncRepository)
        {
            this.sysFuncRepository = sysFuncRepository;
        }

        /// <summary>
        /// 获取左侧功能菜单列表
        /// </summary>
        /// <returns>功能列表</returns>
        public IEnumerable<SysFuncDto> GetLvl1Funcs()
        {
            Expression<Func<SysFunc, bool>> filter = p => p.FuncType == 1 && p.IsDeleted == false;
            var sysFuncs = this.sysFuncRepository.GetFilteredElements(filter).OrderByDescending(p => p.OrderNumber);
            var lvl1Funcs = sysFuncs.ToArray<SysFuncLvl1Dto>();

            return lvl1Funcs.MapTo<List<SysFuncDto>>();
        }
    }
}
