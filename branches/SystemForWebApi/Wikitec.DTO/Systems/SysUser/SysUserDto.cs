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

namespace Wikitec.DTO.Systems.SysUser
{
    using System.ComponentModel.DataAnnotations;
    using Wikitec.Domain.Systems;
    using Wikitec.DTO.Systems.SysRole;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Validation;

    /// <summary>
    /// 员工数据传输对象
    /// </summary>
    [AutoMap(typeof(SysUser))]
    public class SysUserDto : IValidate
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        [Required(ErrorMessage = "用户Id不能为空！")]
        public long Id { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        [Required(ErrorMessage = "用户姓名不能为空！")]
        public string Name { get; set; }

        /// <summary>
        /// 登录账号
        /// </summary>
        [Required(ErrorMessage = "用户账号不能为空！")]
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
                return this.Gender == 1 ? "男" : "女";
            }
        }

        /// <summary>
        /// 系统角色
        /// </summary>
        public int? SysRoleId { get; set; }

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