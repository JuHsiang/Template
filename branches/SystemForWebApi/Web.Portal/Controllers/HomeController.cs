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
    using System.Linq;
    using System.Web.Mvc;
    using Web.Portal.Toolkits;
    using Wikitec.Application.Systems;
    using Wikitec.Infrastructure.Exceptions;
    using Wikitec.Infrastructure.Mvc.Authorization;

    /// <summary>
    /// 首页构造函数
    /// </summary>
    public class HomeController : BaseController
    {
        /// <summary>
        /// 系统用户业务逻辑类实例
        /// </summary>
        private readonly SysUserMgtService sysUserMgtService;

        /// <summary>
        /// 角色业务逻辑类
        /// </summary>
        private readonly SysRoleMgtService sysRoleMgtService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="sysUserMgtService">系统用户业务逻辑类实例</param>
        /// <param name="sysRoleMgtService">角色业务逻辑类</param>
        public HomeController(SysUserMgtService sysUserMgtService, SysRoleMgtService sysRoleMgtService)
        {
            this.sysUserMgtService = sysUserMgtService;
            this.sysRoleMgtService = sysRoleMgtService;
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

            AppAuthorize.SignleSignOut(this.Request, HttpContext.Response);

            return this.RedirectToAction("Index", "Home");
        }

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <returns>用户信息</returns>
        public JsonResult GetUser()
        {
            var sysUserLoginDto = UserIdentity.CurrentSysUser;
            if (UserIdentity.CurrentSysUser.Funcs != null)
            {
                var funcs = UserIdentity.CurrentSysUser.Funcs.OrderBy(p => p.OrderNumber).ToList();
                foreach (var item in funcs)
                {
                    var subs = item.Subs.OrderBy(p => p.OrderNumber).ToList();
                    item.Subs = subs;
                }

                sysUserLoginDto.Funcs = funcs;
            }

            // 设置用户操作集合
            if (sysUserLoginDto.OrgId.HasValue && sysUserLoginDto.OrgId.Value > 0)
            {
                return this.Json(sysUserLoginDto, JsonRequestBehavior.AllowGet);
            }

            if (sysUserLoginDto.Funcs != null)
            {
                sysUserLoginDto.Funcs.Clear();
            }

            return this.Json(sysUserLoginDto, JsonRequestBehavior.AllowGet);
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
                this.sysUserMgtService.Init(orgId.Value, UserIdentity.CurrentSysUser.Id);
                var sysUserLoginDto = UserIdentity.CurrentSysUser;
                var sysUserDto = this.sysUserMgtService.GetSysUser(UserIdentity.CurrentSysUser.Id, orgId.Value);
                if (sysUserDto.SysRole != null)
                {
                    sysUserLoginDto.Funcs = UserIdentity.ReSetFuncItem(sysUserDto.SysRole.SysFuncs);
                    UserIdentity.SetUserCurrentOrg(orgId, orgName, sysUserLoginDto.Funcs);
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
            bool result = this.sysRoleMgtService.IsGranted(url, UserIdentity.CurrentSysUser);

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
