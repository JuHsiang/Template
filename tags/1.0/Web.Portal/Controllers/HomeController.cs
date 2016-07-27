//------------------------------------------------------------
// <copyright file="HomeController.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>02/26/2016 15:08:21</date>
// <summary>
// 		
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Web.Portal.Toolkits;
    using Wikitec.Application.SystemManagement;
    using Wikitec.DataTransferObject.SystemConfig;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Exceptions;
    using Wikitec.Infrastructure.Mvc.Authorization;
    using Wikitec.Infrastructure.Unity.Ioc;

    /// <summary>
    /// 首页构造函数
    /// </summary>
    public class HomeController : BaseController
    {
        /// <summary>
        /// 系统用户业务逻辑类实例
        /// </summary>
        private readonly SysUserMgtService userMgtService;

        /// <summary>
        /// 角色业务逻辑类
        /// </summary>
        private readonly SysRoleMgtService roleMgtService;

        /// <summary>
        /// 构造函数
        /// </summary>
        public HomeController()
        {
            this.userMgtService = IocManager.Instance.Resolve<SysUserMgtService>();
            this.roleMgtService = IocManager.Instance.Resolve<SysRoleMgtService>();
        }

        /// <summary>
        /// 首页
        /// </summary>
        /// <returns>返回一个Mvc视图</returns>
        public ActionResult Index()
        {
            return this.View();
        }

        /// <summary>
        /// 注销用户
        /// </summary>
        /// <returns>注销</returns>
        public ActionResult Logout()
        {
            UserIdentity.RemoveCookie();
            AppAuthorize.SignleSignOut(Request, HttpContext.Response);

            return this.RedirectToAction("Index", "Home");
        }

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetUser()
        {
            var user = UserIdentity.CurrentSysUser;

            user.Orgs = UserIdentity.Orgs;
            user.Funcs = UserIdentity.Menu;
            if (UserIdentity.Menu != null)
            {
                var funcs = UserIdentity.Menu.OrderBy(p => p.OrderNumber).ToList();
                foreach (var item in funcs)
                {
                    var subs = item.Subs.OrderBy(p => p.OrderNumber).ToList();
                    item.Subs = subs;
                }
                user.Funcs = funcs;
            }

            // 设置用户操作集合
            if (user.OrgId.HasValue && user.OrgId.Value > 0) return this.Json(user, JsonRequestBehavior.AllowGet);
            if (UserIdentity.Menu != null)
            {
                user.Funcs.Clear();
            }

            return this.Json(user, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 选择机构
        /// </summary>
        /// <param name="orgId">机构Id</param>
        /// <param name="orgName">机构名称</param>
        public void SelectOrg(int? orgId, string orgName)
        {
            if (orgId != null)
            {
                // 根据机构Id初始化 管理员角色，字典数据
                this.userMgtService.Init(orgId.Value, UserIdentity.CurrentSysUser.Id);
                var user = UserIdentity.CurrentSysUser;
                var sysUserDto = this.userMgtService.GetSysUserInfo(UserIdentity.CurrentSysUser.Id, orgId.Value);
                if (sysUserDto.SysRole != null)
                {
                    user.Funcs = UserIdentity.ReSetFuncItem(sysUserDto.SysRole.SysFuncs);
                    UserIdentity.SetUserCurrentOrg(orgId, orgName, user.Funcs);
                }
                else
                {
                    throw new AppAuthorizationException("没有权限");
                }
            }
        }

        /// <summary>
        /// 判断首页是否有查看更多权限
        /// </summary>
        /// <param name="url">跳转路径(不带参数)</param>
        /// <returns>true:有权限，false:无权限</returns>
        [HttpGet]
        public JsonResult IsRedirect(string url)
        {
            bool result = this.roleMgtService.IsGranted(url, UserIdentity.CurrentSysUser);

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
