//------------------------------------------------------------
// <copyright file="ListOption.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:02:43</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Systems
{
    using System;

    /// <summary>
    /// 选项列表，选项类型的基类
    /// </summary>
    [Serializable]
    public class ListOption : BaseWithOrgId
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public ListOption()
        {
            this.IsOk = true;
        }

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
        /// 选项描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 分类
        /// </summary>
        public int Type { get; set; }
    }
}