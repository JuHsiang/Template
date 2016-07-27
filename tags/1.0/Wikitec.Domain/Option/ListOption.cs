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

namespace Wikitec.Domain.Option
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 选项列表，选项类型的基类
    /// </summary>
    [Serializable]
    public class ListOption : BaseOrg
    {
        /// <summary>
        /// 选项名称
        /// </summary>
        public string Name { get; set; }

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