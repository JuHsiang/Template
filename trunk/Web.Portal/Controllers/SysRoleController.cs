//------------------------------------------------------------
// <copyright file="SysRoleController.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>02/26/2016 15:09:09</date>
// <summary>
// 
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Controllers
{
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Web.Mvc;
    using Wikitec.Application.Systems;
    using Wikitec.DTO.Systems.SysRole;
    using Wikitec.Infrastructure.Mvc.ModelBinder;
    using Wikitec.Infrastructure.Toolkit;

    /// <summary>
    /// 角色信息控制器
    /// </summary>
    public class SysRoleController : BaseController
    {
        /// <summary>
        /// 角色业务逻辑
        /// </summary>
        private readonly SysRoleMgtService sysRoleMgtService;

        /// <summary>
        /// 功能业务逻辑
        /// </summary>
        private readonly SysFuncMgtService sysFuncMgtService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="sysRoleMgtService">角色业务逻辑</param>
        /// <param name="sysFuncMgtService">功能业务逻辑</param>
        public SysRoleController(SysRoleMgtService sysRoleMgtService, SysFuncMgtService sysFuncMgtService)
        {
            this.sysRoleMgtService = sysRoleMgtService;
            this.sysFuncMgtService = sysFuncMgtService;
        }

        /// <summary>
        /// 获取角色列表
        /// </summary>
        /// <param name="sysRoleSearchDto">角色查询条件</param>
        /// <returns>角色列表</returns>
        [HttpGet]
        public JsonResult GetSysRoles([FromJson]SysRoleSearchDto sysRoleSearchDto)
        {
            var result = this.sysRoleMgtService.GetSysRoles(sysRoleSearchDto);

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取角色基本信息
        /// </summary>
        /// <param name="id">角色Id</param>
        /// <returns>角色基本信息</returns>
        [HttpGet]
        public JsonResult GetSysRole(long id)
        {
            var result = this.sysRoleMgtService.GetSysRole(id);

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 新增或修改角色信息
        /// </summary>
        /// <param name="dto">角色信息</param>
        [HttpPost]
        public void AddOrUpdate([FromJson]SysRoleDto dto)
        {
            this.sysRoleMgtService.AddOrUpdate(dto);
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="id">删除角色Id</param>
        [HttpPost]
        public void Delete(int id)
        {
            this.sysRoleMgtService.Delete(id);
        }

        /// <summary>
        /// 获取角色权限
        /// </summary>
        /// <param name="sysRoleId">角色Id</param>
        /// <returns>角色权限列表</returns>
        [HttpGet]
        public ActionResult GetFullSysFuncs(int? sysRoleId)
        {
            var curSysRoleFuncs = new List<int>();
            if (sysRoleId.HasValue && sysRoleId != 0)
            {
                curSysRoleFuncs = this.sysRoleMgtService.GetSysRole(sysRoleId.Value).SysFuncs.Select(p => p.Id).ToList();
            }

            var result = new List<JsTreeNode>();
            var funcList = this.sysFuncMgtService.GetLvl1Funcs().OrderBy(p => p.OrderNumber).ToList();
            foreach (var sysFunc in funcList)
            {
                // state = curSysRoleFuncs.Contains(sysFunc.Id) ? new State() { selected = true } : null,
                /*如果功能没有子节点且角色包含当前功能点则设置为选中状态。
                 *注：此处多了一个不包含子功能点，如果包含子功能点则不去设定该功能点的选中状态，而是通过子功能点的状态反推父功能点的状态。 
                 */
                var lvl1 = new JsTreeNode
                {
                    text = sysFunc.Name,
                    id = sysFunc.Id.ToString(CultureInfo.InvariantCulture)
                };
                if (sysFunc.Name == "首页")
                {
                    lvl1.state = (sysFunc.Subs.Count <= 0 || !curSysRoleFuncs.Contains(sysFunc.Id)) ? new State() { selected = true } : null;
                }
                else
                {
                    lvl1.state = (sysFunc.Subs.Count <= 0 && curSysRoleFuncs.Contains(sysFunc.Id)) ? new State() { selected = true } : null;
                }

                var subsListT = sysFunc.Subs.ToList().OrderBy(p => p.OrderNumber);
                foreach (var subFunc in subsListT)
                {
                    var lvl2 = new JsTreeNode()
                    {
                        text = subFunc.Name,
                        id = subFunc.Id.ToString(),
                        state = (subFunc.Subs.Count <= 0 && curSysRoleFuncs.Contains(subFunc.Id)) ? new State() { selected = true } : null,
                    };

                    var subsListS = subFunc.Subs.ToList().OrderBy(p => p.OrderNumber);
                    foreach (var xx in subsListS)
                    {
                        var lvl3 = new JsTreeNode()
                        {
                            text = xx.Name,
                            id = xx.Id.ToString(),
                            state = curSysRoleFuncs.Contains(xx.Id) ? new State() { selected = true } : new State() { selected = false },
                        };
                        lvl2.children.Add(lvl3);
                    }

                    lvl1.children.Add(lvl2);
                }

                result.Add(lvl1);
            }

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        #region 获取相关下拉列表

        /// <summary>
        /// 获取角色下拉框选项
        /// </summary>
        /// <returns>角色下拉框选项</returns>
        public JsonResult GetSysRoleCombobox()
        {
            var result = this.sysRoleMgtService.GetSysRoleCombobox();

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}