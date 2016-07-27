//------------------------------------------------------------
// <copyright file="ApiMgtService.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/3/8 8:09:54</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Application.Apis
{
    using System.Configuration;
    using Wikitec.DTO.Systems.SysUser;
    using Wikitec.Infrastructure.Dto;
    using Wikitec.Infrastructure.Toolkit;

    /// <summary>
    /// api请求数据实现类
    /// </summary>
    public class ApiMgtService
    {
        /// <summary>
        /// 根据登录账户获取用户信息的请求地址
        /// </summary>
        public const string GetUserByAccountUrl = "/io/GetUserByAccount?account={0}";

        /// <summary>
        /// 获取用户分页列表信息的请求地址
        /// </summary>
        public const string GetUsersByOrgAndSystemIdUrl = "/io/GetUserInfoListByOrgId?subSystemId=13&&orgId={0}&&page={1}&&pageSize={2}&&account={3}&&name={4}";

        /// <summary>
        /// 根据登录账户获取用户信息
        /// </summary>
        /// <param name="account">登录账户</param>
        /// <returns>用户信息</returns>
        public static ApiUserDto GetApiSysUser(string account)
        {
            var getUserByAccount = ConfigurationManager.AppSettings["webapiurl"] + GetUserByAccountUrl;
            var urlPath = string.Format(getUserByAccount, account);
            return JsonHelper.JsonStr2Obj<ApiUserDto>(HttpHelper.GetResponse(urlPath));
        }

        /// <summary>
        /// 根据机构Id获取用户分页列表信息
        /// </summary>
        /// <param name="orgId">机构Id</param>
        /// <param name="search">查询条件</param>
        /// <returns>用户分页列表信息</returns>
        public static ApiPagedResult<ApiUserDto> GetApiSysUsers(int orgId, SysUserSearchDto search)
        {
            var pagerDto = search.PagerDto;
            var url = ConfigurationManager.AppSettings["webapiurl"] + GetUsersByOrgAndSystemIdUrl;
            var getUsersByOrgIdAndSystemId = string.Format(url, orgId, pagerDto.PageIndex, pagerDto.PageSize, search.Account, search.Name);

            if (search.RoleId > -1)
            {
                getUsersByOrgIdAndSystemId = string.Format(url, orgId, 1, 1000, search.Account, search.Name);
            }

            return JsonHelper.JsonStr2Obj<ApiPagedResult<ApiUserDto>>(HttpHelper.GetResponse(getUsersByOrgIdAndSystemId));
        }
    }
}