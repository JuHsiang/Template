//------------------------------------------------------------
// <copyright file="SysUserDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 17:25:27</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DataTransferObject.SystemConfig
{
    using System.Collections.Generic;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 员工数据传输对象
    /// </summary>
    [AutoMap(typeof(SysUser))]
    public class SysUserDto
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
        /// 性别
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// 性别字符串
        /// </summary>
        public string GenderStr
        {
            get
            {
                return Gender == 1 ? "男" : "女";
            }
        }

        /// <summary>
        /// 系统角色
        /// </summary>
        public long? SysRoleId { get; set; }

        /// <summary>
        /// 部门名称
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// 系统角色
        /// </summary>
        public SysRoleDto SysRole { get; set; }
    }
}