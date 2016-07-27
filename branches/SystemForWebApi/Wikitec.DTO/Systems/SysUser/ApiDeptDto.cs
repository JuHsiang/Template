//------------------------------------------------------------
// <copyright file="ApiDeptDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 16:59:16</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.SysUser
{
    using System.Collections.Generic;

    /// <summary>
    /// 部门信息
    /// </summary>
    public class ApiDeptDto
    {
        /// <summary>
        /// 部门Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 部门名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 子部门列表
        /// </summary>
        public List<ApiDeptDto> SysDep { get; set; }
    }
}