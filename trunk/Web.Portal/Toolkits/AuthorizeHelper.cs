//------------------------------------------------------------
// <copyright file="AuthorizeHelper.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 15:13:06</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Toolkits
{
    using System.Web;
    using System.Web.Mvc;
    using Wikitec.Application.Systems;
    using Wikitec.Infrastructure.Exceptions;
    using Wikitec.Infrastructure.Mvc.Authorization;
    using Wikitec.Infrastructure.Unity.Ioc;

    /// <summary>
    /// 页面权限控制帮助类
    /// </summary>
    public class AuthorizeHelper : IAuthorizeAttributeHelper
    {
        /// <summary>
        /// 系统角色MgtService
        /// </summary>
        private SysRoleMgtService roleMgtService;

        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="context">http上下文</param>
        public void Authorize(HttpContextBase context)
        {
            // TODO: 暂时实现为只验证非AJAX请求权限（因为角色管理中只规定了View的URL）
            if (context.Request.IsAjaxRequest())
            {
                return;
            }

            // TODO: 暂时实现为默认的admin用户拥有所有权限
            if (UserIdentity.CurrentSysUser.Account.ToLower() == "admin")
            {
                return;
            }

            var executeFilePath = context.Request.CurrentExecutionFilePath;

            // TODO: 暂时为了解决默认路由的情况。这里的设置要与默认路由一样
            if (executeFilePath == "/")
            {
                executeFilePath = "/home";
            }


            if (executeFilePath.ToLower() == "/login/login")
            {
                return;
            }

            // TODO: 暂时为了解决退出的情况
            if (executeFilePath.ToLower() == "/home/logout")
            {
                return;
            }

            this.roleMgtService = IocManager.Instance.Resolve<SysRoleMgtService>();

            if (!this.roleMgtService.IsGranted(executeFilePath, UserIdentity.CurrentSysUser))
            {
                throw new AppAuthorizationException("没有权限!");
            }
        }
    }
}