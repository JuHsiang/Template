//------------------------------------------------------------
// <copyright file="OrgsItem.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 16:58:52</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DataTransferObject.SystemConfig
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 系统机构信息
    /// </summary>
    public class OrgsItem
    {
        /// <summary>
        /// 机构Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 机构名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 部门列表
        /// </summary>
        public DepItem SysDep { get; set; }
    }
}