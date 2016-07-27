//------------------------------------------------------------
// <copyright file="State.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>张宇</author>
// <date>2015-04-01 15:54:55</date>
// <summary>
//  启用状态
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
    /// 启用状态
    /// </summary>
    public enum EnableState
    {
        [Description("启用")]
        Enabled=0,

        [Description("禁用")]
        Disabled=1
    }
}
