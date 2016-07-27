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

namespace Wikitec.Application.SystemManagement
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Wikitec.DataTransferObject.SystemConfig;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Domain.SystemConfig.IRepository;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Data;
    using Wikitec.Infrastructure.Unity.Aop;
    using Wikitec.Infrastructure.Unity.Ioc;

    /// <summary>
    /// 系统功能业务逻辑
    /// </summary>
    public class SysFuncMgtService : InterceptiveObject
    {
        /// <summary>
        /// 系统功能数据容器
        /// </summary>
        private readonly ISysFuncRepository funcRepo;

        /// <summary>
        /// 构造函数
        /// </summary>
        public SysFuncMgtService()
        {
            funcRepo = IocManager.Instance.Resolve<ISysFuncRepository>();
        }

        /// <summary>
        /// 获取左侧功能菜单列表
        /// </summary>
        /// <returns>功能列表</returns>
        public IEnumerable<SysFuncItem> GetMenuFuncList()
        {
            Expression<Func<SysFunc, bool>> filter = p => p.FuncType == 1 && p.IsDeleted == false;
            var topFuncs = this.funcRepo.GetFilteredElements(filter).OrderByDescending(p => p.OrderNumber).ToArray<SysFuncItem>();

            return topFuncs;
        }

        /// <summary>
        /// 获取所有权限列表
        /// </summary>
        /// <returns>所有功能列表</returns>
        public IEnumerable<SysFuncItem> GetAllFuncs()
        {
            Expression<Func<SysFunc, bool>> filter = f => f.IsDeleted == false;
            var allFuncs = this.funcRepo.GetFilteredElements(filter).ToArray<SysFuncItem>();

            return allFuncs;
        }
    }
}
