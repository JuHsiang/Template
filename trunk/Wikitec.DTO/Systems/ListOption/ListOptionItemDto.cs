//------------------------------------------------------------
// <copyright file="ListOptionItemDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/3/9 10:46:17</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.ListOption
{
    using System;
    using Wikitec.Domain.Enums;
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Toolkit;

    /// <summary>
    /// 字典数据呈现时的对象
    /// </summary>
    [AutoMapFrom(typeof(ListOption))]
    public class ListOptionItemDto
    {
        /// <summary>
        /// 主键 Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 选项名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 排序编号
        /// </summary>
        public int? OrderNumber { get; set; }

        /// <summary>
        /// 是否启用
        /// </summary>
        public bool IsOk { get; set; }

        /// <summary>
        /// 状态名称
        /// </summary>
        public string StatusName
        {
            get
            {
                return this.IsOk ? "已启用" : "未启用";
            }
        }

        /// <summary>
        /// 类型
        /// </summary>
        public int Type { get; set; }

        /// <summary>
        /// 类型名称
        /// </summary>
        public string TypeName
        {
            get
            {
                return EnumHelper.GetDescriptionByValue(typeof(ListOptionType), this.Type.ToString());
            }
        }

        /// <summary>
        /// 添加日期
        /// </summary>
        public DateTime CreationTime { get; set; }
    }
}