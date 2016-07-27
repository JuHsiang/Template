//------------------------------------------------------------
// <copyright file="SysUserSearch.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 17:39:39</date>
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
    /// 用户查询条件
    /// </summary>
    public class SysUserSearch
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public SysUserSearch()
        {
            this.PagerDto = new PagerDto();
        }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 编号
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 角色Id
        /// </summary>
        public long RoleId { get; set; }

        /// <summary>
        /// 分页
        /// </summary>
        public PagerDto PagerDto { get; set; }
    }
}