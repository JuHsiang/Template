//------------------------------------------------------------
// <copyright file="UserIdentity.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 15:13:23</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Toolkits
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Diagnostics;
    using System.Globalization;
    using System.Linq;
    using System.Text;
    using System.Web;
    using System.Web.Mvc;
    using Wikitec.Application.Systems;
    using Wikitec.DTO.Systems;
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Exceptions;
    using Wikitec.Infrastructure.Toolkit;
    using Wikitec.Infrastructure.Unity.Ioc;
    using Wikitec.DTO.Systems.SysFunc;
    using Wikitec.DTO.Systems.SysUser;

    public class UserIdentity
    {
        #region 私有变量

        /// <summary>
        /// Cookie名称
        /// </summary>
        public const string Cookie = "Wikitec.Template";

        #endregion

        #region 公有方法

        /// <summary>
        /// 创建Cookie
        /// </summary>
        /// <param name="sysUserItem">用户实体对象</param>
        public static void CreateCookie(SysUserLoginDto sysUserItem)
        {
            var orgId = 0;
            if (sysUserItem != null)
            {
                var userCache = new UserCacheDto();
                var keyGuid = Guid.NewGuid().ToString();
                var expires = DateTime.Now.AddHours(2);

                var cookie = new HttpCookie(Cookie)
                {
                    HttpOnly = false,
                    Domain = ConfigurationManager.AppSettings["DomainStr"]
                };
                cookie.Values["KeyGuid"] = keyGuid;


                userCache.Id = sysUserItem.Id.ToString(CultureInfo.InvariantCulture);
                userCache.LoginName = sysUserItem.Account;
                userCache.RealName = HttpUtility.UrlEncode(sysUserItem.Name);
                var role = sysUserItem.SysRoles.FirstOrDefault();
                string roleName = string.Empty;
                if (role != null)
                {
                    roleName = role.Name;
                }

                userCache.RoleName = HttpUtility.UrlEncode(roleName);

                #region 添加机构Id
                var sysUserMgtService = IocManager.Instance.Resolve<SysUserMgtService>();
                var userHttp = sysUserMgtService.GetSysUserFromApi(sysUserItem.Account);
                if (userHttp != null)
                {
                    var orgHttp = userHttp.SysOrgs;

                    if (orgHttp != null && orgHttp.Count == 1)
                    {
                        userCache.OrgId = orgHttp[0].Id.ToString(CultureInfo.InvariantCulture);
                        userCache.OrgName = HttpUtility.UrlEncode(orgHttp[0].Name);
                        cookie.Values["OrgId"] = userCache.OrgId;
                        cookie.Values["OrgName"] = userCache.OrgName;
                        orgId = orgHttp[0].Id;
                    }
                    else
                    {
                        userCache.OrgId = "0";
                        userCache.OrgName = string.Empty;
                        cookie.Values["OrgId"] = "0";
                        cookie.Values["OrgName"] = string.Empty;
                    }

                    // 设置机构信息JSON
                    var orgjson = JsonHelper.Obj2JsonStr<IEnumerable<ApiOrgDto>>(orgHttp);

                    userCache.Orgs = ZipHelper.GZipCompressString(orgjson);

                    // 登录用户的权限列表，用于控制页面上按钮的显示状态
                    if (sysUserItem.SysRoles != null && sysUserItem.SysRoles.Count > 0)
                    {
                        var allFuncs = ReSetFuncItem(sysUserItem.SysRoles[0].SysFuncs);
                        var result = sysUserItem.SysRoles.FirstOrDefault(p => p.OrgId == orgHttp[0].Id);
                        if (result != null)
                        {
                            allFuncs = ReSetFuncItem(result.SysFuncs);
                        }
                        userCache.Funcs = BuildFuncsStr(allFuncs);
                        userCache.Buttons = BuildFuncsStr(allFuncs);
                        var funcs = allFuncs.Where(p => p.FuncType == 1).OrderBy(p => p.OrderNumber).ToList();

                        funcs.ForEach(p => p.Subs = allFuncs.Where(m => m.FuncType == 2 && p.Subs.Select(l => l.Id).Contains(m.Id)).ToList());



                        userCache.MenuFuncs = ZipHelper.GZipCompressString(JsonHelper.Obj2JsonStr<IEnumerable<SysFuncDto>>(funcs));
                    }
                }
                else
                {
                    userCache.OrgId = "0";
                    userCache.OrgName = string.Empty;
                    cookie.Values["OrgId"] = "0";
                    cookie.Values["OrgName"] = string.Empty;
                }
                #endregion
                UserCache.Instance.Add(keyGuid, userCache, new TimeSpan(expires.AddSeconds(10).Ticks - DateTime.Now.Ticks));

                cookie.Expires = expires;

                HttpContext.Current.Response.Cookies.Add(cookie);

                // TODO: UserIdentity 与AppSession相关，当创建cookie时，涉及到含有AppSession的Repository
                // TODO:操作时会导致调用UserIdentity不停创建cookie，陷入死循环
                // 根据机构Id初始化 管理员角色，字典数据
                if (orgId != 0)
                {
                    sysUserMgtService.Init(orgId, sysUserItem.Id);
                }
            }
        }

        /// <summary>
        /// 移除Cookie
        /// </summary>
        public static void RemoveCookie()
        {
            HttpCookie accessCookie = HttpContext.Current.Request.Cookies[Cookie];
            if (accessCookie != null)
            {
                accessCookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies.Add(accessCookie);
            }
        }

        /// <summary>
        /// 当前用户信息
        /// </summary>
        public static SysUserLoginDto CurrentSysUser
        {
            get
            {
                if (HttpContext.Current == null) return null;
                var name = HttpContext.Current.User.Identity.Name;
                if (string.IsNullOrEmpty(name))
                {
                    return null;
                }

                var sysUser = new SysUserLoginDto();
                if (CurrentCookie != null)
                {
                    var userCache = GetUserCache();
                    if (userCache.LoginName.Equals(name))
                    {
                        sysUser.Id = int.Parse(userCache.Id);
                        sysUser.Account = userCache.LoginName;
                        sysUser.Name = HttpUtility.UrlDecode(userCache.RealName);
                        sysUser.OrgId = int.Parse(userCache.OrgId);
                        sysUser.OrgName = HttpUtility.UrlDecode(userCache.OrgName);
                        sysUser.Buttons = EncryptHelper.DecodeBase64(userCache.Buttons).Split(';').ToList();

                        var funcjson = UserCache.Instance.GetAttribute(CurrentCookie["KeyGuid"], "Orgs", userCache);
                        var orgs = ZipHelper.GZipDecompressString(funcjson);
                        sysUser.Orgs= JsonHelper.JsonStr2Obj<IEnumerable<ApiOrgDto>>(orgs).ToList();

                        var menuFuncs = ZipHelper.GZipDecompressString(UserCache.Instance.GetAttribute(CurrentCookie["KeyGuid"], "MenuFuncs", userCache));
                        if (!string.IsNullOrEmpty(menuFuncs))
                        {
                            sysUser.Funcs = JsonHelper.JsonStr2Obj<IEnumerable<SysFuncDto>>(menuFuncs).ToList<SysFuncDto>();
                        }
                    }
                    else
                    {
                        sysUser = ReadDbAndCreateCookie(name);
                    }
                }
                else
                {
                    sysUser = ReadDbAndCreateCookie(name);
                }
                return sysUser;
            }
        }

        /// <summary>
        /// 重新设置用户登录信息缓存
        /// </summary>
        /// <returns>缓存标识</returns>
        public static void SetUserCache()
        {
            if (CurrentCookie == null) return;
            if (!UserCache.Instance.IsExit(CurrentCookie.Values["KeyGuid"]))
            {
                var orgId = CurrentCookie.Values["OrgId"];
                var expires = DateTime.Now.AddHours(2);

                CurrentCookie.Domain = ConfigurationManager.AppSettings["DomainStr"];

                var name = HttpContext.Current.User.Identity.Name;
                var sysUserMgtServcie = IocManager.Instance.Resolve<SysUserMgtService>();
                var sysUserDto = sysUserMgtServcie.GetSysUserByAccount(name);
                if (sysUserDto == null)
                {
                    throw new UserFriendlyException("当前用户名:" + name + "未在系统中匹配用户");
                }

                var userCache = new UserCacheDto
                {
                    Id = sysUserDto.Id.ToString(CultureInfo.InvariantCulture),
                    LoginName = sysUserDto.Account,
                    RealName = HttpUtility.UrlEncode(sysUserDto.Name)
                };
                var role = sysUserDto.SysRoles.FirstOrDefault(p => p.OrgId == int.Parse(orgId));
                var roleName = role == null ? "" : role.Name;
                userCache.RoleName = HttpUtility.UrlEncode(roleName);

                #region 添加机构Id
                var sysUserMgtService = IocManager.Instance.Resolve<SysUserMgtService>();

                var userHttp = sysUserMgtService.GetSysUserFromApi(sysUserDto.Account);
                if (userHttp != null)
                {
                    var orgHttp = userHttp.SysOrgs.FirstOrDefault(p => p.Id == int.Parse(orgId));

                    if (orgHttp != null)
                    {
                        userCache.OrgId = orgHttp.Id.ToString(CultureInfo.InvariantCulture);
                        userCache.OrgName = HttpUtility.UrlEncode(orgHttp.Name);
                    }
                    else
                    {
                        userCache.OrgId = "0";
                        userCache.OrgName = string.Empty;
                    }

                    // 设置机构信息JSON
                    var orgjson = JsonHelper.Obj2JsonStr<IEnumerable<ApiOrgDto>>(userHttp.SysOrgs);

                    userCache.Orgs = ZipHelper.GZipCompressString(orgjson);

                    // 登录用户的权限列表，用于控制页面上按钮的显示状态
                    if (sysUserDto.SysRoles != null && sysUserDto.SysRoles.Count > 0)
                    {
                        var allFuncs = ReSetFuncItem(sysUserDto.SysRoles[0].SysFuncs);
                        var result = sysUserDto.SysRoles.FirstOrDefault(p => p.OrgId == int.Parse(orgId));
                        if (result != null)
                        {
                            allFuncs = ReSetFuncItem(result.SysFuncs);
                        }
                        userCache.Funcs = BuildFuncsStr(allFuncs);
                        userCache.Buttons = BuildFuncsStr(allFuncs);
                        var funcs = allFuncs.Where(p => p.FuncType == 1).OrderBy(p => p.OrderNumber).ToList();

                        funcs.ForEach(p => p.Subs = allFuncs.Where(m => m.FuncType == 2 && p.Subs.Select(l => l.Id).Contains(m.Id)).OrderBy(f => f.OrderNumber).ToList());

                        userCache.MenuFuncs = ZipHelper.GZipCompressString(JsonHelper.Obj2JsonStr<IEnumerable<SysFuncDto>>(funcs));
                    }
                }
                else
                {
                    userCache.OrgId = "0";
                    userCache.OrgName = string.Empty;
                }
                #endregion
                UserCache.Instance.Add(CurrentCookie.Values["KeyGuid"], userCache, new TimeSpan(expires.AddSeconds(10).Ticks - DateTime.Now.Ticks));

                CurrentCookie.Expires = expires;
                HttpContext.Current.Response.Cookies.Add(CurrentCookie);
            }
            return;
        }

        /// <summary>
        /// 设置当前用户机构
        /// </summary>
        /// <param name="orgId">机构Id</param>
        ///  <param name="orgName">机构名称</param>
        ///  <param name="list">系统功能列表</param>
        public static void SetUserCurrentOrg(int? orgId, string orgName, List<SysFuncDto> list)
        {
            var keyGuid = Guid.NewGuid().ToString();
            var expires = DateTime.Now.AddHours(2);

            var userCache = GetUserCache();
            CurrentCookie.Domain = ConfigurationManager.AppSettings["DomainStr"];
            CurrentCookie.Values["KeyGuid"] = keyGuid;
            CurrentCookie.Values["OrgId"] = orgId.ToString();
            CurrentCookie.Values["OrgName"] = HttpUtility.UrlEncode(orgName);

            userCache.OrgId = orgId.ToString();
            userCache.OrgName = HttpUtility.UrlEncode(orgName);
            //userCache.Funcs = BuildFuncsStr(list);
            //userCache.Buttons = BuildFuncsStr(list);

            var funcs = list.Where(p => p.FuncType == 1).ToList();

            funcs.ForEach(p =>
                p.Subs = list.Where(m => m.FuncType == 2 && p.Subs.Select(l => l.Id).Contains(m.Id)).ToList());

            userCache.MenuFuncs = ZipHelper.GZipCompressString(JsonHelper.Obj2JsonStr<IEnumerable<SysFuncDto>>(funcs.OrderBy(p => p.OrderNumber)));

            UserCache.Instance.Add(keyGuid, userCache, new TimeSpan(expires.AddSeconds(10).Ticks - DateTime.Now.Ticks));

            CurrentCookie.Expires = expires;
            HttpContext.Current.Response.Cookies.Add(CurrentCookie);
        }

        /// <summary>
        /// 转换系统功能列表为统一的SysFuncItem
        /// </summary>
        /// <param name="dadItems">转换前系统功能列表</param>
        /// <returns>转换后的系统功能列表</returns>
        public static List<SysFuncDto> ReSetFuncItem(List<SysFuncLvl1Dto> dadItems)
        {

            var funcItems = new List<SysFuncDto>();

            dadItems.MapTo(funcItems);

            return funcItems;
        }

        #endregion

        #region 私有方法

        /// <summary>
        /// 拼接权限编号字符串
        /// </summary>
        /// <param name="funcs">权限</param>
        /// <returns>权限编号字符串</returns>
        private static string BuildFuncsStr(ICollection<SysFuncDto> funcs)
        {
            var funcsStr = new StringBuilder();
            foreach (var func in funcs.Where(func => func.FuncType == 3))
            {
                funcsStr.Append(func.Code.ToLower() + ";");
            }
            // 将权限字符串转化为base64字符，1：防篡改，2：压缩
            return EncryptHelper.EncodeBase64(funcsStr.ToString());
        }

        /// <summary>
        /// 获取用户信息缓存
        /// </summary>
        /// <returns>用户信息缓存</returns>
        private static UserCacheDto GetUserCache()
        {
            //防止缓存信息丢失，判断是否存在，重新设置缓存信息
            UserIdentity.SetUserCache();
            return UserCache.Instance.Get(CurrentCookie.Values["KeyGuid"]);
        }



        /// <summary>
        /// 当前Cookie信息
        /// </summary>
        private static HttpCookie CurrentCookie
        {
            get
            {
                return HttpContext.Current.Request.Cookies[Cookie];
            }
        }

        /// <summary>
        /// 读取用户信息并创建Cookie
        /// </summary>
        /// <param name="name">用户登录名</param>
        /// <returns>用户信息</returns>
        private static SysUserLoginDto ReadDbAndCreateCookie(string name)
        {
            var sysUserMgtServcie = IocManager.Instance.Resolve<SysUserMgtService>();
            var user = sysUserMgtServcie.GetSysUserByAccount(name);
            if (user == null)
            {
                throw new UserFriendlyException("当前用户名:" + name + "未在系统中匹配用户");
            }
            CreateCookie(user);
            return user;
        }

        #endregion
    }
}