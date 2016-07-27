//------------------------------------------------------------
// <copyright file="ComboboxMgtService.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:25:53</date>
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
    using System.Text;
    using System.Threading.Tasks;
    using Wikitec.Domain.Enum;
    using Wikitec.Infrastructure.Dto;
    using Wikitec.Infrastructure.Toolkit;
    using Wikitec.Infrastructure.Unity.Aop;

    /// <summary>
    /// 下拉框选项业务逻辑
    /// </summary>
    public class ComboboxMgtService : InterceptiveObject
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public ComboboxMgtService()
        {
        }

        /// <summary>
        /// 获取性别下拉框
        /// </summary>
        /// <returns>性别下拉框选项</returns>
        public List<ComboboxItemDto> GetGederCombobox()
        {
            return EnumHelper.EnumListDictionary(typeof(Gender)).Select(m =>
                new ComboboxItemDto()
                {
                    Value = m.Value,
                    DisplayText = m.Key
                }).ToList();
        }

        /// <summary>
        /// 获取启用状态下拉框
        /// </summary>
        /// <returns>启用状态下拉框选项</returns>
        public List<ComboboxItemDto> GetEnableStateCombobox()
        {
            return EnumHelper.EnumListDictionary(typeof(EnableState)).Select(m =>
                new ComboboxItemDto()
                {
                    Value = m.Value,
                    DisplayText = m.Key
                }).ToList();
        }
    }
}