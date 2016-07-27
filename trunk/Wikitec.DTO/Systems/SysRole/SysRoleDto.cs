//------------------------------------------------------------
// <copyright file="SysRoleDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 14:56:06</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.SysRole
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Wikitec.Domain.Systems;
    using Wikitec.DTO.Systems.SysFunc;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Validation;

    /// <summary>
    /// 角色数据传输对象
    /// </summary>
    [AutoMap(typeof(SysRole))]
    public class SysRoleDto : IValidate
    {
        /// <summary>
        /// 角色Id
        /// </summary>
        [Required(ErrorMessage = "角色Id不能为空！")]
        public int Id { get; set; }

        /// <summary>
        /// 角色名称
        /// </summary>
        [Required(ErrorMessage = "角色名称不能为空！")]
        public string Name { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Mark { get; set; }

        /// <summary>
        /// 选中的功能点字符串
        /// </summary>
        public string SelectedIds { get; set; }

        /// <summary>
        /// 角色功能列表
        /// </summary>
        public List<SysFuncLvl1Dto> SysFuncs { get; set; }

        /// <summary>
        /// 机构Id
        /// </summary>
        public int? OrgId { get; set; }
    }
}