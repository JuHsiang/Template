//------------------------------------------------------------
// <copyright file="ApiOrgDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 16:58:52</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.SysUser
{
    /// <summary>
    /// 系统机构信息
    /// </summary>
    public class ApiOrgDto
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
        public ApiDeptDto SysDep { get; set; }
    }
}