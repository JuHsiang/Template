//------------------------------------------------------------
// <copyright file="Gender.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>张宇</author>
// <date>2015-04-01 15:52:35</date>
// <summary>
//  性别
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Enum
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;


    /// <summary>
    /// 性别
    /// </summary>
    public enum Gender:int
    {
        [Description("男")]
        Male=1,

        [Description("女")]
        Famale=0
    }
}
