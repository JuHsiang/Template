//------------------------------------------------------------
// <copyright file="ListOptionSearchDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/3/9 10:49:21</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.ListOption
{
    using System;
    using System.Web.Http.ModelBinding;
    using Wikitec.Infrastructure.Dto;

    /// <summary>
    /// 基础字典数据搜索条件
    /// </summary>
    [ModelBinder]
    public class ListOptionSearchDto
    {
        /// <summary>
        /// 添加开始日期
        /// </summary>
        public DateTime? StartDate { get; set; }

        /// <summary>
        /// 添加结束日期
        /// </summary>
        public DateTime? EndDate { get; set; }

        /// <summary>
        /// 类型
        /// </summary>
        public int? Type { get; set; }

        /// <summary>
        /// 分页
        /// </summary>
        public PagerDto PagerDto { get; set; }
    }
}