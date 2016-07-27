//------------------------------------------------------------
// <copyright file="ListOptionDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/3/9 10:44:45</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.ListOption
{
    using System.ComponentModel.DataAnnotations;
    using System.Web.Http.ModelBinding;
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Validation;

    /// <summary>
    /// 添加修改时的字典数据
    /// </summary>
    [AutoMap(typeof(ListOption))]
    public class ListOptionDto : IValidate
    {
        /// <summary>
        /// 主键 Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 选项名称
        /// </summary>
        [Required(ErrorMessage = "选项名称不能为空！")]
        public string Name { get; set; }

        /// <summary>
        /// 排序编号
        /// </summary>
        public int? OrderNumber { get; set; }

        /// <summary>
        /// 选项描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 类型
        /// </summary>
        [Required(ErrorMessage = "选项类型不能为空！")]
        public int Type { get; set; }
    }
}