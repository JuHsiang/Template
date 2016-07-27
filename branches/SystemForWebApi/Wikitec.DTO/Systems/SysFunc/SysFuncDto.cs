//------------------------------------------------------------
// <copyright file="SysFuncDto.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 14:38:48</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.DTO.Systems.SysFunc
{
    using System.Collections.Generic;
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.AutoMapper;

    /// <summary>
    /// 系统功能展现
    /// </summary>
    [AutoMapFrom(typeof(SysFunc))]
    public class SysFuncDto
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 功能链接
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 是否选中
        /// </summary>
        public bool IsSelected { get; set; }

        /// <summary>
        /// 图标
        /// </summary>
        public string Icon { get; set; }

        /// <summary>
        /// 排序编号
        /// </summary>
        public int OrderNumber { get; set; }

        /// <summary>
        /// 功能代号，用于三级按钮
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 功能类型 1 一级菜单，2 二级菜单，3 功能点
        /// </summary>
        public int FuncType { get; set; }

        /// <summary>
        /// 子功能
        /// </summary>
        public List<SysFuncDto> Subs { get; set; }
    }
}