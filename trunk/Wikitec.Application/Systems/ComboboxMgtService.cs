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

namespace Wikitec.Application.Systems
{
    using System.Collections.Generic;
    using System.Linq;
    using Wikitec.Domain.Enums;
    using Wikitec.Domain.Systems.IRepository;
    using Wikitec.Infrastructure.Dto;
    using Wikitec.Infrastructure.Toolkit;
    using Wikitec.Infrastructure.Unity.Aop;

    /// <summary>
    /// 下拉框选项业务逻辑
    /// </summary>
    public class ComboboxMgtService : InterceptiveObject
    {
        /// <summary>
        /// 基础数据选项列表接口
        /// </summary>
        private readonly IListOptionRepository listOptionRepository;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="listOptionRepository">基础数据选项列表接口</param>
        public ComboboxMgtService(IListOptionRepository listOptionRepository)
        {
            this.listOptionRepository = listOptionRepository;
        }

        #region 枚举下拉列表

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

        /// <summary>
        /// 获取基础数据类型下拉框
        /// </summary>
        /// <returns>基础数据类型下拉框</returns>
        public List<ComboboxItemDto> GetListOptionTypeCombobox()
        {
            return EnumHelper.EnumListDictionary(typeof(ListOptionType)).Select(m =>
                new ComboboxItemDto()
                {
                    Value = m.Value,
                    DisplayText = m.Key
                }).ToList();
        }

        #endregion

        #region ListOption 下拉列表

        /// <summary>
        /// 获取测试类型下拉列表（使用可删除）
        /// </summary>
        /// <returns>测试类型下拉列表</returns>
        public List<ComboboxItemDto> GetTestTypeCombobox()
        {
            return this.GetListOption((int)ListOptionType.TestType);
        }

        #endregion

        #region 私有方法

        /// <summary>
        /// 根据类型获取下拉列表数据
        /// </summary>
        /// <param name="type">类型(可使用ListOptionType枚举进行选择)</param>
        /// <returns>下拉列表数据</returns>
        public List<ComboboxItemDto> GetListOption(int type)
        {
            var listOptions = this.listOptionRepository.GetFilteredElements(p => p.Type == type && p.IsOk == true);
            return listOptions.OrderBy(p => p.OrderNumber).Select(p => new ComboboxItemDto()
                 {
                     Value = p.Id.ToString(),
                     DisplayText = p.Name
                 }).ToList();
        }

        #endregion
    }
}