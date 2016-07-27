//------------------------------------------------------------
// <copyright file="ListOptionType.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:27:48</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Enums
{
    using System.ComponentModel;

    /// <summary>
    /// 基础字典数据分类
    /// </summary>
    public enum ListOptionType : int
    {
        /// <summary>
        /// 测试类型（使用时可以删除）
        /// </summary>
        [Description("测试类型")]
        TestType = 1,
    }
}