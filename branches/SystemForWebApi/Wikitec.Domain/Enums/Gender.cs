//------------------------------------------------------------
// <copyright file="Gender.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:27:48</date>
// <summary>
//  性别
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Enums
{
    using System.ComponentModel;

    /// <summary>
    /// 性别
    /// </summary>
    public enum Gender : int
    {
        /// <summary>
        /// 男
        /// </summary>
        [Description("男")]
        Male = 1,

        /// <summary>
        /// 女
        /// </summary>
        [Description("女")]
        Famale = 0,
    }
}
