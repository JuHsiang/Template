//------------------------------------------------------------
// <copyright file="SysRoleSearch.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 15:43:37</date>
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
    using Wikitec.Infrastructure.Dto;

    /// <summary>
    /// 角色查询对象
    /// </summary>
    public class SysRoleSearch
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public SysRoleSearch()
        {
            this.PagerDto = new PagerDto();
        }

        /// <summary>
        /// 分页
        /// </summary>
        public PagerDto PagerDto { get; set; }
    }
}