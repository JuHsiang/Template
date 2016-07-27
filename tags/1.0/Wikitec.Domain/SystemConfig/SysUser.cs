//------------------------------------------------------------
// <copyright file="SysUser.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 09:40:14</date>
// <summary>
//  员工实体类
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.SystemConfig
{
    using System;
    using System.Collections.Generic;
    using Wikitec.Infrastructure.Domain.Entities;
    using Wikitec.Infrastructure.Domain.Entities.Auditing;

    /// <summary>
    /// 员工
    /// </summary>
    public class SysUser : Base
    {

        /// <summary>
        /// 工号
        /// </summary>
        public string Number { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 登录账号
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Pwd { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public int Gender { get; set; }
    }
}
