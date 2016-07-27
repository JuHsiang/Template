//------------------------------------------------------------
// <copyright file="EnableState.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:27:48</date>
// <summary>
//  启用状态
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Enums
{
    using System.ComponentModel;

    /// <summary>
    /// 启用状态
    /// </summary>
    public enum EnableState : int
    {
        /// <summary>
        /// 启用
        /// </summary>
        [Description("启用")]
        Enabled = 0,

        /// <summary>
        /// 禁用
        /// </summary>
        [Description("禁用")]
        Disabled = 1
    }
}
