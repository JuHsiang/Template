//------------------------------------------------------------
// <copyright file="SysUserController.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>02/26/2016 15:09:29</date>
// <summary>
// 员工WebApi Controller
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Controllers
{
    using System.Collections.Generic;
    using System.Web.Http;
    using Web.Portal.Toolkits;
    using Wikitec.Application.Systems;
    using Wikitec.DTO.Systems.SysUser;
    using Wikitec.Infrastructure.Dto;
    using Wikitec.Infrastructure.Unity.Ioc;
    using Wikitec.Infrastructure.WebApi;

    /// <summary>
    /// 员工WebApi Controller
    /// </summary>
    public class SysUsersController : WebApiBaseController
    {
        /// <summary>
        /// 员工业务逻辑
        /// </summary>
        private readonly SysUserMgtService sysUserMgtService;

        /// <summary>
        /// 下拉框选项业务逻辑
        /// </summary>
        private readonly ComboboxMgtService comboboxMgtService;

        /// <summary>
        /// 构造函数
        /// </summary>
        public SysUsersController()
        {
            this.sysUserMgtService = IocManager.Instance.Resolve<SysUserMgtService>();
            this.comboboxMgtService = IocManager.Instance.Resolve<ComboboxMgtService>();
        }

        /// <summary>
        /// 获取用户分页信息列表
        /// </summary>
        /// <param name="searchInput">查询条件</param>
        /// <returns>用户信息</returns>
        [HttpGet]
        [Route("api/sysusers")]
        public ApiPagedResult<ApiUserDto> GetUserByOrgId(SysUserSearchDto searchInput)
        {
            var orgId = int.Parse(UserIdentity.CurrentSysUser.OrgId.ToString());
            var result = this.sysUserMgtService.GetUserByOrgId(orgId, searchInput);

            return result;
        }

        /// <summary>
        /// 新增或修改用户
        /// </summary>
        /// <param name="dto">用户信息</param>
        [HttpPost]
        [Route("api/sysusers")]
        public void Post(SysUserDto dto)
        {
            var orgId = int.Parse(UserIdentity.CurrentSysUser.OrgId.ToString());
            this.sysUserMgtService.AddOrUpdateSysUser(dto, orgId);
        }

        /// <summary>
        /// 根据登录账户获取用户信息
        /// </summary>
        /// <param name="account">登录账户</param>
        /// <returns>用户信息</returns>
        [HttpGet]
        [Route("api/sysusers/account/{account}")]
        public SysUserDto GetUserByAccount(string account)
        {
            int orgId = int.Parse(UserIdentity.CurrentSysUser.OrgId.ToString());
            var sysUser = this.sysUserMgtService.GetSysUserFromApi(account, orgId);

            return sysUser;
        }

        /// <summary>
        /// 获取性别选项列表
        /// </summary>
        /// <returns>性别列表</returns>
        [HttpGet]
        [Route("api/sysusers/gender")]
        public List<ComboboxItemDto> GetGederCombobox()
        {
            var comboboxList = this.comboboxMgtService.GetGederCombobox();

            return comboboxList;
        }
    }
}
