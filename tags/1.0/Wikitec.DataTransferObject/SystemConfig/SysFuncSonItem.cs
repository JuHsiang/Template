//------------------------------------------------------------
// <copyright file="SysFuncSonItem.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/29 14:50:38</date>
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
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 二级系统功能展现
    /// </summary>
    [AutoMapFrom(typeof(SysFunc))]
    [AutoMapTo(typeof(SysFuncItem))]
    public class SysFuncSonItem
    {
        public int Id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 功能链接
        /// </summary>
        public string Url { get; set; }

        public bool IsSelected { get; set; }

        public string Icon { get; set; }

        public int OrderNumber { get; set; }

        /// <summary>
        /// 功能代号，用于三级按钮
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 功能类型 1 一级菜单，2 二级菜单，3 功能点
        /// </summary>
        public int FuncType { get; set; }

        /// <summary>
        /// 子功能
        /// </summary>
        public List<SysFuncGSonItem> Subs { get; set; }
    }
}