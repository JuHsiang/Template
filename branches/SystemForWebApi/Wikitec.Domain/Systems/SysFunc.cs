//------------------------------------------------------------
// <copyright file="SysFunc.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 09:40:14</date>
// <summary>
// 系统功能实体类
// </summary>
//------------------------------------------------------------

namespace Wikitec.Domain.Systems
{
    using System.Collections.Generic;

    /// <summary>
    /// 系统功能
    /// </summary>
    public class SysFunc
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public SysFunc()
        {
            this.IsDeleted = false;
        }

        /// <summary>
        /// 功能Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 排序编号
        /// </summary>
        public int OrderNumber { get; set; }

        /// <summary>
        /// 功能链接
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 父功能Id
        /// </summary>
        public int? ParentFuncId { get; set; }

        /// <summary>
        /// 父功能信息
        /// </summary>
        public virtual SysFunc ParentFunc { get; set; }

        /// <summary>
        /// 子功能
        /// </summary>
        public virtual ICollection<SysFunc> Subs { get; set; }

        /// <summary>
        /// 功能代号，用于三级按钮
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 功能类型 1 一级菜单，2 二级菜单，3 功能点
        /// </summary>
        public int FuncType { get; set; }

        /// <summary>
        /// 是否被删除
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// 与该菜单相关联的图标
        /// </summary>
        public string Icon { get; set; }
    }
}
