//------------------------------------------------------------
// <copyright file="SysUserItem.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 15:36:20</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

using System.Globalization;

namespace Wikitec.DataTransferObject.SystemConfig
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Wikitec.Domain.Enum;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Toolkit;

    /// <summary>
    /// 用户信息数据展示对象
    /// </summary>
    [AutoMapFrom(typeof(SysUser))]
    public class SysUserItem
    {
        /// <summary>
        /// 员工Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 登录账号
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string CreationTime { get; set; }

        /// <summary>
        /// 创建人信息
        /// </summary>
        public string CreatorUserName { get; set; }

        /// <summary>
        /// 角色名称
        /// </summary>
        public string SysRoleName { get; set; }
    }
}